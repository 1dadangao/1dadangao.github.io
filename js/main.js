(function () {
  var stage = document.querySelector(".hero-stage");
  if (stage) {
    var live = document.getElementById("hero-live");
    var zh = "你好，我是黄胜坚。";
    var en = "Hello, welcome.";

    function setSpot(event) {
      var rect = stage.getBoundingClientRect();
      stage.style.setProperty("--spot-x", (event.clientX - rect.left) + "px");
      stage.style.setProperty("--spot-y", (event.clientY - rect.top) + "px");
    }

    function showSpot(event) {
      setSpot(event);
      stage.classList.add("has-pointer");
      if (live) live.textContent = en;
    }

    function hideSpot() {
      stage.classList.remove("has-pointer");
      stage.style.setProperty("--spot-x", "-9999px");
      stage.style.setProperty("--spot-y", "-9999px");
      if (live) live.textContent = zh;
    }

    stage.addEventListener("pointermove", showSpot);
    stage.addEventListener("pointerdown", showSpot);
    stage.addEventListener("pointerleave", hideSpot);
    stage.addEventListener("pointercancel", hideSpot);
  }

  var menu = document.querySelector(".nav-toggle");
  if (menu) {
    document.addEventListener("click", function (event) {
      if (!menu.open) return;
      if (menu.contains(event.target)) return;
      menu.open = false;
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.open) {
        menu.open = false;
        var summary = menu.querySelector("summary");
        if (summary) summary.focus();
      }
    });
  }
})();
