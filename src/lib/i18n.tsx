"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "fr" | "en" | "tr";
export const LANG_PRICE: Record<Lang, number> = { fr: 0, en: 50, tr: 50 };

const dict = {
  fr: {
    "nav.work": "Réalisations",
    "nav.examples": "Exemples",
    "nav.studio": "Studio",
    "nav.experience": "Expérience",
    "nav.configurator": "Configurateur",
    "nav.contact": "Contact",
    "nav.cta": "Parler de votre projet",
    "footer.tag": "Sites web sur mesure, conçus à Paris.",
    "wa.greeting": "Bonjour Maisé Studio",

    "hero.kicker": "Maisé Studio — Paris",
    "hero.title": "Un site pensé pour votre métier, pas pour un thème générique.",
    "hero.subtitle":
      "Cafés, hôtels, cliniques, boutiques : nous dessinons des sites qui donnent envie d'entrer, et qui vendent.",
    "hero.cta1": "Voir nos projets",
    "hero.cta2": "Calculer mon prix",
    "hero.scroll": "Faites défiler",

    "brand.kicker": "Le Studio",
    "brand.title":
      "Nous construisons les sites que nos clients montrent avec fierté.",
    "brand.body":
      "Maisé Studio est une agence parisienne spécialisée dans les sites web haut de gamme. Restaurants, hôtels, cliniques, boutiques : à chaque projet, on cherche la même chose, une présence en ligne qui reflète vraiment le travail fait sur place.",
    "brand.v1.title": "Conçu sur mesure",
    "brand.v1.body":
      "Pas de template. Chaque site part de votre métier, de vos clients, de ce que vous voulez vraiment.",
    "brand.v2.title": "Un vrai métier technique",
    "brand.v2.body":
      "3D, animations, interactions : on garde la même exigence du premier croquis à la dernière ligne de code.",
    "brand.v3.title": "Pensé pour convertir",
    "brand.v3.body":
      "Un beau site qui ne vend rien ne sert pas à grand-chose. Chaque page est construite pour transformer une visite en client.",

    "geo.kicker": "Visibilité IA",
    "geo.title": "Trouvé par vos clients. Recommandé par leur IA.",
    "geo.body":
      "De plus en plus de gens demandent carrément à ChatGPT ou à Gemini où aller, avant même d'ouvrir Instagram. \"Le meilleur café du 10e\", \"un hôtel calme près de Bastille\"... Ces IA lisent des sites web, pas des stories qui disparaissent au bout de 24 heures. Si votre site n'est pas construit pour ça, vous n'existez tout simplement pas dans leur réponse.",
    "geo.tag":
      "On construit chaque site pour que Google et les IA le comprennent dès la mise en ligne, pas comme une option qu'on ajoute plus tard.",
    "geo.p1.title": "Référencement classique",
    "geo.p1.body": "Titres, balises, vitesse de chargement, structure des pages : les bases du SEO, faites sérieusement.",
    "geo.p2.title": "Compris par les IA",
    "geo.p2.body": "On ajoute les données structurées et le fichier llms.txt qui permettent aux assistants IA de comprendre ce que vous faites.",
    "geo.p3.title": "Rendu, pas caché",
    "geo.p3.body": "Le contenu est servi en vrai HTML, pas généré au dernier moment. Les robots le voient aussi bien que vos visiteurs.",
    "geo.p4.title": "Cité, pas juste classé",
    "geo.p4.body": "Être en première page Google ne suffit plus. L'objectif, c'est d'être la réponse que l'IA donne.",

    "services.kicker": "Ce que nous faisons",
    "services.title": "Stratégie. Design. Développement.",
    "services.body":
      "On s'occupe de tout, du premier croquis à la dernière animation. Pas seulement des maquettes, un site qui tourne vraiment.",
    "services.s1": "Design web",
    "services.s1desc": "Une identité visuelle pensée pour votre marque, pas un modèle recyclé.",
    "services.s2": "Développement web",
    "services.s2desc": "Un site rapide et solide, qui tient dans le temps — pas juste beau le jour du lancement.",
    "services.s3": "UX / UI",
    "services.s3desc": "Des parcours pensés pour que vos visiteurs trouvent ce qu'ils cherchent, sans effort.",
    "services.s4": "Direction créative",
    "services.s4desc": "Photos, ton, mise en page : une direction cohérente du premier pixel au dernier mot.",
    "services.s5": "SEO / Visibilité IA",
    "services.s5desc": "Structuré pour Google et compris par les assistants IA dès la mise en ligne.",
    "services.s6": "Suivi & maintenance",
    "services.s6desc": "Le site évolue avec vous : mises à jour, ajustements, assistance après la mise en ligne.",
    "services.seeAll": "Voir tous nos services →",

    "process.kicker": "Notre méthode",
    "process.title": "De l'idée au site en ligne.",
    "process.body":
      "Un projet Maisé avance toujours de la même façon : simple, sans mauvaise surprise, du premier échange jusqu'à la mise en ligne.",
    "process.step1.title": "Le brief",
    "process.step1.body":
      "On parle de votre métier, de vos clients, de ce que ce site doit vraiment faire pour vous. Pas de formulaire à remplir, une vraie discussion.",
    "process.step2.title": "La direction artistique",
    "process.step2.body":
      "On vous montre une première direction visuelle, pensée pour votre marque. Vous réagissez, on ajuste, jusqu'à ce que ce soit vraiment juste.",
    "process.step3.title": "Le développement",
    "process.step3.body":
      "Le site prend forme pour de vrai, plus en maquette. Animations, formulaires, intégrations : on teste tout au fur et à mesure.",
    "process.step4.title": "La mise en ligne",
    "process.step4.body":
      "Domaine, hébergement, dernières vérifications. Vous repartez avec un site qui vous appartient, prêt pour vos clients.",

    "studio.visual1": "L'esprit Maisé : sobre, chaleureux, soigné jusque dans les détails.",
    "studio.visual2": "Stratégie, design, développement : la même méthode à chaque étape du projet.",

    "cap.kicker": "Ce que nous savons construire",
    "cap.c1": "Réservations",
    "cap.c2": "Menus en ligne",
    "cap.c3": "Google Maps",
    "cap.c4": "Formulaires de contact",
    "cap.c5": "Intégration WhatsApp",
    "cap.c6": "E-commerce",
    "cap.c7": "Catalogues produits",
    "cap.c8": "Sites multilingues",
    "cap.c9": "CMS",
    "cap.c10": "Configurateurs interactifs",

    "sv.c1.kicker": "Mise en scène",
    "sv.c1.title": "Une histoire, racontée au scroll.",
    "sv.c1.body":
      "Chaque marque a sa propre narration visuelle. On la construit pour qu'elle capte l'attention dès la première seconde.",
    "sv.c2.kicker": "Navigation",
    "sv.c2.title": "Le scroll devient un vrai parcours.",
    "sv.c2.body":
      "Au-delà de la vidéo, le défilement peut guider le visiteur à travers votre contenu, comme une visite guidée.",
    "sv.c3.kicker": "Résultat",
    "sv.c3.title": "Ce niveau, pour votre marque.",
    "sv.c3.body":
      "Ce que vous voyez ici n'est pas une démonstration abstraite : c'est exactement ce que nous livrons à nos clients.",

    "album.kicker": "Un savoir-faire, en images",
    "album.title": "Des univers différents, une même exigence.",
    "album.i1": "Beauté",
    "album.i2": "Architecture",
    "album.i3": "Café",
    "album.i4": "Opticien",
    "album.i5": "Restaurant",
    "album.i6": "Hôtellerie",
    "album.i7": "Multi-marques",

    "responsive.kicker": "Conçu pour chaque écran",
    "responsive.title": "Pensé à chaque point de rupture.",
    "responsive.body":
      "Le mobile, ce n'est pas juste un site desktop rétréci. Chaque format a sa propre composition, pensée pour la façon dont on l'utilise vraiment.",

    "menu.kicker": "Exemple — Menu en ligne",
    "menu.title": "Si vous aviez un menu, voici à quoi il ressemblerait.",
    "menu.body":
      "Un exemple de menu construit avec notre système de design. Catégories, prix, descriptions : tout se personnalise pour votre carte à vous.",
    "menu.cat1": "Cafés & Boissons",
    "menu.cat2": "Pâtisseries",
    "menu.item1": "Espresso",
    "menu.item2": "Cappuccino Maisé",
    "menu.item3": "Latte à la vanille",
    "menu.item4": "Chocolat chaud maison",
    "menu.item5": "Croissant au beurre",
    "menu.item6": "Tarte au citron",
    "menu.item7": "Fondant au chocolat",
    "menu.item8": "Cookie amande-noisette",

    "maps.kicker": "Exemple — Localisation",
    "maps.title": "Votre adresse, mise en valeur.",
    "maps.body":
      "Une carte intégrée directement dans votre site, pour que vos clients vous trouvent sans quitter la page. Ici, un exemple centré sur Paris.",
    "maps.cta": "Ouvrir dans Google Maps",
    "map.activate": "Cliquez pour interagir avec la carte",

    "config.kicker": "Configurateur en direct",
    "config.title": "Composez votre site, en temps réel.",
    "config.subtitle":
      "Trois choix suffisent. Le design, le contenu et le prix changent instantanément sous vos yeux.",
    "config.step1": "Votre métier",
    "config.step2": "Le niveau",
    "config.step3": "Langues en plus",
    "config.multilingual": "Site multilingue",
    "config.multilingual.hint": "Ajoutez d'autres langues à votre site — le prix s'ajuste automatiquement.",
    "config.includedLang": "Langue incluse",
    "config.price": "Investissement estimé",
    "config.priceNote": "Prix indicatif · devis final sur mesure",
    "config.try.badge": "Prix de lancement — Turquie",
    "config.try.note": "Prix indicatif en TL · devis final sur mesure",
    "config.cta": "Recevoir ce devis",
    "config.essentiel.caption": "Propre, rapide, efficace. L'essentiel, mais bien fait.",
    "config.signature.caption":
      "Motion, liquid glass, mise en scène complète. C'est le niveau Signature.",
    "biz.cafe.name": "Café & Restaurant",
    "biz.cafe.desc": "Menu, ambiance, réservation",
    "biz.clinic.name": "Clinique & Beauté",
    "biz.clinic.desc": "Confiance, soin, rendez-vous",
    "biz.hotel.name": "Hôtel & Boutique",
    "biz.hotel.desc": "Image forte, vitrine, réservation",
    "tier.essentiel.name": "Essentiel",
    "tier.essentiel.tag": "Site vitrine, propre et rapide",
    "tier.signature.name": "Signature",
    "tier.signature.tag": "Motion, 3D, liquid glass — l'expérience complète",
    "lang.fr": "Français",
    "lang.fr.note": "Inclus",
    "lang.en": "Anglais",
    "lang.tr": "Turc",

    "contact.kicker": "Contact",
    "contact.title": "Parlons de votre projet.",
    "contact.subtitle": "Réponse en moins de 3h, tous les jours. Basés à Paris.",
    "contact.whatsapp": "Écrire sur WhatsApp",
    "contact.hours.label": "Horaires",
    "contact.hours.value": "Tous les jours, 9h–19h",
    "contact.location.label": "Basés à",
    "contact.location.value": "Paris, France",
    "contact.team.label": "L'équipe",
    "footer.rights": "Tous droits réservés.",

    "contactform.name": "Nom",
    "contactform.company": "Entreprise",
    "contactform.email": "E-mail",
    "contactform.phone": "Téléphone",
    "contactform.project": "Que construisez-vous ?",
    "contactform.selectProject": "Choisissez une catégorie",
    "contactform.opt.restaurant": "Restaurant",
    "contactform.opt.cafe": "Café",
    "contactform.opt.hotel": "Hôtel",
    "contactform.opt.clinic": "Clinique / Beauté",
    "contactform.opt.retail": "Boutique / Retail",
    "contactform.opt.other": "Autre",
    "contactform.budget": "Formule souhaitée",
    "contactform.selectBudget": "Choisissez une formule",
    "contactform.opt.custom": "Projet sur mesure",
    "contactform.message": "Message",
    "contactform.submit": "Envoyer sur WhatsApp",
    "contactform.note": "Ouvre votre messagerie avec les détails pré-remplis.",
    "contactform.or": "ou",
    "contactform.whatsappAlt": "Vous préférez WhatsApp ? Écrivez-nous directement",

    "realwork.kicker": "Sites livrés",
    "realwork.title": "Pas des maquettes. De vrais sites, en ligne.",
    "realwork.body":
      "Quatre projets que nous avons conçus et développés récemment. Cliquez pour visiter le site réel.",
    "realwork.route95": "Restaurant · Kağıthane",
    "realwork.bloom": "Atelier · Los Angeles",
    "realwork.le40": "Bar à cocktails · Paris",
    "realwork.voler": "Café · Istanbul",
    "badge.realProject": "Projet réel",

    "projectframe.back": "Retour au portfolio",
    "projectframe.live": "Aperçu en direct — projet Maisé Studio",
    "projectframe.cta": "Obtenir un site similaire",

    "footer.ctaTitle": "Votre entreprise mérite mieux qu'un site générique.",
    "footer.ctaButton": "Démarrer votre projet",

    "examples.kicker": "Exemples",
    "examples.title": "Voici ce que votre site pourrait faire.",
    "examples.body":
      "Ce ne sont pas nos projets, ce sont des démonstrations. Chaque module montre un aperçu de ce qu'on peut construire pour vous.",
    "examples.ctaTitle": "Autre chose en tête ?",
    "examples.ctaButton": "Échanger sur votre projet",

    "transition.menuToMap": "Un menu qui donne envie. Une adresse qu'on trouve sans effort.",

    "booking.kicker": "Exemple — Réservation",
    "booking.title": "Un rendez-vous pris en quelques secondes.",
    "booking.body":
      "Service, date, créneau, coordonnées : une prise de rendez-vous que vos clients terminent sans même y réfléchir.",
    "booking.svc1": "Coupe",
    "booking.svc2": "Soin visage",
    "booking.svc3": "Consultation",
    "booking.step1": "Service",
    "booking.step2": "Date",
    "booking.step3": "Créneau",
    "booking.month": "Août",
    "booking.continue": "Continuer",
    "booking.back": "← Retour",
    "booking.name": "Nom",
    "booking.email": "E-mail",
    "booking.confirm": "Confirmer le rendez-vous",
    "booking.confirmedTitle": "Rendez-vous confirmé.",
    "booking.confirmedBody": "Démonstration — aucune réservation réelle n'a été prise.",

    "payment.kicker": "Exemple — Paiement",
    "payment.title": "Un acompte, encaissé proprement.",
    "payment.body":
      "Dépôt de garantie, achat, réservation avec acompte : un parcours de paiement fluide, qui rassure.",
    "payment.summaryLabel": "Récapitulatif",
    "payment.service": "Soin visage",
    "payment.total": "Total",
    "payment.depositToday": "Acompte aujourd'hui",
    "payment.remaining": "Solde au rendez-vous",
    "payment.continue": "Continuer vers le paiement",
    "payment.demoNote": "Démonstration visuelle — aucun paiement réel n'est traité.",
    "payment.applePay": " Pay",
    "payment.or": "ou",
    "payment.cardNumber": "Numéro de carte",
    "payment.pay": "Payer l'acompte",
    "payment.doneTitle": "Acompte réglé.",
    "payment.doneBody": "Démonstration — aucun montant n'a été débité.",

    "studio.kicker": "Le Studio",
    "studio.title": "Comment nous travaillons.",
    "studio.body":
      "Design et développement, sous le même toit. Voici ce que nous savons construire, du premier brief à la mise en ligne.",

    "worktease.kicker": "Réalisations",
    "worktease.title": "Des sites que nous avons conçus, en ligne aujourd'hui.",
    "worktease.cta": "Voir nos réalisations →",

    "work.kicker": "Réalisations",
    "work.title": "Des sites que nous avons conçus et mis en ligne.",
    "work.body":
      "Chaque projet ci-dessous est un site réel, conçu et développé par Maisé Studio. Cliquez pour le visiter.",
  },
  en: {
    "nav.work": "Work",
    "nav.examples": "Examples",
    "nav.studio": "Studio",
    "nav.experience": "Experience",
    "nav.configurator": "Configurator",
    "nav.contact": "Contact",
    "nav.cta": "Start a project",
    "footer.tag": "Bespoke websites, designed in Paris.",
    "wa.greeting": "Hello Maisé Studio",

    "hero.kicker": "Maisé Studio — Paris",
    "hero.title": "A website built for your business, not a generic theme.",
    "hero.subtitle":
      "Cafés, hotels, clinics, boutiques: we design sites that make people want to walk in, and that sell.",
    "hero.cta1": "View our projects",
    "hero.cta2": "Calculate your price",
    "hero.scroll": "Scroll",

    "brand.kicker": "The Studio",
    "brand.title": "We build the websites our clients show off with pride.",
    "brand.body":
      "Maisé Studio is a Paris-based agency building premium websites. Restaurants, hotels, clinics, boutiques: on every project we're after the same thing, an online presence that actually reflects the work happening in the room.",
    "brand.v1.title": "Built to measure",
    "brand.v1.body":
      "No templates. Every site starts from your business, your clients, what you actually want.",
    "brand.v2.title": "Genuine technical craft",
    "brand.v2.body":
      "3D, motion, interaction: we hold the same standard from the first sketch to the last line of code.",
    "brand.v3.title": "Built to convert",
    "brand.v3.body":
      "A beautiful site that doesn't sell isn't worth much. Every page is built to turn a visit into a client.",

    "geo.kicker": "AI Visibility",
    "geo.title": "Found by your customers. Recommended by their AI.",
    "geo.body":
      "More people are asking ChatGPT or Gemini where to go before they even open Instagram. \"Best coffee shop nearby,\" \"a quiet hotel near downtown\"... These tools read websites, not stories that disappear after 24 hours. If your site isn't built for that, you simply don't exist in their answer.",
    "geo.tag":
      "We build every site so Google and AI assistants understand it from the day it goes live, not as something bolted on later.",
    "geo.p1.title": "Classic SEO",
    "geo.p1.body": "Titles, tags, load speed, page structure: the basics of SEO, done properly.",
    "geo.p2.title": "Understood by AI",
    "geo.p2.body": "We add structured data and an llms.txt file so AI assistants can actually understand what your business does.",
    "geo.p3.title": "Rendered, not hidden",
    "geo.p3.body": "Content is served as real HTML, not assembled at the last second. Crawlers see it exactly like your visitors do.",
    "geo.p4.title": "Cited, not just ranked",
    "geo.p4.body": "Ranking on page one isn't enough anymore. The goal is being the answer the AI gives.",

    "services.kicker": "What we do",
    "services.title": "Strategy. Design. Development.",
    "services.body":
      "We handle all of it, from the first sketch to the last animation. Not just mockups, a site that actually works.",
    "services.s1": "Web design",
    "services.s1desc": "A visual identity built for your brand, not a recycled template.",
    "services.s2": "Web development",
    "services.s2desc": "A fast, solid site that holds up over time — not just pretty on launch day.",
    "services.s3": "UX / UI",
    "services.s3desc": "Flows designed so visitors find what they came for, without friction.",
    "services.s4": "Creative direction",
    "services.s4desc": "Photography, tone, layout: one coherent direction from the first pixel to the last word.",
    "services.s5": "SEO / AI visibility",
    "services.s5desc": "Structured for Google and understood by AI assistants from day one.",
    "services.s6": "Ongoing support",
    "services.s6desc": "The site grows with you: updates, adjustments, help after launch.",
    "services.seeAll": "See all our services →",

    "process.kicker": "Our method",
    "process.title": "From idea to live site.",
    "process.body":
      "Every Maisé project moves the same way: simple, no surprises, from the first conversation to launch.",
    "process.step1.title": "The brief",
    "process.step1.body":
      "We talk about your business, your clients, what this site actually needs to do for you. No form to fill in, a real conversation.",
    "process.step2.title": "Art direction",
    "process.step2.body":
      "We show you a first direction, built around your brand. You react, we adjust, until it actually feels right.",
    "process.step3.title": "Development",
    "process.step3.body":
      "The site takes shape for real, not as a mockup anymore. Animations, forms, integrations: we test everything as we build it.",
    "process.step4.title": "Launch",
    "process.step4.body":
      "Domain, hosting, final checks. You leave with a site that's genuinely yours, ready for your clients.",

    "studio.visual1": "The Maisé aesthetic: understated, warm, worked out down to the smallest detail.",
    "studio.visual2": "Strategy, design, development: the same method at every stage of the project.",

    "cap.kicker": "What we can build",
    "cap.c1": "Reservations",
    "cap.c2": "Online menus",
    "cap.c3": "Google Maps",
    "cap.c4": "Contact forms",
    "cap.c5": "WhatsApp integration",
    "cap.c6": "E-commerce",
    "cap.c7": "Product catalogues",
    "cap.c8": "Multilingual websites",
    "cap.c9": "CMS",
    "cap.c10": "Interactive configurators",

    "sv.c1.kicker": "Staging",
    "sv.c1.title": "A story, told through scroll.",
    "sv.c1.body":
      "Every brand has its own visual narrative. We build it to hold attention from the first second.",
    "sv.c2.kicker": "Navigation",
    "sv.c2.title": "Scroll becomes a real journey.",
    "sv.c2.body":
      "Beyond video, scrolling can guide visitors through your content, like a guided tour.",
    "sv.c3.kicker": "Result",
    "sv.c3.title": "This level, for your brand.",
    "sv.c3.body":
      "What you're seeing isn't an abstract demo — it's exactly what we ship for our clients.",

    "album.kicker": "One craft, many worlds",
    "album.title": "Different industries, the same standard.",
    "album.i1": "Beauty",
    "album.i2": "Architecture",
    "album.i3": "Café",
    "album.i4": "Optician",
    "album.i5": "Restaurant",
    "album.i6": "Hospitality",
    "album.i7": "Multi-brand",

    "responsive.kicker": "Designed for every screen",
    "responsive.title": "Considered at every breakpoint.",
    "responsive.body":
      "Mobile isn't just a shrunken-down desktop site. Every format gets its own layout, built for how people actually use it.",

    "menu.kicker": "Example — Online menu",
    "menu.title": "If you had a menu, here's what it could look like.",
    "menu.body":
      "A sample menu built with our design system. Categories, prices, descriptions: all of it customizable for your actual menu.",
    "menu.cat1": "Coffee & Drinks",
    "menu.cat2": "Pastries",
    "menu.item1": "Espresso",
    "menu.item2": "Maisé Cappuccino",
    "menu.item3": "Vanilla Latte",
    "menu.item4": "House Hot Chocolate",
    "menu.item5": "Butter Croissant",
    "menu.item6": "Lemon Tart",
    "menu.item7": "Chocolate Fondant",
    "menu.item8": "Almond-Hazelnut Cookie",

    "maps.kicker": "Example — Location",
    "maps.title": "Your address, showcased.",
    "maps.body":
      "A map embedded directly in your site, so clients can find you without leaving the page. Here, an example centered on Paris.",
    "maps.cta": "Open in Google Maps",
    "map.activate": "Click to interact with the map",

    "config.kicker": "Live configurator",
    "config.title": "Build your site, in real time.",
    "config.subtitle":
      "Three choices are all it takes. The design, content and price change instantly in front of you.",
    "config.step1": "Your business",
    "config.step2": "The tier",
    "config.step3": "Extra languages",
    "config.multilingual": "Multilingual site",
    "config.multilingual.hint": "Add other languages to your site — the price updates automatically.",
    "config.includedLang": "Included language",
    "config.price": "Estimated investment",
    "config.priceNote": "Indicative price · final quote tailored to you",
    "config.try.badge": "Turkey launch price",
    "config.try.note": "Indicative price in TRY · final quote tailored to you",
    "config.cta": "Get this quote",
    "config.essentiel.caption": "Clean, fast, effective. The essentials, done right.",
    "config.signature.caption":
      "Motion, liquid glass, full staging. This is the Signature level.",
    "biz.cafe.name": "Café & Restaurant",
    "biz.cafe.desc": "Menu, atmosphere, reservations",
    "biz.clinic.name": "Clinic & Beauty",
    "biz.clinic.desc": "Trust, care, booking",
    "biz.hotel.name": "Hotel & Boutique",
    "biz.hotel.desc": "Strong image, showcase, booking",
    "tier.essentiel.name": "Essentiel",
    "tier.essentiel.tag": "Clean, fast showcase site",
    "tier.signature.name": "Signature",
    "tier.signature.tag": "Motion, 3D, liquid glass — the full experience",
    "lang.fr": "French",
    "lang.fr.note": "Included",
    "lang.en": "English",
    "lang.tr": "Turkish",

    "contact.kicker": "Contact",
    "contact.title": "Let's talk about your project.",
    "contact.subtitle": "We reply within 3 hours, every day. Based in Paris.",
    "contact.whatsapp": "Message on WhatsApp",
    "contact.hours.label": "Hours",
    "contact.hours.value": "Every day, 9am–7pm",
    "contact.location.label": "Based in",
    "contact.location.value": "Paris, France",
    "contact.team.label": "The team",
    "footer.rights": "All rights reserved.",

    "contactform.name": "Name",
    "contactform.company": "Company",
    "contactform.email": "Email",
    "contactform.phone": "Phone",
    "contactform.project": "What are you building?",
    "contactform.selectProject": "Pick a category",
    "contactform.opt.restaurant": "Restaurant",
    "contactform.opt.cafe": "Café",
    "contactform.opt.hotel": "Hotel",
    "contactform.opt.clinic": "Clinic / Beauty",
    "contactform.opt.retail": "Retail / Boutique",
    "contactform.opt.other": "Other",
    "contactform.budget": "Package",
    "contactform.selectBudget": "Pick a package",
    "contactform.opt.custom": "Custom project",
    "contactform.message": "Message",
    "contactform.submit": "Send on WhatsApp",
    "contactform.note": "Opens your email client with the details pre-filled.",
    "contactform.or": "or",
    "contactform.whatsappAlt": "Prefer WhatsApp? Message us directly",

    "realwork.kicker": "Shipped sites",
    "realwork.title": "Not mockups. Real sites, live.",
    "realwork.body":
      "Four projects we've recently designed and built. Click to visit the actual site.",
    "realwork.route95": "Restaurant · Kağıthane",
    "realwork.bloom": "Studio · Los Angeles",
    "realwork.le40": "Cocktail bar · Paris",
    "realwork.voler": "Café · Istanbul",
    "badge.realProject": "Real project",

    "projectframe.back": "Back to portfolio",
    "projectframe.live": "Live preview — a Maisé Studio project",
    "projectframe.cta": "Get a similar website",

    "footer.ctaTitle": "Your business deserves better than a generic website.",
    "footer.ctaButton": "Start your project",

    "examples.kicker": "Examples",
    "examples.title": "Here's what your website could do.",
    "examples.body":
      "These aren't our projects, they're demonstrations. Each module is a preview of what we can build for you.",
    "examples.ctaTitle": "Have something else in mind?",
    "examples.ctaButton": "Talk to us",

    "transition.menuToMap": "A menu people want. An address they find without trying.",

    "booking.kicker": "Example — Booking",
    "booking.title": "An appointment booked in seconds.",
    "booking.body":
      "Service, date, time slot, contact details: a booking flow your clients finish without a second thought.",
    "booking.svc1": "Haircut",
    "booking.svc2": "Facial",
    "booking.svc3": "Consultation",
    "booking.step1": "Service",
    "booking.step2": "Date",
    "booking.step3": "Time",
    "booking.month": "August",
    "booking.continue": "Continue",
    "booking.back": "← Back",
    "booking.name": "Name",
    "booking.email": "Email",
    "booking.confirm": "Confirm booking",
    "booking.confirmedTitle": "Booking confirmed.",
    "booking.confirmedBody": "Demo — no real reservation was made.",

    "payment.kicker": "Example — Payment",
    "payment.title": "A deposit, taken cleanly.",
    "payment.body":
      "Deposits, purchases, bookings with a deposit: a payment flow that feels smooth, and trustworthy.",
    "payment.summaryLabel": "Summary",
    "payment.service": "Facial treatment",
    "payment.total": "Total",
    "payment.depositToday": "Deposit today",
    "payment.remaining": "Remaining at appointment",
    "payment.continue": "Continue to payment",
    "payment.demoNote": "Visual demo — no real payment is processed.",
    "payment.applePay": " Pay",
    "payment.or": "or",
    "payment.cardNumber": "Card number",
    "payment.pay": "Pay deposit",
    "payment.doneTitle": "Deposit paid.",
    "payment.doneBody": "Demo — no amount was actually charged.",

    "studio.kicker": "The Studio",
    "studio.title": "How we work.",
    "studio.body":
      "Design and development, under one roof. Here's what we build, from first brief to launch.",

    "worktease.kicker": "Work",
    "worktease.title": "Sites we've designed, live today.",
    "worktease.cta": "See our work →",

    "work.kicker": "Work",
    "work.title": "Sites we've designed and shipped.",
    "work.body":
      "Every project below is a real site, designed and built by Maisé Studio. Click through to visit it.",
  },
  tr: {
    "nav.work": "Projeler",
    "nav.examples": "Örnekler",
    "nav.studio": "Stüdyo",
    "nav.experience": "Deneyim",
    "nav.configurator": "Yapılandırıcı",
    "nav.contact": "İletişim",
    "footer.tag": "Paris'te tasarlanan, kişiye özel web siteleri.",
    "wa.greeting": "Merhaba Maisé Studio",
    "nav.cta": "Projenizi konuşalım",

    "hero.kicker": "Maisé Studio — Paris",
    "hero.title": "İşletmeniz için tasarlanmış bir site, hazır bir tema değil.",
    "hero.subtitle":
      "Kafeler, oteller, klinikler, butikler: girmek isteyeceğiniz ve gerçekten satan siteler tasarlıyoruz.",
    "hero.cta1": "Projelerimizi görün",
    "hero.cta2": "Fiyatımı hesapla",
    "hero.scroll": "Kaydır",

    "brand.kicker": "Stüdyo",
    "brand.title": "Müşterilerimizin gururla gösterdiği siteler kuruyoruz.",
    "brand.body":
      "Maisé Studio, Paris merkezli bir premium web tasarım ajansı. Restoranlar, oteller, klinikler, butikler: her projede aynı şeyin peşindeyiz, gerçekten yaptığınız işi yansıtan bir dijital varlık.",
    "brand.v1.title": "Kişiye özel tasarım",
    "brand.v1.body": "Şablon kullanmıyoruz. Her site işletmenizden, müşterilerinizden, gerçekten istediğinizden yola çıkarak kurulur.",
    "brand.v2.title": "Gerçek teknik ustalık",
    "brand.v2.body": "3D, hareket, etkileşim: ilk taslaktan son satır koda kadar aynı özeni koruyoruz.",
    "brand.v3.title": "Dönüşüm için kurulur",
    "brand.v3.body": "Güzel ama satmayan bir site pek işe yaramaz. Her sayfa, ziyaretçiyi müşteriye çevirmek için kurulur.",

    "geo.kicker": "Yapay Zeka Görünürlüğü",
    "geo.title": "Müşteriniz sizi bulsun. Yapay zekası sizi önersin.",
    "geo.body":
      "Artık pek çok kişi Instagram'ı açmadan önce ChatGPT'ye ya da Gemini'ye soruyor. \"Yakınımdaki en iyi kafe\", \"merkeze yakın sakin bir otel\"... Bu yapay zekalar 24 saatte kaybolan story'leri değil, web sitelerini okuyor. Siteniz buna göre kurulmadıysa, onların cevabında basitçe yoksunuz demektir.",
    "geo.tag":
      "Her Maisé sitesini, yayına girdiği ilk günden itibaren hem Google hem de yapay zeka asistanları anlayacak şekilde kuruyoruz, sonradan eklenen bir özellik olarak değil.",
    "geo.p1.title": "Klasik SEO",
    "geo.p1.body": "Başlıklar, etiketler, yüklenme hızı, sayfa yapısı: SEO'nun temelleri, gerçekten doğru yapılmış.",
    "geo.p2.title": "Yapay Zeka Tarafından Anlaşılır",
    "geo.p2.body": "Yapay zeka asistanlarının işletmenizi gerçekten anlayabilmesi için yapılandırılmış veri ve llms.txt dosyası ekliyoruz.",
    "geo.p3.title": "Gizli Değil, Görünür",
    "geo.p3.body": "İçerik son anda oluşturulmuyor, gerçek HTML olarak sunuluyor. Arama robotları da tıpkı ziyaretçileriniz gibi görüyor.",
    "geo.p4.title": "Sıralanmak Değil, Önerilmek",
    "geo.p4.body": "Google'da ilk sayfada olmak artık yetmiyor. Hedef, yapay zekanın verdiği cevabın kendisi olmak.",

    "services.kicker": "Ne yapıyoruz",
    "services.title": "Strateji. Tasarım. Geliştirme.",
    "services.body":
      "İlk taslaktan son animasyona kadar her şeyi biz yapıyoruz. Sadece maket değil, gerçekten çalışan bir site.",
    "services.s1": "Web tasarımı",
    "services.s1desc": "Markanız için kurulmuş bir görsel kimlik, kopyala-yapıştır bir şablon değil.",
    "services.s2": "Web geliştirme",
    "services.s2desc": "Hızlı, sağlam bir site — sadece açılış gününde değil, zamanla da iyi görünen.",
    "services.s3": "UX / UI",
    "services.s3desc": "Ziyaretçilerin aradığını zahmetsizce bulduğu, düşünülmüş kullanıcı akışları.",
    "services.s4": "Yaratıcı yön",
    "services.s4desc": "Fotoğraf, ton, düzen: ilk pikselden son kelimeye kadar tutarlı bir yön.",
    "services.s5": "SEO / Yapay Zeka Görünürlüğü",
    "services.s5desc": "Yayına girdiği andan itibaren Google ve yapay zeka asistanları tarafından anlaşılır şekilde yapılandırılır.",
    "services.s6": "Sürekli destek",
    "services.s6desc": "Site sizinle birlikte gelişir: güncellemeler, ince ayarlar, yayın sonrası destek.",
    "services.seeAll": "Tüm hizmetlerimiz →",

    "process.kicker": "Yöntemimiz",
    "process.title": "Fikirden yayındaki siteye.",
    "process.body":
      "Her Maisé projesi aynı şekilde ilerler: net, sürprizsiz, ilk görüşmeden yayına kadar.",
    "process.step1.title": "Brief",
    "process.step1.body":
      "İşinizi, müşterilerinizi, bu sitenin sizin için gerçekten ne yapması gerektiğini konuşuruz. Doldurulacak bir form değil, gerçek bir sohbet.",
    "process.step2.title": "Sanat yönetimi",
    "process.step2.body":
      "Markanız için kurduğumuz ilk görsel yönü size gösteririz. Siz değerlendirirsiniz, biz ince ayar yaparız, tam oturana kadar.",
    "process.step3.title": "Geliştirme",
    "process.step3.body":
      "Site artık gerçekten hayat buluyor, maket olmaktan çıkıyor. Animasyonlar, formlar, entegrasyonlar: ilerledikçe hepsini test ediyoruz.",
    "process.step4.title": "Yayına alma",
    "process.step4.body":
      "Alan adı, barındırma, son kontroller. Gerçekten size ait, müşterilerinizi karşılamaya hazır bir siteyle ayrılırsınız.",

    "studio.visual1": "Maisé ruhu: sade, sıcak, en küçük detayına kadar düşünülmüş.",
    "studio.visual2": "Strateji, tasarım, geliştirme: projenin her aşamasında aynı yöntem.",

    "cap.kicker": "Neler inşa edebiliriz",
    "cap.c1": "Rezervasyonlar",
    "cap.c2": "Online menüler",
    "cap.c3": "Google Maps",
    "cap.c4": "İletişim formları",
    "cap.c5": "WhatsApp entegrasyonu",
    "cap.c6": "E-ticaret",
    "cap.c7": "Ürün katalogları",
    "cap.c8": "Çok dilli siteler",
    "cap.c9": "CMS",
    "cap.c10": "İnteraktif yapılandırıcılar",

    "sv.c1.kicker": "Sahneleme",
    "sv.c1.title": "Scroll ile anlatılan bir hikaye.",
    "sv.c1.body":
      "Her markanın kendi görsel anlatımı vardır. İlk saniyeden itibaren dikkat çekecek şekilde kuruyoruz.",
    "sv.c2.kicker": "Gezinme",
    "sv.c2.title": "Scroll gerçek bir yolculuğa dönüşür.",
    "sv.c2.body":
      "Video oynatmanın ötesinde, kaydırma hareketi ziyaretçiyi içeriğinizde rehberli bir tur gibi gezdirebilir.",
    "sv.c3.kicker": "Sonuç",
    "sv.c3.title": "Bu seviye, sizin markanız için.",
    "sv.c3.body":
      "Burada gördüğünüz soyut bir demo değil — müşterilerimize tam olarak bunu teslim ediyoruz.",

    "album.kicker": "Tek ustalık, birçok dünya",
    "album.title": "Farklı sektörler, aynı standart.",
    "album.i1": "Güzellik",
    "album.i2": "Mimari",
    "album.i3": "Kafe",
    "album.i4": "Gözlükçü",
    "album.i5": "Restoran",
    "album.i6": "Otelcilik",
    "album.i7": "Çoklu marka",

    "responsive.kicker": "Her ekran için tasarlandı",
    "responsive.title": "Her kırılma noktasında düşünülmüş.",
    "responsive.body":
      "Mobil, küçültülmüş bir masaüstü sitesi değil. Her format, gerçekten nasıl kullanıldığına göre kendi düzenine sahip.",

    "menu.kicker": "Örnek — Online menü",
    "menu.title": "Bir menünüz olsaydı, işte böyle görünürdü.",
    "menu.body":
      "Tasarım sistemimizle kurulmuş örnek bir menü. Kategoriler, fiyatlar, açıklamalar: hepsi gerçek menünüze göre özelleştirilebilir.",
    "menu.cat1": "Kahveler & İçecekler",
    "menu.cat2": "Pastalar",
    "menu.item1": "Espresso",
    "menu.item2": "Maisé Cappuccino",
    "menu.item3": "Vanilyalı Latte",
    "menu.item4": "Ev Yapımı Sıcak Çikolata",
    "menu.item5": "Tereyağlı Kruvasan",
    "menu.item6": "Limonlu Tart",
    "menu.item7": "Çikolatalı Fondan",
    "menu.item8": "Badem-Fındıklı Kurabiye",

    "maps.kicker": "Örnek — Konum",
    "maps.title": "Adresiniz, öne çıkarılmış.",
    "maps.body":
      "Sitenize doğrudan gömülü bir harita, müşterileriniz sayfadan çıkmadan sizi bulsun diye. Burada, Paris merkezli bir örnek görüyorsunuz.",
    "maps.cta": "Google Maps'te Aç",
    "map.activate": "Haritayla etkileşim için tıklayın",

    "config.kicker": "Canlı Yapılandırıcı",
    "config.title": "Sitenizi gerçek zamanlı kurun.",
    "config.subtitle": "Sadece üç seçim yeterli. Tasarım, içerik ve fiyat gözünüzün önünde anında değişiyor.",
    "config.step1": "İşletmeniz",
    "config.step2": "Seviye",
    "config.step3": "Ek diller",
    "config.multilingual": "Çok dilli site",
    "config.multilingual.hint": "Sitenize başka diller ekleyin — fiyat otomatik güncellenir.",
    "config.includedLang": "Dahil olan dil",
    "config.price": "Tahmini yatırım",
    "config.priceNote": "Yaklaşık fiyat · nihai teklif projeye özel",
    "config.try.badge": "Türkiye lansman fiyatı",
    "config.try.note": "TL olarak yaklaşık fiyat · nihai teklif projeye özel",
    "config.cta": "Bu teklifi al",
    "config.essentiel.caption": "Temiz, hızlı, işlevsel. Doğru yapılmış bir temel site.",
    "config.signature.caption": "Hareket, liquid glass, tam sahneleme. Bu, Signature seviyesi.",
    "biz.cafe.name": "Kafe & Restoran",
    "biz.cafe.desc": "Menü, atmosfer, rezervasyon",
    "biz.clinic.name": "Klinik & Güzellik",
    "biz.clinic.desc": "Güven, bakım, randevu",
    "biz.hotel.name": "Otel & Butik Mağaza",
    "biz.hotel.desc": "Güçlü imaj, vitrin, rezervasyon",
    "tier.essentiel.name": "Essentiel",
    "tier.essentiel.tag": "Temiz, hızlı vitrin site",
    "tier.signature.name": "Signature",
    "tier.signature.tag": "Hareket, 3D, liquid glass — tam deneyim",
    "lang.fr": "Fransızca",
    "lang.fr.note": "Dahil",
    "lang.en": "İngilizce",
    "lang.tr": "Türkçe",

    "contact.kicker": "İletişim",
    "contact.title": "Projenizi konuşalım.",
    "contact.subtitle": "3 saat içinde dönüş, her gün. Paris merkezliyiz.",
    "contact.whatsapp": "WhatsApp'tan Yaz",
    "contact.hours.label": "Çalışma Saatleri",
    "contact.hours.value": "Her gün, 09:00–19:00",
    "contact.location.label": "Konum",
    "contact.location.value": "Paris, Fransa",
    "contact.team.label": "Ekip",
    "footer.rights": "Tüm hakları saklıdır.",

    "contactform.name": "Ad",
    "contactform.company": "Şirket",
    "contactform.email": "E-posta",
    "contactform.phone": "Telefon",
    "contactform.project": "Ne inşa ediyorsunuz?",
    "contactform.selectProject": "Bir kategori seçin",
    "contactform.opt.restaurant": "Restoran",
    "contactform.opt.cafe": "Kafe",
    "contactform.opt.hotel": "Otel",
    "contactform.opt.clinic": "Klinik / Güzellik",
    "contactform.opt.retail": "Butik / Perakende",
    "contactform.opt.other": "Diğer",
    "contactform.budget": "Paket",
    "contactform.selectBudget": "Bir paket seçin",
    "contactform.opt.custom": "Özel proje",
    "contactform.message": "Mesaj",
    "contactform.submit": "WhatsApp'tan Gönder",
    "contactform.note": "E-posta uygulamanızı, detaylar hazır şekilde açar.",
    "contactform.or": "veya",
    "contactform.whatsappAlt": "WhatsApp'ı mı tercih edersiniz? Doğrudan yazın",

    "realwork.kicker": "Yayınlanan siteler",
    "realwork.title": "Maket değil. Gerçek, canlı siteler.",
    "realwork.body":
      "Yakın zamanda tasarlayıp geliştirdiğimiz dört proje. Gerçek siteyi görmek için tıkla.",
    "realwork.route95": "Restoran · Kağıthane",
    "realwork.bloom": "Atölye · Los Angeles",
    "realwork.le40": "Kokteyl bar · Paris",
    "realwork.voler": "Kafe · İstanbul",
    "badge.realProject": "Gerçek proje",

    "projectframe.back": "Portfolyoya dön",
    "projectframe.live": "Canlı önizleme — bir Maisé Studio projesi",
    "projectframe.cta": "Benzer bir site edinin",

    "footer.ctaTitle": "İşletmeniz sıradan bir siteden daha fazlasını hak ediyor.",
    "footer.ctaButton": "Projenizi başlatın",

    "examples.kicker": "Örnekler",
    "examples.title": "Siteniz neler yapabilir, işte burada.",
    "examples.body":
      "Bunlar bizim projelerimiz değil, birer demo. Her modül, sizin için neler kurabileceğimizin bir önizlemesi.",
    "examples.ctaTitle": "Aklınızda başka bir şey mi var?",
    "examples.ctaButton": "Bize ulaşın",

    "transition.menuToMap": "İstek uyandıran bir menü. Zahmetsizce bulunan bir adres.",

    "booking.kicker": "Örnek — Rezervasyon",
    "booking.title": "Saniyeler içinde alınan bir randevu.",
    "booking.body":
      "Hizmet, tarih, saat, iletişim bilgileri: müşterilerinizin hiç düşünmeden tamamladığı bir randevu akışı.",
    "booking.svc1": "Saç Kesimi",
    "booking.svc2": "Cilt Bakımı",
    "booking.svc3": "Danışma",
    "booking.step1": "Hizmet",
    "booking.step2": "Tarih",
    "booking.step3": "Saat",
    "booking.month": "Ağustos",
    "booking.continue": "Devam Et",
    "booking.back": "← Geri",
    "booking.name": "Ad",
    "booking.email": "E-posta",
    "booking.confirm": "Randevuyu Onayla",
    "booking.confirmedTitle": "Randevu onaylandı.",
    "booking.confirmedBody": "Demo — gerçek bir rezervasyon yapılmadı.",

    "payment.kicker": "Örnek — Ödeme",
    "payment.title": "Sorunsuz alınan bir kapora.",
    "payment.body":
      "Kapora, satın alma, kaporalı rezervasyon: akıcı ve güven veren bir ödeme deneyimi.",
    "payment.summaryLabel": "Özet",
    "payment.service": "Cilt Bakımı",
    "payment.total": "Toplam",
    "payment.depositToday": "Bugünkü kapora",
    "payment.remaining": "Randevuda kalan",
    "payment.continue": "Ödemeye Devam Et",
    "payment.demoNote": "Görsel demo — gerçek bir ödeme işlenmiyor.",
    "payment.applePay": " Pay",
    "payment.or": "veya",
    "payment.cardNumber": "Kart Numarası",
    "payment.pay": "Kaporayı Öde",
    "payment.doneTitle": "Kapora ödendi.",
    "payment.doneBody": "Demo — gerçekte hiçbir tutar tahsil edilmedi.",

    "studio.kicker": "Stüdyo",
    "studio.title": "Nasıl çalışıyoruz.",
    "studio.body":
      "Tasarım ve geliştirme, aynı çatı altında. İlk brief'ten yayına kadar inşa ettiklerimiz burada.",

    "worktease.kicker": "Projeler",
    "worktease.title": "Tasarladığımız siteler, bugün yayında.",
    "worktease.cta": "Projelerimizi gör →",

    "work.kicker": "Projeler",
    "work.title": "Tasarlayıp yayına aldığımız siteler.",
    "work.body":
      "Aşağıdaki her proje gerçek bir site — Maisé Studio tarafından tasarlanıp geliştirildi. Ziyaret etmek için tıklayın.",
  },
} as const;

export type DictKey = keyof (typeof dict)["fr"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("maise-v2-lang") as Lang | null;
    if (stored === "fr" || stored === "en" || stored === "tr") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("maise-v2-lang", l);
  };

  const t = useMemo(() => {
    return (key: DictKey) => dict[lang][key] ?? dict.fr[key] ?? key;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
