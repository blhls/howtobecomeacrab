const termLines = document.getElementById("termLines");
const captcha = document.getElementById("captcha");
const loginBtn = document.getElementById("loginBtn");

let clicked = false;

captcha.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-choice]");
  if (!link) return;
  e.preventDefault();

  if (clicked) return;
  clicked = true;

  const msg = document.createElement("div");
  msg.className = "line";
  msg.textContent = "yeah, i couldn't make the difference either.";
  termLines.appendChild(msg);

  loginBtn.classList.remove("hidden");
});

loginBtn.addEventListener("click", () => {
  window.location.href = "/desktop.html";
});
