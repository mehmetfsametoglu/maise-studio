import { L } from "@/lib/l10n";

// Example (concept) sites that Maisé Studio designed itself for imaginary
// venues, to show work in sectors where there is no client project yet.
// They are NEVER listed as client work: they live under /examples, carry an
// explicit label, and are kept out of the sitemap.

export type Concept = {
  slug: string;
  name: string;
  shots: {
    desktop: { src: string; alt: L };
    mobile: { src: string; alt: L };
  };
  sector: L;
  city: string;
  siteLanguage: L;
  /** Service page this example illustrates. */
  serviceSlug: string;
  h1: L;
  summary: L;
  about: L;
  features: L[];
  design: L;
};

export const CONCEPTS: Concept[] = [
  {
    slug: "maison-vesper",
    name: "Maison Vesper",
    shots: {
      desktop: {
        src: "/work/shots/maison-vesper-desktop.webp",
        alt: L(
          "Page d'accueil du site d'exemple de l'hôtel fictif Maison Vesper sur ordinateur : un salon sombre et un patio, avec le titre « Dormir à Paris, comme chez soi »",
          "Home page of the example site for the fictional hotel Maison Vesper on a computer: a dark lounge and a courtyard, with the title “Dormir à Paris, comme chez soi”",
          "Hayali otel Maison Vesper'in örnek sitesinin bilgisayardaki ana sayfası: koyu bir salon ve bir avlu, “Dormir à Paris, comme chez soi” başlığıyla",
        ),
      },
      mobile: {
        src: "/work/shots/maison-vesper-mobile.webp",
        alt: L(
          "Page d'accueil du site d'exemple Maison Vesper sur téléphone",
          "Home page of the Maison Vesper example site on a phone",
          "Maison Vesper örnek sitesinin telefondaki ana sayfası",
        ),
      },
    },
    sector: L("Hôtel (fictif)", "Hotel (fictional)", "Otel (kurgusal)"),
    city: "Paris 6e",
    siteLanguage: L("Français, avec une version anglaise", "French, with an English version", "Fransızca, İngilizce sürümüyle"),
    serviceSlug: "site-web-hotel",
    h1: L(
      "Maison Vesper, un site d'exemple pour un hôtel à Paris",
      "Maison Vesper, an example site for a hotel in Paris",
      "Maison Vesper, Paris'te bir otel için örnek site",
    ),
    summary: L(
      "Un site complet pour un hôtel imaginaire de Saint-Germain, dessiné par nos soins : chambres, services, galerie et demande de séjour.",
      "A complete site for an imaginary Saint-Germain hotel, designed by us: rooms, services, gallery and stay request.",
      "Saint-Germain'de hayali bir otel için bizim tasarladığımız eksiksiz bir site: odalar, hizmetler, galeri ve konaklama talebi.",
    ),
    about: L(
      "Maison Vesper n'existe pas. Nous avons dessiné ce site pour montrer ce que nous ferions pour un petit hôtel : des photos qui portent la page, des chambres décrites clairement, une localisation évidente et un chemin court vers la demande de séjour. Les tarifs et les détails sont fictifs.",
      "Maison Vesper does not exist. We designed this site to show what we would do for a small hotel: photos that carry the page, clearly described rooms, an obvious location and a short path to a stay request. Prices and details are fictional.",
      "Maison Vesper diye bir otel yok. Bu siteyi, küçük bir otel için neler yapacağımızı göstermek üzere tasarladık: sayfayı taşıyan fotoğraflar, net anlatılmış odalar, belli bir konum ve konaklama talebine giden kısa bir yol. Fiyatlar ve ayrıntılar kurgusaldır.",
    ),
    features: [
      L("Présentation de la maison et de ses atouts en trois points", "Presentation of the house and its assets in three points", "Evin ve artılarının üç maddede tanıtımı"),
      L("Quatre chambres et suites, avec surface, lit et prix indicatif", "Four rooms and suites, with size, bed and indicative price", "Alan, yatak ve gösterge niteliğinde fiyatıyla dört oda ve süit"),
      L("Six services présentés clairement", "Six services presented clearly", "Net biçimde sunulan altı hizmet"),
      L("Galerie photo", "Photo gallery", "Fotoğraf galerisi"),
      L("Localisation, lignes de métro et quartier", "Location, metro lines and neighbourhood", "Konum, metro hatları ve semt"),
      L("Demande de séjour avec dates et voyageurs, envoyée par WhatsApp", "Stay request with dates and travellers, sent through WhatsApp", "Tarih ve yolcu sayısıyla, WhatsApp üzerinden gönderilen konaklama talebi"),
      L("Version française et version anglaise", "French and English versions", "Fransızca ve İngilizce sürüm"),
    ],
    design: L(
      "Un fond vert encre très sombre, un ivoire chaud pour le texte et un seul accent champagne. Une grande photo de salon en ouverture, un titre en serif très grand avec un mot en italique, des boutons arrondis.",
      "A very dark ink-green background, warm ivory text and a single champagne accent. A large lounge photo to open, a very large serif title with one italic word, rounded buttons.",
      "Çok koyu mürekkep yeşili bir arka plan, metin için sıcak fildişi ve tek bir şampanya vurgusu. Açılışta büyük bir salon fotoğrafı, tek kelimesi italik çok büyük serifli bir başlık ve yuvarlak düğmeler.",
    ),
  },
  {
    slug: "lumea-skin",
    name: "Lumea Skin Clinic",
    shots: {
      desktop: {
        src: "/work/shots/lumea-skin-desktop.webp",
        alt: L(
          "Page d'accueil du site d'exemple de la clinique fictive Lumea Skin Clinic sur ordinateur",
          "Home page of the example site for the fictional clinic Lumea Skin Clinic on a computer",
          "Hayali klinik Lumea Skin Clinic'in örnek sitesinin bilgisayardaki ana sayfası",
        ),
      },
      mobile: {
        src: "/work/shots/lumea-skin-mobile.webp",
        alt: L(
          "Page d'accueil du site d'exemple Lumea Skin Clinic sur téléphone : titre « Cildiniz için sakin, özenli bir yer » et bouton WhatsApp",
          "Home page of the Lumea Skin Clinic example site on a phone: the title “Cildiniz için sakin, özenli bir yer” and a WhatsApp button",
          "Lumea Skin Clinic örnek sitesinin telefondaki ana sayfası: “Cildiniz için sakin, özenli bir yer” başlığı ve WhatsApp düğmesi",
        ),
      },
    },
    sector: L("Clinique de soins de la peau (fictive)", "Skin care clinic (fictional)", "Cilt bakımı kliniği (kurgusal)"),
    city: "Nişantaşı, Istanbul",
    siteLanguage: L("Turc, avec une version anglaise", "Turkish, with an English version", "Türkçe, İngilizce sürümüyle"),
    serviceSlug: "site-web-commerce",
    h1: L(
      "Lumea Skin Clinic, un site d'exemple pour une clinique à Istanbul",
      "Lumea Skin Clinic, an example site for a clinic in Istanbul",
      "Lumea Skin Clinic, İstanbul'da bir klinik için örnek site",
    ),
    summary: L(
      "Un site complet pour une clinique de soins de la peau imaginaire à Nişantaşı : approche, soins, prise de rendez-vous et questions fréquentes.",
      "A complete site for an imaginary skin care clinic in Nişantaşı: approach, treatments, booking and frequently asked questions.",
      "Nişantaşı'nda hayali bir cilt bakımı kliniği için eksiksiz bir site: yaklaşım, bakımlar, randevu ve sık sorulan sorular.",
    ),
    about: L(
      "Lumea Skin Clinic n'existe pas. Nous avons dessiné ce site pour montrer ce que nous ferions pour une clinique ou un institut : un ton calme, des soins décrits sans promesse de résultat, et une prise de rendez-vous par WhatsApp en quelques secondes. Les horaires et les détails sont fictifs.",
      "Lumea Skin Clinic does not exist. We designed this site to show what we would do for a clinic or a beauty institute: a calm tone, treatments described without promising results, and booking through WhatsApp in a few seconds. Hours and details are fictional.",
      "Lumea Skin Clinic diye bir klinik yok. Bu siteyi, bir klinik veya güzellik merkezi için neler yapacağımızı göstermek üzere tasarladık: sakin bir ton, sonuç vaat etmeden anlatılan bakımlar ve birkaç saniyede WhatsApp ile randevu. Saatler ve ayrıntılar kurgusaldır.",
    ),
    features: [
      L("Une approche en trois principes", "An approach in three principles", "Üç ilkede bir yaklaşım"),
      L("Six soins avec leur durée, sans prix ni promesse de résultat", "Six treatments with their duration, no prices and no promise of results", "Süreleriyle altı bakım; fiyat ve sonuç vaadi yok"),
      L("Galerie de l'espace en six images", "Gallery of the space in six images", "Mekanın altı görselle galerisi"),
      L("Parcours de rendez-vous en quatre étapes", "Booking journey in four steps", "Dört adımda randevu yolculuğu"),
      L("Questions fréquentes", "Frequently asked questions", "Sık sorulan sorular"),
      L("Quartier, horaires et bouton de rendez-vous par WhatsApp", "District, hours and a WhatsApp booking button", "Semt, saatler ve WhatsApp randevu düğmesi"),
      L("Version turque et version anglaise", "Turkish and English versions", "Türkçe ve İngilizce sürüm"),
    ],
    design: L(
      "Une photo sombre et calme en ouverture, puis des sections claires et aérées. Un seul accent vert sauge, un grand titre en serif avec un mot en italique, des boutons arrondis.",
      "A dark, calm photo to open, then light, airy sections. A single sage-green accent, a large serif title with one italic word, rounded buttons.",
      "Açılışta koyu ve sakin bir fotoğraf, ardından açık ve ferah bölümler. Tek bir adaçayı yeşili vurgu, tek kelimesi italik büyük serifli bir başlık ve yuvarlak düğmeler.",
    ),
  },
];

export const getConcept = (slug: string) => CONCEPTS.find((c) => c.slug === slug);
