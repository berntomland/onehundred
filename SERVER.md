# Serveroppsett — fest-i-skjærgården

## Oversikt

| | |
|---|---|
| **URL** | https://beom.no |
| **Server** | 178.105.104.175 (Ubuntu 24.04 LTS) |
| **SSH-tilgang** | `ssh -i ~/.ssh/uaf_deploy root@178.105.104.175` |
| **Installert i** | `/var/www/fest-i-skjaergarden/` |
| **Webserver** | nginx |
| **Sertifikat** | Let's Encrypt — utløper 2026-08-04 (fornyes automatisk) |

---

## Installasjon av nettsiden

Siden er bygget lokalt med Vite og deployet som statiske filer.

### Bygg og deploy (ved oppdateringer)

```bash
# Kopier kildefiler til server og bygg der (Node 20 er installert på server)
scp -i ~/.ssh/uaf_deploy -r src public package.json package-lock.json \
    vite.config.ts tsconfig*.json index.html \
    root@178.105.104.175:/tmp/fest/

ssh -i ~/.ssh/uaf_deploy root@178.105.104.175 "
  cd /tmp/fest &&
  npm ci &&
  npm run build &&
  cp -r dist/* /var/www/fest-i-skjaergarden/
"
```

### Filstruktur på server

```
/var/www/fest-i-skjaergarden/   ← webroot (innhold fra dist/)
/etc/nginx/sites-available/fest ← nginx-konfigurasjon
/etc/nginx/sites-enabled/fest   ← symlink til ovenfor
/etc/letsencrypt/live/beom.no/  ← TLS-sertifikat (administrert av Certbot)
```

---

## HTTPS med Let's Encrypt

### Hva ble gjort

1. **Installert Certbot** med nginx-plugin:
   ```bash
   apt install certbot python3-certbot-nginx
   ```

2. **Oppdatert nginx** til å bruke domenenavn i stedet for `_`:
   ```nginx
   server_name beom.no www.beom.no;
   ```

3. **Utstedt sertifikat** og konfigurert nginx automatisk:
   ```bash
   certbot --nginx -d beom.no --non-interactive --agree-tos \
       -m bernt@machina.no --redirect
   ```
   Certbot gjorde automatisk:
   - Utstedte sertifikat fra Let's Encrypt
   - La til HTTPS-lytter på port 443 i nginx-konfigurasjonen
   - La til redirect fra HTTP (port 80) → HTTPS (port 443)
   - Satte opp automatisk fornyelse via systemd-timer

### Automatisk fornyelse

Certbot installerer en systemd-timer som fornyer sertifikatet automatisk før det utløper. Verifiser med:

```bash
systemctl status certbot.timer
```

Manuell fornyelsestest:
```bash
certbot renew --dry-run
```

---

## nginx-konfigurasjon

`nginx.conf` i prosjektroten ble brukt som utgangspunkt. Certbot har utvidet denne på serveren med HTTPS-blokker. Se gjeldende konfigurasjon på serveren:

```bash
cat /etc/nginx/sites-available/fest
```

### Porter i bruk på serveren

| Port | Tjeneste |
|------|----------|
| 80 | nginx — HTTP (redirecter til 443) |
| 443 | nginx — HTTPS (beom.no) |
| 8080 | WildFly HTTP |
| 8081 | nginx — alternativ HTTP-port (kan avvikles) |
| 8443 | WildFly HTTPS |

---

## DNS

| Post | Type | Verdi |
|------|------|-------|
| `beom.no` | A | 178.105.104.175 |
| `www.beom.no` | A | 178.105.104.175 *(ikke satt opp ennå)* |