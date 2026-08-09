"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "fr" | "en" | "tr";

export const LANG_PRICE: Record<Lang, number> = { fr: 0, en: 250, tr: 250 };

const dict = {
  fr: {
    "nav.configurator": "Configurateur",
    "nav.work": "Réalisations",
    "nav.contact": "Contact",
    "nav.cta": "Discuter sur WhatsApp",

    "hero.kicker": "MAISÉ STUDIO — SITES WEB SUR MESURE, PARIS",
    "hero.title1": "VOTRE SITE.",
    "hero.title2": "VOTRE NIVEAU.",
    "hero.subtitle":
      "Choisissez votre métier, votre niveau, vos langues — et voyez votre futur site prendre forme en direct, avec son prix.",
    "hero.cta": "Configurer mon site",

    "config.kicker": "CONFIGURATEUR EN DIRECT",
    "config.title": "Composez votre site, en temps réel.",
    "config.subtitle":
      "Trois choix, un aperçu qui change instantanément — design, contenu et prix.",

    "config.step1": "1. Votre métier",
    "biz.cafe.name": "Café & Restaurant",
    "biz.cafe.desc": "Menu, ambiance chaleureuse, réservation",
    "biz.clinic.name": "Clinique & Beauté",
    "biz.clinic.desc": "Confiance, calme, prise de rendez-vous",
    "biz.hotel.name": "Hôtel & Boutique",
    "biz.hotel.desc": "Image forte, réservation, vitrine produit",

    "config.step2": "2. Votre niveau",
    "tier.basic.name": "Basic",
    "tier.basic.tag": "Site vitrine propre",
    "tier.mid.name": "Mid",
    "tier.mid.tag": "Animé, interactif",
    "tier.premium.name": "Premium 3D",
    "tier.premium.tag": "Expérience 3D immersive",

    "config.step3": "3. Vos langues",
    "lang.fr.name": "Français",
    "lang.fr.note": "Inclus",
    "lang.en.name": "Anglais",
    "lang.tr.name": "Turc",

    "config.price.label": "Investissement estimé",
    "config.price.note": "Prix indicatif · devis final sur mesure",
    "config.price.cta": "Recevoir ce devis sur WhatsApp",

    "preview.badge.basic": "APERÇU — BASIC",
    "preview.badge.mid": "APERÇU — MID",
    "preview.badge.premium": "APERÇU — PREMIUM 3D",
    "preview.caption.basic":
      "Propre, rapide, efficace. Aucune animation — l'essentiel, bien fait.",
    "preview.caption.mid":
      "Texte animé, boutons magnétiques, curseur personnalisé, défilement fluide.",
    "preview.caption.premium":
      "Scène 3D interactive en temps réel, en plus de tout le niveau Mid.",

    "biz.cafe.headline1": "UN CAFÉ",
    "biz.cafe.headline2": "QU'ON N'OUBLIE PAS.",
    "biz.cafe.sub": "Menu de saison, torréfaction maison, réservation en ligne.",
    "biz.cafe.cta": "Voir le menu",
    "biz.cafe.nav1": "Menu",
    "biz.cafe.nav2": "Réserver",

    "biz.clinic.headline1": "VOTRE BEAUTÉ,",
    "biz.clinic.headline2": "NOTRE SOIN.",
    "biz.clinic.sub": "Soins sur mesure, praticiens certifiés, prise de rendez-vous.",
    "biz.clinic.cta": "Prendre rendez-vous",
    "biz.clinic.nav1": "Soins",
    "biz.clinic.nav2": "Rendez-vous",

    "biz.hotel.headline1": "UNE ADRESSE",
    "biz.hotel.headline2": "D'EXCEPTION.",
    "biz.hotel.sub": "Chambres, suites et service sur mesure, au cœur de Paris.",
    "biz.hotel.cta": "Réserver une chambre",
    "biz.hotel.nav1": "Chambres",
    "biz.hotel.nav2": "Réserver",

    "marquee.items":
      "CAFÉS · RESTAURANTS · CLINIQUES · INSTITUTS DE BEAUTÉ · HÔTELS · BOUTIQUES",
    "why.kicker": "POURQUOI MAISÉ",
    "why.title": "Un savoir-faire technique rare, une élégance intemporelle.",
    "why.1.title": "Sur mesure",
    "why.1.body": "Aucun template. Chaque site est pensé pour votre métier.",
    "why.2.title": "3D & mouvement",
    "why.2.body": "Des expériences WebGL que peu d'agences savent livrer.",
    "why.3.title": "Multilingue",
    "why.3.body": "Votre site parle la langue de vos clients — et de vos ambitions.",

    "work.kicker": "RÉALISATIONS",
    "work.title": "Déjà livré, déjà en ligne.",
    "work.subtitle": "Deux exemples concrets du niveau de finition Maisé.",
    "work.fruity.tag": "CAFÉ · NIVEAU PREMIUM 3D",
    "work.fruity.title": "Fruity",
    "work.fruity.body":
      "Café parisien — menu au survol, tasse 3D animée au défilement.",
    "work.nexus.tag": "AGENCE · NIVEAU PREMIUM 3D",
    "work.nexus.title": "Nexus Studio",
    "work.nexus.body":
      "Portfolio d'agence — parcours 3D en boutique de café, du scroll à la table.",
    "work.viewcase": "Voir l'aperçu",
    "work.localnote": "Aperçu local — lien public dès mise en ligne.",

    "contact.kicker": "CONTACT",
    "contact.title": "Parlons de votre projet.",
    "contact.subtitle":
      "Réponse sous 24h, tous les jours sauf le dimanche.",
    "contact.whatsapp": "Écrire sur WhatsApp",
    "contact.hours.label": "Horaires",
    "contact.hours.value": "Lun–Sam, 9h–19h",
    "contact.hours.note": "Joignables tous les jours, sauf le dimanche",
    "contact.location.label": "Basés à",
    "contact.location.value": "Paris, France",
    "contact.team.label": "L'équipe",

    "footer.tag": "Sites web sur mesure, conçus à Paris.",
    "footer.rights": "Tous droits réservés.",
  },
  en: {
    "nav.configurator": "Configurator",
    "nav.work": "Work",
    "nav.contact": "Contact",
    "nav.cta": "Chat on WhatsApp",

    "hero.kicker": "MAISÉ STUDIO — BESPOKE WEBSITES, PARIS",
    "hero.title1": "YOUR SITE.",
    "hero.title2": "YOUR LEVEL.",
    "hero.subtitle":
      "Pick your business, your tier, your languages — watch your future site take shape live, with its price.",
    "hero.cta": "Configure my site",

    "config.kicker": "LIVE CONFIGURATOR",
    "config.title": "Build your site, in real time.",
    "config.subtitle":
      "Three choices, one preview that changes instantly — design, content and price.",

    "config.step1": "1. Your business",
    "biz.cafe.name": "Café & Restaurant",
    "biz.cafe.desc": "Menu, warm atmosphere, reservations",
    "biz.clinic.name": "Clinic & Beauty",
    "biz.clinic.desc": "Trust, calm, appointment booking",
    "biz.hotel.name": "Hotel & Boutique",
    "biz.hotel.desc": "Strong image, booking, product showcase",

    "config.step2": "2. Your tier",
    "tier.basic.name": "Basic",
    "tier.basic.tag": "Clean showcase site",
    "tier.mid.name": "Mid",
    "tier.mid.tag": "Animated, interactive",
    "tier.premium.name": "Premium 3D",
    "tier.premium.tag": "Immersive 3D experience",

    "config.step3": "3. Your languages",
    "lang.fr.name": "French",
    "lang.fr.note": "Included",
    "lang.en.name": "English",
    "lang.tr.name": "Turkish",

    "config.price.label": "Estimated investment",
    "config.price.note": "Indicative price · final quote tailored to you",
    "config.price.cta": "Get this quote on WhatsApp",

    "preview.badge.basic": "PREVIEW — BASIC",
    "preview.badge.mid": "PREVIEW — MID",
    "preview.badge.premium": "PREVIEW — PREMIUM 3D",
    "preview.caption.basic":
      "Clean, fast, effective. No animation — the essentials, done right.",
    "preview.caption.mid":
      "Animated text, magnetic buttons, custom cursor, smooth scroll.",
    "preview.caption.premium":
      "A real-time interactive 3D scene, on top of everything in Mid.",

    "biz.cafe.headline1": "A CAFÉ",
    "biz.cafe.headline2": "WORTH REMEMBERING.",
    "biz.cafe.sub": "Seasonal menu, house roast, online reservations.",
    "biz.cafe.cta": "View the menu",
    "biz.cafe.nav1": "Menu",
    "biz.cafe.nav2": "Reserve",

    "biz.clinic.headline1": "YOUR BEAUTY,",
    "biz.clinic.headline2": "OUR CARE.",
    "biz.clinic.sub": "Tailored treatments, certified practitioners, easy booking.",
    "biz.clinic.cta": "Book an appointment",
    "biz.clinic.nav1": "Treatments",
    "biz.clinic.nav2": "Book",

    "biz.hotel.headline1": "AN ADDRESS",
    "biz.hotel.headline2": "LIKE NO OTHER.",
    "biz.hotel.sub": "Rooms, suites and tailored service, in the heart of Paris.",
    "biz.hotel.cta": "Book a room",
    "biz.hotel.nav1": "Rooms",
    "biz.hotel.nav2": "Book",

    "marquee.items":
      "CAFÉS · RESTAURANTS · CLINICS · BEAUTY SALONS · HOTELS · BOUTIQUES",
    "why.kicker": "WHY MAISÉ",
    "why.title": "Rare technical craft, timeless elegance.",
    "why.1.title": "Bespoke",
    "why.1.body": "No templates. Every site is built around your business.",
    "why.2.title": "3D & motion",
    "why.2.body": "WebGL experiences few agencies can actually ship.",
    "why.3.title": "Multilingual",
    "why.3.body": "Your site speaks your customers' language — and your ambitions.",

    "work.kicker": "SELECTED WORK",
    "work.title": "Already delivered, already live.",
    "work.subtitle": "Two concrete examples of Maisé-level finish.",
    "work.fruity.tag": "CAFÉ · PREMIUM 3D TIER",
    "work.fruity.title": "Fruity",
    "work.fruity.body":
      "Paris café — hover-reveal menu, scroll-scrubbed 3D coffee cup.",
    "work.nexus.tag": "AGENCY · PREMIUM 3D TIER",
    "work.nexus.title": "Nexus Studio",
    "work.nexus.body":
      "Agency portfolio — a 3D coffee-shop scroll journey, from cup to table.",
    "work.viewcase": "View preview",
    "work.localnote": "Local preview — public link once deployed.",

    "contact.kicker": "CONTACT",
    "contact.title": "Let's talk about your project.",
    "contact.subtitle": "We reply within 24h, every day except Sunday.",
    "contact.whatsapp": "Message on WhatsApp",
    "contact.hours.label": "Hours",
    "contact.hours.value": "Mon–Sat, 9am–7pm",
    "contact.hours.note": "Reachable every day, except Sunday",
    "contact.location.label": "Based in",
    "contact.location.value": "Paris, France",
    "contact.team.label": "The team",

    "footer.tag": "Bespoke websites, designed in Paris.",
    "footer.rights": "All rights reserved.",
  },
  tr: {
    "nav.configurator": "Yapılandırıcı",
    "nav.work": "Projeler",
    "nav.contact": "İletişim",
    "nav.cta": "WhatsApp'tan Yaz",

    "hero.kicker": "MAISÉ STUDIO — PARİS'TEN ÖZEL TASARIM SİTELER",
    "hero.title1": "SİZİN SİTENİZ.",
    "hero.title2": "SİZİN SEVİYENİZ.",
    "hero.subtitle":
      "İşletmenizi, seviyenizi, dillerinizi seçin — geleceğin siteniz fiyatıyla birlikte anında canlanır.",
    "hero.cta": "Sitemi Yapılandır",

    "config.kicker": "CANLI YAPILANDIRICI",
    "config.title": "Sitenizi gerçek zamanlı kurun.",
    "config.subtitle":
      "Üç seçim, anında değişen bir önizleme — tasarım, içerik ve fiyat.",

    "config.step1": "1. İşletmeniz",
    "biz.cafe.name": "Kafe & Restoran",
    "biz.cafe.desc": "Menü, sıcak atmosfer, rezervasyon",
    "biz.clinic.name": "Klinik & Güzellik",
    "biz.clinic.desc": "Güven, sakinlik, randevu sistemi",
    "biz.hotel.name": "Otel & Butik Mağaza",
    "biz.hotel.desc": "Güçlü imaj, rezervasyon, ürün vitrini",

    "config.step2": "2. Seviyeniz",
    "tier.basic.name": "Basic",
    "tier.basic.tag": "Sade, temiz vitrin site",
    "tier.mid.name": "Mid",
    "tier.mid.tag": "Animasyonlu, interaktif",
    "tier.premium.name": "Premium 3D",
    "tier.premium.tag": "Etkileyici 3D deneyim",

    "config.step3": "3. Dilleriniz",
    "lang.fr.name": "Fransızca",
    "lang.fr.note": "Dahil",
    "lang.en.name": "İngilizce",
    "lang.tr.name": "Türkçe",

    "config.price.label": "Tahmini yatırım",
    "config.price.note": "Yaklaşık fiyat · nihai teklif projeye özel",
    "config.price.cta": "Bu teklifi WhatsApp'tan al",

    "preview.badge.basic": "ÖNİZLEME — BASIC",
    "preview.badge.mid": "ÖNİZLEME — MID",
    "preview.badge.premium": "ÖNİZLEME — PREMIUM 3D",
    "preview.caption.basic":
      "Temiz, hızlı, işlevsel. Animasyon yok — doğru yapılmış temel bir site.",
    "preview.caption.mid":
      "Animasyonlu yazı, mıknatıs efektli butonlar, özel imleç, akıcı scroll.",
    "preview.caption.premium":
      "Mid seviyesinin üstüne, gerçek zamanlı interaktif 3D sahne.",

    "biz.cafe.headline1": "UNUTULMAYAN",
    "biz.cafe.headline2": "BİR KAFE.",
    "biz.cafe.sub": "Mevsimlik menü, kendi kavrumumuz, online rezervasyon.",
    "biz.cafe.cta": "Menüyü Gör",
    "biz.cafe.nav1": "Menü",
    "biz.cafe.nav2": "Rezervasyon",

    "biz.clinic.headline1": "GÜZELLİĞİNİZ,",
    "biz.clinic.headline2": "BİZİM İŞİMİZ.",
    "biz.clinic.sub": "Kişiye özel bakım, sertifikalı uzmanlar, kolay randevu.",
    "biz.clinic.cta": "Randevu Al",
    "biz.clinic.nav1": "Bakımlar",
    "biz.clinic.nav2": "Randevu",

    "biz.hotel.headline1": "EŞSİZ",
    "biz.hotel.headline2": "BİR ADRES.",
    "biz.hotel.sub": "Paris'in kalbinde oda, süit ve özel hizmet.",
    "biz.hotel.cta": "Oda Ayırt",
    "biz.hotel.nav1": "Odalar",
    "biz.hotel.nav2": "Rezervasyon",

    "marquee.items":
      "KAFELER · RESTORANLAR · KLİNİKLER · GÜZELLİK SALONLARI · OTELLER · BUTİKLER",
    "why.kicker": "NEDEN MAISÉ",
    "why.title": "Nadir teknik ustalık, zamansız zarafet.",
    "why.1.title": "Kişiye Özel",
    "why.1.body": "Şablon yok. Her site işletmenize göre kurulur.",
    "why.2.title": "3D & Hareket",
    "why.2.body": "Az ajansın teslim edebildiği gerçek WebGL deneyimler.",
    "why.3.title": "Çok Dilli",
    "why.3.body": "Siteniz müşterilerinizin dilinden konuşur.",

    "work.kicker": "SEÇİLİ PROJELER",
    "work.title": "Zaten teslim edildi, zaten yayında.",
    "work.subtitle": "Maisé kalitesinin iki somut örneği.",
    "work.fruity.tag": "KAFE · PREMIUM 3D SEVİYE",
    "work.fruity.title": "Fruity",
    "work.fruity.body":
      "Paris kafesi — hover ile açılan menü, scroll'a bağlı 3D kahve fincanı.",
    "work.nexus.tag": "AJANS · PREMIUM 3D SEVİYE",
    "work.nexus.title": "Nexus Studio",
    "work.nexus.body":
      "Ajans portföyü — fincandan masaya, 3D kahve dükkanı scroll yolculuğu.",
    "work.viewcase": "Önizlemeyi Gör",
    "work.localnote": "Yerel önizleme — yayına alınınca herkese açık link.",

    "contact.kicker": "İLETİŞİM",
    "contact.title": "Projenizi konuşalım.",
    "contact.subtitle": "24 saat içinde dönüş — Pazar hariç her gün.",
    "contact.whatsapp": "WhatsApp'tan Yaz",
    "contact.hours.label": "Çalışma Saatleri",
    "contact.hours.value": "Pzt–Cmt, 09:00–19:00",
    "contact.hours.note": "Pazar hariç her gün ulaşılabiliriz",
    "contact.location.label": "Konum",
    "contact.location.value": "Paris, Fransa",
    "contact.team.label": "Ekip",

    "footer.tag": "Paris'te tasarlanan, kişiye özel web siteleri.",
    "footer.rights": "Tüm hakları saklıdır.",
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
    const stored = window.localStorage.getItem("maise-lang") as Lang | null;
    if (stored === "fr" || stored === "en" || stored === "tr") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("maise-lang", l);
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
