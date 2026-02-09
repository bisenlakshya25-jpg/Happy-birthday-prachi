(() => {
  const elements = document.querySelectorAll('.type');
  const letter = document.querySelector('.letter');
  const overlay = document.getElementById('gifOverlay');
  const gifs = document.querySelectorAll('.gif');
  const continueBtn = document.getElementById('continueBtn');

  let currentGif = 0;
  let typingSpeed = 55;
  let typingDone = false;
  let sceneEnded = false; // 🔒 prevent double transition

  /* ---------- TYPING ---------- */
  function typeElement(el, callback) {
    const text = el.innerHTML.trim();
    el.innerHTML = '';
    el.style.visibility = 'visible';

    let i = 0;
    const interval = setInterval(() => {
      el.innerHTML += text.charAt(i);
      letter.scrollTop = letter.scrollHeight;
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        callback && callback();
      }
    }, typingSpeed);
  }

  typeElement(elements[0], () => {
    typeElement(elements[1], () => {
      typeElement(elements[2], () => {
        typingDone = true;
        setTimeout(startGifFlow, 4000);
      });
    });
  });

  /* ---------- GIF FLOW ---------- */
  function resetGifs() {
    gifs.forEach(g => g.classList.remove('active'));
    continueBtn.style.display = 'none';
    currentGif = 0;
  }

  function startGifFlow() {
    resetGifs();
    overlay.style.display = 'flex';
    gifs[0].classList.add('active');
  }

  function endScene() {
    if (sceneEnded) return;
    sceneEnded = true;

    // Cleanup
    overlay.style.display = 'none';
    resetGifs();

    document.removeEventListener('click', letterClickHandler);
    document.removeEventListener('touchstart', touchStartHandler);
    document.removeEventListener('touchend', touchEndHandler);
    continueBtn.removeEventListener('click', continueHandler);
    
    goNextScene(); // 🚀 transition to Scene 4
  }

  /* ---------- HANDLERS ---------- */
  const letterClickHandler = () => {
    if (typingDone && overlay.style.display !== 'flex') {
      startGifFlow();
    }
  };

  const continueHandler = () => {
    endScene();
  };

  let startX = 0;
  const touchStartHandler = e => {
    startX = e.touches[0].clientX;
  };

  const touchEndHandler = e => {
    const endX = e.changedTouches[0].clientX;

    // Swipe RIGHT → back to letter
    if (endX - startX > 80 && overlay.style.display === 'flex') {
      overlay.style.display = 'none';
    }

    // Swipe LEFT on letter → start GIF again
    if (startX - endX > 80 && overlay.style.display !== 'flex' && typingDone) {
      startGifFlow();
    }
  };

  overlay.addEventListener('click', () => {
    if (currentGif < gifs.length - 1) {
      gifs[currentGif].classList.remove('active');
      currentGif++;
      gifs[currentGif].classList.add('active');
    } else {
      continueBtn.style.display = 'block';
    }
  });

  /* ---------- EVENT LISTENERS ---------- */
  letter.addEventListener('click', letterClickHandler);
  document.addEventListener('touchstart', touchStartHandler);
  document.addEventListener('touchend', touchEndHandler);
  continueBtn.addEventListener('click', continueHandler);

})();
