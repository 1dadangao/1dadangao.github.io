(function () {
  var stage = document.querySelector(".hero-stage");
  if (stage) {
    var live = document.getElementById("hero-live");
    var circle = stage.querySelector(".hero-circle");
    var base = stage.querySelector(".hero-type-base");
    var invert = stage.querySelector(".hero-type-invert");
    var zh = "你好，我是黄胜坚。";
    var en = "Hello, welcome.";
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* 拖曳强度：每帧向指针推进的比例。0.2 ≈ 100ms 上下的跟随延迟，
       快速划过时会带出一点拖尾，慢速移动时几乎察觉不到。 */
    var FOLLOW_EASE = 0.2;
    var SETTLE = 0.4;
    var FRAME = 16.7;

    var radius = 220;
    var baseX = 0;
    var baseY = 0;
    var pos = { x: 0, y: 0 };
    var target = { x: 0, y: 0 };
    var frameId = 0;
    var lastTime = 0;

    function measure() {
      var size = circle && circle.offsetWidth ? circle.offsetWidth : 440;
      radius = size / 2;
      if (!base) return;
      var stageRect = stage.getBoundingClientRect();
      var baseRect = base.getBoundingClientRect();
      baseX = baseRect.left - stageRect.left;
      baseY = baseRect.top - stageRect.top;
    }

    function render() {
      if (!circle || !invert) return;
      var left = pos.x - radius;
      var top = pos.y - radius;
      circle.style.transform = "translate3d(" + left + "px," + top + "px,0)";
      invert.style.transform =
        "translate3d(" + (baseX - left) + "px," + (baseY - top) + "px,0)";
    }

    function settle() {
      pos.x = target.x;
      pos.y = target.y;
      render();
      lastTime = 0;
    }

    function step(now) {
      frameId = 0;
      var elapsed = lastTime ? Math.min(now - lastTime, 64) : FRAME;
      lastTime = now;
      var ease = 1 - Math.pow(1 - FOLLOW_EASE, elapsed / FRAME);
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      if (
        Math.abs(target.x - pos.x) < SETTLE &&
        Math.abs(target.y - pos.y) < SETTLE
      ) {
        settle();
        return;
      }
      render();
      frameId = window.requestAnimationFrame(step);
    }

    function follow() {
      if (reduceMotion.matches) {
        settle();
        return;
      }
      if (frameId) return;
      lastTime = 0;
      frameId = window.requestAnimationFrame(step);
    }

    function point(event) {
      var rect = stage.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
    }

    function enterSpot(event) {
      if (!circle || !invert || !base) return;
      measure();
      point(event);
      pos.x = target.x;
      pos.y = target.y;
      render();
      stage.classList.add("has-pointer");
      if (live) live.textContent = en;
    }

    function moveSpot(event) {
      if (!stage.classList.contains("has-pointer")) {
        enterSpot(event);
        return;
      }
      point(event);
      follow();
    }

    function hideSpot() {
      stage.classList.remove("has-pointer");
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      lastTime = 0;
      if (live) live.textContent = zh;
    }

    function remeasure() {
      measure();
      if (stage.classList.contains("has-pointer")) render();
    }

    stage.addEventListener("pointerenter", enterSpot);
    stage.addEventListener("pointerdown", moveSpot);
    stage.addEventListener("pointermove", moveSpot);
    stage.addEventListener("pointerleave", hideSpot);
    stage.addEventListener("pointercancel", hideSpot);
    window.addEventListener("resize", remeasure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(remeasure);
    }
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
