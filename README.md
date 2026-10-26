# CD Aznalcóllar Fútbol Base · App interna

App para el móvil que conecta a los entrenadores con la junta directiva del club.

- **Entrenadores:** pasar lista, ver la plantilla y el calendario, pedir material o avisar de algo roto (con foto) y seguir cómo avanza cada petición.
- **Junta:** bandeja con todas las peticiones ordenadas por urgencia, cambio de estado, envío de avisos y quién los ha leído.

Es una app web instalable (PWA): se abre desde un enlace y se puede añadir a la pantalla de inicio del móvil, en iPhone y Android, sin pasar por las tiendas.

## Accesibilidad

Objetivo WCAG 2.2 AA. Letra Atkinson Hyperlegible (diseñada para baja visión), botones de 56 px o más, contraste alto en modo claro y oscuro, ajuste de "Letra grande" dentro de la app, textos de estado además del color y soporte para lector de pantalla.

## Probarla en tu ordenador

No necesita instalar nada para compilar. Desde esta carpeta:

```
python3 -m http.server 8000
```

y abre http://localhost:8000.

## Estado

Versión 1 de demostración: los datos son de ejemplo y se guardan solo en el propio móvil. El siguiente paso es conectar un servidor (cuentas de entrenadores, datos compartidos con la junta y notificaciones).
