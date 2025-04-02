
# Medical Office React Web Client

Este proyecto es un frontend exportado con Next.js (`output: 'export'`) y está diseñado para ser servido como un sitio estático utilizando **NGINX** dentro de Docker.

---

## 🧠 Problema que se resolvió

Cuando se accedía directamente a una ruta como `/home` y se presionaba **F5** (recarga del navegador), ocurría un error de redirección:

- El navegador pedía `/home`
- NGINX no encontraba esa carpeta (porque `next export` genera `home.html`, no `/home/index.html`)
- NGINX respondía con `301 Moved Permanently` redirigiendo a `/home/`
- Al perder el puerto (ej. `:3000`), la app dejaba de funcionar

---

## ✅ Solución aplicada

Se modificó el archivo `nginx.conf` con la siguiente configuración:

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    location ~ ^/[^\.]+$ {
        try_files $uri $uri.html $uri/ /index.html;
    }

    error_page 404 /index.html;
}
```

Esto asegura que:
- Las rutas como `/home`, `/paciente/123`, etc., funcionen como SPA
- No haya redirecciones erróneas ni errores 403/404 al refrescar
- Toda navegación sea redirigida correctamente a `index.html` como espera Next.js exportado

---

## 🚀 Comandos útiles

```bash
# Reconstruir imagen del frontend
docker-compose build frontend

# Levantar todo el entorno
docker-compose up -d
```

---

## 🧪 Verificación

1. Ir a `http://localhost:3000`
2. Navegar dentro de la app (por ejemplo, `/home`)
3. Refrescar manualmente en `/home` → ✅ Debe seguir funcionando

---

Made with 💻 by Raptor057 🦖
