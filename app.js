let lessons = [];

async function init() {
  try {
    const res = await fetch("lessons/index.json");
    lessons = await res.json();
    renderMenu();
    if (lessons.length > 0) {
      loadLesson(lessons[0]);
    }
  } catch (err) {
    document.getElementById("lesson-viewer").innerHTML =
      "<p>讀取課程失敗，請透過網頁伺服器或 GitHub Pages 開啟。</p>";
  }
}

function renderMenu() {
  const list = document.getElementById("lesson-list");
  list.innerHTML = lessons
    .map(
      (item) => `
      <button class="lesson-card-btn" id="btn-${item.id}" onclick='loadLesson(${JSON.stringify(item)})'>
        <span class="badge">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </button>
    `
    )
    .join("");
}

async function loadLesson(lesson) {
  document.querySelectorAll(".lesson-card-btn").forEach((b) => b.classList.remove("active"));
  const activeBtn = document.getElementById(`btn-${lesson.id}`);
  if (activeBtn) activeBtn.classList.add("active");

  const viewer = document.getElementById("lesson-viewer");
  const res = await fetch(lesson.file);
  viewer.innerHTML = await res.text();
}

function setFontSize(size) {
  const btnNormal = document.getElementById("btn-normal");
  const btnLarge = document.getElementById("btn-large");
  if (size === "large") {
    document.body.classList.add("large-font");
    btnLarge.classList.add("active");
    btnNormal.classList.remove("active");
  } else {
    document.body.classList.remove("large-font");
    btnNormal.classList.add("active");
    btnLarge.classList.remove("active");
  }
}

function copyPrompt(elementId, btnEl) {
  const text = document.getElementById(elementId).innerText.replace(/^[「]|[」]$/g, "");
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnEl.innerText;
    btnEl.innerText = "已複製好囉！快去貼上吧";
    btnEl.classList.add("copied");
    setTimeout(() => {
      btnEl.innerText = originalText;
      btnEl.classList.remove("copied");
    }, 2500);
  });
}

init();