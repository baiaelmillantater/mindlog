# MindLog

MindLog è una web app frontend in italiano per il supporto quotidiano tra paziente e psicologo.

## Accesso iniziale

- Psicologo: `martina`
- Password: `1234`

Gli account paziente si creano direttamente dall'area psicologo.

## Avvio in locale

Apri un terminale nella cartella del progetto ed esegui:

```bash
python3 serve.py
```

Poi apri:

```text
http://127.0.0.1:4173
```

## Deploy su Vercel

Il progetto usa frontend statico + API serverless.

- Framework preset: `Other`
- Build command: lasciare vuoto
- Output directory: lasciare vuoto

## Nota importante

L'app online sincronizza i dati tra dispositivi.

- Se imposti `DATABASE_URL`, MindLog usa Postgres come storage principale.
- Se `DATABASE_URL` non è presente, usa il fallback remoto cifrato su GitHub.
- Il `localStorage` resta solo come cache locale di supporto al frontend.
