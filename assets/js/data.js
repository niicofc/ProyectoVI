/* ============================================================
   Datos del sitio — clubes, ligas y productos (demo)
   Los escudos se generan como badges circulares con iniciales.
============================================================ */

// Grupos de clubes reutilizables (nombre -> color del escudo)
const CLUBS = {
  epl: ["AFC Bournemouth","Arsenal","Aston Villa","Brentford","Brighton","Chelsea","Crystal Palace","Everton","Fulham","Leicester City","Liverpool","Manchester City","Manchester United","Newcastle United","Nottingham Forest","Sheffield Wednesday","Southampton","Tottenham Hotspur","West Ham United","Wolves"],
  eplRetro: ["Arsenal","Aston Villa","Blackburn Rovers F.C.","Chelsea","Everton","Leeds United F.C.","Leicester City","Liverpool","Manchester City","Manchester United","Newcastle United","Sheffield Wednesday","Sunderland AFC","Tottenham Hotspur","West Ham United","Wolves"],
  eplTraining: ["Arsenal","Chelsea","Liverpool","Manchester City","Manchester United","Tottenham Hotspur"],

  laliga: ["Athletic Bilbao","Atletico Madrid","Barcelona","CA Osasuna","CD Leganes","Celta De Vigo","Deportivo Alaves","Getafe","Girona","Mallorca","Rayo Vallecano","RCD Espanyol","Real Betis","Real Madrid","Real Murcia","Real Sociedad","Real Valladolid","Recreativo De Huelva","Sevilla FC","UD Las Palmas","Valencia CF","Villarreal"],
  laligaRetro: ["AD Ceuta FC","Albacete","Athletic Bilbao","Atletico Madrid","Barcelona","CA Osasuna","Cadiz","CD Leganes","Celta De Vigo","Cordoba CF","Deportivo De La Coruna","Granada","Malaga","Racing De Santander","Rayo Vallecano","RCD Espanyol","RCD Mallorca","Real Betis","Real Madrid","Real Oviedo","Real Sociedad","Real Valladolid","Real Zaragoza","Sevilla FC","Sporting De Gijón","UD Las Palmas","Valencia CF"],
  laligaTraining: ["Atletico Madrid","Barcelona","Celta De Vigo","Malaga","Real Madrid","Sevilla FC"],

  bundesliga: ["1. FC Heidenheim","1. FC Union Berlin","1. FSV Mainz 05","1899 Hoffenheim","Bayer 04 Leverkusen","Bayern Munich","Borussia Dortmund","Borussia Mönchengladbach","Eintracht Frankfurt","FC Augsburg","FC St. Pauli","Hamburger SV","Holstein Kiel","RB Leipzig","SC Freiburg","Stuttgart","SV Werder Bremen","VfL Bochum 1848","Wolfsburg"],
  bundesliga2: ["1. FC Nurnberg","1.FC Magdeburg","Arminia Bielefeld","FC Carl Zeiss Jena","FC Hansa Rostock","FC Schalke 04","Fortuna Düsseldorf","Greuther Furth","Hannover 96","Hertha BSC"],
  dflRetro: ["1. FC Köln","Bayer 04 Leverkusen","Bayern Munich","Borussia Dortmund","FC Schalke 04","Hamburger SV","RB Leipzig","Stuttgart","SV Werder Bremen","Wolfsburg"],
  dflTraining: ["Bayern Munich","Borussia Dortmund","RB Leipzig"],

  nations: ["Argentina","Brazil","España","Francia","Alemania","Inglaterra","Italia","Portugal","Países Bajos","México","Estados Unidos","Colombia","Uruguay","Croacia","Bélgica","Japón"],
};

// Configuración de la barra de navegación con sus mega-menús
window.NAV = [
  { label: "Home", href: "#top" },
  { label: "Nation", badge: "🌍", sections: [{ title: "Selecciones", items: CLUBS.nations }] },
  { label: "DFL", badge: "DFL", badgeColor: "#d20515", sections: [
      { title: "Bundesliga", items: CLUBS.bundesliga },
      { title: "2. Bundesliga", items: CLUBS.bundesliga2 },
      { title: "Retro", items: CLUBS.dflRetro },
      { title: "Training", items: CLUBS.dflTraining },
  ]},
  { label: "EPL", badge: "EPL", badgeColor: "#3d195b", sections: [
      { title: "New Season", items: CLUBS.epl },
      { title: "Retro", items: CLUBS.eplRetro },
      { title: "Training", items: CLUBS.eplTraining },
  ]},
  { label: "La Liga", badge: "LL", badgeColor: "#ff4b44", sections: [
      { title: "New Season", items: CLUBS.laliga },
      { title: "Retro", items: CLUBS.laligaRetro },
      { title: "Training", items: CLUBS.laligaTraining },
  ]},
  { label: "Ligue 1", badge: "L1", badgeColor: "#091c3e", sections: [
      { title: "New Season", items: ["Paris Saint-Germain","Marseille","Monaco","Lyon","Lille","Nice","Rennes","Lens","Nantes","Strasbourg"] },
      { title: "Retro", items: ["Paris Saint-Germain","Marseille","Monaco","Lyon"] },
  ]},
  { label: "Serie A", badge: "SA", badgeColor: "#0067b1", sections: [
      { title: "New Season", items: ["AC Milan","Inter","Juventus","Napoli","Roma","Lazio","Atalanta","Fiorentina","Bologna","Torino"] },
      { title: "Retro", items: ["AC Milan","Inter","Juventus","Napoli","Roma"] },
  ]},
  { label: "Primeira Liga", badge: "PT", badgeColor: "#005a2b", sections: [
      { title: "New Season", items: ["Benfica","Porto","Sporting CP","Braga","Vitória SC"] },
  ]},
  { label: "Clothing", badge: "👕", sections: [
      { title: "Ropa", items: ["Chaquetas","Sudaderas","Pantalones","Polos","Chándales","Accesorios"] },
  ]},
  { label: "Others", badge: "•••", sections: [
      { title: "Otros", items: ["Champions League","Europa League","Copa América","Eurocopa","MLS","Liga MX"] },
  ]},
];

