/* ============ EDIT EVERYTHING HERE ============ */
const CONFIG = {
  yourName: "Your Name",
  partnerName: "Their Name",
  relationshipStartDate: "2025-10-10",   // YYYY-MM-DD (your local time)
  anniversaryDate: "",                    // optional YYYY-MM-DD; blank = same day each year
  anniversaryTitle: "Our First Anniversary",
  musicPath: "music/our-song.mp3",        // add more: tracks list below
  tracks: [{ title: "Our Song", src: "music/our-song.mp3" }],
  theme: { blush: "#f4c2cf", gold: "#e3c27a", pearl: "#fbf6f1", rose: "#d86a8a", burgundy: "#5a1029", night: "#0d0a12" },
  photos: [
    { src: "images/photo1.jpg", caption: "Where it all began" },
    { src: "images/photo2.jpg", caption: "Our first adventure" },
    { src: "images/photo3.jpg", caption: "Laughing at nothing" },
    { src: "images/photo4.jpg", caption: "My favorite date" },
    { src: "images/photo5.jpg", caption: "Ordinary days, made special" },
    { src: "images/photo6.jpg", caption: "Us, always" }
  ],
  timeline: [
    { date: "2025-10-10", title: "The Day We Met", text: "Write what you remember about that first moment.", image: "" },
    { date: "", title: "Our First Conversation", text: "What did you talk about?", image: "" },
    { date: "", title: "The First Time We Laughed Together", text: "The laugh I still hear.", image: "" },
    { date: "", title: "Our First Special Memory", text: "The one I keep replaying.", image: "" },
    { date: "", title: "The Moment You Became Special", text: "When I knew.", image: "" },
    { date: "", title: "Our Favorite Date", text: "Where we went, and why it was perfect.", image: "" },
    { date: "", title: "One Year of Us", text: "365 days, and I'd repeat every one.", image: "" },
    { date: "", title: "Our Forever Begins Here", text: "Everything still ahead.", image: "" }
  ],
  letter: [
    "One year ago, something beautiful began. I never knew that one person could become such a big part of my world. You became my favorite notification, my comfort after a difficult day, my reason to smile at random moments, and the person I want to share even the smallest things with.",
    "Thank you for every laugh, every memory, every little effort, and every moment that made this year special. We may not be perfect, and every day may not be a fairytale, but what we have means so much to me.",
    "If I could choose again, I would still choose you. Today, tomorrow, and in every version of the future I dream about.",
    "Happy Anniversary, my favorite human. This is only the beginning of our story. I love you. ❤️"
  ],
  favorites: [
    ["Your Smile", "It resets my whole day, every time."],
    ["Your Voice", "My favorite sound, even when it's just 'hey'."],
    ["The Way You Care", "You notice what others miss."],
    ["Our Random Conversations", "From nonsense to midnight deep talks."],
    ["Your Hugs", "The one place everything feels okay."],
    ["The Little Things You Remember", "Proof you really listen."],
    ["Ordinary Days, Made Special", "Nothing is ordinary with you."]
  ],
  quiz: [  // correct = index of right option
    { q: "Who said “I love you” first?", options: ["Me", "You"], correct: 0 },
    { q: "Who gets jealous more easily?", options: ["Me", "You"], correct: 1 },
    { q: "Who apologizes first?", options: ["Me", "You"], correct: 0 },
    { q: "Who is more dramatic?", options: ["Me", "You"], correct: 1 },
    { q: "Who sends more messages?", options: ["Me", "You"], correct: 0 },
    { q: "What is our favorite memory?", options: ["Our first date", "A random Tuesday", "Our first trip"], correct: 0 },
    { q: "Who falls asleep first?", options: ["Me", "You"], correct: 1 }
  ],
  results: [
    [0.5, "Hmm… we need more date nights. Study session starts tonight. 💕"],
    [0.85, "So close! You know us almost as well as we know each other. 💗"],
    [1.01, "Congratulations! You know us perfectly. Now collect your imaginary kiss. 😘"]
  ],
  secrets: {
    surprise: "If I could give you one thing in life, I would give you the ability to see yourself through my eyes. Only then would you understand how special you are to me. You are my favorite person, my beautiful memory, and one of the best things that ever happened to me. ❤️",
    heart: "Write your private message here. (Edit CONFIG.secrets.heart)"
  },
  celebration: "365 days, and my heart still skips. Happy Anniversary, my love.",
  finalText: [
    "You are not just part of my story. You are my favorite part.",
    "Thank you for making this year beautiful in ways words cannot fully explain.",
    "If our first year was this special, I cannot wait to discover all the beautiful chapters still waiting for us.",
    "Happy Anniversary, my love. Here's to us, always. ❤️"
  ]
};
/* ============ END OF CONFIG ============ */

