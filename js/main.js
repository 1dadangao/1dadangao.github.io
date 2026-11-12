(function () {
  var stage = document.querySelector(".hero-stage");
  if (stage) {
    var live = document.getElementById("hero-live");
    var circle = stage.querySelector(".hero-circle");
    var base = stage.querySelector(".hero-type-base");
    var invert = stage.querySelector(".hero-type-invert");
    var zh = "你好，我是黄胜坚。";
    var en = "Hello, welcome.";

    function circleSize() {
      if (circle && circle.offsetWidth) return circle.offsetWidth;
      var raw = getComputedStyle(stage).getPropertyValue("--circle-size");
      var parsed = parseFloat(raw);
      return parsed > 0 ? parsed : 440;
    }

    function moveSpot(event) {
      if (!circle || !invert || !base) return;
      var rect = stage.getBoundingClientRect();
      var baseRect = base.getBoundingClientRect();
      var size = circleSize();
      var r = size / 2;
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;
      var left = x - r;
      var top = y - r;
      circle.style.transform = "translate3d(" + left + "px," + top + "px,0)";
      invert.style.transform = "translate3d(" + ((baseRect.left - rect.left) - left) + "px," + ((baseRect.top - rect.top) - top) + "px,0)";
      stage.classList.add("has-pointer");
      if (live) live.textContent = en;
    }

    function hideSpot() {
      stage.classList.remove("has-pointer");
      if (live) live.textContent = zh;
    }

    stage.addEventListener("pointermove", moveSpot);
    stage.addEventListener("pointerdown", moveSpot);
    stage.addEventListener("pointerenter", moveSpot);
    stage.addEventListener("mousemove", moveSpot);
    stage.addEventListener("mouseenter", moveSpot);
    stage.addEventListener("pointerleave", hideSpot);
    stage.addEventListener("pointercancel", hideSpot);
    stage.addEventListener("mouseleave", hideSpot);
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
