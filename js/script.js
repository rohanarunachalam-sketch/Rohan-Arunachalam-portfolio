(function () {
  "use strict";

  var config = window.PORTFOLIO || {};
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Bind config values into the page ---------- */
  function applyConfig() {
    document.querySelectorAll("[data-bind]").forEach(function (el) {
      var key = el.getAttribute("data-bind");
      if (!config[key]) return;
      if (el.tagName === "IMG") el.src = config[key];
      else el.textContent = config[key];
    });

    document.querySelectorAll("[data-link]").forEach(function (el) {
      var key = el.getAttribute("data-link");
      var value = config[key];
      if (!value) return;
      el.href = key === "email" ? "mailto:" + value : value;
    });

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Project cards ---------- */
  var visuals = {
    graph:
      '<div class="v v-graph" aria-hidden="true"><svg viewBox="0 0 300 150">' +
      '<line pathLength="1" style="--i:0" x1="150" y1="75" x2="70" y2="40"/><line pathLength="1" style="--i:1" x1="150" y1="75" x2="80" y2="115"/>' +
      '<line pathLength="1" style="--i:2" x1="150" y1="75" x2="230" y2="38"/><line pathLength="1" style="--i:3" x1="150" y1="75" x2="235" y2="112"/>' +
      '<line pathLength="1" style="--i:4" x1="70" y1="40" x2="80" y2="115"/><line pathLength="1" style="--i:5" x1="230" y1="38" x2="275" y2="80"/>' +
      '<line pathLength="1" style="--i:6" x1="235" y1="112" x2="275" y2="80"/>' +
      '<circle class="pulse" cx="150" cy="75" r="16"/>' +
      '<circle class="n-a" style="--i:0" cx="150" cy="75" r="16"/><circle style="--i:1" cx="70" cy="40" r="9"/><circle style="--i:2" cx="80" cy="115" r="9"/>' +
      '<circle style="--i:3" cx="230" cy="38" r="9"/><circle style="--i:4" cx="235" cy="112" r="9"/><circle style="--i:5" cx="275" cy="80" r="6"/>' +
      '<text x="150" y="78" text-anchor="middle">query</text><text x="70" y="25" text-anchor="middle">Entity</text>' +
      '<text x="80" y="138" text-anchor="middle">Chunk</text><text x="230" y="23" text-anchor="middle">Relation</text><text x="235" y="135" text-anchor="middle">Vector</text>' +
      "</svg></div>",

    dairy:
      '<div class="v v-dairy v-mono" aria-hidden="true"><div class="dash">' +
      '<div class="dash__panel" data-seq><span class="dash__h">Subscription</span>' +
      '<span class="dash__row">Milk <b>daily</b></span><span class="dash__row">Curd <b>add-on</b></span>' +
      '<span class="dash__row">Ghee <b>add-on</b></span><span class="dash__row">Eggs <b>add-on</b></span></div>' +
      '<div class="dash__panel"><span class="dash__h">Deliveries</span><div class="dash__cal" data-seq style="--step:45ms">' +
      '<i></i><i></i><i></i><i class="off"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i class="off"></i><i></i><i></i>' +
      '</div><span class="dash__row">Invoice <b>ready</b></span></div></div></div>',

    billing:
      '<div class="v v-dairy v-mono" aria-hidden="true"><div class="dash">' +
      '<div class="dash__panel" data-seq><span class="dash__h">INV-0042</span>' +
      '<span class="dash__row">Taxable <b>₹12,400</b></span><span class="dash__row">CGST 9% <b>₹1,116</b></span>' +
      '<span class="dash__row">SGST 9% <b>₹1,116</b></span><span class="dash__row">Total <b>₹14,632</b></span></div>' +
      '<div class="dash__panel" data-seq><span class="dash__h">Dashboard</span>' +
      '<span class="dash__row">Paid <b>18</b></span><span class="dash__row">Pending <b>4</b></span>' +
      '<span class="dash__row">Overdue <b>1</b></span><span class="dash__row">A4 PDF <b>ready</b></span></div></div></div>',

    flow: function (p) {
      var steps = (p.flow || []).map(function (step) {
        return '<span class="agent">' + escapeHtml(step).replace(/\n/g, "<br>") + "</span>";
      });
      return (
        '<div class="v v-agents v-mono" aria-hidden="true"><div class="flow" data-seq style="--step:120ms">' +
        steps.join('<span class="flow__arrow">→</span>') + "</div></div>"
      );
    },

    term: function (p) {
      var lines = (p.term || []).map(function (line) {
        if (line.indexOf("> ") === 0) return '<div><span class="p">&gt;</span> <span class="s">' + escapeHtml(line.slice(2)) + "</span></div>";
        if (line.indexOf("✓ ") === 0) return '<div class="ok">' + escapeHtml(line) + '<span class="caret"></span></div>';
        return "<div>" + escapeHtml(line) + "</div>";
      });
      return '<div class="v v-cad v-mono" aria-hidden="true"><div class="term" data-seq style="--step:380ms">' + lines.join("") + "</div></div>";
    },

    site:
      '<div class="v v-site v-mono" aria-hidden="true"><div class="site" data-seq style="--step:140ms">' +
      '<span class="site__nav">APEX <i></i><i></i><i></i></span>' +
      '<span class="site__kicker">AJMAN · UAE</span>' +
      '<b class="site__h">Engineering spaces built to perform.</b>' +
      '<span class="site__cards"><i>Structural</i><i>Architecture</i><i>Consultancy</i></span>' +
      "</div></div>"
  };

  // Card background per visual
  var gradients = {
    graph: "linear-gradient(140deg, #d9bf77, #ecdcae)",
    dairy: "linear-gradient(140deg, #639a67, #d8ebb5)",
    billing: "linear-gradient(140deg, #d8ebb5, #d9bf77)",
    flow: "linear-gradient(140deg, #d8ebb5, #f3f6ea)",
    term: "linear-gradient(140deg, #205d67, #639a67)",
    site: "linear-gradient(140deg, #d9bf77, #d8ebb5)"
  };

  function renderVisual(p) {
    var v = visuals[p.visual];
    return typeof v === "function" ? v(p) : v || "";
  }

  function linkPill(url, label, primary) {
    var icon = '<svg aria-hidden="true"><use href="#i-arrow-ne"/></svg>';
    if (!url) return '<span class="plink is-disabled" aria-disabled="true">' + label + " — soon</span>";
    return (
      '<a class="plink ' + (primary ? "plink--primary" : "plink--ghost") + '" href="' + escapeHtml(url) +
      '" target="_blank" rel="noopener">' + label + " " + icon + "</a>"
    );
  }

  function projectLinks(p) {
    return linkPill(p.github, "GitHub", false) + linkPill(p.demo, "Live demo", true);
  }

  function renderProjects() {
    var list = document.getElementById("project-list");
    var projects = config.projects || [];
    if (!list) return;

    // The featured project has its own showcase panel above the carousel.
    list.innerHTML = projects
      .filter(function (p) { return !p.featured; })
      .map(function (p) {
        return (
          '<article class="pcard">' +
          '<div class="pcard__visual" style="--g:' + (gradients[p.visual] || "var(--accent)") + '">' +
          '<div class="pcard__window"><div class="pcard__window-bar" aria-hidden="true"><i></i><i></i><i></i></div>' +
          '<div class="pcard__window-body">' + renderVisual(p) + "</div></div></div>" +
          '<div class="pcard__top"><h3 class="pcard__title">' + escapeHtml(p.title) + "</h3>" +
          (p.tag ? '<span class="pcard__tag">' + escapeHtml(p.tag) + "</span>" : "") + "</div>" +
          '<p class="pcard__desc">' + escapeHtml(p.description) + "</p>" +
          '<ul class="pcard__features">' +
          (p.features || []).map(function (f) { return "<li>" + escapeHtml(f) + "</li>"; }).join("") +
          "</ul>" +
          '<p class="pcard__stack">' + escapeHtml((p.tech || []).join(" · ")) + "</p>" +
          '<div class="project-links">' + projectLinks(p) + "</div>" +
          "</article>"
        );
      })
      .join("");

    document.querySelectorAll("[data-project-links]").forEach(function (el) {
      var p = projects[Number(el.getAttribute("data-project-links"))];
      if (p) el.innerHTML = projectLinks(p);
    });
  }

  /* ---------- Motion setup ---------- */

  // Hero name: wrap each word so it can rise out of a mask.
  function splitWords() {
    document.querySelectorAll("[data-split]").forEach(function (el) {
      var text = el.textContent.trim();
      el.setAttribute("aria-label", text);
      el.innerHTML = text
        .split(/\s+/)
        .map(function (w, i) {
          return '<span class="word" aria-hidden="true"><span style="--i:' + i + '">' + escapeHtml(w) + "</span></span>";
        })
        .join(" ");
    });
  }

  // Children of these containers appear one after another (index → --i).
  var STAGGER = ".about-cols, .skills, .ticks, .jobs, .focus, .services, .app__chat, .notepad__list, [data-seq]";
  function initStagger() {
    document.querySelectorAll(STAGGER).forEach(function (list) {
      if (!list.classList.contains("notepad__list")) list.classList.add("stagger");
      Array.prototype.forEach.call(list.children, function (child, i) {
        child.style.setProperty("--i", i);
      });
    });
  }

  // Big statement: words fill in as it scrolls through the viewport.
  function initScrub() {
    var el = document.querySelector("[data-scrub]");
    if (!el) return;
    var highlight = /^(AI|automation|engineering)$/i;
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = words
      .map(function (w) {
        var bare = w.replace(/[^\w]/g, "");
        return '<span class="w' + (highlight.test(bare) ? " hl" : "") + '" aria-hidden="true">' + escapeHtml(w) + "</span>";
      })
      .join(" ");
    var spans = el.querySelectorAll(".w");

    function update() {
      var vh = window.innerHeight;
      var r = el.getBoundingClientRect();
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.3);
      var n = reduceMotion ? spans.length : Math.round(Math.max(0, Math.min(1, p)) * spans.length);
      for (var i = 0; i < spans.length; i++) spans[i].classList.toggle("on", i < n);
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Tech band: duplicate the items so the loop is seamless.
  function initMarquee() {
    var track = document.querySelector(".marquee__track");
    if (track) track.innerHTML += track.innerHTML;
  }

  // Hero: slight photo parallax on desktop pointers.
  function initHeroPointer() {
    var hero = document.querySelector(".hero");
    if (!hero || reduceMotion || !finePointer) return;
    var frame = 0;
    hero.addEventListener("mousemove", function (e) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * -18).toFixed(2) + "px");
        hero.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * -12).toFixed(2) + "px");
        frame = 0;
      });
    });
    hero.addEventListener("mouseleave", function () {
      hero.style.setProperty("--px", "0px");
      hero.style.setProperty("--py", "0px");
    });
  }

  // Skill pills: random tilt, then draggable ("throw them around").
  function initPile() {
    var pills = document.querySelectorAll(".pile__inner span");
    var tilts = [-8, 6, -3, 12, -14, 4, -6, 18, -2, 9, -11, 3, 22, -5, 7, -16, 2, -9];
    pills.forEach(function (pill, i) {
      pill.style.setProperty("--r", tilts[i % tilts.length] + "deg");
      pill.style.setProperty("--i", i);

      var startX, startY, baseX = 0, baseY = 0;
      pill.addEventListener("pointerdown", function (e) {
        pill.setPointerCapture(e.pointerId);
        pill.classList.add("is-dragging");
        startX = e.clientX;
        startY = e.clientY;
      });
      pill.addEventListener("pointermove", function (e) {
        if (!pill.classList.contains("is-dragging")) return;
        pill.style.setProperty("--dx", baseX + e.clientX - startX + "px");
        pill.style.setProperty("--dy", baseY + e.clientY - startY + "px");
      });
      function drop(e) {
        if (!pill.classList.contains("is-dragging")) return;
        pill.classList.remove("is-dragging");
        baseX += e.clientX - startX;
        baseY += e.clientY - startY;
      }
      pill.addEventListener("pointerup", drop);
      pill.addEventListener("pointercancel", drop);
    });
  }

  // Project carousel arrows.
  function initCarousel() {
    var track = document.getElementById("project-list");
    var prev = document.getElementById("car-prev");
    var next = document.getElementById("car-next");
    if (!track || !prev || !next) return;

    function step() {
      var card = track.querySelector(".pcard");
      return card ? card.getBoundingClientRect().width + 24 : 400;
    }
    function update() {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step() }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step() }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-menu");
    var toTop = document.getElementById("to-top");
    var progress = document.getElementById("progress");

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1000 && nav.classList.contains("is-open")) setOpen(false);
    });

    var lastY = window.scrollY;
    function onScroll() {
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      nav.classList.toggle("is-scrolled", y > 60);
      // hide the nav while scrolling down, bring it back on any scroll up
      nav.classList.toggle("is-hidden", y > lastY && y > 400 && !nav.classList.contains("is-open"));
      toTop.classList.toggle("is-visible", y > 700);
      if (progress) progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    // Active section indicator
    var links = document.querySelectorAll(".nav__link");
    var sections = document.querySelectorAll("[data-nav]");

    function updateActive() {
      var marker = window.innerHeight * 0.35;
      var current = "home";
      sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= marker) current = s.getAttribute("data-nav");
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
      links.forEach(function (l) {
        var active = l.getAttribute("data-section") === current;
        l.classList.toggle("is-active", active);
        if (active) l.setAttribute("aria-current", "true");
        else l.removeAttribute("aria-current");
      });
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateActive();
        ticking = false;
      });
    }, { passive: true });
    updateActive();
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    // .in-view is permanent and drives titles, staggers, notepad ticks, pills and illustrations.
    var items = document.querySelectorAll(
      ".reveal, .section-head, .journey-wrap__text, .contact__info, .notepad, .pile, .showcase, .pcard, .stagger"
    );

    function finish(el) {
      el.classList.add("in-view");
      if (el.classList.contains("reveal")) {
        el.classList.add("is-visible");
        setTimeout(function () { el.classList.remove("reveal", "is-visible"); }, reduceMotion ? 0 : 1300);
      }
      if (el.classList.contains("stagger")) {
        // after the last child has arrived, hand transitions back to the cards' own hover effects
        var step = parseFloat(getComputedStyle(el).getPropertyValue("--step")) || 80;
        var total = reduceMotion ? 0 : 150 + el.children.length * step + 900;
        setTimeout(function () { el.classList.remove("stagger"); }, total);
      }
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(finish);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          finish(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contact form (frontend only) ---------- */
  function initForm() {
    var form = document.getElementById("contact-form");
    var success = document.getElementById("form-success");
    if (!form) return;

    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(field, msg) {
      var wrap = field.closest(".form__field");
      wrap.classList.toggle("has-error", !!msg);
      wrap.querySelector(".form__error").textContent = msg || "";
      if (msg) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;

      setError(name, name.value.trim() ? "" : "Please enter your name.");
      setError(email, emailRe.test(email.value.trim()) ? "" : "Please enter a valid email address.");
      setError(message, message.value.trim().length >= 10 ? "" : "Please write a message (at least 10 characters).");

      var firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) {
        firstInvalid.focus();
        success.hidden = true;
        return;
      }

      // No backend yet: hand the message to the visitor's email app.
      var subject = encodeURIComponent("Portfolio enquiry from " + name.value.trim());
      var body = encodeURIComponent(message.value.trim() + "\n\n— " + name.value.trim() + " (" + email.value.trim() + ")");
      var to = config.email || "";

      success.textContent =
        "Thank you, " + name.value.trim() +
        ". Your email app should open with the message ready to send. You can also reach me directly at " +
        to + ".";
      success.hidden = false;
      form.reset();

      if (to) window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });

    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid")) setError(e.target, "");
    });
  }

  /* ---------- Timon the meerkat: eyes and head follow the cursor ---------- */
  function initMeerkat() {
    var root = document.getElementById("meerkat");
    if (!root) return;
    var head = root.querySelector(".mk__head");
    var pupils = root.querySelectorAll(".mk__pupil");
    var btn = root.querySelector(".meerkat__btn");
    var bubble = document.getElementById("meerkat-bubble");
    var lines = [
      "Why are you disturbing my sleep? 😴",
      "Dei, I'm watching your mouse. Happy?",
      "Projects are up there. Go, scroll.",
      "Hire Rohan. Then let me sleep.",
      "Seri seri… I'm awake. Barely."
    ];
    var lineIndex = 0;
    var bubbleTimer;
    var target = null;
    var frame = 0;
    var idleTimer;

    function look(x, y) {
      var r = head.getBoundingClientRect();
      var dx = x - (r.left + r.width / 2);
      var dy = y - (r.top + r.height / 2);
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var reach = Math.min(dist / 60, 1) * 2;
      var px = (dx / dist) * reach;
      var py = (dy / dist) * reach;
      pupils.forEach(function (p) { p.style.transform = "translate(" + px + "px," + py + "px)"; });
      // scale to the viewport so the head turns just as far on a phone as on a desktop
      var tilt = Math.max(-14, Math.min(14, (dx / (window.innerWidth * 0.6)) * 14));
      var lift = Math.max(-3, Math.min(2, (dy / window.innerHeight) * 4));
      head.style.transform = "translate(" + tilt / 5 + "px," + lift + "px) rotate(" + tilt + "deg)";
    }

    function queue(x, y) {
      target = [x, y];
      if (!frame) frame = requestAnimationFrame(function () { frame = 0; look(target[0], target[1]); });
    }

    // With no cursor around, glance at a random spot every few seconds.
    function idle() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(function () {
        queue(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.7);
        idle();
      }, 3000 + Math.random() * 3000);
    }

    window.addEventListener("pointermove", function (e) { queue(e.clientX, e.clientY); idle(); }, { passive: true });
    window.addEventListener("pointerdown", function (e) { queue(e.clientX, e.clientY); idle(); }, { passive: true });
    // Phones cancel pointer events once a drag turns into a scroll; touch events keep reporting the finger.
    function onTouch(e) {
      var t = e.touches[0];
      if (!t) return;
      queue(t.clientX, t.clientY);
      idle();
    }
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    idle();

    (function blink() {
      setTimeout(function () {
        root.classList.add("is-blinking");
        setTimeout(function () { root.classList.remove("is-blinking"); blink(); }, 140);
      }, 2500 + Math.random() * 4000);
    })();

    btn.addEventListener("click", function () {
      bubble.textContent = lines[lineIndex];
      lineIndex = (lineIndex + 1) % lines.length;
      bubble.classList.add("is-visible");
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(function () { bubble.classList.remove("is-visible"); }, 3500);
    });
  }

  applyConfig();
  renderProjects();
  splitWords();
  initStagger();
  initScrub();
  initMarquee();
  initHeroPointer();
  initPile();
  initCarousel();
  initNav();
  initReveal();
  initForm();
  initMeerkat();
})();
