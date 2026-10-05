/* ===== Love Wedding Card — legacy.js (static app.js bundled for React) ===== */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Bridge: the legacy IIFE below expects window.gsap / window.ScrollTrigger
// (originally loaded via CDN). We provide them from the npm bundle instead.
try {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
} catch (_) {}
window.gsap = window.gsap || gsap;
window.ScrollTrigger = window.ScrollTrigger || ScrollTrigger;

(function () {
  "use strict";

  /* ---------- GSAP + ScrollTrigger + Flip setup (defensive) ---------- */
  var hasGsap = typeof window.gsap !== "undefined";
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";
  var hasFlip = hasGsap && typeof window.Flip !== "undefined";
  if (hasGsap) {
    try {
      var _plugins = [];
      if (hasST) _plugins.push(window.ScrollTrigger);
      if (hasFlip) _plugins.push(window.Flip);
      if (_plugins.length) window.gsap.registerPlugin.apply(window.gsap, _plugins);
    } catch (_) {
      hasST = false;
      hasFlip = false;
    }
  }
  if (hasST) {
    // chống giật khi thanh địa chỉ mobile co giãn
    try {
      window.ScrollTrigger.config({ ignoreMobileResize: true });
    } catch (_) {}
  }

  /* Lightbox opener — assigned by initLightbox() */
  var openLightbox = null;

  const CONFIG = {
    couple: { groom: "Đức Hùng", bride: "Phương Thảo" },
    weddingDate: new Date("2026-10-20T10:00:00+07:00"),
    askDate: new Date("2026-10-19T08:00:00+07:00"),
    likeDefault: 14,
    autoScrollSpeed: 42, // px per second (gentle story pace)
    autoScrollIdleMs: 5000, // resume after 5s without user scroll
  };

  const seedWishes = [
    { name: "Nguyễn Nhật Minh", message: "Trăm năm hạnh phúc nhé!", ts: Date.now() - 1000 * 60 * 12 },
    { name: "Thu Hà", message: "Chúc hai bạn mãi hạnh phúc bên nhau ❤️", ts: Date.now() - 1000 * 60 * 40 },
    { name: "Minh Anh", message: "Chúc mừng hạnh phúc! Yêu thương thật nhiều nha.", ts: Date.now() - 1000 * 60 * 90 },
    { name: "Gia đình nhà trai", message: "Chúc con hạnh phúc, trăm năm hòa hợp!", ts: Date.now() - 1000 * 60 * 120 },
    { name: "Linh & Vũ", message: "Happy wedding! Hẹn gặp ở tiệc cưới nhé 🥂", ts: Date.now() - 1000 * 60 * 180 },
    { name: "Cô Hồng", message: "Chúc hai cháu đầu bạc răng long.", ts: Date.now() - 1000 * 60 * 240 },
  ];

  /* ---------- Guest name ---------- */
  function decodeName(raw) {
    if (!raw) return "";
    try {
      return decodeURIComponent(raw).replace(/\+/g, " ").trim();
    } catch {
      return String(raw).trim();
    }
  }

  function getGuestFromURL() {
    const url = new URL(window.location.href);
    const q =
      url.searchParams.get("guest") ||
      url.searchParams.get("ten") ||
      url.searchParams.get("name") ||
      url.searchParams.get("k") ||
      url.searchParams.get("invite");
    if (q) return decodeName(q);

    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      if (hash.includes("=")) {
        const hp = new URLSearchParams(hash);
        const hv = hp.get("guest") || hp.get("ten") || hp.get("name");
        if (hv) return decodeName(hv);
      }
      return decodeName(hash);
    }

    const path = window.location.pathname.replace(/\/+$/, "");
    const parts = path.split("/").filter(Boolean);
    const skip = new Set(["index.html", "MyWeddingCard", "wedding", "invite", "thiep", "thiep-cuoi"]);
    const last = parts[parts.length - 1];
    if (last && !skip.has(last) && !last.includes(".")) return decodeName(last);
    return "";
  }

  function applyGuest(name) {
    const display = name || "Quý khách";
    const coverGuest = document.getElementById("coverGuest");
    if (coverGuest) coverGuest.textContent = display;
    document.title = name
      ? `Thiệp cưới gửi ${name} — Đức Hùng & Phương Thảo`
      : "Thiệp Cưới Đức Hùng & Phương Thảo";

    if (name) {
      seedWishes.unshift({
        name: `${CONFIG.couple.groom} & ${CONFIG.couple.bride}`,
        message: `Rất mong ${name} sẽ đến chung vui cùng chúng mình!`,
        ts: Date.now(),
      });
    }
  }

  /* ---------- Cover petals ---------- */
  function initPetals() {
    const canvas = document.getElementById("coverPetals");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, petals;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function spawn() {
      petals = Array.from({ length: 22 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 4 + 2,
        vy: Math.random() * 0.45 + 0.15,
        vx: (Math.random() - 0.5) * 0.35,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.02,
        a: Math.random() * 0.35 + 0.12,
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > h + 12) {
          p.y = -12;
          p.x = Math.random() * w;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.6, p.r, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 250, 235, ${p.a})`;
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(frame);
    }

    resize();
    spawn();
    window.addEventListener("resize", () => {
      resize();
      spawn();
    });
    frame();
  }

  /* ---------- Bento Gallery (GSAP Flip + ScrollTrigger scrub, like GreenSock demo) ---------- */
  function initBento() {
    const wrap = document.querySelector(".bento-wrap");
    const bento = document.getElementById("photoBento");
    if (!wrap || !bento || bento.dataset.inited) return;
    bento.dataset.inited = "1";

    const items = Array.from(bento.querySelectorAll(".bento-item"));
    const caps = bento.querySelectorAll(".bento-item figcaption");
    if (!items.length) return;

    // click item => shared lightbox
    items.forEach((it, i) => {
      it.addEventListener("click", () => {
        if (typeof openLightbox === "function") openLightbox(i);
      });
    });

    // Without Flip/ScrollTrigger, the static mosaic grid is already pretty
    if (!hasGsap || !hasST || !hasFlip) return;

    let flipCtx = null;

    const createTween = () => {
      if (flipCtx) flipCtx.revert();
      bento.classList.remove("bento--final");

      flipCtx = window.gsap.context(() => {
        // Capture the final (single-column) state, then revert to bento mosaic
        bento.classList.add("bento--final");
        const state = window.Flip.getState(items);
        bento.classList.remove("bento--final");

        const flip = window.Flip.to(state, {
          simple: true,
          ease: "expoScale(1, 5)",
        });

        const tl = window.gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.add(flip, 0);
        // captions fade in as items expand
        if (caps.length) {
          tl.to(
            caps,
            { opacity: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power2.out" },
            0.12
          );
        }

        return () => window.gsap.set(items, { clearProps: "all" });
      });
    };

    createTween();

    // Rebuild on resize (debounced)
    let rto = null;
    window.addEventListener("resize", () => {
      if (rto) clearTimeout(rto);
      rto = setTimeout(createTween, 300);
    });
  }

  /* ---------- Envelope stamp FX (WOW) ---------- */
  function initEnvelopeFx() {
    const card = document.querySelector(".envelope-card");
    if (!card || !hasGsap || !hasST) return;
    const seal = card.querySelector(".wax-seal");
    const tl = window.gsap.timeline({
      scrollTrigger: { trigger: card, start: "top 85%", once: true },
    });
    tl.fromTo(
      card,
      { y: 60, rotation: -8, opacity: 0 },
      { y: 0, rotation: -3, opacity: 1, duration: 1, ease: "power3.out" }
    );
    if (seal) {
      tl.fromTo(
        seal,
        { scale: 1.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)" },
        "-=0.35"
      );
    }
  }

  /* ---------- ClickSpark (vanilla port): gold sparks burst from tap point ---------- */
  function initClickSpark() {
    const btn = document.getElementById("btnLike");
    if (!btn || btn.dataset.sparked) return;
    btn.dataset.sparked = "1";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const c = document.createElement("canvas");
    c.className = "spark-canvas";
    c.setAttribute("aria-hidden", "true");
    btn.appendChild(c);
    const ctx = c.getContext("2d");

    let dpr = 1;
    let raf = 0;
    const COLORS = ["#e8d48b", "#f6e7b2", "#b3985a", "#fff6d8"];
    function fit() {
      const r = btn.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.round(r.width * 3 * dpr));
      c.height = Math.max(1, Math.round(r.height * 3 * dpr));
    }
    fit();
    window.addEventListener("resize", fit);

    function burst(sx, sy, bw, bh) {
      // (sx,sy): click point relative to button top-left, in CSS px.
      // canvas covers 3x the button, centered.
      const parts = [];
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 2 + Math.random() * 3.2;
        parts.push({
          x: (sx + bw) * dpr,
          y: (sy + bh) * dpr,
          vx: Math.cos(a) * sp * dpr,
          vy: Math.sin(a) * sp * dpr,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          size: (1.5 + Math.random() * 2.2) * dpr,
          color: COLORS[(Math.random() * COLORS.length) | 0],
        });
      }
      const t0 = performance.now();
      cancelAnimationFrame(raf);
      (function tick(t) {
        ctx.clearRect(0, 0, c.width, c.height);
        let alive = false;
        for (const p of parts) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.life -= p.decay;
          if (p.life <= 0) continue;
          alive = true;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.1, p.size * p.life), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (alive && t - t0 < 900) {
          raf = requestAnimationFrame(tick);
        } else {
          ctx.clearRect(0, 0, c.width, c.height);
        }
      })(t0);
    }

    btn.addEventListener("click", (e) => {
      const r = btn.getBoundingClientRect();
      burst(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    });
  }

  /* ---------- SpotlightCard (vanilla port): cursor-following glow ---------- */
  function initSpotlight() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll(".spot").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", e.clientX - r.left + "px");
        el.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---------- TiltedCard (vanilla port): 3D tilt on polaroid photos ---------- */
  function initTilt() {
    if (!window.matchMedia("(pointer: fine)").matches || !hasGsap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".polaroid").forEach((fig) => {
      const img = fig.querySelector("img");
      if (!img || fig.dataset.tilted) return;
      fig.dataset.tilted = "1";
      // tilt the inner img so it never fights the figure's own GSAP rotation
      fig.addEventListener("mousemove", (e) => {
        const r = fig.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        window.gsap.to(img, {
          rotationY: px * 14,
          rotationX: -py * 14,
          transformPerspective: 600,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      fig.addEventListener("mouseleave", () => {
        window.gsap.to(img, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    const lb = document.getElementById("lightbox");
    if (!lb) return;
    const frame = lb.querySelector(".lb-frame");
    const img = lb.querySelector(".lb-img");
    const cap = lb.querySelector(".lb-cap");
    const counter = lb.querySelector(".lb-counter");
    const btnClose = lb.querySelector(".lb-close");
    const btnPrev = lb.querySelector(".lb-prev");
    const btnNext = lb.querySelector(".lb-next");
    const slides = Array.from(document.querySelectorAll("#photoBento .bento-item"));
    if (!slides.length) return;

    let idx = 0;
    let opened = false;

    function render() {
      const s = slides[idx];
      if (!s) return;
      const sImg = s.querySelector("img");
      const sCap = s.querySelector("figcaption");
      if (img && sImg) {
        img.src = sImg.getAttribute("src");
        img.alt = sImg.getAttribute("alt") || "";
      }
      if (cap) cap.textContent = sCap ? sCap.textContent.trim() : "";
      if (counter) counter.textContent = `${idx + 1} / ${slides.length}`;
    }

    function open(i) {
      idx = ((i % slides.length) + slides.length) % slides.length;
      render();
      opened = true;
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("lb-open");
      document.dispatchEvent(new CustomEvent("lightbox:open"));
      if (hasGsap) {
        window.gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.out" });
        if (frame) {
          window.gsap.fromTo(
            frame,
            { scale: 0.92, y: 16 },
            { scale: 1, y: 0, duration: 0.45, ease: "power3.out" }
          );
        }
      }
    }

    function close() {
      if (!opened) return;
      const done = () => {
        lb.classList.remove("open");
        lb.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lb-open");
        opened = false;
        document.dispatchEvent(new CustomEvent("lightbox:close"));
      };
      if (hasGsap) {
        window.gsap.to(lb, {
          opacity: 0,
          duration: 0.25,
          ease: "power1.in",
          onComplete: () => {
            window.gsap.set(lb, { clearProps: "opacity" });
            done();
          },
        });
      } else {
        done();
      }
    }

    function step(d) {
      idx = (idx + d + slides.length) % slides.length;
      if (hasGsap && img) {
        window.gsap.to(img, {
          opacity: 0,
          x: -22 * d,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            render();
            window.gsap.fromTo(
              img,
              { opacity: 0, x: 22 * d },
              { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }
            );
          },
        });
      } else {
        render();
      }
    }

    openLightbox = open;

    if (btnClose) btnClose.addEventListener("click", close);
    if (btnPrev)
      btnPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        step(-1);
      });
    if (btnNext)
      btnNext.addEventListener("click", (e) => {
        e.stopPropagation();
        step(1);
      });
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!opened) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------- Hero entrance + parallax ---------- */
  function initHeroAnim() {
    if (!hasGsap) return;
    const heroNames = document.querySelector(".hero-names[data-split]");
    const heroContent = document.querySelector(".hero-content");

    // split text nodes into per-character spans (keep .amp element as-is)
    if (heroNames && !heroNames.dataset.splitDone) {
      heroNames.dataset.splitDone = "1";
      Array.from(heroNames.childNodes).forEach((node) => {
        if (node.nodeType !== 3) return;
        const frag = document.createDocumentFragment();
        Array.from(node.textContent).forEach((ch) => {
          if (ch.trim() === "") {
            frag.appendChild(document.createTextNode(" "));
          } else {
            const s = document.createElement("span");
            s.className = "char";
            s.textContent = ch;
            frag.appendChild(s);
          }
        });
        heroNames.replaceChild(frag, node);
      });
    }

    const chars = heroNames ? heroNames.querySelectorAll(".char") : [];
    const amp = heroNames ? heroNames.querySelector(".amp") : null;
    const kicker = heroContent ? heroContent.querySelector(".hero-kicker") : null;
    const date = heroContent ? heroContent.querySelector(".hero-date") : null;

    const tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });
    if (kicker) tl.from(kicker, { y: 24, opacity: 0, duration: 0.7 }, 0.05);
    if (chars.length)
      tl.from(
        chars,
        { y: 40, opacity: 0, rotateX: -55, transformPerspective: 500, duration: 0.75, stagger: 0.04 },
        0.15
      );
    if (amp) tl.from(amp, { scale: 0, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, 0.55);
    if (date) tl.from(date, { y: 18, opacity: 0, duration: 0.6 }, 0.9);

    // parallax on scroll (disable CSS heroZoom to avoid transform conflicts)
    if (hasST) {
      const heroImg = document.querySelector(".hero-media img");
      if (heroImg) {
        heroImg.style.animation = "none";
        window.gsap.fromTo(
          heroImg,
          { yPercent: -10, scale: 1.12 },
          {
            yPercent: 14,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 },
          }
        );
      }
      if (heroContent) {
        window.gsap.to(heroContent, {
          yPercent: -14,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 },
        });
      }
    }
  }

  /* ---------- Wedding-day timeline animation ---------- */
  /* ---------- Hero floating hearts (GSAP yoyo) ---------- */
  function initHeroHearts() {
    if (!hasGsap) return;
    var hearts = document.querySelectorAll(".float-heart");
    if (!hearts.length) return;
    hearts.forEach(function (h, i) {
      try {
        window.gsap.to(h, {
          y: -14 - i * 4,
          rotation: i % 2 ? 10 : -10,
          opacity: 0.85,
          duration: 2.4 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.6,
        });
      } catch (_) {}
    });
  }

  function initTimelineAnim() {
    if (!hasST) return;
    const line = document.querySelector(".day-line");
    if (line) {
      window.gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { trigger: ".day-timeline", start: "top 82%", end: "bottom 55%", scrub: 0.6 },
        }
      );
    }
    window.gsap.utils.toArray(".day-item").forEach((item) => {
      const left = item.querySelector(".day-side.left");
      const right = item.querySelector(".day-side.right");
      const conn = item.querySelector(".day-connector");
      const tl = window.gsap.timeline({
        scrollTrigger: { trigger: item, start: "top 86%", once: true },
      });
      if (left) tl.from(left, { x: -48, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (right) tl.from(right, { x: 48, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (conn) tl.from(conn, { opacity: 0, scale: 0.5, duration: 0.5, ease: "back.out(1.8)" }, 0.15);
    });
    // icon float nhẹ (yoyo)
    try {
      window.gsap.utils.toArray(".day-icon").forEach(function (ic, i) {
        window.gsap.to(ic, {
          y: -5,
          duration: 1.8 + (i % 3) * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.35,
        });
      });
    } catch (_) {}
  }

  /* ---------- Polaroid hover + scroll-in stagger ---------- */
  function initPolaroids() {
    if (!hasGsap) return;
    const polas = window.gsap.utils.toArray(".polaroid");
    if (!polas.length) return;
    document.documentElement.classList.add("gsap-pola");

    const baseRot = (p) =>
      p.classList.contains("tilt-r") ? 2.5 : p.classList.contains("tilt-l2") ? -1.5 : -3;

    polas.forEach((p) => {
      const r = baseRot(p);
      window.gsap.set(p, { rotation: r });
      p.addEventListener("mouseenter", () => {
        window.gsap.to(p, {
          rotation: 0,
          y: -10,
          scale: 1.06,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      p.addEventListener("mouseleave", () => {
        window.gsap.to(p, {
          rotation: r,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    });

    // scroll into view with stagger
    if (hasST) {
      window.gsap.set(polas, { y: 46, opacity: 0 });
      window.ScrollTrigger.batch(polas, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          window.gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    }
  }


  /* ---------- Cover float FX (WOW) ---------- */
  function initCoverFx() {
    if (!hasGsap) return;
    const frame = document.querySelector(".cover-frame");
    if (!frame) return;
    window.gsap.to(frame, { y: -6, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
  }

  /* ---------- Open cover ---------- */
  function initOpen() {
    const cover = document.getElementById("cover");
    const shell = document.getElementById("cardShell");
    const btn = document.getElementById("btnOpen");
    const bottomBar = document.getElementById("bottomBar");
    if (!cover || !shell || !btn) return;

    document.body.classList.add("is-opening");
    let opened = false;

    const finishOpen = () => {
      if (opened) return;
      opened = true;
      cover.classList.add("hidden");
      shell.hidden = false;
      // force reflow then animate in
      void shell.offsetWidth;
      shell.classList.add("opened");
      document.body.classList.remove("is-opening");
      document.body.classList.add("is-opened");
      if (bottomBar) bottomBar.classList.add("show");

      // start effects after open
      setTimeout(() => {
        initReveal();
        initHeroAnim();
        initHeroHearts();
        initBento();
        initTimelineAnim();
        initPolaroids();
        initEnvelopeFx();
        // initClickSpark(); // disabled: using ReactBits ClickSpark component instead
        initSpotlight();
        initTilt();
        autoScroll.start();
        startWishFloat();
        if (hasST) {
          try {
            window.ScrollTrigger.refresh();
          } catch (_) {}
        }
      }, 200);

      // kick first reveal for above-the-fold (fallback path only)
      if (!hasST) {
        setTimeout(() => {
          document.querySelectorAll(".reveal").forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < window.innerHeight * 0.9) el.classList.add("visible");
          });
        }, 250);
      }
    };

    const open = () => {
      if (opened) return;
      if (hasGsap) {
        // GSAP-driven exit: stagger cover content out, then scale/fade the cover
        window.gsap.killTweensOf(".cover-frame");
        cover.style.transition = "none";
        const kids = cover.querySelectorAll(".cover-inner > *");
        const tl = window.gsap.timeline({ onComplete: finishOpen });
        tl.to(kids, { y: -22, opacity: 0, duration: 0.4, stagger: 0.055, ease: "power2.in" }).to(
          cover,
          { opacity: 0, scale: 1.07, duration: 0.65, ease: "power2.inOut" },
          "-=0.12"
        );
        // safety: never trap the user on the cover
        setTimeout(finishOpen, 2500);
      } else {
        finishOpen();
      }
    };

    btn.addEventListener("click", open);
    // also allow Enter/Space already native for button
  }

  /* ---------- Auto-scroll engine ----------
     - Gentle continuous scroll while idle
     - User wheel/touch/keyboard scroll => pause
     - No user scroll for 5s => resume
     - Stop completely near bottom
  */
  const autoScroll = {
    active: false,
    paused: false,
    raf: 0,
    lastTs: 0,
    lastUserScroll: 0,
    idleTimer: 0,
    started: false,
    programmaticUntil: 0,

    start() {
      if (this.started) return;
      this.started = true;
      this.active = true;
      this.paused = false;
      this.lastTs = 0;
      this.lastUserScroll = 0;

      // Real user gestures always pause (never filtered by programmaticUntil)
      const onUserGesture = () => this.pause(true);
      window.addEventListener("wheel", onUserGesture, { passive: true });
      window.addEventListener("touchstart", onUserGesture, { passive: true });
      window.addEventListener("touchmove", onUserGesture, { passive: true });
      window.addEventListener("mousedown", onUserGesture, { passive: true });
      window.addEventListener("keydown", (e) => {
        if (
          ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Spacebar"].includes(e.key)
        ) {
          this.pause(true);
        }
      });

      this.raf = requestAnimationFrame(this.tick.bind(this));
    },

    pause(force) {
      // Ignore synthetic scroll noise unless this is a real gesture
      if (!force && performance.now() < this.programmaticUntil) return;
      this.paused = true;
      this.lastUserScroll = performance.now();
      if (this.idleTimer) clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        if (performance.now() - this.lastUserScroll >= CONFIG.autoScrollIdleMs - 50) {
          this.paused = false;
          this.lastTs = 0;
        }
      }, CONFIG.autoScrollIdleMs);
    },

    tick(ts) {
      if (!this.active) return;

      if (!this.paused) {
        if (!this.lastTs) this.lastTs = ts;
        const dt = Math.min(64, ts - this.lastTs) / 1000;
        this.lastTs = ts;

        const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight - 8);
        const y = window.scrollY || window.pageYOffset || 0;

        if (y >= max) {
          this.paused = true;
          this.lastUserScroll = performance.now();
          if (this.idleTimer) clearTimeout(this.idleTimer);
          this.idleTimer = setTimeout(() => {
            if (window.scrollY < max - 20) {
              this.paused = false;
              this.lastTs = 0;
            }
          }, CONFIG.autoScrollIdleMs);
        } else {
          this.programmaticUntil = performance.now() + 80;
          window.scrollTo(0, y + CONFIG.autoScrollSpeed * dt);
        }
      } else {
        this.lastTs = 0;
      }

      this.raf = requestAnimationFrame(this.tick.bind(this));
    },
  };

  /* ---------- Countdown ---------- */
  function pad(n) {
    return String(Math.max(0, n)).padStart(2, "0");
  }

  function tickCountdown() {
    const target = CONFIG.weddingDate.getTime();
    let diff = target - Date.now();
    const caption = document.querySelector(".countdown-cap");

    if (diff <= 0) {
      ["cdDays", "cdHours", "cdMins", "cdSecs"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "00";
      });
      if (caption) caption.textContent = "Hôm nay là ngày hạnh phúc của chúng mình!";
      return;
    }

    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000);
    diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (!el) return;
      const v = pad(val);
      if (el.textContent !== v) {
        el.textContent = v;
        if (hasGsap) {
          window.gsap.fromTo(el, { scale: 1.22 }, { scale: 1, duration: 0.45, ease: "back.out(2)" });
          const cell = el.closest(".cd-cell");
          if (cell) {
            window.gsap.fromTo(
              cell,
              { boxShadow: "0 0 0px rgba(232,212,139,0)" },
              { boxShadow: "0 0 22px rgba(232,212,139,0.55)", duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }
            );
          }
        }
      }
    };
    set("cdDays", days);
    set("cdHours", hours);
    set("cdMins", mins);
    set("cdSecs", secs);
  }

  /* ---------- Calendar ---------- */
  let calYear = 2026;
  let calMonth = 9;

  function renderCalendar() {
    const grid = document.getElementById("calGrid");
    const title = document.getElementById("calTitle");
    if (!grid) return;

    const monthNames = [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
    ];
    if (title) title.textContent = `${monthNames[calMonth]}, ${calYear}`;

    const dows = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    let html = dows.map((d) => `<div class="cal-dow">${d}</div>`).join("");

    const first = new Date(calYear, calMonth, 1);
    const startDow = first.getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const prevDays = new Date(calYear, calMonth, 0).getDate();

    for (let i = 0; i < startDow; i++) {
      html += `<div class="cal-day muted"><span>${prevDays - startDow + 1 + i}</span></div>`;
    }

    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
      const isWedding =
        calYear === CONFIG.weddingDate.getFullYear() &&
        calMonth === CONFIG.weddingDate.getMonth() &&
        d === CONFIG.weddingDate.getDate();
      const isAsk =
        calYear === CONFIG.askDate.getFullYear() &&
        calMonth === CONFIG.askDate.getMonth() &&
        d === CONFIG.askDate.getDate();
      const isToday =
        today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === d;

      const cls = ["cal-day"];
      if (isWedding) cls.push("wedding");
      else if (isToday || isAsk) cls.push("today");

      html += `<div class="${cls.join(" ")}"><span>${d}</span></div>`;
    }

    const trailing = (7 - ((startDow + daysInMonth) % 7)) % 7;
    for (let i = 1; i <= trailing; i++) {
      html += `<div class="cal-day muted"><span>${i}</span></div>`;
    }

    grid.innerHTML = html;
  }

  function initCalendarNav() {
    const prev = document.getElementById("calPrev");
    const next = document.getElementById("calNext");
    if (prev) {
      prev.addEventListener("click", () => {
        calMonth--;
        if (calMonth < 0) {
          calMonth = 11;
          calYear--;
        }
        renderCalendar();
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        calMonth++;
        if (calMonth > 11) {
          calMonth = 0;
          calYear++;
        }
        renderCalendar();
      });
    }
  }

  /* ---------- Wishes ---------- */
  const wishStore = {
    list: [],
    load() {
      try {
        const raw = localStorage.getItem("wedding_wishes");
        if (raw) {
          this.list = JSON.parse(raw);
          return;
        }
      } catch (_) {}
      this.list = seedWishes.slice();
    },
    save() {
      try {
        localStorage.setItem("wedding_wishes", JSON.stringify(this.list));
      } catch (_) {}
    },
    add(wish) {
      this.list.unshift(wish);
      this.save();
    },
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatTime(ts) {
    const diff = Date.now() - ts;
    if (diff < 60000) return "vừa xong";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
    return new Date(ts).toLocaleDateString("vi-VN");
  }

  function renderWishList() {
    const listEl = document.getElementById("wishList");
    if (!listEl) return;
    if (!wishStore.list.length) {
      listEl.innerHTML = `<div class="wish-item"><div class="msg">Chưa có lời chúc nào. Hãy là người đầu tiên nhé!</div></div>`;
      return;
    }
    listEl.innerHTML = wishStore.list
      .map(
        (w) => `
      <div class="wish-item">
        <div class="who">${escapeHtml(w.name)}</div>
        <div class="msg">${escapeHtml(w.message)}</div>
        <div class="time">${formatTime(w.ts)}</div>
      </div>`
      )
      .join("");
  }

  let wishQueue = [];
  let wishTimer = null;

  function pushBubble(wish) {
    const floatEl = document.getElementById("wishFloat");
    if (!floatEl) return;
    const bubble = document.createElement("div");
    bubble.className = "wish-bubble";
    bubble.innerHTML = `<strong>${escapeHtml(wish.name)}:</strong> ${escapeHtml(wish.message)}`;
    floatEl.appendChild(bubble);
    while (floatEl.children.length > 2) floatEl.firstElementChild.remove();
    setTimeout(() => {
      bubble.classList.add("leaving");
      setTimeout(() => bubble.remove(), 450);
    }, 5000);
  }

  function startWishFloat() {
    wishQueue = wishStore.list.slice(0, 8);
    pushBubble(wishQueue.shift());
    setTimeout(() => wishQueue.length && pushBubble(wishQueue.shift()), 800);
    setTimeout(() => wishQueue.length && pushBubble(wishQueue.shift()), 1600);
    wishTimer = setInterval(() => {
      if (!wishQueue.length) wishQueue = wishStore.list.slice(0, 8);
      if (wishQueue.length) pushBubble(wishQueue.shift());
    }, 4500);
  }

  function initWishForm() {
    const form = document.getElementById("wishForm");
    const input = document.getElementById("wishText");
    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = input.value.trim();
      if (!msg) return;
      const guest = getGuestFromURL() || "Khách mời";
      const wish = { name: guest, message: msg, ts: Date.now() };
      wishStore.add(wish);
      pushBubble(wish);
      renderWishList();
      input.value = "";
    });
  }

  function initWishPanel() {
    const panel = document.getElementById("wishPanel");
    const openBtn = document.getElementById("btnWishList");
    const closeBtn = document.getElementById("wishPanelClose");
    if (!panel) return;
    const open = () => {
      renderWishList();
      panel.classList.add("open");
    };
    const close = () => panel.classList.remove("open");
    if (openBtn) openBtn.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    panel.addEventListener("click", (e) => {
      if (e.target === panel) close();
    });
  }

  /* ---------- Like ---------- */
  function initLike() {
    const btn = document.getElementById("btnLike");
    const count = document.getElementById("likeCount");
    if (!btn || !count) return;

    let liked = false;
    let n = CONFIG.likeDefault;
    try {
      if (localStorage.getItem("wedding_liked") === "1") {
        liked = true;
        btn.classList.add("liked");
      }
      const savedN = localStorage.getItem("wedding_likes");
      if (savedN) n = parseInt(savedN, 10) || n;
    } catch (_) {}
    count.textContent = String(n);

    btn.addEventListener("click", () => {
      liked = !liked;
      n += liked ? 1 : -1;
      btn.classList.toggle("liked", liked);
      count.textContent = String(n);
      try {
        localStorage.setItem("wedding_liked", liked ? "1" : "0");
        localStorage.setItem("wedding_likes", String(n));
      } catch (_) {}
    });
  }

  /* ---------- Sparkles ---------- */
  function initSparkles() {
    const canvas = document.getElementById("sparkles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function spawn() {
      particles = Array.from({ length: 24 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        s: Math.random() * 0.4 + 0.12,
        a: Math.random() * Math.PI * 2,
        tw: Math.random() * Math.PI * 2,
        gold: Math.random() > 0.35,
      }));
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.s;
        p.x += Math.sin(p.a) * 0.22;
        p.tw += 0.04;
        if (p.y < -8) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        const alpha = 0.22 + Math.sin(p.tw) * 0.32;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(232, 212, 139, ${Math.max(0.05, alpha)})`
          : `rgba(255, 255, 255, ${Math.max(0.05, alpha)})`;
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    resize();
    spawn();
    window.addEventListener("resize", () => {
      resize();
      spawn();
    });
    frame();
  }

  /* ---------- Reveal (GSAP ScrollTrigger, with fallback) ---------- */
  function initReveal() {
    if (!hasST) {
      // Fallback: original IntersectionObserver behavior
      const els = document.querySelectorAll(".reveal");
      if (!("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("visible"));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
      );
      els.forEach((el) => io.observe(el));
      return;
    }

    // GSAP path: neutralize CSS .reveal transitions so GSAP drives the motion
    document.documentElement.classList.add("gsap-reveal");
    window.gsap.utils.toArray(".reveal:not(.polaroid)").forEach((el) => {
      window.gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });
    // section-head letter-spacing sweep (WOW)
    window.gsap.utils.toArray(".section-head .en").forEach((el) => {
      window.gsap.fromTo(
        el,
        { letterSpacing: "0.3em", opacity: 0 },
        {
          letterSpacing: "0.14em",
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });
    try {
      window.ScrollTrigger.refresh();
    } catch (_) {}
  }

  /* ---------- Music (soft ambient) ---------- */
  let audioCtx = null;
  let musicNodes = [];
  let isPlaying = false;
  let progressTimer = null;
  let progressValue = 28;

  function createAmbient() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = audioCtx || new Ctx();

    const master = audioCtx.createGain();
    master.gain.value = 0;
    master.connect(audioCtx.destination);
    master.gain.linearRampToValueAtTime(0.07, audioCtx.currentTime + 1.2);

    [220, 277.18, 329.63, 440].forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      g.gain.value = 0.03 / (i + 1);
      osc.connect(g);
      g.connect(master);
      osc.start();
      musicNodes.push(osc, g);
    });

    const pluck = () => {
      if (!audioCtx || audioCtx.state === "closed") return;
      const notes = [440, 493.88, 554.37, 659.25, 587.33];
      const n = notes[Math.floor(Math.random() * notes.length)];
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.value = n;
      const t = audioCtx.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      osc.connect(g);
      g.connect(master);
      osc.start(t);
      osc.stop(t + 1.8);
    };

    const pluckTimer = setInterval(pluck, 2600);
    musicNodes.push({ stop: () => clearInterval(pluckTimer) }, master);
    return master;
  }

  function stopAmbient() {
    musicNodes.forEach((n) => {
      try {
        if (n.stop) n.stop();
        else if (n.disconnect) n.disconnect();
      } catch (_) {}
    });
    musicNodes = [];
    if (audioCtx) {
      try {
        audioCtx.close();
      } catch (_) {}
      audioCtx = null;
    }
  }

  function setPlayingUI(playing) {
    const iconPlay = document.getElementById("iconPlay");
    const iconPause = document.getElementById("iconPause");
    const vinyl = document.getElementById("vinyl");
    const btn = document.getElementById("btnPlay");
    if (iconPlay) iconPlay.style.display = playing ? "none" : "block";
    if (iconPause) iconPause.style.display = playing ? "block" : "none";
    if (vinyl) vinyl.classList.toggle("playing", playing);
    if (btn) btn.setAttribute("aria-label", playing ? "Tạm dừng" : "Phát nhạc");
    isPlaying = playing;
  }

  function initMusic() {
    const btnPlay = document.getElementById("btnPlay");
    const bar = document.getElementById("progressBar");

    const startProgress = () => {
      if (progressTimer) clearInterval(progressTimer);
      progressTimer = setInterval(() => {
        progressValue = (progressValue + 0.15) % 100;
        if (bar) bar.style.width = progressValue + "%";
      }, 200);
    };

    if (btnPlay) {
      btnPlay.addEventListener("click", () => {
        if (!isPlaying) {
          createAmbient();
          if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
          setPlayingUI(true);
          startProgress();
        } else {
          stopAmbient();
          setPlayingUI(false);
          if (progressTimer) clearInterval(progressTimer);
        }
      });
    }

    ["btnPrev", "btnNext"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", () => {
        progressValue = Math.random() * 40 + 10;
        if (bar) bar.style.width = progressValue + "%";
      });
    });

    if (bar) bar.style.width = progressValue + "%";
  }

  /* ---------- Link builder ---------- */
  function initLinkBuilder() {
    const toggle = document.getElementById("linkToggle");
    const panel = document.getElementById("linkPanel");
    const nameInput = document.getElementById("linkGuestName");
    const makeBtn = document.getElementById("btnMakeLink");
    const output = document.getElementById("linkOutput");
    const copyBtn = document.getElementById("btnCopyLink");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => panel.classList.toggle("open"));

    const makeLink = () => {
      const name = (nameInput?.value || "").trim();
      const origin = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/");
      const base = origin.endsWith("/") ? origin : origin + "/";
      if (output) output.value = name ? `${base}${encodeURIComponent(name)}` : `${base}?guest=`;
    };

    if (makeBtn) makeBtn.addEventListener("click", makeLink);
    if (nameInput) {
      nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          makeLink();
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        if (!output?.value) makeLink();
        try {
          await navigator.clipboard.writeText(output.value);
          copyBtn.textContent = "Đã sao chép ✓";
          setTimeout(() => (copyBtn.textContent = "Sao chép link"), 1600);
        } catch {
          output.select();
          document.execCommand("copy");
          copyBtn.textContent = "Đã sao chép ✓";
          setTimeout(() => (copyBtn.textContent = "Sao chép link"), 1600);
        }
      });
    }
  }

  /* ---------- Init ---------- */
  function init() {
    // Progressive enhancement: chỉ ẩn .reveal khi JS animation thật sự chạy
    document.documentElement.classList.add("js-anim");
    const guest = getGuestFromURL();
    applyGuest(guest);

    initPetals();
    initOpen();
    initCoverFx();
    initLightbox();
    tickCountdown();
    setInterval(tickCountdown, 1000);
    renderCalendar();
    initCalendarNav();
    wishStore.load();
    if (guest) {
      const exists = wishStore.list.some(
        (w) => w.message.includes(guest) && w.message.includes("Rất mong")
      );
      if (!exists) {
        wishStore.list.unshift({
          name: `${CONFIG.couple.groom} & ${CONFIG.couple.bride}`,
          message: `Rất mong ${guest} sẽ đến chung vui cùng chúng mình!`,
          ts: Date.now(),
        });
        wishStore.save();
      }
    }
    initWishForm();
    initWishPanel();
    initLike();
    initSparkles();
    initMusic();
    initLinkBuilder();
    // reveal + hero + timeline + polaroids + autoScroll + wishes start after open
    if (hasST) {
      window.addEventListener("load", () => {
        try {
          window.ScrollTrigger.refresh();
        } catch (_) {}
      });
    }
  }

  // Expose init for the React entry: src/App.jsx calls initSite() after mount.
  // (The legacy code ran on DOMContentLoaded; React controls timing now.)
  window.__initSite = init;
})();

/* React entry point — idempotent so React StrictMode double-effects stay safe */
let siteStarted = false;
export function initSite() {
  if (siteStarted) return;
  siteStarted = true;
  if (typeof window.__initSite === "function") window.__initSite();
}
