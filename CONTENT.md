# Content checklist — turning placeholders into proof

The site is built so that **every placeholder is honest**: where a real asset is
missing you get a generated diagram, a gradient, or initials. Nothing falls back
to a stock photo, and nothing invents a client name.

That also means the site currently makes **no verifiable claims**. This file is
the list of things only you can supply, roughly in order of what moves a buyer.

---

## 1. Name two or three clients (highest impact)

All six case studies currently read `Confidential — …`. One named client beats
any amount of design work.

**Ask for it like this** (email or WhatsApp to a happy client):

> Hi <name> — we're refreshing our site and would like to include the <project>
> work as a short case study. Nothing commercially sensitive: the problem, our
> approach, and the outcome metrics we already share with you. Two options:
>
> 1. Named — "<Company>" appears with your logo.
> 2. Anonymous — "a regional freight operator", no logo.
>
> Happy with either. Can you reply with which you prefer? If named, could you
> confirm the company name exactly as you'd like it written?

Keep the reply. That is your permission record.

**Then edit** [`src/content/case-studies.ts`](src/content/case-studies.ts) — add
`namedClient` to that study:

```ts
{
  slug: "logistics-control-tower",
  client: "Confidential — mid-market freight operator", // keep as the fallback
  namedClient: { name: "Acme Freight", href: "https://acme.example" },
  ...
}
```

The case study page shows `namedClient` when present and falls back to `client`
when not. Nothing else needs changing.

---

## 2. Put a name and a face on two testimonials

All five quotes are role-only ("Operations lead"). Same permission email as
above works — ask if they'll be quoted by name.

**Then edit** [`src/content/testimonials.ts`](src/content/testimonials.ts):

```ts
{
  quote: "They sat with dispatchers for weeks before writing code…",
  name: "Operations lead",          // stays as the anonymous fallback
  role: "Head of Operations",
  initials: "SK",
  attributed: {
    slug: "sara-khan",              // → public/media/testimonials/sara-khan.jpg
    fullName: "Sara Khan",
    company: "Acme Freight",
    href: "https://acme.example",   // optional
  },
}
```

Drop the headshot at `public/media/testimonials/sara-khan.jpg`. If the file
isn't there you still get the name and company, with initials in place of the
photo. The section heading changes automatically once any quote is attributed.

---

## 3. Photograph the team

Sixteen people currently show as initials (UJ, HM, BR…). Initials look
deliberate, so this is not urgent — but real faces sell a senior-led studio.

- `public/media/team/{slug}.jpg` — square, 800×800 or larger
- Slugs are in [`src/content/team.ts`](src/content/team.ts): `umer-javed`,
  `hira-mansoor`, `bilal-rashid`, `sana-tariq`, `ahmed-shafiq`, …

One lighting setup, plain wall, same framing for everyone. Consistency matters
more than production value. No code change — drop the files and refresh.

---

## 4. Photograph the studio

Used on the About page. Missing files render as a flat navy block with a note.

- `public/media/studio/studio.jpg` — wide, 2000px+ (the About hero)
- `public/media/studio/whiteboarding.jpg`
- `public/media/studio/pods.jpg`
- `public/media/studio/reviews.jpg`
- `public/media/studio/launch.jpg`

---

## 5. Case-study and practice covers

Both currently render generated diagrams, which is a defensible look — the
homepage even says so ("Covers are diagrams unless a client has released a
still"). Only replace these where a client has cleared a real screenshot.

- `public/media/work/{slug}.jpg` — 1200×800 card cover
- `public/media/work/{slug}-hero.jpg` — 1600×900 wide crop
- `public/media/solutions/{slug}.jpg` — 1400×880

---

## 6. Client logos — only real ones

`public/media/clients/{name}.svg`

There is deliberately **no logo strip on the site right now**. A set of invented
company names (NovaTech, BrightPath, CloudVerve…) used to sit in the codebase
unused; it has been removed so it can never ship by accident. Add a logo strip
back only once you have logos you are permitted to display.

---

## Ground rule

Do not fill any of these with stock imagery or invented names. A prospect who
recognises a stock face or a fake logo stops trusting every other number on the
page, including the ones that are true. Initials and diagrams are the better
placeholder — they are honest, and they look intentional.
