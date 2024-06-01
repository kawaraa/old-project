import configs from "./config.json";

export const getConfig = (key) => {
  if (configs[key]) return configs[key];
  for (let kk in configs) {
    const config = configs[kk];
    for (let k in config) if (k === key) return config[k];
  }
  throw new Error(key + " is not a valid config object(!)");
};

export const setEventsListeners = () => {
  window.addEventListener("click", (e) => {
    if (document.querySelector(".no-focus")) return;
    document.querySelectorAll(".focus").forEach((el) => {
      el.className = el.className.replace("focus", "no-focus");
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "tab" || document.querySelector(".focus")) return;
    document.querySelectorAll(".no-focus").forEach((el) => {
      el.className = el.className.replace("no-focus", "focus");
    });
  });
};
