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
  const typingSpeedTitle = 120; // ms
  let sceneEnded = false;

  /* Clear initial text */
  title.textContent = "";
  text.innerHTML = "";
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
      setTimeout(typeBodyLines, 800);
    }
  }

  /* ---------- TYPE BODY LINE-WISE ---------- */
  const bodyLines = bodyText.split("\n");
  let lineIndex = 0;

  function typeBodyLines() {
    if (lineIndex < bodyLines.length) {
      const line = bodyLines[lineIndex].trim();
      if(line) text.innerHTML += line + "<br>";
      lineIndex++;
      setTimeout(typeBodyLines, 400); // delay between lines
    } else {
      setTimeout(triggerHeartScene, 2000);
    }
  }

  /* ---------- HEART SCENE ---------- */
  function triggerHeartScene() {
    if (sceneEnded) return;
    sceneEnded = true;

    // Remove old text completely before heart scene
    title.style.opacity = 0;
    text.style.opacity = 0;

    heartScene.style.opacity = 1;

    setTimeout(() => {
      heart.style.transform = "scale(20)";
      heart.style.opacity = 0.15;
    }, 1500);

    setTimeout(() => {
      endText.style.opacity = 1;
    }, 4500);

    // Final scene pause here
  }

  /* ---------- START ---------- */
  typeTitle();
})();