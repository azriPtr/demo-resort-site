import { facts, formatPrice } from './facts';

/**
 * Every public page, with its search title and meta description.
 *
 * Keeping these in one list (instead of inside each page file) means the
 * header nav, the footer, llms.txt and the SEO gate all read the same titles,
 * and a duplicate title or description is visible at a glance.
 *
 * /build-from-brief rewrites this file from the page list in client/brief.md.
 */
export interface PageMeta {
  path: string;
  /** <title> before the " | Business" suffix. Under ~50 characters. */
  title: string;
  /** Meta description, 70-160 characters, specific to this page. */
  description: string;
  /** Label in the header nav. Omit to keep the page out of the nav. */
  nav?: string;
}

// Numbers, prices and hours in titles and descriptions come from facts, so a price change updates search snippets too.
const { business: biz, rooms, dining, spa } = facts;
const room = (id: string) => rooms.find((r) => r.id === id)!;
const riceField = room('rice-field-villa');
const familyPool = room('family-pool-villa');
const fromPrice = formatPrice(Math.min(...rooms.map((r) => r.priceFrom)));
const treatmentNames = spa!.treatments
  .map((t, i) => (i === 0 ? t.name : t.name.toLowerCase()))
  .join(', ')
  .replace(/, ([^,]*)$/, ' and $1');
const hoursText = (h: { opens: string; closes: string }[]) => `${h[0].opens} to ${h[0].closes}`;

export const pages = {
  // Query intent: "rice field view villa Ubud".
  home: {
    path: '/',
    title: 'Small resort in Ubud with Rice Field Villas',
    description: `A small resort in Ubud, Bali. The ${riceField.name} has a ${riceField.features[0].toLowerCase()} and a ${riceField.features[1].toLowerCase()}. Breakfast included.`,
    nav: 'Home',
  },
  // Query intents: "villa with private pool Ubud", "family villa Ubud".
  rooms: {
    path: '/villas',
    title: 'Family villa with private pool in Ubud',
    description: `${rooms.length} villa types in Ubud, from ${fromPrice} a night with breakfast. The ${familyPool.name} sleeps ${familyPool.maxGuests}, with ${familyPool.features[0].toLowerCase()} and a ${familyPool.features[1].toLowerCase()}.`,
    nav: 'Villas',
  },
  dining: {
    path: '/dining',
    title: `${dining!.name}, ${dining!.cuisine[0]} food in Ubud`,
    description: `${dining!.name} serves ${dining!.cuisine.join(' and ')} food daily, ${hoursText(dining!.hours)}, and non-guests are welcome. The menu with prices.`,
    nav: 'Restaurant',
  },
  // Query intent: "Balinese massage Ubud".
  spa: {
    path: '/spa',
    title: `Balinese massage in Ubud at ${spa!.name}`,
    description: `${treatmentNames} at ${spa!.name} in Ubud. Open daily, ${hoursText(spa!.hours)}. Durations and prices.`,
    nav: 'Spa',
  },
  contact: {
    path: '/contact',
    title: 'Send an enquiry',
    description: `Send ${biz.name} your dates and villa. We reply to every enquiry within one working day. Address, phone, email and directions.`,
    nav: 'Contact',
  },
} satisfies Record<string, PageMeta>;

/** Internal pages: noindex, out of the sitemap, out of llms.txt. */
export const internalPages = {
  kit: {
    path: '/kit',
    title: 'Section catalog',
    description: 'Every section in the agency site kit, rendered with the current client facts and tokens.',
  },
  enquirySent: {
    path: '/enquiry-sent',
    title: 'Enquiry sent',
    description: 'Confirmation page shown after the enquiry form is sent without JavaScript.',
  },
  notFound: {
    path: '/404',
    title: 'Page not found',
    description: 'This page does not exist.',
  },
} satisfies Record<string, PageMeta>;

export const navItems = Object.values(pages as Record<string, PageMeta>).filter((p) => p.nav);

/** Header call to action: the enquiry form. The client asked for no WhatsApp (client/brief.md, Goal of the site). */
export const headerCta = { label: 'Send an enquiry', href: `${pages.contact.path}#enquire`, external: false };
