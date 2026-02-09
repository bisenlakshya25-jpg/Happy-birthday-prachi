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

  let tIndex = 0;
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
      setTimeout(typeTitle, 120);
    } else {
      setTimeout(typeBodyLineChar, 800);
    }
  }

  /* ---------- TYPE BODY LINE-WISE + CHAR-WISE ---------- */
  const bodyLines = bodyText.split("\n");
  let lineIndex = 0;
  let charIndex = 0;

  function typeBodyLineChar() {
    if (lineIndex >= bodyLines.length) {
      setTimeout(triggerHeartScene, 2000);
      return;
    }

    const line = bodyLines[lineIndex];
    if (charIndex < line.length) {
      text.innerHTML += line.charAt(charIndex);
      charIndex++;
      setTimeout(typeBodyLineChar, 45); // typing speed per char
    } else {
      text.innerHTML += "<br>"; // new line
      lineIndex++;
      charIndex = 0;
      setTimeout(typeBodyLineChar, 200); // short pause between lines
    }
  }

  /* ---------- HEART SCENE ---------- */
  function triggerHeartScene() {
    if (sceneEnded) return;
    sceneEnded = true;

    // Remove old text completely
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
  }

  typeTitle();
})();