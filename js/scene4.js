(() => {
  const envelope = document.getElementById('envelope');
  const letter = document.getElementById('letter');
  const goCelebrate = document.getElementById('goCelebrate');

  const phase1 = document.getElementById('phase1');
  const phase2 = document.getElementById('phase2');

  const candles = document.querySelectorAll('.candle');
  const music = document.getElementById('birthdayMusic');
  const hint = document.getElementById('hint');
  const confettiCanvas = document.getElementById('confetti');

  let blown = 0;
  let musicPlayed = false;
  let sceneEnded = false; // 🔒 prevent double transition

  /* ---------- SCENE END ---------- */
  function endScene() {
    if (sceneEnded) return;
    sceneEnded = true;

    // Cleanup
    candles.forEach(c => c.replaceWith(c.cloneNode(true))); // remove click listeners
    envelope.replaceWith(envelope.cloneNode(true));
    goCelebrate.replaceWith(goCelebrate.cloneNode(true));
    hint.style.display = 'none';

    if (!music.paused) music.pause();
    confettiCanvas.style.display = 'none';

    goNextScene(); // 🚀 transition to Scene 5
  }

  /* ---------- ENVELOPE ---------- */
  const envelopeClickHandler = () => {
    letter.style.display = 'block';
  };
  envelope.addEventListener('click', envelopeClickHandler);

  /* ---------- CONTINUE / PHASE ---------- */
  const goCelebrateHandler = () => {
    phase1.style.display = 'none';
    phase2.style.display = 'block';
  };
  goCelebrate.addEventListener('click', goCelebrateHandler);

  /* ---------- CANDLE CLICK ---------- */
  const candleClickHandler = (candle) => {
    if (candle.classList.contains('blown')) return;

    candle.classList.add('blown');
    blown++;

    if (!musicPlayed) {
      music.currentTime = 0;
      music.play();
      musicPlayed = true;
      hint.style.display = 'none';
    }

    releaseBalloons();
    popMidBalloons();

    if (blown === candles.length) {
      startConfetti();

      // End scene after a short delay
      setTimeout(endScene, 5000); 
    }
  };

  candles.forEach(c => c.addEventListener('click', () => candleClickHandler(c)));

  /* ---------- BALLOONS ---------- */
  function releaseBalloons() {
    let count = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = Math.random() * 100 + 'vw';
      b.style.color = `hsl(${Math.random()*360},70%,55%)`;
      document.body.appendChild(b);
      setTimeout(()=>b.remove(),5000);
    }
  }

  function popMidBalloons() {
    document.querySelectorAll('.balloon').forEach((b,i)=>{
      if(i<2){
        setTimeout(()=>{
          b.classList.add('pop');
          setTimeout(()=>b.remove(),300);
        },2000);
      }
    });
  }

  /* ---------- CONFETTI ---------- */
  function startConfetti() {
    const c = confettiCanvas;
    const ctx = c.getContext('2d');
    c.width = innerWidth;
    c.height = innerHeight;
    c.style.display = 'block';

    let pieces = Array.from({length:160},()=>({
      x:Math.random()*c.width,
      y:Math.random()*c.height,
      r:Math.random()*6+2,
      d:Math.random()*5+2
    }));

    (function draw(){
      ctx.clearRect(0,0,c.width,c.height);
      pieces.forEach(p=>{
        ctx.beginPath();
        ctx.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.y+=p.d;
      });
      if(!sceneEnded) requestAnimationFrame(draw);
    })();
  }

})();