const $ = (s, r = document) => r.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const T = CONFIG.theme, root = document.documentElement.style;
[["blush", T.blush], ["gold", T.gold], ["pearl", T.pearl], ["rose", T.rose], ["burg", T.burgundy], ["night", T.night]].forEach(([k, v]) => v && root.setProperty("--" + k, v));
const parseDate = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const placeholder = i => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="${i % 2 ? 700 : 520}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4c2cf"/><stop offset="1" stop-color="#8a2b4d"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" font-size="90" text-anchor="middle" fill="#fff" fill-opacity=".7">♥</text></svg>`);

document.title = CONFIG.anniversaryTitle + " ♡ " + CONFIG.yourName + " & " + CONFIG.partnerName;
$("#names").textContent = `${CONFIG.yourName} ♡ ${CONFIG.partnerName}`;
$("#annTitle").textContent = CONFIG.anniversaryTitle;

/* ---- Background particles (petals + gold dust) and confetti ---- */
const bg = $("#bg"), bx = bg.getContext("2d"), fx = $("#fx"), fc = fx.getContext("2d");
let W, H, parts = [], conf = [];
function size() { const r = devicePixelRatio > 1 ? 1.5 : 1; [bg, fx].forEach(c => { c.width = innerWidth * r; c.height = innerHeight * r; }); W = bg.width; H = bg.height; }
size(); addEventListener("resize", size);
const count = innerWidth < 700 ? 22 : 45;
for (let i = 0; i < count; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, r: 2 + Math.random() * 6, v: .2 + Math.random() * .6, p: Math.random() * 6, petal: Math.random() < .5 });
function drawBg() {
  bx.clearRect(0, 0, W, H);
  parts.forEach(p => {
    if (!reduce) { p.y += p.v; p.p += .02; p.x += Math.sin(p.p) * .6; if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; } }
    bx.beginPath();
    if (p.petal) { bx.fillStyle = "rgba(244,194,207,.45)"; bx.ellipse(p.x, p.y, p.r * 1.6, p.r, p.p, 0, 7); }
    else { bx.fillStyle = "rgba(227,194,122,.6)"; bx.arc(p.x, p.y, p.r / 2.5, 0, 7); }
    bx.fill();
  });
  fc.clearRect(0, 0, W, H);
  conf = conf.filter(c => c.l > 0);
  conf.forEach(c => { c.x += c.vx; c.y += c.vy; c.vy += .08; c.l--; fc.globalAlpha = Math.min(1, c.l / 40); fc.fillStyle = c.c; fc.fillRect(c.x, c.y, c.s, c.s * .6); });
  requestAnimationFrame(drawBg);
}
drawBg();
function burst(n = 120) {
  if (reduce) n = 30;
  const cols = [T.gold, T.blush, T.rose, "#fff"];
  for (let i = 0; i < n; i++) conf.push({ x: W / 2, y: H * .6, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 3, s: 5 + Math.random() * 6, c: cols[i % 4], l: 120 + Math.random() * 80 });
}

/* ---- 3D heart tilt ---- */
const h3 = $("#heart3d");
addEventListener("pointermove", e => { if (reduce) return; const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; h3.style.transform = `perspective(700px) rotateY(${x * 40}deg) rotateX(${-y * 30}deg)`; });

