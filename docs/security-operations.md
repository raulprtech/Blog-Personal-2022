# Operacion de seguridad

## Credenciales y acceso administrativo

La plantilla `.env.example` solo contiene valores vacios. Nunca guardar una clave
real en ella, en un commit, en capturas o en mensajes de chat.

Se revocaron las dos credenciales expuestas encontradas en el historial (Dev2 y
Viewer). Ambas devolvieron HTTP 401 al comprobarlas despues de revocarlas.
El historial no se reescribe por defecto. No se ha confirmado una intrusion;
la revision forense de actividad y el acceso administrativo a Netlify siguen
pendientes.

El dataset `a668buu6/production` permite actualmente consultas publicadas sin
autenticacion. Por ello `SANITY_API_READ_TOKEN` puede quedar vacia tanto en Netlify
como en `.env.local`. El sitio no envia credenciales en modo publico. Si el dataset
pasa a ser privado, configurar `SANITY_PRIVATE_DATASET=true` y una credencial Viewer
independiente. No configurar `SANITY_API_WRITE_TOKEN` ni `SANITY_AUTH_TOKEN` en
el sitio desplegado. Los scripts de mantenimiento pueden usar una clave de
escritura diferente, solo local y revocable.

Tras revocar, comprobar que la clave anterior es rechazada, sin imprimirla.
Revisar tambien tokens antiguos de newsletter, que ya no tienen consumidores.
Activar secret scanning y push protection en GitHub si estan disponibles para
el repositorio. El control `pnpm check:secrets` detecta patrones en los archivos
versionados, no reemplaza la revocacion ni una auditoria completa del historial.

## Webhook firmado de Sanity

El endpoint acepta unicamente `POST https://raulpacheco.dev/api/revalidate`.
No incluir secretos en la URL. Configurar un secreto aleatorio en el campo Secret
del webhook y el mismo valor en `SANITY_REVALIDATE_SECRET` de Netlify. Requiere
un nuevo despliegue cuando se cambia esa variable.

Se creo el webhook `Site signed revalidation` (`AOvtum2rUxY3BRIH`), inicialmente
desactivado. Su secreto aleatorio esta solo en el archivo local ignorado
`.env.local`, bajo `SANITY_REVALIDATE_SECRET`. Falta configurar ese mismo valor
en Netlify, desplegar y activar el webhook. No compartirlo en Git ni en el chat.
La version de API de la configuracion remota es `v2025-02-19`.

En Sanity habilitar Create, Update y Delete; deshabilitar borradores. Usar este
filtro y proyeccion GROQ para conservar el slug y las etiquetas anteriores:

```groq
coalesce(after()._type, before()._type) in [
  "siteSettings", "pageContent", "note", "project", "update", "researchItem",
  "paper", "credential", "resource", "talk", "venture", "trajectoryItem", "collaborator"
] && !(coalesce(after()._id, before()._id) in path("drafts.**"))
```

```groq
{
  "_type": coalesce(after()._type, before()._type),
  "slug": coalesce(after().slug.current, after().slug, before().slug.current, before().slug),
  "previousSlug": coalesce(before().slug.current, before().slug),
  "tags": coalesce(after().tags, []),
  "previousTags": coalesce(before().tags, []),
  "englishTags": coalesce(after().english.tags, []),
  "previousEnglishTags": coalesce(before().english.tags, [])
}
```

Sin secreto, el endpoint devuelve 503; sin firma valida, 401; cuerpos invalidos, 400. Ninguno regenera paginas. Se verifica la firma sobre el cuerpo original,
limitado a 32 KiB. Los fallos operativos no devuelven detalles internos.

La regeneracion incluye ambas lenguas, listas, detalles publicados, etiquetas,
paginacion y los slugs anteriores suministrados. Las paginas tienen ademas ISR
de 60 segundos. RSS y sitemap se generan en memoria, con cache de 60 segundos;
no escriben archivos durante solicitudes. Configurar/revisar el webhook remoto
requiere acceso administrativo, no basta con desplegar el codigo.

## Publicacion y disponibilidad

- Una coleccion vacia se muestra vacia. Una consulta fallida lanza un error para
  que ISR conserve la ultima pagina generada correctamente.
- Una pagina eliminada/despublicada devuelve 404. Se migraron sin reemplazar
  documentos existentes los textos e imagenes locales de Contacto, Charlas y Me
  a `page-contact`, `page-talks` y `page-me` (transaccion
  `P0xMBt77b2nIWKdlpT4ejy`). El hero y los documentos personalizados no se editaron.
- Borrar la configuracion global no restaura enlaces de redes, navegacion o CV
  de ejemplo.
- Los articulos migrados de `data/migratedBlogSlugs.json` tienen a Sanity como
  autoridad. Borrar o despublicar uno no recupera su copia MDX antigua.
