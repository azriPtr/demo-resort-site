# Design mapping: Claude Design → kit

Source: Claude Design project `34b857ce-fcb8-4e1a-aee1-2a5567e8d6be` (Home, Villas, Restaurant, Spa, Contact,
SiteHeader, SiteFooter, Style Sheet, Overview). `image-slot.js` and `support.js` are the Claude Design preview
runtime (image placeholder widget, template renderer). They hold no design values and nothing from them is used.

Only the look moved across. No mockup copy, prices, villa names, sizes, hours or phone numbers were copied: those
come from `client/facts.yaml`, and several of them differ from the mockup already (the mockup has four villa types,
facts have three; the mockup's Garden Villa is 58 m², facts say 55 m²).

## Tokens

| Design name | Value | Token |
| --- | --- | --- |
| Paper | `#F6F2EA` | `--color-bg` |
| Sand | `#EDE6D8` | `--color-bg-alt` |
| Card / input fill | `#FFFDF9` | `--color-surface` |
| Volcanic stone | `#2B2924` | `--color-surface-dark` |
| Ink | `#24211C` | `--color-text` |
| Ink muted | `#5C554A` | `--color-text-muted` |
| Light on stone | `#EFEAE0` | `--color-text-on-dark` |
| Muted on stone | `#B8B0A2` | `--color-text-on-dark-muted` |
| Rice field | `#3D5A2F` | `--color-accent` |
| Rice field hover | `#2F4724` | `--color-accent-hover` |
| White on accent | `#FFFFFF` | `--color-text-on-accent` |
| Young rice (tint) | `#E3E6D3` | `--color-accent-tint` (new) |
| Leaf on tint | `#2B3A22` | `--color-text-on-tint` (new) |
| Line | `#D8CFBF` | `--color-border` |
| Input border | `#8E8576` | `--color-border-strong` (new) |
| Divider on stone | `#4A4740` | `--color-border-dark` |
| Radius 8 px (photos, cards) | `8px` | `--shape-card` |
| Radius 4 px (buttons, inputs) | `4px` | `--shape-btn` |
| Radius 999 px (tags, diet labels) | | `rounded-full` |
| Content width 1440 px | `90rem` | `--wrap` |

The kit had no names for the tag tint or the input border, so three tokens were added in `tokens.css` and bridged
in `global.css` (`bg-tint`, `text-ontint`, `border-line-strong`). The type scale from the style sheet is in
`tokens.css` as `--size-hero`, `--size-h1`, `--size-h2`, `--size-h3`, `--size-lead`, used as `text-hero` …
`text-lead`.

Fonts (`astro.config.mjs`, Fontsource, static, normal style only): Newsreader 400 for headings, Instrument Sans
400 and 600 for everything else. These are the only weights the design uses. `font-medium` (500) was replaced with
`font-semibold` in the components so no unloaded weight is requested.

Spacing: `wrap` gutter is now `clamp(20px, 5vw, 72px)` and `section-y` is `clamp(64px, 9vw, 128px)`, the design's
390 px and 1440 px values.

## Contrast

All pairs the design uses pass WCAG AA as given, so no colour was changed.

| Pair | Ratio | Needs |
| --- | --- | --- |
| Ink on paper | 14.4:1 | 4.5 |
| Ink on sand | 12.9:1 | 4.5 |
| Muted on paper | 6.6:1 | 4.5 |
| Muted on sand | 5.9:1 | 4.5 |
| Muted on surface | 7.2:1 | 4.5 |
| Accent on paper (links, labels, key figures) | 7.0:1 | 4.5 |
| Accent on sand | 6.3:1 | 4.5 |
| White on accent (primary button) | 7.8:1 | 4.5 |
| White on accent hover | 10.3:1 | 4.5 |
| Leaf on tint (tags, notice bar) | 9.6:1 | 4.5 |
| Light on stone (footer, CTA heading) | 12.1:1 | 4.5 |
| Muted on stone (footer labels, CTA text) | 6.8:1 | 4.5 |
| Ink on paper (button on dark band) | 14.4:1 | 4.5 |
| Input border on paper (non-text) | 3.3:1 | 3 |
| Input border on surface (non-text) | 3.6:1 | 3 |

Hero text sits on a photo; the kit's gradient (black 75% at the bottom) is kept, which is darker than the
design's 66%.

## Blocks

| Design block | Page(s) | Kit section | Notes |
| --- | --- | --- | --- |
| Notice bar | all | `BaseLayout` (`site.notice`) | Now tint with leaf text, as designed |
| SiteHeader | all | `layout/SiteHeader` | 80 px row from 900 px; below that logo and button, then a scrolling nav row |
| Full-bleed hero with h1 and lead | Home | `Hero` `layout="overlay"` | |
| Page header: eyebrow, h1, lead beside it, wide photo band | Villas, Restaurant, Spa | `Hero` `layout="stacked"` (new layout) | |
| Page header without photo | Contact | `Hero` `layout="stacked"` | See departures |
| About: heading left, copy right, key-figure row | Home | `Intro` | Key facts render large in accent, label below |
| Villa cards (3 up) | Home | `RoomList` `layout="cards"` (new layout) | `more` prop for the "see all" link |
| Villa rows: photo, spec strip, tags, price, Enquire | Villas | `RoomList` `layout="rows"` (default) | |
| Kitchen / spa photo beside copy | Home | `SplitFeature` (`tone="alt"` for the sand band, `reverse` for spa) | Photo 5:4, first paragraph ink, rest muted |
| Gallery bento | Home | `Gallery` | First photo 2×2, four columns from 768 px |
| Location: address, directions list, button, map | Home, Contact aside | `Location` | Directions go in the slot as a `<dl>` |
| Dark closing band | Home, Restaurant, Spa | `CtaBand` | 52 px light button |
| Opening hours tiles | Restaurant, Spa | `HoursList` (inside `MenuList` / `TreatmentList`) | |
| Menu with diet legend and V / VG / GF pills | Restaurant | `MenuList` | Legend lists only the labels the menu uses |
| Treatment list | Spa | `TreatmentList` | |
| FAQ accordion | Villas, Contact | `Faq` | Still `<details>`, no JS |
| Enquiry form | Contact | `Enquiry` + `islands/EnquiryForm` | 48 px fields, strong border, 52 px submit |
| SiteFooter | all | `layout/SiteFooter` | Four columns, then nav and © row |

## Departures and why

- **Contact page header has no photo in the design.** `Hero` always needs an image (the h1 lives there and the
  photo is the LCP). The contact page can use `layout="stacked"` with a photo, or `/build-from-brief` can decide.
- **No map image** on Home location or the Contact aside. The kit deliberately has no Google Maps iframe
  (third-party script, performance gate) and there is no static map asset. The address, contacts and a
  "Get directions" link to Maps fill that column instead.
- **Contact aside ("Where we are") is not part of `Enquiry`.** The page can place `Location` under the form. The
  enquiry section keeps the kit's heading-beside-form layout.
- **Villa names are `h3`, not `h2`.** The design gives each villa an `h2` on the Villas page; the kit rule is
  sections `h2`, items `h3`, under the section heading.
- **Menu item names stay a `<p>`** in the display face rather than the design's `h4`, so the menu does not add a
  fourth heading level.
- **Treatments are one flat list.** The design groups them (Massage, Body, Feet and hair); `facts.spa.treatments`
  has no category field. Grouping needs a schema change and the client's categories.
- **Hours tiles show days, not meal names.** The design labels tiles Breakfast / Lunch / Dinner with a note under
  each; `facts.dining.hours` only has days and times. Meal labels need a schema change.
- **Room cards have no description line.** Rooms in facts have no description field, so a card shows size, bed,
  sleeps and price only.
- **One muted colour on dark.** The design uses `#C9C1B3` for CTA body text and `#B8B0A2` for footer labels. The kit
  has one token; `#B8B0A2` was used for both (6.8:1).
- **Footer.** The design's reception-hours note and "arriving early" note are copy without a fact behind them, so
  they are left out. The footer tagline is `business.description` from facts.
- **Button heights.** 48 px default, 52 px on dark bands and the form submit, 44 px in the narrow header, as the
  design specifies, via a `size` prop on `Button`.
- **Hero lead on the overlay is white** (`text-onaccent`) as in the design, not the on-dark cream.
- **`/kit` does not yet show the new layouts** (`Hero` `stacked`, `RoomList` `cards`) because this change does not
  touch `src/pages/`. Add them to `/kit` when pages are built.