/* ---- Open ---- */
$("#openBtn").onclick = () => {
  $("#intro").style.transition = "opacity 1s"; $("#intro").style.opacity = 0;
  burst(80);
  setTimeout(() => { $("#intro").remove(); $("#main").hidden = false; $("#player").hidden = false; scrollTo(0, 0); watchTimeline(); }, 900);
};

/* ---- Counters ---- */
const start = parseDate(CONFIG.relationshipStartDate);
const cell = (n, l) => `<div><b>${n}</b><small>${l}</small></div>`;
function tick() {
  const now = new Date(), b = now < start ? start : now;
  const total = Math.floor((b - start) / 864e5);
  let y = b.getFullYear() - start.getFullYear(), m = b.getMonth() - start.getMonth(), d = b.getDate() - start.getDate(), h = b.getHours(), mi = b.getMinutes(), s = b.getSeconds();
  if (d < 0) { d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); m--; } if (m < 0) { m += 12; y--; }
  $("#totalDays").textContent = total.toLocaleString();
  $("#since").innerHTML = cell(y * 12 + m, "months") + cell(d, "days") + cell(h, "hours") + cell(mi, "minutes") + cell(s, "seconds");
  const base = CONFIG.anniversaryDate ? parseDate(CONFIG.anniversaryDate) : start;
  let nx = new Date(now.getFullYear(), base.getMonth(), base.getDate()); if (nx <= now) nx = new Date(now.getFullYear() + 1, base.getMonth(), base.getDate());
  const ms = nx - now, dd = Math.floor(ms / 864e5);
  $("#until").innerHTML = cell(dd, "days") + cell(Math.floor(ms / 36e5) % 24, "hours") + cell(Math.floor(ms / 6e4) % 60, "minutes") + cell(Math.floor(ms / 1e3) % 60, "seconds");
}
tick(); setInterval(tick, 1000);

/* ---- Timeline ---- */
function addMs(m) {
  const e = el("div", "ms", `<div class="glass"><time>${esc(m.date || "")}</time><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p>${m.image ? `<img src="${esc(m.image)}" alt="" onerror="this.remove()">` : ""}</div>`);
  $("#timeline").append(e); if (window.io) io.observe(e); else e.classList.add("in");
}
function watchTimeline() { window.io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && x.target.classList.add("in")), { threshold: .2 }); document.querySelectorAll(".ms").forEach(n => io.observe(n)); }
CONFIG.timeline.forEach(addMs);
$("#mAdd").onclick = () => { const t = $("#mTitle").value.trim(); if (!t) return $("#mTitle").focus(); addMs({ date: $("#mDate").value, title: t, text: $("#mText").value }); $("#mTitle").value = $("#mText").value = ""; $("#story").scrollIntoView(); };

/* ---- Gallery ---- */
function addPhoto(src, cap, i) {
  const f = el("figure", "polaroid"); f.tabIndex = 0; f.style.setProperty("--r", ((i % 5) - 2) + "deg");
  const im = el("img"); im.loading = "lazy"; im.alt = cap; im.src = src; im.onerror = () => { im.onerror = null; im.src = placeholder(i); };
  f.append(im, el("figcaption", "", esc(cap)));
  const open = () => { $("#lbImg").src = im.src; $("#lbImg").alt = cap; $("#lbCap").textContent = cap; $("#lb").hidden = false; $("#lbClose").focus(); };
  f.onclick = open; f.onkeydown = e => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open());
  $("#photos").append(f);
}
CONFIG.photos.forEach((p, i) => addPhoto(p.src, p.caption, i));
$("#upload").onchange = e => [...e.target.files].forEach((f, i) => addPhoto(URL.createObjectURL(f), f.name.replace(/\.\w+$/, ""), 6 + i));
const closeLb = () => $("#lb").hidden = true; $("#lbClose").onclick = closeLb; $("#lb").onclick = e => e.target.id === "lb" && closeLb();
addEventListener("keydown", e => e.key === "Escape" && closeLb());

