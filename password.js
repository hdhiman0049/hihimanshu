// Password Protection for Projects
(function() {
  // Project links - just paste your URLs here directly
  var _k = "https://www.figma.com/proto/mw4MkQ4JdEIgiUOlm3g3J6/Portfolio--Projects?node-id=220-5987&amp%3Bviewport=-4964%2C4170%2C0.22&amp%3Bt=OyMTWp9g9ru8NubO-1&amp%3Bscaling=scale-down-width&amp%3Bcontent-scaling=fixed&amp%3Bstarting-point-node-id=220%3A5987&amp%3Bpage-id=67%3A1940&scaling=scale-down-width&content-scaling=fixed&t=iMymTVjmxds3Q3pl-1";
  var _r = "https://www.figma.com/proto/mw4MkQ4JdEIgiUOlm3g3J6/Portfolio--Projects?node-id=293-4446&viewport=-4964%2C4170%2C0.22&t=k4PcVZcLY5eu4UUF-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=293%3A4446&page-id=67%3A1940";

  // Password (char codes)
  var _h = [104,105,109,97,110,115,104,117,49,52,49];
  var _p = _h.map(function(c){ return String.fromCharCode(c) }).join("");

  var currentKey = "";
  var overlay, input, errMsg;

  // Wait for DOM
  function init() {
    overlay = document.getElementById("password-overlay");
    input = document.getElementById("password-input");
    errMsg = document.getElementById("password-error");

    // MutationObserver: strip any href Framer tries to re-inject
    var observer = new MutationObserver(function() {
      var links = document.querySelectorAll('a[data-framer-name="kisan"], a[data-framer-name="ration plus"]');
      links.forEach(function(el) {
        var href = el.getAttribute("href");
        if (href && href !== "javascript:void(0)") {
          el.setAttribute("href", "javascript:void(0)");
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, subtree: true, childList: true });

    // Also strip immediately
    setInterval(function() {
      var links = document.querySelectorAll('a[data-framer-name="kisan"], a[data-framer-name="ration plus"]');
      links.forEach(function(el) {
        var href = el.getAttribute("href");
        if (href && href !== "javascript:void(0)") {
          el.setAttribute("href", "javascript:void(0)");
        }
      });
    }, 500);

    document.getElementById("password-submit").addEventListener("click", checkPass);
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") checkPass();
    });
    document.getElementById("password-close").addEventListener("click", function() {
      overlay.classList.remove("active"); currentKey = "";
    });
    overlay.addEventListener("click", function(e) {
      if (e.target === overlay) { overlay.classList.remove("active"); currentKey = ""; }
    });
  }

  // Capture click BEFORE Framer can handle it
  document.addEventListener("click", function(e) {
    var link = e.target.closest('a[data-framer-name="kisan"], a[data-framer-name="ration plus"]');
    if (link) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (!overlay) init();

      var name = link.getAttribute("data-framer-name");
      currentKey = (name === "kisan") ? _k : _r;
      overlay.classList.add("active");
      input.value = "";
      input.classList.remove("error");
      errMsg.style.display = "none";
      setTimeout(function(){ input.focus(); }, 100);
      return false;
    }
  }, true);

  function checkPass() {
    if (input.value === _p) {
      overlay.classList.remove("active");
      try { window.open(currentKey, "_blank"); } catch(e) {}
      currentKey = "";
    } else {
      input.classList.add("error");
      errMsg.style.display = "block";
      setTimeout(function(){ input.classList.remove("error"); }, 400);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
