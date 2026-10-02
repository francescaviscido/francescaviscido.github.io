# Francesca Viscido — GitHub Pages / Jekyll

Template statico pronto per GitHub Pages, costruito con **Jekyll** per poter pubblicare facilmente nuove news/articoli in **Markdown**.

## Cosa contiene

- Home responsive con profilo, esperienza, formazione e contatti
- Palette e immagine coordinate all’illustrazione fornita
- Foto profilo nella hero con crop circolare
- Blog Jekyll con 4 articoli di esempio in Markdown
- Immagini dedicate per ciascun articolo del blog
- Template per nuovi articoli in `_drafts/nuovo-articolo.md`
- Modulo contatti tramite Web3Forms
- Banner e pannello **Gestisci consenso cookie**
- Menu mobile, animazioni leggere e accessibilità di base
- Nessun numero di telefono, indirizzo di residenza/domicilio o altro dato sensibile del CV pubblicato nel sito

## 1. Pubblicazione rapida su GitHub Pages

1. Crea un repository, per esempio `francescaviscido.github.io`.
2. Carica **tutto il contenuto di questa cartella** nella root del repository.
3. Vai in `Settings → Pages`.
4. In **Build and deployment**, scegli `Deploy from a branch`.
5. Seleziona `main` e `/ (root)`, poi salva.
6. Attendi il completamento del deploy.

Se invece usi un repository di progetto, ad esempio `portfolio`, imposta in `_config.yml`:

```yml
url: "https://USERNAME.github.io"
baseurl: "/portfolio"
```

Per un repository utente del tipo `USERNAME.github.io`, lascia `baseurl: ""`.

## 2. Attivare il modulo Web3Forms

1. Vai su <https://web3forms.com/> e crea la tua Access Key.
2. Apri `_config.yml`.
3. Sostituisci:

```yml
web3forms_access_key: "YOUR_ACCESS_KEY_HERE"
```

con la chiave ricevuta.

Il form usa JavaScript per mostrare un messaggio di conferma senza ricaricare la pagina.

## 3. Gestione consenso cookie

Il sito include:

- banner iniziale di consenso;
- pulsanti **Accetta tutti**, **Rifiuta facoltativi** e **Gestisci**;
- finestra per scegliere preferenze, statistiche e marketing;
- salvataggio delle scelte in `localStorage`.

Se in futuro aggiungerai Google Analytics, Meta Pixel o altri script esterni, potrai usarli leggendo le preferenze salvate nel browser.

## 4. Pubblicare una nuova news / articolo Markdown

Duplica `_drafts/nuovo-articolo.md` nella cartella `_posts/` e rinomina il file in:

```text
YYYY-MM-DD-titolo-articolo.md
```

Esempio:

```text
2026-10-15-come-funziona-il-monitoraggio-dei-pensieri.md
```

La testata del file deve mantenere il front matter YAML:

```yml
---
layout: post
title: "Titolo"
description: "Breve descrizione"
category: "Categoria"
reading_time: "5 min"
image: "/assets/img/nome-immagine.png"
image_alt: "Descrizione dell'immagine"
---
```

Poi scrivi l’articolo normalmente in Markdown. Il post comparirà automaticamente nella pagina Blog e, se è tra i tre più recenti, anche nella home.

## 5. Personalizzazione

- Colori: `assets/css/style.css`, variabili all’inizio del file (`:root`)
- Foto profilo: `assets/img/francesca-viscido.jpg`
- Illustrazione hero: `assets/img/illustrazione-terapia.png`
- Immagini blog: `assets/img/post-*.png`
- Esperienza e formazione: `index.html`
- Titolo e metadati: `_config.yml`
- Layout articoli: `_layouts/post.html`

## 6. Anteprima locale (facoltativa)

Se hai Ruby installato:

```bash
bundle exec jekyll serve
```

Apri poi `http://localhost:4000`.

## Privacy

Il template usa solo informazioni professionali selezionate dal CV. Prima della pubblicazione definitiva, rileggi comunque ogni testo e verifica che corrisponda alle informazioni che desideri rendere pubbliche.
