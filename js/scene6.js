(() => {
  const title = document.getElementById("title");
  const text = document.getElementById("text");
  const heartScene = document.getElementById("heartScene");
  const heart = document.getElementById("heart");
  const endText = document.getElementById("endText");

  const titleText = "Sorry mera bachcha";
  const bodyText = `Iss baar mai aapke birthday me nahi hu,
par maine koshish ki hai
ki aapko meri presence feel ho.

I promise…
next birthday hum saath cake cut karenge.`;

  /* Typing settings */
  let tIndex = 0;
  let bIndex = 0;
  const typingSpeedTitle = 120; // ms
  const typingSpeedBody = 45;
  let sceneEnded = false; // 🔒 final scene flag

  /* Clear initial text */
  title.textContent = "";
  text.textContent = "";
  title.style.opacity = 1;
  text.style.opacity = 1;
  heartScene.style.opacity = 0;
  heart.style.opacity = 0;
  endText.style.opacity = 0;

  /* ---------- TYPE TITLE ---------- */
  function typeTitle() {
    if (tIndex < titleText.length) {
      title.textContent += titleText.charAt(tIndex);
      tIndex++;
      setTimeout(typeTitle, typingSpeedTitle);
    } else {
      setTimeout(typeBody, 800); // pause after title
    }
  }

  /* ---------- TYPE BODY ---------- */
  function typeBody() {
    if (bIndex < bodyText.length) {
      text.textContent += bodyText.charAt(bIndex);
      bIndex++;
      setTimeout(typeBody, typingSpeedBody);
    } else {
      setTimeout(triggerHeartScene, 2000);
    }
  }

  /* ---------- HEART SCENE ---------- */
  function triggerHeartScene() {
    if (sceneEnded) return;
    sceneEnded = true;

    heartScene.style.opacity = 1;

    setTimeout(() => {
      heart.style.transform = "scale(20)";
      heart.style.opacity = 0.15;
    }, 1500);

    setTimeout(() => {
      endText.style.opacity = 1;
    }, 4500);

    // Screen stays paused here — final scene
  }

  /* ---------- START ---------- */
  typeTitle();
})();
