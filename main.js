const app = document.getElementById("app");
let currentScene = 1;
const totalScenes = 6;

const scenesCache = {};      // HTML preload
const loadedScripts = {};   // JS load tracking

/* ---------- PRELOAD HTML + CSS ---------- */
function preloadScenes() {
  for (let i = 1; i <= totalScenes; i++) {

    // 🔹 Preload HTML
    fetch(`scenes/scene${i}.html`)
      .then(res => res.text())
      .then(html => {
        scenesCache[i] = html;
      })
      .catch(() => {});

    // 🔹 Preload CSS (NO apply, only cache)
    const cssPreload = document.createElement("link");
    cssPreload.rel = "preload";
    cssPreload.as = "style";
    cssPreload.href = `css/scene${i}.css`;
    document.head.appendChild(cssPreload);
  }
}
preloadScenes();

/* ---------- LOAD SCENE ---------- */
function loadScene(sceneNumber) {
  if (!scenesCache[sceneNumber]) {
    fetch(`scenes/scene${sceneNumber}.html`)
      .then(res => res.text())
      .then(html => {
        scenesCache[sceneNumber] = html;
        renderScene(sceneNumber);
      });
  } else {
    renderScene(sceneNumber);
  }
}

/* ---------- RENDER SCENE ---------- */
function renderScene(sceneNumber) {
  // Fade out
  app.style.opacity = "0";

  setTimeout(() => {

    /* ----- HTML ----- */
    app.innerHTML = scenesCache[sceneNumber];

    /* ----- REMOVE OLD CSS ----- */
    const oldCSS = document.querySelector("link[data-scene]");
    if (oldCSS) oldCSS.remove();

    /* ----- APPLY CURRENT SCENE CSS ONLY ----- */
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `css/scene${sceneNumber}.css`;
    css.setAttribute("data-scene", "true");
    document.head.appendChild(css);

    /* ----- LOAD CURRENT SCENE JS ONLY ONCE ----- */
    if (!loadedScripts[sceneNumber]) {
      const script = document.createElement("script");
      script.src = `js/scene${sceneNumber}.js`;
      script.defer = true;
      script.setAttribute("data-scene", sceneNumber);
      document.body.appendChild(script);
      loadedScripts[sceneNumber] = true;
    }

    // Fade in
    setTimeout(() => {
      app.style.opacity = "1";
    }, 60);

  }, 200);
}

/* ---------- NEXT SCENE ---------- */
function goNextScene() {
  if (currentScene < totalScenes) {
    currentScene++;
    loadScene(currentScene);
  }
}

/* ---------- START ---------- */
loadScene(currentScene);