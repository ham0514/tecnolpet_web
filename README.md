# Tecnolpet S.A. — sitio web

Sitio corporativo bilingüe (ES por defecto / EN) construido con Vite + React + TypeScript. Diseñado para desplegarse en hosting compartido cPanel como archivos estáticos + un endpoint PHP para formularios.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

La salida queda en `dist/`.

## Despliegue en cPanel

1. Ejecutar `npm run build` en su máquina.
2. Subir **todo el contenido** de `dist/` a `public_html/` (FTP / File Manager).
   - Incluye `.htaccess`, `index.html`, `assets/`, `favicon.png`, `robots.txt` y `api/contact.php`.
3. Editar en `public_html/api/contact.php` las variables `$to` / `$from` si el correo del dominio es distinto.
4. Probar rutas (`/servicios`, `/contacto`, etc.) y el switch ES/EN.
5. Enviar un mensaje de prueba desde Contacto.

### Notas

- El `.htaccess` reescribe rutas al `index.html` (SPA).
- Los formularios hacen `POST` a `/api/contact.php` usando `mail()` de PHP.
- Algunos servidores cPanel requieren configurar el remitente del dominio (`noreply@tecnolpet.com`) en la zona de email.

## Idiomas

- Predeterminado: español (`es`)
- Alternativa: inglés (`en`)
- Preferencia guardada en `localStorage` (`tecnolpet-lang`)

## Estructura

- `src/pages` — páginas del sitio
- `src/components` — layout, logo, formularios
- `src/i18n/locales` — textos ES/EN
- `src/assets/brand` — logos oficiales
- `api/contact.php` — handler de formularios
