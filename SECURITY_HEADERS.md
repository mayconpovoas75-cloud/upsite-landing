# Production Security Headers

## Cabecalhos recomendados

- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Content Security Policy

Exemplo inicial:

```text
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob: https://*.googleusercontent.com https://platform-lookaside.fbsbx.com https://pbs.twimg.com https://*.twimg.com https://*.supabase.co;
connect-src 'self' ws: wss: https://*.supabase.co wss://*.supabase.co;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
manifest-src 'self';
```

## Observacoes

- Em producao, prefira reduzir dominos ao minimo necessario.
- As dependencias criticas do app devem sair no bundle local para evitar dependencia de CDN no runtime.
- Todo deploy deve usar HTTPS obrigatorio.
- Reavalie a CSP sempre que adicionar upload, analytics, monitoramento ou CDN externa.
