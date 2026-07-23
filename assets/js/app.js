const app = (() => {
  const CART_KEY = "wsj_cart";
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const $  = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];
  const money = n => "$" + n.toFixed(2);

  /* ---- Escudo/badge circular con iniciales ---- */
  function initials(name){
    const clean = name.replace(/\b(FC|CF|AFC|SC|CA|CD|UD|RCD|AD|F\.C\.|1\.|1899)\b/gi,"").trim();
    const w = clean.split(/\s+/).filter(Boolean);
    return ((w[0]?.[0]||"") + (w[1]?.[0]||w[0]?.[1]||"")).toUpperCase();
  }
  function hue(str){ let h=0; for(const c of str) h=(h*31+c.charCodeAt(0))%360; return h; }
  function crest(name){
    const h = hue(name);
    return `<span class="crest" style="--h:${h}">${initials(name)}</span>`;
  }

  /* ---- Camiseta SVG ---- */
  function jersey(p){
    return `<svg viewBox="0 0 200 210" class="jersey" role="img" aria-label="${p.name}">
      <path d="M62 34 L86 22 Q100 36 114 22 L138 34 L166 60 L146 84 L138 74 L138 186 Q100 194 62 186 L62 74 L54 84 L34 60 Z"
        fill="${p.color}" stroke="rgba(0,0,0,.18)" stroke-width="2"/>
      <path d="M86 22 Q100 46 114 22 L107 38 Q100 48 93 38 Z" fill="${p.accent}"/>
      <rect x="90" y="96" width="20" height="36" rx="3" fill="${p.accent}" opacity=".8"/>
    </svg>`;
  }

  /* ---- Navegación + mega-menús ---- */
  function buildNav(){
    $("#navList").innerHTML = NAV.map((n,i) => {
      const hasMega = !!n.sections;
      const badge = n.badge
        ? (/^[A-Z0-9.]{1,4}$/.test(n.badge)
            ? `<span class="lbadge" style="--c:${n.badgeColor||'#333'}">${n.badge}</span>`
            : `<span class="lemoji">${n.badge}</span>`)
        : "";
      const caret = hasMega ? ' <b class="caret">▾</b>' : "";
      let mega = "";
      if(hasMega){
        mega = `<div class="mega"><div class="mega__wrap">` + n.sections.map(sec => `
          <div class="mega__sec">
            <h4>${sec.title}</h4>
            <div class="mega__grid">
              ${sec.items.map(it => `<a href="#" class="mega__item">${crest(it)}<span>${it}</span></a>`).join("")}
            </div>
          </div>`).join("") + `</div></div>`;
      }
      return `<li class="${hasMega?'has-mega':''}">
        <a href="${n.href||'#'}" class="nav__link">${badge}${n.label}${caret}</a>${mega}</li>`;
    }).join("");
  }

  /* ---- Hero ---- */
  function buildHero(){
    $("#heroGrid").innerHTML = SLIDES.map((s,i) => `
      <article class="slide ${i===1?'slide--tall':''}" style="background:${s.bg}">
        <div class="slide__jersey">${jersey(s)}</div>
        <span class="slide__tag">${s.tag}</span>
        <h2 class="slide__team">${s.team}</h2>
        <a href="#sections" class="btn btn--dark">Shop Now</a>
      </article>`).join("");
  }

  /* ---- Secciones de productos ---- */
  const shown = {};
  function pcard(p){
    const price = p.priceTo ? `${money(p.price)} – ${money(p.priceTo)} (USD)` : `${money(p.price)} (USD)`;
    return `<article class="pcard">
      <button class="pcard__fav" aria-label="Favorito">♡</button>
      <div class="pcard__img">${jersey(p)}</div>
      <h3 class="pcard__name">${p.name}</h3>
      <p class="pcard__sub">${p.sub}</p>
      <p class="pcard__price">${price}</p>
      <div class="pcard__sizes">${SIZES.map(s=>`<label><input type="radio" name="sz${p.id}" value="${s}">${s}</label>`).join("")}</div>
      <button class="btn btn--green btn--sm btn--block" onclick="app.add(${p.id})">Add to Cart</button>
    </article>`;
  }
  function buildSections(){
    $("#sections").innerHTML = SECTIONS.map((sec,si) => {
      shown[si] = 6;
      return `<section class="psec">
        <div class="psec__bar">${sec.title}</div>
        <div class="products" id="prod-${si}"></div>
        <div class="psec__more"><button class="btn btn--outline" onclick="app.more(${si})">LOAD MORE PRODUCTS</button></div>
      </section>`;
    }).join("");
    SECTIONS.forEach((_,si)=>renderSection(si));
  }
  function renderSection(si){
    const items = SECTIONS[si].items.slice(0, shown[si]);
    $("#prod-"+si).innerHTML = items.map(pcard).join("");
    const btn = $$(".psec")[si].querySelector(".psec__more");
    btn.style.display = shown[si] >= SECTIONS[si].items.length ? "none" : "block";
  }
  function more(si){ shown[si]+=6; renderSection(si); }

  /* ---- Carrito ---- */
  const allProducts = () => SECTIONS.flatMap(s=>s.items);
  function save(){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  function add(id){
    const p = allProducts().find(x=>x.id===id);
    const size = $(`input[name="sz${id}"]:checked`)?.value || "M";
    const key = id+"-"+size;
    const line = cart.find(l=>l.key===key);
    if(line) line.qty++; else cart.push({key,id,size,qty:1,name:p.name,price:p.price,color:p.color,accent:p.accent});
    save(); paint(); openDrawer(); toast(`Added (${size}) to cart`);
  }
  function changeQty(key,d){
    const l = cart.find(x=>x.key===key); if(!l) return;
    l.qty+=d; if(l.qty<=0) cart=cart.filter(x=>x.key!==key);
    save(); paint();
  }
  function paint(){
    const count = cart.reduce((s,l)=>s+l.qty,0);
    const cc = $("#cartCount"); cc.textContent = count; cc.style.display = count?"grid":"none";
    $("#cartTotal").textContent = money(cart.reduce((s,l)=>s+l.qty*l.price,0));
    $("#cartItems").innerHTML = cart.length ? cart.map(l=>`
      <div class="citem">
        <div class="citem__t" style="background:${l.color};color:${l.accent}">👕</div>
        <div class="citem__i"><strong>${l.name}</strong><small>Size ${l.size}</small>
          <div class="citem__q"><button onclick="app.changeQty('${l.key}',-1)">−</button><span>${l.qty}</span><button onclick="app.changeQty('${l.key}',1)">+</button></div>
        </div>
        <div class="citem__p">${money(l.price*l.qty)}</div>
      </div>`).join("") : `<p class="drawer__empty">Your cart is empty 🛍</p>`;
  }
  function checkout(){ toast(cart.length ? "Demo store — checkout disabled." : "Your cart is empty"); }

  /* ---- UI ---- */
  const openDrawer  = () => { $("#cartDrawer").classList.add("open"); $("#cartDrawer").setAttribute("aria-hidden","false"); };
  const closeDrawer = () => { $("#cartDrawer").classList.remove("open"); $("#cartDrawer").setAttribute("aria-hidden","true"); };
  let tT; function toast(m){ const t=$("#toast"); t.textContent=m; t.classList.add("show"); clearTimeout(tT); tT=setTimeout(()=>t.classList.remove("show"),2400); }

  function init(){
    buildNav(); buildHero(); buildSections(); paint();
    $("#cartToggle").addEventListener("click", openDrawer);
    $("#cartClose").addEventListener("click", closeDrawer);
    $("#drawerBg").addEventListener("click", closeDrawer);
    $("#burger").addEventListener("click", ()=>$("#nav").classList.toggle("open"));
    document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeDrawer(); });
  }
  document.addEventListener("DOMContentLoaded", init);
  return { add, changeQty, checkout, more };
})();
