# World Soccer Jerseys ⚽

Tienda web de camisetas de fútbol (proyecto estático demo) replicando la
estructura y el diseño del sitio **worldsoccerjerseys**.

## Características (fieles al original)

- **Cabecera** clara con logo (balón + 3 estrellas doradas), buscador central
  "Search for products…", selector de moneda (USD/EUR/GBP) con bandera,
  "Track Order" e iconos verdes circulares (cuenta, favoritos, carrito con contador).
- **Barra de navegación** con badges de liga: Home, Nation, DFL, EPL, La Liga,
  Ligue 1, Serie A, Primeira Liga, Clothing, Others.
- **Mega-menús** por liga con secciones **New Season / Retro / Training**
  (o Bundesliga / 2. Bundesliga en DFL) y **escudos** de cada club generados
  automáticamente con iniciales y color.
- **Hero** de 3 imágenes (Inter Miami/Messi, AC Milan, Man City) con botón "Shop Now".
- **Secciones de productos** (New Season, Retro Jersey) con barra de título,
  tarjetas con precio en verde `$XX.XX (USD)`, selector de talla y botón "Add to Cart",
  más "LOAD MORE PRODUCTS".
- **Carrito lateral** con persistencia en `localStorage`, cantidades y total.
- **Footer** azul marino con Payment System, Shipping System y Email, barra inferior de enlaces.
- **Botón flotante de WhatsApp** y diseño **responsive** (menú hamburguesa).

## Estructura

```
index.html
assets/
  css/styles.css
  js/data.js    # ligas, clubes y productos (demo)
  js/app.js     # nav, mega-menús, hero, carrito, UI
```

## Uso

Abre `index.html` en el navegador. Sin build ni dependencias.
Los escudos, productos y el pago son de demostración.
