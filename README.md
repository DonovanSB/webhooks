## Integración de clientes potenciales (Leads) con facebook Webhooks

## Pasos de configuración

# 1. Configuración de webhooks
# 1.1 Crear punto de conexión
Servidor seguro que pueda procesar solicitudes HTTPS, este repositorio cuenta con el código de ejemplo con las rutas y configuraciones necesarias usando express.
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/DonovanSB/webhooks)
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
![Url devolución de llamada](https://github.com/DonovanSB/webhooks/blob/main/assets/subscription.png)

Adicionalmente, buscar el campo leadgen y realizar la suscripción
![Url devolución de llamada](https://github.com/DonovanSB/webhooks/blob/main/assets/lead-subs.png)

Además, es necesario instalar la aplicación usando el id de la pagina de facebook, siguiendo los pasos encontrados en [Webhooks for leads](https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-leadgen). El método mas simple es usando el [Graph API Explorer](https://developers.facebook.com/tools/explorer).


# 2. Generación de token sin caducidad
Los pasos para generar tokens de larga duración se pueden encontrar en siguiente [Enlace](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived#get-a-long-lived-page-access-token).

Además, también pueden ser creados desde el [Graph API Explorer](https://developers.facebook.com/tools/explorer). Para obtener un token de acceso de una pagina sin caducidad primero se debe generar un token de usuario, con los permisos
```
pages_show_list
leads_retrieval
pages_read_engagement
pages_manage_metadata
```
![User Token](https://github.com/DonovanSB/webhooks/blob/main/assets/user_token.png)

Posteriormente, con este access token se obtiene un long access token, mediante la siguiente consulta a la Api
```bash
curl -i -X GET "https://graph.facebook.com/{graph-api-version}/oauth/access_token?  
    grant_type=fb_exchange_token&          
    client_id={app-id}&
    client_secret={app-secret}&
    fb_exchange_token={your-access-token}" 
```
Ejemplo:
```bash
curl -i -X GET "https://graph.facebook.com/v14.0/oauth/access_token?  
    grant_type=fb_exchange_token&          
    client_id={app-id}&
    client_secret={app-secret}&
    fb_exchange_token={your-access-token}" 
```

Finalmente, se obtiene un token de acceso para la pagina de larga duración, mediante la siguiente consulta a la API
```bash
curl -i -X GET "https://graph.facebook.com/{graph-api-version}/{user-id}/accounts?
  access_token={long-lived-user-access-token}"
```

# 3. Obtención de leads
La obtención de los leads de Facebook se puede realizar con consultas a la Api o con el SDK, como se observa en el siguiente [Enlace](https://developers.facebook.com/docs/marketing-api/guides/lead-ads/retrieving?locale=es_LA).


# Enlaces de interés
* [Pagina de prueba de formularios (Leads Forms)](https://developers.facebook.com/tools/lead-ads-testing/)
* [Facebook Developers](https://developers.facebook.com/apps/)