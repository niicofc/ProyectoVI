const app = (() => {
  const CART_KEY = "wsj_cart";
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const fmt = n => n.toFixed(2).replace(".", ",") + " €";

  /* ---------- Render catálogo ---------- */
  function jerseySVG(p) {
    return `<svg viewBox="0 0 200 200" class="pcard__svg" role="img" aria-label="${p.team}">
      <path d="M60 30 L85 20 Q100 32 115 20 L140 30 L165 55 L145 78 L138 68 L138 175 Q100 182 62 175 L62 68 L55 78 L35 55 Z"
        fill="${p.color}" stroke="rgba(0,0,0,.15)" stroke-width="2"/>
      <path d="M85 20 Q100 42 115 20 L108 34 Q100 44 92 34 Z" fill="${p.accent}"/>
      <rect x="90" y="90" width="20" height="34" rx="3" fill="${p.accent}" opacity=".85"/>
    </svg>`;
  }

  function card(p) {
    const badge = p.badge ? `<span class="pcard__badge">${p.badge}</span>` : "";
    const old = p.old ? `<s>${fmt(p.old)}</s>` : "";
    return `<article class="pcard" data-cat="${p.cat}">
      ${badge}
      <button class="pcard__fav" aria-label="Favorito">❤️</button>
      <div class="pcard__img">${jerseySVG(p)}</div>
      <div class="pcard__body">
        <span class="pcard__team">${p.team}</span>
        <h3 class="pcard__name">${p.name}</h3>
        <div class="pcard__sizes">${SIZES.map(s => `<label><input type="radio" name="sz-${p.id}" value="${s}">${s}</label>`).join("")}</div>
        <div class="pcard__foot">
          <div class="pcard__price">${fmt(p.price)} ${old}</div>
          <button class="btn btn--primary btn--sm" onclick="app.add(${p.id})">Añadir</button>
        </div>
      </div>
    </article>`;
  }

  function render(filter = "all") {
    const list = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
    $("#products").innerHTML = list.map(card).join("");
  }

  /* ---------- Carrito ---------- */
  function save() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function add(id) {
    const p = PRODUCTS.find(x => x.id === id);
    const size = $(`input[name="sz-${id}"]:checked`)?.value || "M";
    const key = id + "-" + size;
    const line = cart.find(l => l.key === key);
    if (line) line.qty++;
    else cart.push({ key, id, size, qty: 1, name: p.name, price: p.price, color: p.color, accent: p.accent });
    save(); paint(); toast(`${p.team} (${size}) añadida al carrito`);
    openDrawer();
  }

  function changeQty(key, d) {
    const line = cart.find(l => l.key === key);
    if (!line) return;
    line.qty += d;
    if (line.qty <= 0) cart = cart.filter(l => l.key !== key);
    save(); paint();
  }

  function paint() {
    const count = cart.reduce((s, l) => s + l.qty, 0);
    $("#cartCount").textContent = count;
    $("#cartCount").style.display = count ? "grid" : "none";
    const total = cart.reduce((s, l) => s + l.qty * l.price, 0);
    $("#cartTotal").textContent = fmt(total);

    if (!cart.length) {
      $("#cartItems").innerHTML = `<p class="drawer__empty">Tu carrito está vacío 🛒</p>`;
      return;
    }
    $("#cartItems").innerHTML = cart.map(l => `
      <div class="citem">
        <div class="citem__thumb" style="--c:${l.color};--a:${l.accent}">👕</div>
        <div class="citem__info">
          <strong>${l.name}</strong>
          <small>Talla ${l.size}</small>
          <div class="citem__qty">
            <button onclick="app.changeQty('${l.key}',-1)" aria-label="Menos">−</button>
            <span>${l.qty}</span>
            <button onclick="app.changeQty('${l.key}',1)" aria-label="Más">+</button>
          </div>
        </div>
        <div class="citem__price">${fmt(l.price * l.qty)}</div>
      </div>`).join("");
  }

  function checkout() {
    if (!cart.length) return toast("Tu carrito está vacío");
    toast("¡Gracias! Esto es una demo — el pago no está habilitado.");
  }

  function subscribe(e) {
    e.preventDefault();
    e.target.reset();
    toast("¡Suscrito! Revisa tu correo para el −10%.");
    return false;
  }

  /* ---------- UI helpers ---------- */
  function openDrawer() { $("#cartDrawer").classList.add("is-open"); $("#cartDrawer").setAttribute("aria-hidden", "false"); }
  function closeDrawer() { $("#cartDrawer").classList.remove("is-open"); $("#cartDrawer").setAttribute("aria-hidden", "true"); }

  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------- Init ---------- */
  function init() {
    render();
    paint();
    $("#cartToggle").addEventListener("click", openDrawer);
    $("#cartClose").addEventListener("click", closeDrawer);
    $("#drawerBackdrop").addEventListener("click", closeDrawer);
    $("#burger").addEventListener("click", () => $("#nav").classList.toggle("is-open"));
    $$("#filters .chip").forEach(c => c.addEventListener("click", () => {
      $$("#filters .chip").forEach(x => x.classList.remove("is-active"));
      c.classList.add("is-active");
      render(c.dataset.filter);
    }));
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
  }
  document.addEventListener("DOMContentLoaded", init);

  return { add, changeQty, checkout, subscribe };
})();
