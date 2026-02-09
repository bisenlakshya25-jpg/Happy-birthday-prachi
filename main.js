const app = document.getElementById("app");
let currentScene = 1;
const totalScenes = 6;
const scenesCache = {}; // preloaded HTML
const loadedScripts = {}; // track loaded JS

/* ---------- PRELOAD SCENES ---------- */
function preloadScenes() {
  for (let i = 1; i <= totalScenes; i++) {
    fetch(`scenes/scene${i}.html`)
      .then(res => res.text())
      .then(html => {
        scenesCache[i] = html;
      })
      .catch(err => console.error(`Scene ${i} preload failed:`, err));
  }
}
preloadScenes();

/* ---------- LOAD SCENE ---------- */
function loadScene(sceneNumber) {
  if (!scenesCache[sceneNumber]) {
    console.warn(`Scene ${sceneNumber} not preloaded yet, fetching...`);
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
  // Fade-out old content
  app.style.opacity = 0;

  setTimeout(() => {
    // Replace HTML
    app.innerHTML = scenesCache[sceneNumber];

    // Remove old CSS
    const oldCSS = document.querySelector("link[data-scene]");
    if (oldCSS) oldCSS.remove();

    // Add new scene CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `css/scene${sceneNumber}.css`;
    link.setAttribute("data-scene", "true");
    document.head.appendChild(link);

    // Load scene JS only if not loaded before
    if (!loadedScripts[sceneNumber]) {
      const script = document.createElement("script");
      script.src = `js/scene${sceneNumber}.js`;
      script.defer = true;
      document.body.appendChild(script);
      loadedScripts[sceneNumber] = true;
    }

    // Fade-in new content
    setTimeout(() => {
      app.style.opacity = 1;
    }, 50); // small delay to allow DOM render
  }, 200); // fade-out duration
}

/* ---------- GO TO NEXT SCENE ---------- */
function goNextScene() {
  currentScene++;
  if (currentScene <= totalScenes) {
    loadScene(currentScene);
  }
}

/* ---------- INITIAL SCENE ---------- */
loadScene(currentScene);