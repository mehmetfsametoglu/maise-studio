import type { DictKey } from "@/lib/i18n";
import { L } from "@/lib/l10n";

// Real delivered sites. Every field below was read off the live site or the
// existing portfolio copy. No outcomes, metrics or testimonials are listed
// because none are documented. Customer reviews that appear inside a client's
// own site belong to that client and are not repeated here.
// French is the reference copy and what crawlers see; English and Turkish are
// translations. SEO title and description stay French only.

export type Project = {
  slug: string;
  name: string;
  /** Page heading. The French one matches the SEO title. */
  h1: L;
  /** Live site of the client. */
  url: string;
  /** Editorial photo, used for the social card. */
  image: string;
  /** Real captures of the live site, taken at 1440 px and 390 px wide. */
  shots: {
    desktop: { src: string; alt: L };
    mobile: { src: string; alt: L };
  };
  /** Short label used by the i18n-driven cards on the home page. */
  sectorKey: DictKey;
  sector: L;
  city: string;
  country: L;
  siteLanguage: L;
  /** Page of /services most relevant to this project. */
  serviceSlug: string;
  summary: L;
  context: L;
  role: L;
  services: L[];
  design: L;
  features: L[];
  seoTitle: string;
  seoDescription: string;
};

const SERVICES_DELIVERED = [
  L("Design web", "Web design", "Web tasarımı"),
  L("Développement du site", "Site development", "Site geliştirme"),
  L("Mise en ligne", "Launch", "Yayına alma"),
];
const ROLE = L("Conception et développement du site.", "Design and development of the site.", "Sitenin tasarımı ve geliştirilmesi.");
const WHATSAPP_RESERVATION = L("Réservation par WhatsApp", "Booking through WhatsApp", "WhatsApp ile rezervasyon");
const GALLERY = L("Galerie photo", "Photo gallery", "Fotoğraf galerisi");

