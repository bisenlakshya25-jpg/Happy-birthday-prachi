(() => {
  const music = document.getElementById('bgMusic');
  const knife = document.getElementById('knife');
  const instruction = document.getElementById('instruction');
  const slice = document.getElementById('slice');
  const cake = document.getElementById('cake');
  const blackout = document.getElementById('blackout');
  const wishText = document.getElementById('wishText');

  let cutting = false;
  let cutDone = false;
  let musicStarted = false;
  let sceneEnded = false; // 🔒 prevent double transition

  /* ---------- SCENE END ---------- */
  function endScene() {
    if (sceneEnded) return;
    sceneEnded = true;

    // Cleanup
    document.removeEventListener('touchstart', touchStartHandler);
    document.removeEventListener('touchmove', touchMoveHandler);
    document.removeEventListener('touchend', touchEndHandler);

    knife.style.opacity = 0;
    instruction.style.opacity = 0;

    if (!music.paused) {
      music.pause();
      music.currentTime = 0;
    }

    goNextScene(); // 🚀 transition to Scene 6
  }

  /* ---------- MUSIC START ---------- */
  const firstTouchHandler = () => {
    if (!musicStarted) {
      music.volume = 0.9;
      music.play().catch(() => {});
      musicStarted = true;
    }
  };
  document.body.addEventListener('touchstart', firstTouchHandler, { once: true });

  /* ---------- TOUCH HANDLERS ---------- */
  const touchStartHandler = (e) => {
    if (cutDone) return;

    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    knife.style.left = x + 'px';
    knife.style.top = y + 'px';
    knife.style.opacity = 1;

    instruction.style.opacity = 0;
    cutting = true;
  };

  const touchMoveHandler = (e) => {
    if (!cutting || cutDone) return;

    knife.style.left = e.touches[0].clientX + 'px';
    knife.style.top = e.touches[0].clientY + 'px';
  };

  const touchEndHandler = () => {
    if (!cutting || cutDone) return;

    cutting = false;
    cutDone = true;
    knife.style.opacity = 0;

    /* Cake cut animation */
    setTimeout(() => {
      cake.style.transform = 'translateZ(20px) rotateY(-4deg)';
      slice.style.opacity = 1;
      slice.style.transform = 'translateX(60px) translateZ(60px) rotateY(18deg)';
    }, 600);

    /* Music fade out */
    setTimeout(() => {
      let fade = setInterval(() => {
        if (music.volume > 0.05) {
          music.volume -= 0.05;
        } else {
          music.pause();
          music.currentTime = 0;
          clearInterval(fade);
        }
      }, 150);
    }, 1200);

    /* Blackout + wish text */
    setTimeout(() => {
      blackout.style.opacity = 1;
      wishText.style.opacity = 1;

      // Keep “Make a wish” text for 6 seconds before next scene
      setTimeout(endScene, 6000);
    }, 2600);
  };

  /* ---------- ATTACH HANDLERS ---------- */
  document.addEventListener('touchstart', touchStartHandler);
  document.addEventListener('touchmove', touchMoveHandler);
  document.addEventListener('touchend', touchEndHandler);

})();