/* ---- Letter ---- */
let letter = CONFIG.letter.slice(), typing;
$("#letterEdit").value = letter.join("\n\n");
function typeLetter() {
  const p = $("#paper"), text = letter.join("\n\n"); p.hidden = false; p.textContent = ""; clearInterval(typing);
  if (reduce) return p.textContent = text;
  let i = 0; typing = setInterval(() => { p.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(typing); }, 35);
}
$("#envelope").onclick = function () { this.classList.add("open"); setTimeout(typeLetter, 700); };
$("#letterSave").onclick = () => { letter = $("#letterEdit").value.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean); $("#envelope").classList.add("open"); typeLetter(); $("#letter").scrollIntoView(); };

/* ---- Favorites ---- */
CONFIG.favorites.forEach(([t, m]) => { const c = el("button", "card", `<span class="f">${esc(t)}</span><span class="b">${esc(m)}</span>`); c.setAttribute("aria-label", t + ": tap to reveal"); c.onclick = () => c.classList.toggle("flip"); $("#cards").append(c); });

/* ---- Quiz ---- */
let qi = 0, score = 0; const qb = $("#quizBox");
function showQ() {
  if (qi >= CONFIG.quiz.length) {
    const r = score / CONFIG.quiz.length, msg = (CONFIG.results.find(x => r < x[0]) || CONFIG.results.at(-1))[1];
    qb.innerHTML = `<h3 class="gold-text" style="font:2.4rem var(--serif);margin:0">${score} / ${CONFIG.quiz.length}</h3><p>${esc(msg)}</p><button class="btn gold" id="again">Play again</button>`;
    $("#again").onclick = () => { qi = score = 0; showQ(); }; if (r >= .85) burst(90); return;
  }
  const q = CONFIG.quiz[qi];
  qb.innerHTML = `<small>Question ${qi + 1} of ${CONFIG.quiz.length}</small><h3 style="font:1.7rem var(--serif);margin:.4rem 0">${esc(q.q)}</h3><div class="opts"></div>`;
  q.options.forEach((o, i) => { const b = el("button", "", esc(o)); b.onclick = () => {
    qb.querySelectorAll("button").forEach((x, j) => { x.disabled = true; if (j === q.correct) x.classList.add("ok"); });
    if (i === q.correct) score++; else b.classList.add("no");
    setTimeout(() => { qi++; showQ(); }, 1100); }; $(".opts", qb).append(b); });
}
showQ();

/* ---- Secrets & celebration ---- */
$("#oneMore").onclick = () => { $("#s1").textContent = CONFIG.secrets.surprise; $("#s1").hidden = false; $("#heartBtn").hidden = false; burst(160); };
$("#heartBtn").onclick = () => { $("#s2").textContent = CONFIG.secrets.heart; $("#s2").hidden = false; };
$("#celBtn").onclick = () => { $("#celOut").textContent = CONFIG.celebration; $("#celOut").hidden = false; burst(140); };
$("#finalText").innerHTML = CONFIG.finalText.map(t => `<p>${esc(t)}</p>`).join("");
$("#top").onclick = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

/* ---- Music ---- */
const au = $("#audio"), tracks = CONFIG.tracks.length ? CONFIG.tracks : [{ title: "Our Song", src: CONFIG.musicPath }]; let ti = 0;
function load() { au.src = tracks[ti].src; $("#trackName").textContent = tracks[ti].title; $("#pmsg").textContent = ""; $("#prog").style.width = 0; $("#play").textContent = "▶"; }
load(); if (tracks.length > 1) $("#next").hidden = false;
$("#play").onclick = () => au.paused ? au.play().catch(() => $("#pmsg").textContent = "Add your song at " + tracks[ti].src) : au.pause();
au.onplay = () => $("#play").textContent = "❚❚"; au.onpause = () => $("#play").textContent = "▶";
au.onerror = () => $("#pmsg").textContent = "Music file not found: " + tracks[ti].src;
au.ontimeupdate = () => $("#prog").style.width = (au.duration ? au.currentTime / au.duration * 100 : 0) + "%";
au.onended = () => tracks.length > 1 ? $("#next").click() : load();
$("#vol").oninput = e => au.volume = e.target.value; au.volume = .7;
$("#next").onclick = () => { ti = (ti + 1) % tracks.length; load(); au.play().catch(() => { }); };