export const PROJECTS: Project[] = [
  {
    slug: "le-40",
    name: "Le 40",
    h1: L("Le 40, site web d'un bar à Paris", "Le 40, a bar's website in Paris", "Le 40, Paris'te bir barın web sitesi"),
    url: "https://lequarante.lovable.app",
    image: "/work/lequarante.jpg",
    shots: {
      desktop: {
        src: "/work/shots/le-40-desktop.webp",
        alt: L(
          "Page d'accueil du site du bar Le 40 sur ordinateur : titre « Le quarante, tous les soirs » sur une photo de la terrasse",
          "Home page of the Le 40 bar's site on a computer: the title “Le quarante, tous les soirs” over a photo of the terrace",
          "Le 40 barının sitesinin bilgisayardaki ana sayfası: terasın fotoğrafı üzerinde “Le quarante, tous les soirs” başlığı",
        ),
      },
      mobile: {
        src: "/work/shots/le-40-mobile.webp",
        alt: L(
          "Page d'accueil du site du bar Le 40 sur téléphone, avec les boutons Réserver une table et Voir la carte",
          "Home page of the Le 40 bar's site on a phone, with the Book a table and See the menu buttons",
          "Le 40 barının sitesinin telefondaki ana sayfası, Masa ayırt ve Menüyü gör düğmeleriyle",
        ),
      },
    },
    sectorKey: "realwork.le40",
    sector: L("Bar à cocktails", "Cocktail bar", "Kokteyl barı"),
    city: "Paris 10e",
    country: L("France", "France", "Fransa"),
    siteLanguage: L("Français", "French", "Fransızca"),
    serviceSlug: "site-web-restaurant-cafe",
    summary: L(
      "Le site d'un bar à cocktails des Grands Boulevards, à Paris : ambiance, carte, réservation et accès.",
      "The site of a cocktail bar on the Grands Boulevards in Paris: atmosphere, menu, booking and directions.",
      "Paris'te Grands Boulevards'daki bir kokteyl barının sitesi: ambiyans, menü, rezervasyon ve ulaşım.",
    ),
    context: L(
      "Le 40 est un bar de quartier du boulevard de Bonne Nouvelle, à Paris, ouvert tous les jours de 15h à 2h. Il a une terrasse-véranda, un happy hour et des DJ sets le week-end. Le site doit donner envie de pousser la porte, puis aider à réserver ou à trouver le bar.",
      "Le 40 is a neighbourhood bar on boulevard de Bonne Nouvelle in Paris, open every day from 3 pm to 2 am. It has a veranda terrace, a happy hour and DJ sets at the weekend. The site must make people want to walk in, then help them book or find the bar.",
      "Le 40, Paris'te Bonne Nouvelle bulvarında bir semt barı; her gün 15.00 ile 02.00 arası açık. Veranda teras, happy hour ve hafta sonu DJ setleri var. Site, içeri girme isteği uyandırmalı, ardından rezervasyon yapmaya veya barı bulmaya yardım etmeli.",
    ),
    role: ROLE,
    services: SERVICES_DELIVERED,
    design: L(
      "Une grande photo du bar en ouverture, des titres blancs très gras et un jaune doré repris des enseignes du bar. Le fond reste sombre pour garder l'ambiance du soir.",
      "A large photo of the bar to open, very bold white headings and a golden yellow taken from the bar's signs. The background stays dark to keep the evening mood.",
      "Açılışta barın büyük bir fotoğrafı, çok kalın beyaz başlıklar ve barın tabelalarından alınan altın sarısı. Akşam havasını korumak için arka plan koyu kalır.",
    ),
    features: [
      L("Bouton Réserver et Privatiser, visible en permanence en haut de page", "A Book and Private hire button, always visible at the top of the page", "Sayfanın üstünde her zaman görünen Rezervasyon ve Özel kiralama düğmesi"),
      L("Carte des vins au verre et à la bouteille, avec un accès à la carte complète", "Wine list by the glass and by the bottle, with access to the full menu", "Kadeh ve şişe şarap listesi, tam menüye erişimle"),
      L("Présentation de l'ambiance, du happy hour, des planches et des matchs diffusés", "Presentation of the atmosphere, the happy hour, the sharing boards and the live matches", "Ambiyansın, happy hour'un, tabakların ve canlı yayınlanan maçların tanıtımı"),
      GALLERY,
      L("Adresse, station de métro, horaires et itinéraire", "Address, metro station, hours and directions", "Adres, metro durağı, saatler ve yol tarifi"),
    ],
    seoTitle: "Le 40, site web d'un bar à Paris | Maisé Studio",
    seoDescription:
      "Étude de cas : le site du bar Le 40 (Paris 10e), conçu et développé par Maisé Studio. Ambiance, carte, réservation et accès, lisibles sur téléphone.",
  },
  {
    slug: "route-95",
    name: "Route 95",
    h1: L("Route 95, site web d'un restaurant à Istanbul", "Route 95, a restaurant's website in Istanbul", "Route 95, İstanbul'da bir restoranın web sitesi"),
    url: "https://route95.lovable.app",
    image: "/work/route95.jpg",
    shots: {
      desktop: {
        src: "/work/shots/route-95-desktop.webp",
        alt: L(
          "Page d'accueil du site du restaurant Route 95 sur ordinateur : titre « Good Food. On The Route. » sur une photo de produits",
          "Home page of the Route 95 restaurant's site on a computer: the title “Good Food. On The Route.” over a product photo",
          "Route 95 restoranının sitesinin bilgisayardaki ana sayfası: ürün fotoğrafı üzerinde “Good Food. On The Route.” başlığı",
        ),
      },
      mobile: {
        src: "/work/shots/route-95-mobile.webp",
        alt: L(
          "Page d'accueil du site du restaurant Route 95 sur téléphone, avec le bouton WhatsApp",
          "Home page of the Route 95 restaurant's site on a phone, with the WhatsApp button",
          "Route 95 restoranının sitesinin telefondaki ana sayfası, WhatsApp düğmesiyle",
        ),
      },
    },
    sectorKey: "realwork.route95",
    sector: L("Restaurant, style diner américain", "Restaurant, American diner style", "Restoran, Amerikan diner tarzı"),
    city: "Kağıthane, Istanbul",
    country: L("Turquie", "Türkiye", "Türkiye"),
    siteLanguage: L("Turc", "Turkish", "Türkçe"),
    serviceSlug: "site-web-restaurant-cafe",
    summary: L(
      "Le site d'un restaurant de style diner américain à Kağıthane, Istanbul : menu, galerie, horaires et contact WhatsApp.",
      "The site of an American diner-style restaurant in Kağıthane, Istanbul: menu, gallery, hours and WhatsApp contact.",
      "İstanbul Kağıthane'de Amerikan diner tarzı bir restoranın sitesi: menü, galeri, saatler ve WhatsApp iletişimi.",
    ),
    context: L(
      "Route 95 est un restaurant de style diner américain, ouvert tous les jours jusqu'à 23h, rue Cendere à Kağıthane. Smash burgers, cheesesteak, petit-déjeuner toute la journée. Le site est écrit en turc pour la clientèle du quartier.",
      "Route 95 is an American diner-style restaurant, open every day until 11 pm, on Cendere street in Kağıthane. Smash burgers, cheesesteak, all-day breakfast. The site is written in Turkish for the local customers.",
      "Route 95, Kağıthane'de Cendere Caddesi'nde, her gün 23.00'e kadar açık Amerikan diner tarzı bir restoran. Smash burger, cheesesteak, gün boyu kahvaltı. Site, semt müşterileri için Türkçe yazılmıştır.",
    ),
    role: ROLE,
    services: SERVICES_DELIVERED,
    design: L(
      "Une photo des produits plein écran en ouverture, des titres blancs très gras et le rouge des emballages de la marque. Le bouton WhatsApp reste visible sur téléphone.",
      "A full-screen product photo to open, very bold white headings and the red of the brand's packaging. The WhatsApp button stays visible on a phone.",
      "Açılışta tam ekran bir ürün fotoğrafı, çok kalın beyaz başlıklar ve markanın ambalajlarının kırmızısı. WhatsApp düğmesi telefonda görünür kalır.",
    ),
    features: [
      L("Menu présenté en six catégories", "Menu presented in six categories", "Altı kategoride sunulan menü"),
      GALLERY,
      L("Bouton WhatsApp pour écrire au restaurant", "A WhatsApp button to message the restaurant", "Restorana yazmak için WhatsApp düğmesi"),
      L("Adresse, téléphone, horaires et prix moyen par personne", "Address, phone, hours and average price per person", "Adres, telefon, saatler ve kişi başı ortalama fiyat"),
      L("Site entièrement en turc", "Site fully in Turkish", "Tamamen Türkçe site"),
    ],
    seoTitle: "Route 95, site web d'un restaurant à Istanbul | Maisé Studio",
    seoDescription:
      "Étude de cas : le site du restaurant Route 95 à Kağıthane, Istanbul, conçu et développé par Maisé Studio. Menu, galerie et contact WhatsApp, en turc.",
  },
  {
    slug: "voler-coffee",
    name: "Vøler Coffee & Breakfast",
    h1: L("Vøler Coffee, site web d'un café à Istanbul", "Vøler Coffee, a café's website in Istanbul", "Vøler Coffee, İstanbul'da bir kafenin web sitesi"),
    url: "https://voolercoffee.lovable.app",
    image: "/work/voolercoffee.jpg",
    shots: {
      desktop: {
        src: "/work/shots/voler-coffee-desktop.webp",
        alt: L(
          "Page d'accueil du site du café Vøler sur ordinateur : une tasse de café avec le nom Vøler écrit dans le café",
          "Home page of the Vøler café's site on a computer: a cup of coffee with the name Vøler written in the coffee",
          "Vøler kafesinin sitesinin bilgisayardaki ana sayfası: kahvenin içinde Vøler adı yazan bir fincan",
        ),
      },
      mobile: {
        src: "/work/shots/voler-coffee-mobile.webp",
        alt: L(
          "Page d'accueil du site du café Vøler sur téléphone, avec l'indication d'ouverture et le bouton de réservation WhatsApp",
          "Home page of the Vøler café's site on a phone, with the opening indicator and the WhatsApp booking button",
          "Vøler kafesinin sitesinin telefondaki ana sayfası, açıklık göstergesi ve WhatsApp rezervasyon düğmesiyle",
        ),
      },
    },
    sectorKey: "realwork.voler",
    sector: L("Café et petit-déjeuner", "Café and breakfast", "Kafe ve kahvaltı"),
    city: "Ataköy, Istanbul",
    country: L("Turquie", "Türkiye", "Türkiye"),
    siteLanguage: L("Turc", "Turkish", "Türkçe"),
    serviceSlug: "site-web-restaurant-cafe",
    summary: L(
      "Le site d'un café et lieu de petit-déjeuner à Ataköy, Istanbul : menu, galerie, horaires et réservation WhatsApp.",
      "The site of a café and breakfast place in Ataköy, Istanbul: menu, gallery, hours and WhatsApp booking.",
      "İstanbul Ataköy'de bir kafe ve kahvaltı mekanının sitesi: menü, galeri, saatler ve WhatsApp rezervasyonu.",
    ),
    context: L(
      "Vøler est un café de quartier d'Ataköy, à Istanbul, ouvert tous les jours de 8h30 à 23h30. Il sert des petits-déjeuners, du café filtre et des boissons glacées. Le site présente le lieu et permet de réserver par WhatsApp.",
      "Vøler is a neighbourhood café in Ataköy, Istanbul, open every day from 8:30 am to 11:30 pm. It serves breakfasts, filter coffee and iced drinks. The site presents the place and lets people book through WhatsApp.",
      "Vøler, İstanbul Ataköy'de her gün 08.30 ile 23.30 arası açık bir semt kafesi. Kahvaltı, filtre kahve ve buzlu içecekler sunuyor. Site mekanı tanıtıyor ve WhatsApp üzerinden rezervasyon yapmayı sağlıyor.",
    ),
    role: ROLE,
    services: SERVICES_DELIVERED,
    design: L(
      "Un fond noir, une tasse de café vue de dessus avec le nom du café écrit dans la tasse, et une typographie à empattements fine pour le logo. L'ensemble reste sobre.",
      "A black background, a coffee cup seen from above with the café's name written in the cup, and a fine serif typeface for the logo. The whole stays restrained.",
      "Siyah bir arka plan, kafenin adının fincanın içinde yazdığı yukarıdan görülen bir kahve fincanı ve logo için ince bir serifli yazı tipi. Bütün sade kalır.",
    ),
    features: [
      L("Indication « ouvert maintenant » avec l'heure d'Istanbul", "An “open now” indicator with Istanbul time", "İstanbul saatiyle “şu an açık” göstergesi"),
      WHATSAPP_RESERVATION,
      L("Menu présenté en six catégories", "Menu presented in six categories", "Altı kategoride sunulan menü"),
      GALLERY,
      L("Adresse et horaires de la semaine", "Address and weekly hours", "Adres ve haftalık saatler"),
      L("Site entièrement en turc", "Site fully in Turkish", "Tamamen Türkçe site"),
    ],
    seoTitle: "Vøler Coffee, site web d'un café à Istanbul | Maisé Studio",
    seoDescription:
      "Étude de cas : le site du café Vøler à Ataköy, Istanbul, conçu et développé par Maisé Studio. Menu, galerie, horaires et réservation WhatsApp.",
  },
  {
    slug: "bloom-mosaic",
    name: "Bloom Mosaic Studio",
    h1: L("Bloom Mosaic, site d'un atelier à Los Angeles", "Bloom Mosaic, a workshop's website in Los Angeles", "Bloom Mosaic, Los Angeles'ta bir atölyenin web sitesi"),
    url: "https://mosaic-motion-studio.lovable.app",
    image: "/work/bloom-mosaic.jpg",
    shots: {
      desktop: {
        src: "/work/shots/bloom-mosaic-desktop.webp",
        alt: L(
          "Page d'accueil du site de Bloom Mosaic Studio sur ordinateur : titre « Made by hand. Lit by you. » sur une lampe en mosaïque",
          "Home page of the Bloom Mosaic Studio site on a computer: the title “Made by hand. Lit by you.” over a mosaic lamp",
          "Bloom Mosaic Studio sitesinin bilgisayardaki ana sayfası: mozaik bir lamba üzerinde “Made by hand. Lit by you.” başlığı",
        ),
      },
      mobile: {
        src: "/work/shots/bloom-mosaic-mobile.webp",
        alt: L(
          "Page d'accueil du site de Bloom Mosaic Studio sur téléphone, avec le bouton de réservation d'un atelier",
          "Home page of the Bloom Mosaic Studio site on a phone, with the workshop booking button",
          "Bloom Mosaic Studio sitesinin telefondaki ana sayfası, atölye rezervasyon düğmesiyle",
        ),
      },
    },
    sectorKey: "realwork.bloom",
    sector: L("Atelier de création", "Creative workshop", "Yaratıcı atölye"),
    city: "Los Angeles",
    country: L("États-Unis", "United States", "Amerika Birleşik Devletleri"),
    siteLanguage: L("Anglais", "English", "İngilizce"),
    serviceSlug: "site-web-commerce",
    summary: L(
      "Le site d'un atelier de lampes en mosaïque turque à Los Angeles : ateliers, tarifs, galerie et réservation.",
      "The site of a Turkish mosaic lamp workshop in Los Angeles: workshops, prices, gallery and booking.",
      "Los Angeles'ta Türk mozaik lamba atölyesinin sitesi: atölyeler, fiyatlar, galeri ve rezervasyon.",
    ),
    context: L(
      "Bloom Mosaic Studio propose à Los Angeles des ateliers de lampes en mosaïque turque, de 2 à 4 heures. Le site présente chaque atelier avec sa durée et son prix, et permet de réserver. Il est écrit en anglais.",
      "Bloom Mosaic Studio offers Turkish mosaic lamp workshops in Los Angeles, from 2 to 4 hours. The site presents each workshop with its duration and price, and lets people book. It is written in English.",
      "Bloom Mosaic Studio, Los Angeles'ta 2 ile 4 saat arası Türk mozaik lamba atölyeleri sunuyor. Site her atölyeyi süresi ve fiyatıyla tanıtıyor ve rezervasyon yapmayı sağlıyor. İngilizce yazılmıştır.",
    ),
    role: ROLE,
    services: SERVICES_DELIVERED,
    design: L(
      "Une lampe en mosaïque allumée plein écran en ouverture, un très grand titre blanc sur fond sombre et chaud, et des boutons arrondis. Une animation fait apparaître la mosaïque pendant le défilement.",
      "A lit mosaic lamp full screen to open, a very large white heading on a dark, warm background, and rounded buttons. An animation builds the mosaic as you scroll.",
      "Açılışta tam ekran yanan bir mozaik lamba, koyu ve sıcak bir arka planda çok büyük beyaz bir başlık ve yuvarlak düğmeler. Bir animasyon, kaydırdıkça mozaiği oluşturur.",
    ),
    features: [
      L("Liste de six ateliers avec durée et prix", "A list of six workshops with duration and price", "Süre ve fiyatıyla altı atölyenin listesi"),
      WHATSAPP_RESERVATION,
      L("Questions fréquentes", "Frequently asked questions", "Sık sorulan sorular"),
      GALLERY,
      L("Site entièrement en anglais", "Site fully in English", "Tamamen İngilizce site"),
    ],
    seoTitle: "Bloom Mosaic, site d'un atelier à Los Angeles | Maisé Studio",
    seoDescription:
      "Étude de cas : le site de Bloom Mosaic Studio, atelier de lampes en mosaïque à Los Angeles, conçu par Maisé Studio. Ateliers, tarifs, réservation.",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

// Kept for the cards on the home page, which already iterate this list.
export const REAL_PROJECTS = PROJECTS;