// Slides del hero
window.SLIDES = [
  { team: "Inter Miami", tag: "Messi 25/26", bg: "linear-gradient(160deg,#f4b7c6,#e88aa3)", color:"#f7bfcf", accent:"#111" },
  { team: "AC Milan", tag: "Home 25/26", bg: "linear-gradient(160deg,#b1140f,#5a0a08)", color:"#a30d16", accent:"#111" },
  { team: "Manchester City", tag: "Home 25/26", bg: "linear-gradient(160deg,#8ec6ea,#6cabdd)", color:"#6cabdd", accent:"#1c2c5b" },
];

// Productos por sección
window.SECTIONS = [
  { title: "New Season", items: [
    { id:1,  name:"Mens Spain 2026 World Cup Home Long Sleeve Jersey Player Version (Champion 2-Star)", sub:"Player Version", price:23, color:"#c60b1e", accent:"#ffc400" },
    { id:2,  name:"Mens Spain 2026 World Cup Away Long Sleeve Jersey Player Version (Champion 2-Star)", sub:"Player Version", price:23, color:"#0b2f6b", accent:"#c60b1e" },
    { id:3,  name:"Mens Spain 2026 World Cup Home Jersey Player Version (Champion 2-Star)", sub:"Player Version", price:21, priceTo:23, color:"#c60b1e", accent:"#ffc400" },
    { id:4,  name:"Mens Spain 2026 World Cup Away Jersey Player Version (Champion 2-Star)", sub:"Player Version", price:21, priceTo:23, color:"#12224b", accent:"#c60b1e" },
    { id:5,  name:"Mens Real Madrid 2026/27 Away Jersey Player Version", sub:"Player Version", price:21, color:"#111", accent:"#d4af37" },
    { id:6,  name:"Mens Tottenham Hotspur 2026/27 Home Long Sleeve Jersey Player Version", sub:"Player Version", price:23, color:"#ffffff", accent:"#132257" },
    { id:7,  name:"Mens Real Madrid 2025/26 Home Jersey Player Version", sub:"Player Version", price:23, color:"#f4f5f8", accent:"#00529f" },
    { id:8,  name:"Mens FC Barcelona 2025/26 Home Jersey Player Version", sub:"Player Version", price:23, color:"#0b2f6b", accent:"#a50044" },
    { id:9,  name:"Mens Manchester City 2025/26 Home Jersey Player Version", sub:"Player Version", price:23, color:"#8ec6ea", accent:"#1c2c5b" },
    { id:10, name:"Mens Inter Miami 2025/26 Home Jersey (Messi 10)", sub:"Player Version", price:25, color:"#f7bfcf", accent:"#111" },
    { id:11, name:"Mens AC Milan 2025/26 Home Jersey Player Version", sub:"Player Version", price:23, color:"#a30d16", accent:"#111" },
    { id:12, name:"Mens Liverpool 2025/26 Home Jersey Player Version", sub:"Player Version", price:23, color:"#c8102e", accent:"#00b2a9" },
  ]},
  { title: "Retro Jersey", items: [
    { id:21, name:"Retro RCD Mallorca 2000/01 Home Jersey", sub:"Retro Jersey", price:21, color:"#c60b1e", accent:"#111" },
    { id:22, name:"Retro RCD Mallorca 1998/99 Home Jersey", sub:"Retro Jersey", price:21, color:"#b71c22", accent:"#111" },
    { id:23, name:"Retro CA Osasuna 1995/96 Home Jersey", sub:"Retro Jersey", price:21, color:"#c60b1e", accent:"#0b2f6b" },
    { id:24, name:"Retro CA Osasuna 1995/96 Away Jersey", sub:"Retro Jersey", price:21, color:"#7fd4e0", accent:"#111" },
    { id:25, name:"Retro CA Osasuna 1983/84 Home Jersey", sub:"Retro Jersey", price:21, color:"#c81f2b", accent:"#0b2f6b" },
    { id:26, name:"Retro Real Valladolid 1993/94 Home Jersey", sub:"Retro Jersey", price:21, color:"#4b2e91", accent:"#7a5cc0" },
    { id:27, name:"Retro AC Milan 1989/90 Home Jersey", sub:"Retro Jersey", price:21, color:"#a30d16", accent:"#111" },
    { id:28, name:"Retro Real Madrid 2001/02 Home Jersey", sub:"Retro Jersey", price:21, color:"#f4f5f8", accent:"#d4af37" },
    { id:29, name:"Retro Netherlands 1988 Home Jersey", sub:"Retro Jersey", price:21, color:"#ff6a13", accent:"#111" },
    { id:30, name:"Retro FC Barcelona 1998/99 Home Jersey", sub:"Retro Jersey", price:21, color:"#0b2f6b", accent:"#a50044" },
    { id:31, name:"Retro Juventus 1997/98 Home Jersey", sub:"Retro Jersey", price:21, color:"#ffffff", accent:"#111" },
    { id:32, name:"Retro Liverpool 1995/96 Home Jersey", sub:"Retro Jersey", price:21, color:"#c8102e", accent:"#ffffff" },
  ]},
];

window.SIZES = ["S","M","L","XL","XXL"];
