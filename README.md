## Integración de clientes potenciales (Leads) con facebook Webhooks

## Pasos de configuración

# 1. Configuración de webhooks
# 1.1 Crear punto de conexión
Servidor seguro que pueda procesar solicitudes HTTPS, este repositorio cuenta con el código de ejemplo con las rutas y configuraciones necesarias usando express.

# 1.2 Configurar el producto Webhooks
Para esto se debe crear una aplicación en [facebook developers](https://developers.facebook.com/apps/), y agregar el producto Webhooks.
![Producto Webhooks](https://github.com/DonovanSB/webhooks/blob/main/assets/webhooks-product.png)

Posteriormente, se realiza la suscripción al webhook deseado, en este caso se selecciona Page y se hace la suscripción a ese objeto
![Page Webhook](https://github.com/DonovanSB/webhooks/blob/main/assets/page-subs.png)

En este paso es necesario una url de devolución de llamada y token de verificación definido por el usuario.
Ejemplo:

url de verificación:
```
https://kuepa-webhooks.herokuapp.com/facebook
```
