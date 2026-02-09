const app = document.getElementById("app");
let currentScene = 1;

function loadScene(sceneNumber) {
  fetch(`scenes/scene${sceneNumber}.html`)
    .then(res => res.text())
    .then(html => {
      app.innerHTML = html;

      const oldCSS = document.querySelector("link[data-scene]");
      if (oldCSS) oldCSS.remove();

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `css/scene${sceneNumber}.css`;
      link.setAttribute("data-scene", "true");
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = `js/scene${sceneNumber}.js`;
      script.defer = true;
      document.body.appendChild(script);
    });
}

function goNextScene() {
  currentScene++;
  loadScene(currentScene);
}

loadScene(currentScene);
