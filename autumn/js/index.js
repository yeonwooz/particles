import App from "./App.js";

window.addEventListener("load", () => {
  const app = new App();
  app.resize();
  app.render();
});
