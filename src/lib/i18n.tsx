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

    "hero.kicker": "Maisé Studio — Paris",
    "hero.title": "Conçu pour votre métier. Pas pour un thème.",
    "hero.subtitle":
      "Cafés, hôtels, cliniques, boutiques — nous concevons des sites qui donnent envie, et qui vendent.",
    "hero.cta1": "Découvrir Maisé Studio",
    "hero.scroll": "Faites défiler",

    "brand.kicker": "Le Studio",
    "brand.title":
      "Nous construisons les sites que nos clients montrent avec fierté.",
    "brand.body":
      "Maisé Studio est une agence parisienne de conception de sites web haut de gamme. Restaurants, hôtels, cliniques, boutiques — nous donnons à chaque marque une présence digitale à la hauteur de son savoir-faire.",
    "brand.v1.title": "Conçu sur mesure",
    "brand.v1.body":
      "Aucun template. Chaque site est pensé pour votre métier, votre clientèle, votre ambition.",
    "brand.v2.title": "Un vrai métier technique",
    "brand.v2.body":
      "3D, mouvement, interaction — la même exigence technique, du premier pixel au dernier clic.",
    "brand.v3.title": "Pensé pour convertir",
    "brand.v3.body":
      "Beau ne suffit pas. Chaque page est construite pour transformer la visite en client.",

    "services.kicker": "Ce que nous faisons",
    "services.title": "Stratégie. Design. Développement.",
    "services.body":
      "Du premier croquis à la dernière interaction — nous concevons et développons, nous ne faisons pas que des maquettes.",
    "services.s1": "Design web",
    "services.s2": "Développement web",
    "services.s3": "UX / UI",
    "services.s4": "Direction créative",
    "services.seeAll": "Voir tous nos services →",

    "process.kicker": "Notre méthode",
    "process.title": "De l'idée au site en ligne.",
    "process.body":
      "Un projet Maisé suit toujours le même chemin — clair, sans surprise, du premier échange à la mise en ligne.",
    "process.step1.title": "Le brief",
    "process.step1.body":
      "On discute de votre métier, de vos clients, de ce que le site doit accomplir. Pas de questionnaire générique — une vraie conversation.",
    "process.step2.title": "La direction artistique",
    "process.step2.body":
      "Une première proposition visuelle, pensée pour votre marque. Vous réagissez, on ajuste, jusqu'à ce que ça sonne juste.",
    "process.step3.title": "Le développement",
    "process.step3.body":
      "Le site prend vie — pour de vrai, pas en maquette. Animations, formulaires, intégrations : tout est testé au fur et à mesure.",
    "process.step4.title": "La mise en ligne",
    "process.step4.body":
      "Domaine, hébergement, dernières vérifications. Vous repartez avec un site qui vous appartient, prêt pour vos clients.",

    "studio.visual1": "L'esprit Maisé — sobre, chaleureux, pensé dans le détail.",
    "studio.visual2": "Stratégie, design, développement — une même méthode, à chaque étape.",

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

    "sv.c1.kicker": "Aperçu",
    "sv.c1.title": "Ici, la vidéo de votre site.",
    "sv.c1.body":
      "Chaque marque a sa propre histoire à l'écran — nous la mettons en scène dès l'arrivée du visiteur.",
    "sv.c2.kicker": "Navigation",
    "sv.c2.title": "On peut même naviguer dans votre site.",
    "sv.c2.body":
      "Le scroll ne se contente pas de jouer une vidéo : il peut devenir un vrai moyen de parcourir votre contenu.",
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
      "Le mobile n'est pas un simple site desktop réduit — chaque format a sa propre composition, pensée pour l'usage réel.",

    "menu.kicker": "Exemple — Menu en ligne",
    "menu.title": "Si vous aviez un menu, voici à quoi il ressemblerait.",
    "menu.body":
      "Un exemple de menu construit avec notre système de design — catégories, prix, descriptions, tout est personnalisable pour votre carte réelle.",
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
      "Une carte intégrée directement dans votre site — pour que vos clients vous trouvent sans quitter la page. Ici, un exemple centré sur Paris.",
    "maps.cta": "Ouvrir dans Google Maps",

    "config.kicker": "Configurateur en direct",
    "config.title": "Composez votre site, en temps réel.",
    "config.subtitle":
      "Trois choix, un aperçu qui change instantanément — design, contenu et prix.",
    "config.step1": "1. Votre métier",
    "config.step2": "2. Votre niveau",
    "config.step3": "3. Vos langues",
    "config.price": "Investissement estimé",
    "config.priceNote": "Prix indicatif · devis final sur mesure",
    "config.cta": "Recevoir ce devis",
    "config.essentiel.caption": "Propre, rapide, efficace — l'essentiel, bien fait.",
    "config.signature.caption":
      "Motion, liquid glass et mise en scène complète — le niveau Signature.",
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
    "contactform.budget": "Budget approximatif",
    "contactform.message": "Message",
    "contactform.submit": "Envoyer ma demande",
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

    "examples.kicker": "Exemples",
    "examples.title": "Voici ce que votre site pourrait faire.",
    "examples.body":
      "Ce ne sont pas nos projets — ce sont des démonstrations. Chaque module est un aperçu de ce que nous pouvons construire pour vous.",
    "examples.ctaTitle": "Autre chose en tête ?",
    "examples.ctaButton": "Échanger sur votre projet",

    "transition.menuToMap": "Un menu qui donne envie. Une adresse qu'on trouve sans effort.",

    "booking.kicker": "Exemple — Réservation",
    "booking.title": "Un rendez-vous pris en quelques secondes.",
    "booking.body":
      "Service, date, créneau, coordonnées — une prise de rendez-vous que vos clients terminent sans réfléchir.",
    "booking.svc1": "Coupe",
    "booking.svc2": "Soin visage",
    "booking.svc3": "Consultation",
    "booking.step1": "Service",
    "booking.step2": "Date",
    "booking.step3": "Créneau",
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
      "Dépôt de garantie, achat, réservation avec acompte — un parcours de paiement fluide et rassurant.",
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

    "hero.kicker": "Maisé Studio — Paris",
    "hero.title": "Built for your business. Not a theme.",
    "hero.subtitle":
      "Cafés, hotels, clinics, boutiques — we design websites that create desire, and that sell.",
    "hero.cta1": "Discover Maisé Studio",
    "hero.scroll": "Scroll",

    "brand.kicker": "The Studio",
    "brand.title": "We build the websites our clients show off with pride.",
    "brand.body":
      "Maisé Studio is a Paris-based agency crafting premium websites. Restaurants, hotels, clinics, boutiques — we give every brand a digital presence worthy of its craft.",
    "brand.v1.title": "Built to measure",
    "brand.v1.body":
      "No templates. Every site is designed around your business, your clients, your ambition.",
    "brand.v2.title": "Genuine technical craft",
    "brand.v2.body":
      "3D, motion, interaction — the same technical care, from first pixel to last click.",
    "brand.v3.title": "Built to convert",
    "brand.v3.body":
      "Beautiful isn't enough. Every page is built to turn a visit into a client.",

    "services.kicker": "What we do",
    "services.title": "Strategy. Design. Development.",
    "services.body":
      "From first sketch to final interaction — we design and build, we don't just deliver mockups.",
    "services.s1": "Web design",
    "services.s2": "Web development",
    "services.s3": "UX / UI",
    "services.s4": "Creative direction",
    "services.seeAll": "See all our services →",

    "process.kicker": "Our method",
    "process.title": "From idea to live site.",
    "process.body":
      "Every Maisé project follows the same path — clear, no surprises, from the first conversation to launch.",
    "process.step1.title": "The brief",
    "process.step1.body":
      "We talk through your business, your clients, what the site actually needs to do. No generic questionnaire — a real conversation.",
    "process.step2.title": "Art direction",
    "process.step2.body":
      "A first visual proposal, built for your brand. You react, we refine, until it feels right.",
    "process.step3.title": "Development",
    "process.step3.body":
      "The site comes to life — for real, not as a mockup. Animations, forms, integrations: tested as we go.",
    "process.step4.title": "Launch",
    "process.step4.body":
      "Domain, hosting, final checks. You leave with a site that's genuinely yours, ready for your clients.",

    "studio.visual1": "The Maisé aesthetic — understated, warm, considered in every detail.",
    "studio.visual2": "Strategy, design, development — the same method, every step.",

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

    "sv.c1.kicker": "Preview",
    "sv.c1.title": "This is where your site's video goes.",
    "sv.c1.body":
      "Every brand has its own story on screen — we stage it from the moment a visitor arrives.",
    "sv.c2.kicker": "Navigation",
    "sv.c2.title": "We can even let visitors navigate your site.",
    "sv.c2.body":
      "The scroll isn't just playing a video — it can become a real way to browse your content.",
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
      "Mobile isn't just a shrunken desktop site — every format gets its own composition, built for how it's actually used.",

    "menu.kicker": "Example — Online menu",
    "menu.title": "If you had a menu, here's what it could look like.",
    "menu.body":
      "A sample menu built with our design system — categories, prices, descriptions all fully customizable for your real menu.",
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
      "A map embedded directly in your site — so clients can find you without leaving the page. Here, an example centered on Paris.",
    "maps.cta": "Open in Google Maps",

    "config.kicker": "Live configurator",
    "config.title": "Build your site, in real time.",
    "config.subtitle":
      "Three choices, one preview that changes instantly — design, content and price.",
    "config.step1": "1. Your business",
    "config.step2": "2. Your tier",
    "config.step3": "3. Your languages",
    "config.price": "Estimated investment",
    "config.priceNote": "Indicative price · final quote tailored to you",
    "config.cta": "Get this quote",
    "config.essentiel.caption": "Clean, fast, effective — the essentials, done right.",
    "config.signature.caption":
      "Motion, liquid glass and full staging — the Signature level.",
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
    "contactform.budget": "Approximate budget",
    "contactform.message": "Message",
    "contactform.submit": "Send my request",
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

    "examples.kicker": "Examples",
    "examples.title": "Here's what your website could do.",
    "examples.body":
      "These aren't our projects — they're demonstrations. Each module is a preview of what we can build for you.",
    "examples.ctaTitle": "Have something else in mind?",
    "examples.ctaButton": "Talk to us",

    "transition.menuToMap": "A menu people want. An address they find without trying.",

    "booking.kicker": "Example — Booking",
    "booking.title": "An appointment booked in seconds.",
    "booking.body":
      "Service, date, time slot, contact details — a booking flow your clients finish without a second thought.",
    "booking.svc1": "Haircut",
    "booking.svc2": "Facial",
    "booking.svc3": "Consultation",
    "booking.step1": "Service",
    "booking.step2": "Date",
    "booking.step3": "Time",
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
      "Deposits, purchases, bookings with a deposit — a payment flow that feels smooth and trustworthy.",
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
    "nav.cta": "Projenizi konuşalım",

    "hero.kicker": "Maisé Studio — Paris",
    "hero.title": "İşletmeniz için. Bir tema için değil.",
    "hero.subtitle":
      "Kafeler, oteller, klinikler, butikler — istek uyandıran ve satan siteler tasarlıyoruz.",
    "hero.cta1": "Maisé Studio'yu Keşfet",
    "hero.scroll": "Kaydır",

    "brand.kicker": "Stüdyo",
    "brand.title": "Müşterilerimizin gururla gösterdiği siteler kuruyoruz.",
    "brand.body":
      "Maisé Studio, Paris merkezli premium web tasarım ajansıdır. Restoranlar, oteller, klinikler, butikler — her markaya, ustalığına yakışan bir dijital varlık kazandırıyoruz.",
    "brand.v1.title": "Kişiye özel tasarım",
    "brand.v1.body": "Şablon yok. Her site işletmeniz, müşterileriniz, hedefleriniz için kurulur.",
    "brand.v2.title": "Gerçek teknik ustalık",
    "brand.v2.body": "3D, hareket, etkileşim — ilk pikselden son tıklamaya aynı teknik özen.",
    "brand.v3.title": "Dönüşüm için kurulur",
    "brand.v3.body": "Güzellik yetmez. Her sayfa ziyareti müşteriye çevirmek için inşa edilir.",

    "services.kicker": "Ne yapıyoruz",
    "services.title": "Strateji. Tasarım. Geliştirme.",
    "services.body":
      "İlk taslaktan son etkileşime kadar — sadece maket teslim etmiyoruz, tasarlayıp geliştiriyoruz.",
    "services.s1": "Web tasarımı",
    "services.s2": "Web geliştirme",
    "services.s3": "UX / UI",
    "services.s4": "Yaratıcı yön",
    "services.seeAll": "Tüm hizmetlerimiz →",

    "process.kicker": "Yöntemimiz",
    "process.title": "Fikirden yayındaki siteye.",
    "process.body":
      "Her Maisé projesi aynı yolu izler — net, sürprizsiz, ilk görüşmeden yayına kadar.",
    "process.step1.title": "Brief",
    "process.step1.body":
      "İşinizi, müşterilerinizi, sitenin gerçekten ne yapması gerektiğini konuşuruz. Genel bir formdan çok gerçek bir sohbet.",
    "process.step2.title": "Sanat yönetimi",
    "process.step2.body":
      "Markanız için tasarlanmış ilk görsel öneri. Siz değerlendirirsiniz, biz ince ayar yaparız — tam oturana kadar.",
    "process.step3.title": "Geliştirme",
    "process.step3.body":
      "Site gerçekten hayat bulur — maket değil. Animasyonlar, formlar, entegrasyonlar: ilerledikçe test edilir.",
    "process.step4.title": "Yayına alma",
    "process.step4.body":
      "Alan adı, barındırma, son kontroller. Gerçekten size ait, müşterilerinizi karşılamaya hazır bir siteyle ayrılırsınız.",

    "studio.visual1": "Maisé ruhu — sade, sıcak, her detayda düşünülmüş.",
    "studio.visual2": "Strateji, tasarım, geliştirme — her adımda aynı yöntem.",

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

    "sv.c1.kicker": "Önizleme",
    "sv.c1.title": "İşte sitenizin videosu burada olacak.",
    "sv.c1.body":
      "Her markanın ekrandaki kendi hikayesi var — ziyaretçi geldiği andan itibaren onu sahneliyoruz.",
    "sv.c2.kicker": "Gezinme",
    "sv.c2.title": "Sitenizde gezinme imkanı bile sağlıyoruz.",
    "sv.c2.body":
      "Scroll sadece bir video oynatmakla kalmaz — içeriğinizde gezinmenin gerçek bir yolu olabilir.",
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
      "Mobil, küçültülmüş bir masaüstü sitesi değildir — her format gerçek kullanıma göre kendi kompozisyonuna sahiptir.",

    "menu.kicker": "Örnek — Online menü",
    "menu.title": "Bir menünüz olsaydı, işte böyle görünürdü.",
    "menu.body":
      "Tasarım sistemimizle kurulmuş örnek bir menü — kategoriler, fiyatlar, açıklamalar, gerçek menünüz için tamamen özelleştirilebilir.",
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
      "Sitenize doğrudan gömülü bir harita — müşterileriniz sayfadan çıkmadan sizi bulsun. Burada, Paris merkezli bir örnek.",
    "maps.cta": "Google Maps'te Aç",

    "config.kicker": "Canlı Yapılandırıcı",
    "config.title": "Sitenizi gerçek zamanlı kurun.",
    "config.subtitle": "Üç seçim, anında değişen bir önizleme — tasarım, içerik ve fiyat.",
    "config.step1": "1. İşletmeniz",
    "config.step2": "2. Seviyeniz",
    "config.step3": "3. Dilleriniz",
    "config.price": "Tahmini yatırım",
    "config.priceNote": "Yaklaşık fiyat · nihai teklif projeye özel",
    "config.cta": "Bu teklifi al",
    "config.essentiel.caption": "Temiz, hızlı, işlevsel — doğru yapılmış bir temel site.",
    "config.signature.caption": "Hareket, liquid glass ve tam sahneleme — Signature seviyesi.",
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
    "contactform.budget": "Yaklaşık bütçe",
    "contactform.message": "Mesaj",
    "contactform.submit": "Talebimi Gönder",
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

    "examples.kicker": "Örnekler",
    "examples.title": "Siteniz neler yapabilir, işte burada.",
    "examples.body":
      "Bunlar bizim projelerimiz değil — birer demo. Her modül, sizin için neler inşa edebileceğimizin bir önizlemesi.",
    "examples.ctaTitle": "Aklınızda başka bir şey mi var?",
    "examples.ctaButton": "Bize ulaşın",

    "transition.menuToMap": "İstek uyandıran bir menü. Zahmetsizce bulunan bir adres.",

    "booking.kicker": "Örnek — Rezervasyon",
    "booking.title": "Saniyeler içinde alınan bir randevu.",
    "booking.body":
      "Hizmet, tarih, saat, iletişim bilgileri — müşterilerinizin düşünmeden tamamladığı bir randevu akışı.",
    "booking.svc1": "Saç Kesimi",
    "booking.svc2": "Cilt Bakımı",
    "booking.svc3": "Danışma",
    "booking.step1": "Hizmet",
    "booking.step2": "Tarih",
    "booking.step3": "Saat",
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
      "Kapora, satın alma, kaporalı rezervasyon — akıcı ve güven veren bir ödeme deneyimi.",
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
