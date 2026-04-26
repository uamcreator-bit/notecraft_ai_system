const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const resultArea = document.getElementById("result");
const loading = document.getElementById("loading");

const SUPABASE_FUNCTION_URL = "ここにSupabaseのFunction URLを入れる";

generateBtn.addEventListener("click", async () => {
  const sourceText = document.getElementById("sourceText").value.trim();
  const level = document.getElementById("level").value;

  const selectedTypes = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);

  if (!sourceText) {
    alert("授業資料を貼り付けてください。");
    return;
  }

  if (selectedTypes.length === 0) {
    alert("作りたいものを1つ以上選んでください。");
    return;
  }

  loading.classList.remove("hidden");
  resultArea.textContent = "";

  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sourceText,
        selectedTypes,
        level
      })
    });

    if (!response.ok) {
      throw new Error("生成に失敗しました。");
    }

    const data = await response.json();
    resultArea.textContent = data.result;
  } catch (error) {
    resultArea.textContent = "エラーが発生しました。時間をおいてもう一度試してください。";
    console.error(error);
  } finally {
    loading.classList.add("hidden");
  }
});

copyBtn.addEventListener("click", async () => {
  const text = resultArea.textContent;

  if (!text) {
    alert("コピーする内容がありません。");
    return;
  }

  await navigator.clipboard.writeText(text);
  alert("コピーしました。");
});
