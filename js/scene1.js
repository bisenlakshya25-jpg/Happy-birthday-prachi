(() => {
  const layer = document.getElementById("dream-layer");
  const content = document.getElementById("love-content");

  const colors = ["#590d22","#7b002c","#a4133c","#c9184a","#ff4d6d"];
  const COUNT = 34;

  let canExit = false;   // 🔒 prevent early skip
  let ended = false;    // 🔒 prevent double trigger

  /* ---------- BALLOONS ---------- */
  for (let i = 0; i < COUNT; i++) {
    const b = document.createElement("div");
    b.className = "balloon";

    const size = 100 + Math.random() * 70;
    b.style.setProperty("--size", size + "px");
    b.style.left = Math.random() * 100 + "vw";
    b.style.color = colors[Math.floor(Math.random() * colors.length)];
    b.style.animationDuration = 10 + Math.random() * 4 + "s";
    b.style.animationDelay = Math.random() * 3 + "s";
    b.style.setProperty("--drift", Math.random());

    layer.appendChild(b);
  }

  /* ---------- REVEAL TEXT ---------- */
  setTimeout(() => {
    content.style.opacity = "1";
    content.style.transform = "scale(1)";
    canExit = true; // ✅ now user is allowed to go next
  }, 10500);

  /* ---------- END SCENE ---------- */
  function endScene() {
    if (!canExit || ended) return;
    ended = true;

    content.style.opacity = "0";
    content.style.transform = "scale(0.85)";
    layer.innerHTML = "";

    window.removeEventListener("click", endScene);
    window.removeEventListener("touchstart", endScene);

    // small delay for smoothness
    setTimeout(() => {
      goNextScene(); // 🚀 MAIN TRANSITION CALL
    }, 600);
  }

  window.addEventListener("click", endScene);
  window.addEventListener("touchstart", endScene);
})();
