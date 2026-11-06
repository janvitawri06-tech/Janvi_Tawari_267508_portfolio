(function() {
  var RM = matchMedia("(prefers-reduced-motion:reduce)").matches,
      root = document.documentElement;

  try {
    var t = localStorage.getItem("jt2-theme");
    if (t) root.setAttribute("data-theme", t);
  } catch (e) {}

  document.getElementById("theme").onclick = function() {
    var d = root.getAttribute("data-theme") === "dark" || 
            (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme:dark)").matches),
        n = d ? "light" : "dark";
    root.setAttribute("data-theme", n);
    try {
      localStorage.setItem("jt2-theme", n);
    } catch (e) {}
  };

  var mb = document.getElementById("menu"),
      ln = document.getElementById("links");

  function cm() {
    ln.classList.remove("open");
    mb.setAttribute("aria-expanded", "false");
  }

  mb.onclick = function() {
    var o = ln.classList.toggle("open");
    mb.setAttribute("aria-expanded", o ? "true" : "false");
  };

  ln.addEventListener("click", function(e) {
    if (e.target.tagName === "A") cm();
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") cm();
  });

  var ts = document.getElementById("toast"), tt;
  function toast(m) {
    ts.textContent = m;
    ts.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(function() {
      ts.classList.remove("show");
    }, 2200);
  }

  document.getElementById("copy").onclick = function() {
    var em = "janvitawri06@gmail.com";
    function fb() {
      var a = document.createElement("textarea");
      a.value = em;
      a.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(a);
      a.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {}
      document.body.removeChild(a);
      toast(ok ? "Email copied ✓" : em);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(em).then(function() {
        toast("Email copied ✓");
      }, fb);
    } else fb();
  };

  var tb = document.getElementById("top");
  tb.onclick = function() {
    scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" });
  };

  document.querySelectorAll(".btn").forEach(function(b) {
    b.addEventListener("pointerdown", function(e) {
      if (RM) return;
      var r = b.getBoundingClientRect(),
          s = Math.max(r.width, r.height),
          d = document.createElement("span");
      d.className = "rip";
      d.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + (e.clientX - r.left - s / 2) + "px;top:" + (e.clientY - r.top - s / 2) + "px";
      b.appendChild(d);
      setTimeout(function() {
        d.remove();
      }, 600);
    });
  });

  // Calendar sequence
  var tiles = document.querySelectorAll(".tile"),
      sc = document.getElementById("sched");
  tiles.forEach(function(el, i) {
    setTimeout(function() {
      el.classList.add("in");
    }, RM ? 0 : 900 + i * 380);
  });
  setTimeout(function() {
    sc.classList.add("in");
  }, RM ? 0 : 900 + tiles.length * 380 + 200);

  // Reveal + counters
  var io = new IntersectionObserver(function(es) {
    es.forEach(function(e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-n]").forEach(function(el) {
        var n = +el.dataset.n,
            k = 0,
            id = setInterval(function() {
              k++;
              el.textContent = k;
              if (k >= n) clearInterval(id);
            }, 260);
      });
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".rv").forEach(function(el) {
    io.observe(el);
  });

  // Scroll tracking
  var bar = document.getElementById("bar"),
      secs = [].slice.call(document.querySelectorAll("main section[id]")),
      lk = [].slice.call(document.querySelectorAll(".links a"));

  function sc2() {
    var h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
    tb.classList.toggle("show", scrollY > 700);
    var cur = "";
    secs.forEach(function(s) {
      if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = s.id;
    });
    lk.forEach(function(a) {
      a.classList.toggle("on", a.getAttribute("href") === "#" + cur);
    });
  }

  addEventListener("scroll", sc2, { passive: true });
  sc2();
})();