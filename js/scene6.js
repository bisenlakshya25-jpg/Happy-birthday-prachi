const headingText = "Sorry Mera Bachcha";
const messageText =
  "Iss baar m aapke birthday me nahi hu, par maine koshish ki aapko meri presence feel ho. And I have a request bachcha please pehle jaise meri feelings ko samjho yaar. Aise M kho na du aapko m nhi chahta aapko khona beta. Bas ek request h samjho mujhe please respect my insecurities. Aur haan yaar bachcha aapke birthday ki din ye baat bol rha please har chizo ko normalise karne ki koshish mat karo. Meri feelings ko aap ignore kar rhe ho ab aap, maanta hu aaj aapka birthday h but m sirf tumse ek chiz maangta hu mujhe tum chahiya lauta do meri mujhe meri purani prachi jisse m pyaar karta hu.";

const headingEl = document.getElementById("heading");
const messageEl = document.getElementById("message");
const glow = document.querySelector(".glow-pulse");
const heartContainer = document.querySelector(".heart-container");
const heart = document.querySelector(".heart");
const textContainer = document.querySelector(".text-container");
const finalScreen = document.querySelector(".final-screen");

/* ------------------ HUMAN TYPING ------------------ */
function typeText(el, text, callback) {
  let i = 0;

  function type() {
    if (i < text.length) {
      const char = text[i];
      el.innerHTML += char;
      i++;

      let delay;

      if (char === ".") {
        delay = 750; // deep pause
      } else if (char === ",") {
        delay = 450; // small pause
      } else if (char === " ") {
        delay = 120; // micro pause
      } else {
        delay = Math.random() * 120 + 90; // slow natural typing
      }

      setTimeout(type, delay);
    } else {
      if (callback) callback();
    }
  }

  type();
}

/* ------------------ START SEQUENCE ------------------ */

typeText(headingEl, headingText, () => {
  setTimeout(() => {

    typeText(messageEl, messageText, () => {

      /* 🌑 PHASE 1 – 2 sec silence */
      setTimeout(() => {

        /* 💓 PHASE 2 – Distant soft pulse */
        glow.style.opacity = "1";
        glow.style.transform = "scale(1.4)";

        setTimeout(() => {
          glow.style.opacity = "0";

          /* 1.5 sec silence */
          setTimeout(() => {

            /* 💗 PHASE 3 – Heart fade in */
            heartContainer.style.opacity = "1";

            const beats = [1000, 800, 1200, 900];
            let index = 0;

            function irregularBeat() {
              if (index < beats.length) {
                heart.style.transition = "transform 0.25s ease";
                heart.style.transform = "rotate(-45deg) scale(1.15)";

                setTimeout(() => {
                  heart.style.transform = "rotate(-45deg) scale(1)";
                  setTimeout(() => {
                    index++;
                    irregularBeat();
                  }, beats[index]);
                }, 250);

              } else {

                /* 💥 PHASE 4 – Emotional Release */
                heart.style.transition = "transform 0.2s ease";
                heart.style.transform = "rotate(-45deg) scale(6)";

                setTimeout(() => {

                  heart.style.transition = "transform 2.8s ease-in-out";
                  heart.style.transform = "rotate(-45deg) scale(40)";

                  glow.style.opacity = "0.7";
                  glow.style.transform = "scale(8)";

                  setTimeout(() => {

                    /* ✨ PHASE 5 – Blur dissolve */
                    textContainer.style.filter = "blur(8px)";
                    textContainer.style.opacity = "0";

                    setTimeout(() => {

                      heartContainer.style.opacity = "0";

                      /* Final Landing – Stillness */
                      setTimeout(() => {
                        finalScreen.style.opacity = "1";
                      }, 800);

                    }, 1500);

                  }, 2000);

                }, 200);
              }
            }

            irregularBeat();

          }, 1500);

        }, 700);

      }, 2000);

    });

  }, 400);
});
