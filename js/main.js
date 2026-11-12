(function () {
  var stage = document.querySelector(".hero-stage");
  if (stage) {
    var live = document.getElementById("hero-live");
    var zh = "你好，我是黄胜坚。";
    var en = "Hello, welcome.";
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    function isInverted() {
      return stage.classList.contains("is-hover") ||
        stage.matches(":hover") ||
        (stage === document.activeElement && stage.matches(":focus-visible"));
    }

    function syncLive() {
      if (!live) return;
      live.textContent = isInverted() ? en : zh;
    }

    stage.addEventListener("mouseenter", syncLive);
    stage.addEventListener("mouseleave", function () {
      if (!finePointer.matches) return;
      syncLive();
    });
    stage.addEventListener("focus", syncLive);
    stage.addEventListener("blur", function () {
      syncLive();
    });

    stage.addEventListener("click", function (event) {
      if (finePointer.matches) return;
      event.preventDefault();
      stage.classList.toggle("is-hover");
      syncLive();
    });

    document.addEventListener("click", function (event) {
      if (finePointer.matches) return;
      if (!stage.classList.contains("is-hover")) return;
      if (stage.contains(event.target)) return;
      stage.classList.remove("is-hover");
      syncLive();
    });

    stage.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && stage.classList.contains("is-hover")) {
        stage.classList.remove("is-hover");
        syncLive();
      }
    });
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