- Los articulos locales no migrados conservan el soporte MDX, pero sus borradores
  y rutas ajenas al catalogo nunca se compilan ni se entregan al lector.
- Las consultas usan la perspectiva publicada y tienen un limite de 10 segundos.
- Navegacion, logo y footer llegan en las propiedades estaticas, sin una segunda
  peticion del navegador a `/api/site-settings`.

## CSP y contenido ejecutable

Solo se conserva Google Analytics. Se retiraron Hotjar, Plausible, Simple Analytics,
Umami, Netlify Identity/CMS y los endpoints antiguos de newsletters. FP32 sigue
siendo un enlace externo de suscripcion.

`script-src` conserva `unsafe-inline` por la hidratacion estatica de Next.js y
el cambio de tema; conserva `unsafe-eval` por `mdx-bundler/client`. Los archivos
MDX son codigo de confianza del repositorio, nunca entrada de visitantes ni
texto remoto del CMS. El CMS usa Portable Text, no compila JavaScript.

Para retirar estas excepciones se necesita reemplazar la evaluacion MDX en el
cliente y validar una estrategia de hashes/nonces compatible con ISR. No se
deben eliminar sin esa migracion. Las imagenes HTTPS externas siguen permitidas
en CSP para contenido existente; el optimizador solo permite Sanity del proyecto
y Cloudinary. `object-src`, `base-uri`, `form-action` y `frame-ancestors` estan
restringidos. Los enlaces se validan tanto en Studio como en el limite de lectura.

## Verificacion y despliegue

Auditoria del 4 de octubre de 2026, despues de actualizar y renovar ambos
lockfiles: sitio, 6 avisos (3 altos, 3 moderados); Studio, 9 (5 altos, 4 moderados).
No quedan avisos criticos en estas dos auditorias de dependencias de produccion.
No interpretar estos numeros como una garantia de ausencia de vulnerabilidades.

- Sitio: `toml` y `estree-util-value-to-estree` pertenecen al compilador MDX de
  archivos del repositorio; no reciben Portable Text del CMS ni cuerpos HTTP.
  Su sustitucion requiere migrar y probar el compilador, no forzar versiones
  incompatibles. No compilar MDX aportado por terceros sin revisarlo como codigo.
- `esbuild` conserva un aviso de su servidor de desarrollo; aqui se usa su API
  de compilacion, no `serve`. No exponer ese servidor.
- `uuid` tiene un aviso sobre buffers aportados a ciertos generadores. Las rutas
  HTTP propias del sitio no llaman esa API; Studio lo hereda en herramientas CLI.
- Studio: `adm-zip` aparece en las herramientas de compilacion/federacion de
  modulos, no en las rutas del sitio. Evitar importar archivos o plantillas ZIP
  no confiables hasta actualizar el consumidor compatible.
- `braces` afecta herramientas de glob/compilacion en ambos arboles. El aviso
  indica 3.0.4, pero esa version devolvio 404 en npm al verificarla; no se aplico
  un override a una version inexistente. No aceptar patrones de visitantes.
- ESLint queda fijado en 9.39.5: ESLint 10 fue probado y fallo por incompatibilidad
  del parser y plugins de `eslint-config-next`. Migrarlo al actualizar esa cadena.

Volver a ejecutar las auditorias antes de incorporar contenido ejecutable,
importadores o nuevas funciones de servidor. Los avisos restantes siguen abiertos.

```sh
pnpm install --frozen-lockfile
pnpm check:secrets
pnpm lint
pnpm test
pnpm build
pnpm --dir studio install --frozen-lockfile
pnpm --dir studio build
pnpm audit --prod
pnpm --dir studio audit --prod
```

El sitio usa Node 22, pnpm 11.11.0, Pages Router y Webpack; `pnpm dev` inicia
desarrollo y `pnpm start` sirve el build de produccion. Studio tiene su propio
lockfile. No utilizar npm install ni aprobar indiscriminadamente scripts nativos.

Las pruebas de navegador estan en `tests/browser-smoke.cjs`; requieren Playwright
y Chrome, y pueden usar `PLAYWRIGHT_MODULE` y `TEST_BASE_URL` para un runtime local.
Comprobar temas, movil/teclado, imagenes, favicon, metadatos, borradores y rutas
`/_next/data` despues del despliegue. No probar cargas maliciosas escribiendo en
el dataset de produccion.

Antes de promover un despliegue, conservar su identificador y el del anterior en
Netlify. Si falla, restaurar el ultimo despliegue validado desde Netlify, sin
restaurar credenciales revocadas. Una version previa vulnerable solo debe usarse
como contingencia temporal evaluada. La eliminacion del secreto se publico por
separado en `4f0079f`.
