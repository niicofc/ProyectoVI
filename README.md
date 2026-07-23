# World Soccer Jerseys ⚽

Página web de venta de camisetas de fútbol (proyecto estático demo), inspirada en la estructura de tiendas de jerseys tipo *worldsoccerjerseys*.

## Características

- **Cabecera** con top-bar (envío/moneda), buscador y accesos (cuenta, favoritos, carrito).
- **Menú de navegación** con mega-menú de Ligas (Europa, América, competiciones) y categorías: Clubes, Selecciones, Retro, Niños, Ofertas.
- **Hero** de temporada con llamadas a la acción.
- **Catálogo** de productos filtrable (Todas / Clubes / Selecciones / Retro) con:
  - selector de talla (S–XXL),
  - precios con descuento, badges (Nuevo, Retro, ofertas),
  - camisetas dibujadas en SVG por equipo.
- **Carrito lateral** (drawer) con persistencia en `localStorage`, cambio de cantidad y total.
- **Newsletter** y **footer** completo con enlaces y métodos de pago.
- Diseño **responsive** (menú hamburguesa en móvil) y accesible.

## Estructura

```
index.html
assets/
  css/styles.css
  js/data.js    # catálogo de productos (demo)
  js/app.js     # render, carrito, UI
```

## Uso

Abre `index.html` en el navegador. No requiere build ni dependencias.
Los datos de productos y pagos son de demostración.
