import { PACKAGES, formatEur } from "@/lib/pricing";
import { L } from "@/lib/l10n";

// The five service pages. French is the reference copy and what the server
// renders; English and Turkish are translations of it. Where Maisé has no
// delivered example (hotels, clinics) the page says so instead of implying
// experience that is not documented.

export type Item = { title: L; text: L };
export type Section = { id: string; title: L; intro?: L; items: Item[] };

export type Service = {
  slug: string;
  /** Short name used in menus, cards and breadcrumbs. */
  name: L;
  cardText: L;
  h1: L;
  /** French only: metadata is served in the page's default language. */
  metaTitle: string;
  metaDescription: string;
  /** One quotable, factual paragraph shown near the top of the page. */
  summary: L;
  lead: L;
  sections: Section[];
  /** Plain statement shown in a highlighted block when something cannot be promised or shown. */
  honesty?: { title: L; text: L };
  projects: string[];
  projectsTitle?: L;
  /** Example (concept) sites shown under a clear "not a client project" label. */
  concepts?: string[];
  faq: string[];
  serviceType: string;
  /** Shows the price block and adds Offer data to the Service JSON-LD. */
  priced?: boolean;
};

const from = (n: number) => `à partir de ${formatEur(n)}`;
const it = (title: L, text: L): Item => ({ title, text });

export const SERVICES: Service[] = [
  {
    slug: "creation-site-internet",
    name: L("Création de site internet", "Website creation", "Web sitesi tasarımı"),
    cardText: L(
      "Le service de base : design, développement et mise en ligne de votre site sur mesure.",
      "The core service: design, development and launch of your custom website.",
      "Temel hizmet: size özel sitenizin tasarımı, geliştirilmesi ve yayına alınması.",
    ),
    h1: L(
      "Création de site internet sur mesure à Paris.",
      "Custom website creation in Paris.",
      "Paris'te size özel web sitesi tasarımı.",
    ),
    metaTitle: "Création de site internet sur mesure à Paris | Maisé Studio",
    metaDescription: `Maisé Studio, studio web à Paris, conçoit et développe votre site sur mesure : design, développement et mise en ligne. Formules ${from(PACKAGES.essentiel.eur)}.`,
    summary: L(
      "Maisé Studio crée des sites internet sur mesure pour les commerces et les lieux. Le design, le développement et la mise en ligne sont faits par la même équipe, à Paris.",
      "Maisé Studio builds custom websites for businesses and venues. Design, development and launch are done by the same team, in Paris.",
      "Maisé Studio, işletmeler ve mekanlar için size özel web siteleri yapar. Tasarım, geliştirme ve yayına alma aynı ekip tarafından, Paris'te yapılır.",
    ),
    lead: L(
      "Pas de thème recyclé. Chaque site part de votre activité, de vos clients et de ce que vous voulez qu'ils fassent : réserver, appeler, venir vous voir.",
      "No recycled theme. Every site starts from your business, your customers and what you want them to do: book, call, come and see you.",
      "Geri dönüştürülmüş tema yok. Her site; işletmenizden, müşterilerinizden ve onlardan ne yapmalarını istediğinizden yola çıkar: rezervasyon yapmak, aramak, size uğramak.",
    ),
    sections: [
      {
        id: "contenu",
        title: L("Ce que comprend le projet", "What the project includes", "Projeye neler dahil"),
        items: [
          it(L("Design web", "Web design", "Web tasarımı"), L("Un visuel dessiné pour votre marque, de la page d'accueil à la dernière page.", "A look drawn for your brand, from the home page to the last page.", "Markanız için çizilmiş bir görünüm, ana sayfadan son sayfaya kadar.")),
          it(L("Développement", "Development", "Geliştirme"), L("Un site rapide, qui s'affiche bien sur téléphone, tablette et ordinateur.", "A fast site that displays well on phone, tablet and computer.", "Telefonda, tablette ve bilgisayarda iyi görünen hızlı bir site.")),
          it(L("Textes et images", "Texts and images", "Metinler ve görseller"), L("On s'occupe des textes avec vous. Le ton, les photos et la mise en page vont ensemble.", "We handle the texts with you. Tone, photos and layout go together.", "Metinleri sizinle birlikte hazırlıyoruz. Ton, fotoğraflar ve sayfa düzeni birbiriyle uyumlu olur.")),
          it(L("Mise en ligne", "Launch", "Yayına alma"), L("Nom de domaine, hébergement et dernière vérification avant l'ouverture.", "Domain name, hosting and a final check before opening.", "Alan adı, barındırma ve açılıştan önce son kontrol.")),
          it(L("Suivi", "Follow-up", "Takip"), L("On met à jour et on corrige quand vous en avez besoin.", "We update and fix things when you need it.", "İhtiyaç duyduğunuzda güncelliyor ve düzeltiyoruz.")),
        ],
      },
      {
        id: "etapes",
        title: L("Du premier brief à la mise en ligne", "From the first brief to launch", "İlk görüşmeden yayına"),
        items: [
          it(L("1. Le brief", "1. The brief", "1. Brif"), L("Vous nous parlez de votre activité et de vos clients. Une vraie discussion, sans formulaire.", "You tell us about your business and your customers. A real conversation, no form.", "Bize işletmenizden ve müşterilerinizden bahsedersiniz. Gerçek bir sohbet, form yok.")),
          it(L("2. La direction artistique", "2. Art direction", "2. Sanat yönetimi"), L("On vous présente un premier visuel. Vous dites ce que vous aimez, on ajuste.", "We show you a first look. You say what you like, we adjust.", "Size ilk görünümü sunuyoruz. Neyi beğendiğinizi söylersiniz, biz ayarlarız.")),
          it(L("3. Le développement", "3. Development", "3. Geliştirme"), L("On construit le vrai site et on teste chaque page au fur et à mesure.", "We build the real site and test each page as we go.", "Gerçek siteyi inşa ediyor ve her sayfayı ilerledikçe test ediyoruz.")),
          it(L("4. La mise en ligne", "4. Launch", "4. Yayına alma"), L("Domaine, hébergement, dernière vérification. Le site est à vous.", "Domain, hosting, final check. The site is yours.", "Alan adı, barındırma, son kontrol. Site sizindir.")),
          it(L("5. Le suivi", "5. Follow-up", "5. Takip"), L("Une fois le site en ligne, on reste joignable pour les corrections et les mises à jour.", "Once the site is live, we stay reachable for fixes and updates.", "Site yayına girdikten sonra düzeltmeler ve güncellemeler için ulaşılabilir kalıyoruz.")),
        ],
      },
      {
        id: "options",
        title: L("Ce qu'on peut ajouter à votre site", "What we can add to your site", "Sitenize ekleyebileceklerimiz"),
        items: [
          it(L("Réservation", "Bookings", "Rezervasyon"), L("Un formulaire, un bouton WhatsApp ou un lien vers votre outil actuel.", "A form, a WhatsApp button or a link to your current tool.", "Bir form, bir WhatsApp düğmesi veya mevcut aracınıza bir bağlantı.")),
          it(L("Menu en ligne et catalogue", "Online menu and catalogue", "Online menü ve katalog"), L("Votre carte ou vos produits, écrits dans la page et faciles à lire sur téléphone.", "Your menu or products, written into the page and easy to read on a phone.", "Menünüz veya ürünleriniz sayfaya yazılır ve telefonda kolay okunur.")),
          it(L("Carte Google Maps", "Google Maps map", "Google Haritalar"), L("Vos clients voient où vous êtes sans quitter la page.", "Your customers see where you are without leaving the page.", "Müşterileriniz sayfadan çıkmadan nerede olduğunuzu görür.")),
          it(L("Plusieurs langues", "Several languages", "Birden fazla dil"), L("Français, anglais, turc.", "French, English, Turkish.", "Fransızca, İngilizce, Türkçe.")),
          it(L("Boutique en ligne", "Online shop", "Online mağaza"), L("Pour vendre directement depuis le site, si votre projet s'y prête.", "To sell directly from the site, if your project suits it.", "Projeniz uygunsa doğrudan siteden satış yapmak için.")),
          it(L("Modifier le site vous-même", "Edit the site yourself", "Siteyi kendiniz düzenleyin"), L("Un espace simple pour changer vos textes, votre menu et vos photos.", "A simple area to change your texts, menu and photos.", "Metinlerinizi, menünüzü ve fotoğraflarınızı değiştirmek için basit bir alan.")),
        ],
      },
    ],
    projects: ["le-40", "route-95", "voler-coffee", "bloom-mosaic"],
    projectsTitle: L("Des sites que nous avons réalisés", "Sites we have built", "Yaptığımız siteler"),
    faq: ["prix", "essentiel", "signature", "delai", "propriete", "domaine"],
    serviceType: "Création de site internet sur mesure",
    priced: true,
  },
  {
    slug: "site-web-restaurant-cafe",
    name: L("Restaurants et cafés", "Restaurants and cafés", "Restoran ve kafeler"),
    cardText: L(
      "Menu lisible sur téléphone, horaires, carte et réservation pour votre salle.",
      "A menu that reads well on a phone, hours, map and bookings for your venue.",
      "Telefonda rahat okunan menü, saatler, harita ve mekanınız için rezervasyon.",
    ),
    h1: L(
      "Sites web sur mesure pour restaurants et cafés.",
      "Custom websites for restaurants and cafés.",
      "Restoranlar ve kafeler için size özel web siteleri.",
    ),
    metaTitle: "Création de site web restaurant & café à Paris | Maisé Studio",
    metaDescription: `Sites sur mesure pour restaurants et cafés : menu lisible sur téléphone, horaires, carte et réservation. Studio web à Paris, ${from(PACKAGES.essentiel.eur)}.`,
    summary: L(
      "Maisé Studio crée des sites pour restaurants et cafés : un menu lisible sur téléphone, des horaires et une adresse trouvés en un coup d'œil, et un moyen simple de réserver ou d'écrire.",
      "Maisé Studio builds sites for restaurants and cafés: a menu that reads well on a phone, hours and an address found at a glance, and a simple way to book or write.",
      "Maisé Studio restoranlar ve kafeler için siteler yapar: telefonda rahat okunan bir menü, bir bakışta bulunan saatler ve adres, rezervasyon yapmak veya yazmak için basit bir yol.",
    ),
    lead: L(
      "Un client décide vite, et souvent avec son téléphone à la main. Votre site doit répondre tout de suite à ces questions : qu'est-ce qu'on mange, est-ce ouvert, comment j'y vais.",
      "A customer decides fast, often with a phone in hand. Your site must answer these questions right away: what can we eat, is it open, how do I get there.",
      "Müşteri hızlı karar verir ve çoğu zaman elinde telefonuyla. Siteniz şu sorulara hemen cevap vermeli: ne yenir, açık mı, oraya nasıl giderim.",
    ),
    sections: [
      {
        id: "visiteur",
        title: L("Ce que cherche un visiteur", "What a visitor looks for", "Ziyaretçinin aradığı"),
        items: [
          it(L("Le menu", "The menu", "Menü"), L("Écrit dans la page, pas dans un PDF à agrandir avec deux doigts. Il se lit bien sur téléphone et Google peut le lire.", "Written into the page, not in a PDF you zoom with two fingers. It reads well on a phone and Google can read it.", "Sayfaya yazılır, iki parmakla büyütülen bir PDF'e değil. Telefonda rahat okunur ve Google da okuyabilir.")),
          it(L("Les horaires et l'adresse", "Hours and address", "Saatler ve adres"), L("En haut de page et sur une carte Google Maps, sans avoir à chercher.", "At the top of the page and on a Google Maps map, without searching.", "Sayfanın üstünde ve Google Haritalar'da, aramaya gerek kalmadan.")),
          it(L("Un moyen de réserver", "A way to book", "Rezervasyon yolu"), L("Un bouton WhatsApp, un formulaire ou un lien vers l'outil de réservation que vous utilisez déjà.", "A WhatsApp button, a form or a link to the booking tool you already use.", "Bir WhatsApp düğmesi, bir form veya zaten kullandığınız rezervasyon aracına bağlantı.")),
          it(L("Des photos qui donnent envie", "Photos that make people want to come", "İştah açan fotoğraflar"), L("La salle, la terrasse, les plats, dans une galerie qui charge vite.", "The room, the terrace, the dishes, in a gallery that loads fast.", "Salon, teras, yemekler; hızlı yüklenen bir galeride.")),
        ],
      },
      {
        id: "lieu",
        title: L("Selon votre lieu", "Depending on your venue", "Mekanınıza göre"),
        items: [
          it(L("Instagram", "Instagram", "Instagram"), L("Un lien, ou vos dernières photos affichées dans le site.", "A link, or your latest photos shown in the site.", "Bir bağlantı veya son fotoğraflarınızın sitede gösterilmesi.")),
          it(L("Plusieurs langues", "Several languages", "Birden fazla dil"), L("Si vos clients viennent d'ailleurs, le site parle leur langue : français, anglais ou turc.", "If your customers come from elsewhere, the site speaks their language: French, English or Turkish.", "Müşterileriniz başka yerlerden geliyorsa site onların dilini konuşur: Fransızca, İngilizce veya Türkçe.")),
          it(L("Événements et privatisation", "Events and private hire", "Etkinlikler ve özel kiralama"), L("Une page ou un bouton dédié, comme sur le site du bar Le 40.", "A dedicated page or button, as on the Le 40 bar's site.", "Le 40 barının sitesindeki gibi ayrılmış bir sayfa veya düğme.")),
          it(L("Vente à emporter", "Takeaway", "Paket servis"), L("Un lien vers votre outil de commande, bien visible.", "A clearly visible link to your ordering tool.", "Sipariş aracınıza açıkça görünen bir bağlantı.")),
          it(L("Mettre la carte à jour", "Updating the menu", "Menüyü güncelleme"), L("Un espace simple pour changer vos plats et vos prix sans nous appeler.", "A simple area to change your dishes and prices without calling us.", "Bizi aramadan yemeklerinizi ve fiyatlarınızı değiştirmek için basit bir alan.")),
        ],
      },
      {
        id: "trouve",
        title: L("Pour être trouvé", "To be found", "Bulunmak için"),
        items: [
          it(L("Les informations en texte", "Information as text", "Metin olarak bilgiler"), L("Nom, adresse, horaires et menu sont écrits dans la page. Google et les assistants IA les lisent sans effort.", "Name, address, hours and menu are written in the page. Google and AI assistants read them easily.", "Ad, adres, saatler ve menü sayfaya yazılır. Google ve yapay zeka asistanları bunları kolayca okur.")),
          it(L("Données structurées", "Structured data", "Yapılandırılmış veriler"), L("On ajoute les informations de votre établissement dans un format que les moteurs de recherche comprennent.", "We add your business information in a format search engines understand.", "İşletme bilgilerinizi arama motorlarının anladığı bir biçimde ekliyoruz.")),
          it(L("Cohérence avec Google", "Consistency with Google", "Google ile tutarlılık"), L("Même nom, même adresse et mêmes horaires sur le site et sur votre fiche Google Business Profile.", "Same name, address and hours on the site and on your Google Business Profile listing.", "Sitede ve Google Business Profile kaydınızda aynı ad, adres ve saatler.")),
        ],
      },
    ],
    projects: ["le-40", "route-95", "voler-coffee"],
    projectsTitle: L("Nos sites de restaurants, de bars et de cafés", "Our restaurant, bar and café sites", "Restoran, bar ve kafe sitelerimiz"),
    faq: ["restaurants", "reservation", "modifier", "langues", "prix", "seo"],
    serviceType: "Création de site web pour restaurants et cafés",
  },
  {
    slug: "site-web-hotel",
    name: L("Hôtels", "Hotels", "Oteller"),
    cardText: L(
      "Photos, chambres, localisation et lien direct vers votre réservation.",
      "Photos, rooms, location and a direct link to your booking.",
      "Fotoğraflar, odalar, konum ve rezervasyonunuza doğrudan bağlantı.",
    ),
    h1: L("Sites web sur mesure pour hôtels.", "Custom websites for hotels.", "Oteller için size özel web siteleri."),
    metaTitle: "Création de site web hôtel | Maisé Studio Paris",
    metaDescription: `Sites sur mesure pour hôtels et maisons d'hôtes : photos, chambres, localisation, lien vers votre réservation, plusieurs langues. Studio web à Paris.`,
    summary: L(
      "Maisé Studio conçoit des sites pour hôtels et maisons d'hôtes : des photos qui montrent le lieu, des chambres décrites clairement, une localisation évidente et un chemin court vers la réservation.",
      "Maisé Studio designs sites for hotels and guesthouses: photos that show the place, clearly described rooms, an obvious location and a short path to booking.",
      "Maisé Studio oteller ve pansiyonlar için siteler tasarlar: mekanı gösteren fotoğraflar, net anlatılmış odalar, belli bir konum ve rezervasyona giden kısa bir yol.",
    ),
    lead: L(
      "Avant de réserver, un voyageur veut voir le lieu, comprendre les chambres et savoir où il va dormir. Le site doit lui donner ces réponses, dans sa langue, sans le perdre en route.",
      "Before booking, a traveller wants to see the place, understand the rooms and know where they will sleep. The site must give these answers, in their language, without losing them on the way.",
      "Rezervasyondan önce bir gezgin mekanı görmek, odaları anlamak ve nerede uyuyacağını bilmek ister. Site bu cevapları, onun dilinde ve yolda kaybetmeden vermelidir.",
    ),
    honesty: {
      title: L("Pas encore d'hôtel dans nos réalisations", "No hotel in our work yet", "Projelerimizde henüz otel yok"),
      text: L(
        "Nous n'avons pas encore de client hôtelier. Pour vous montrer ce que nous ferions, nous avons dessiné nous-mêmes un site pour un hôtel imaginaire, Maison Vesper : ce n'est pas un projet client. Nos projets réels les plus proches sont nos restaurants, notre bar et notre atelier. Si vous avez un hôtel, on en parle avant de faire un devis, pour voir ce qui est réaliste.",
        "We do not have a hotel client yet. To show you what we would do, we designed a site ourselves for an imaginary hotel, Maison Vesper: it is not a client project. Our closest real projects are our restaurants, our bar and our workshop. If you run a hotel, we talk before making a quote, to see what is realistic.",
        "Henüz bir otel müşterimiz yok. Neler yapacağımızı göstermek için hayali bir otel olan Maison Vesper için kendimiz bir site tasarladık: bu bir müşteri projesi değildir. Gerçek projelerimizden en yakınları restoranlarımız, barımız ve atölyemizdir. Bir otel işletiyorsanız teklif vermeden önce neyin gerçekçi olduğunu görmek için konuşuruz.",
      ),
    },
    sections: [
      {
        id: "voyageur",
        title: L("Ce que cherche un voyageur", "What a traveller looks for", "Gezginin aradığı"),
        items: [
          it(L("Des photos en grand", "Large photos", "Büyük fotoğraflar"), L("Le lieu, les chambres, le petit-déjeuner. Les photos portent le site, elles sont soignées et chargent vite.", "The place, the rooms, breakfast. Photos carry the site, they are carefully handled and load fast.", "Mekan, odalar, kahvaltı. Fotoğraflar siteyi taşır; özenle hazırlanır ve hızlı yüklenir.")),
          it(L("Des chambres claires", "Clear rooms", "Net odalar"), L("Une page par type de chambre ou de suite, avec description, équipements et photos.", "One page per room or suite type, with description, amenities and photos.", "Her oda veya süit tipi için bir sayfa: açıklama, olanaklar ve fotoğraflar.")),
          it(L("Une localisation évidente", "An obvious location", "Belli bir konum"), L("Adresse, carte, accès et ce qu'il y a autour.", "Address, map, access and what is around.", "Adres, harita, ulaşım ve çevrede neler olduğu.")),
          it(L("Les services", "Services", "Hizmetler"), L("Petit-déjeuner, bagages, accessibilité : la liste complète, écrite dans la page.", "Breakfast, luggage, accessibility: the full list, written into the page.", "Kahvaltı, bagaj, erişilebilirlik: tam liste, sayfaya yazılı.")),
        ],
      },
      {
        id: "reservation",
        title: L("Du site à la réservation", "From the site to the booking", "Siteden rezervasyona"),
        items: [
          it(L("Un bouton visible partout", "A button visible everywhere", "Her yerde görünen bir düğme"), L("On renvoie vers le moteur de réservation que vous utilisez déjà. On vous dit avant de commencer si une intégration plus poussée est possible.", "We link to the booking engine you already use. We tell you before starting if a deeper integration is possible.", "Zaten kullandığınız rezervasyon motoruna bağlantı veriyoruz. Başlamadan önce daha derin bir entegrasyonun mümkün olup olmadığını söylüyoruz.")),
          it(L("Plusieurs langues", "Several languages", "Birden fazla dil"), L("Vos clients viennent de plusieurs pays : le site est disponible en français, en anglais et en turc.", "Your guests come from several countries: the site is available in French, English and Turkish.", "Misafirleriniz birçok ülkeden geliyor: site Fransızca, İngilizce ve Türkçe olarak sunulur.")),
          it(L("Pensé d'abord pour le téléphone", "Designed for the phone first", "Önce telefon için tasarlanır"), L("La page est dessinée pour un petit écran, puis agrandie pour l'ordinateur.", "The page is drawn for a small screen, then enlarged for the computer.", "Sayfa önce küçük ekran için çizilir, sonra bilgisayar için büyütülür.")),
        ],
      },
      {
        id: "trouve",
        title: L("Pour être trouvé", "To be found", "Bulunmak için"),
        items: [
          it(L("Informations cohérentes", "Consistent information", "Tutarlı bilgiler"), L("Nom, adresse et description identiques sur le site et sur votre fiche Google Business Profile.", "Name, address and description identical on the site and on your Google Business Profile listing.", "Ad, adres ve açıklama sitede ve Google Business Profile kaydınızda aynıdır.")),
          it(L("Données structurées", "Structured data", "Yapılandırılmış veriler"), L("On ajoute les informations de votre établissement dans un format que les moteurs de recherche comprennent.", "We add your business information in a format search engines understand.", "İşletme bilgilerinizi arama motorlarının anladığı bir biçimde ekliyoruz.")),
          it(L("Pages dans chaque langue", "Pages in each language", "Her dilde sayfalar"), L("Si le site est en plusieurs langues, chaque langue a sa propre adresse pour que Google puisse la lire.", "If the site is in several languages, each language has its own address so Google can read it.", "Site birden fazla dildeyse her dilin kendi adresi olur, böylece Google onu okuyabilir.")),
        ],
      },
    ],
    projects: ["le-40", "route-95", "bloom-mosaic"],
    concepts: ["maison-vesper"],
    projectsTitle: L("Ce qui s'en rapproche dans nos réalisations", "What comes closest in our work", "Projelerimizde buna en yakın olanlar"),
    faq: ["prix", "langues", "reservation", "delai"],
    serviceType: "Création de site web pour hôtels",
  },
  {
    slug: "site-web-commerce",
    name: L("Boutiques et commerces", "Shops and local businesses", "Butikler ve yerel işletmeler"),
    cardText: L(
      "Catalogue, services, horaires, rendez-vous ou boutique en ligne.",
      "Catalogue, services, hours, appointments or an online shop.",
      "Katalog, hizmetler, saatler, randevu veya online mağaza.",
    ),
    h1: L(
      "Sites web sur mesure pour boutiques et commerces.",
      "Custom websites for shops and local businesses.",
      "Butikler ve yerel işletmeler için size özel web siteleri.",
    ),
    metaTitle: "Création de site web boutique et commerce local | Maisé Studio",
    metaDescription: `Sites sur mesure pour boutiques, ateliers, cliniques et commerces locaux : catalogue, horaires, rendez-vous, carte. Studio web à Paris, ${from(PACKAGES.essentiel.eur)}.`,
    summary: L(
      "Maisé Studio crée des sites pour boutiques, ateliers, cliniques et commerces locaux : ce que vous vendez, où vous êtes, quand vous êtes ouverts, et un moyen simple de prendre rendez-vous ou d'acheter.",
      "Maisé Studio builds sites for shops, workshops, clinics and local businesses: what you sell, where you are, when you are open, and a simple way to book or buy.",
      "Maisé Studio butikler, atölyeler, klinikler ve yerel işletmeler için siteler yapar: ne sattığınız, nerede olduğunuz, ne zaman açık olduğunuz ve randevu almak veya satın almak için basit bir yol.",
    ),
    lead: L(
      "Un commerce local est jugé sur son site avant même la première visite. Il doit montrer ce que vous proposez, rassurer et donner envie de venir ou de commander.",
      "A local business is judged on its site before the first visit. It must show what you offer, reassure and make people want to come or order.",
      "Yerel bir işletme, ilk ziyaretten önce sitesiyle değerlendirilir. Sunduklarınızı göstermeli, güven vermeli ve gelmek ya da sipariş vermek için istek uyandırmalıdır.",
    ),
    honesty: {
      title: L("Ce qu'on peut montrer aujourd'hui", "What we can show today", "Bugün gösterebileceğimiz"),
      text: L(
        "Notre projet réel le plus proche est Bloom Mosaic Studio, un atelier de Los Angeles. Nous n'avons pas encore de client clinique ou boutique en ligne. Pour une clinique, nous avons dessiné nous-mêmes un site pour un établissement imaginaire, Lumea Skin Clinic : ce n'est pas un projet client. La prise de rendez-vous et le paiement d'acompte sont aussi visibles en démonstration sur la page Démos.",
        "Our closest real project is Bloom Mosaic Studio, a workshop in Los Angeles. We do not have a clinic or online shop client yet. For a clinic, we designed a site ourselves for an imaginary one, Lumea Skin Clinic: it is not a client project. Appointment booking and deposit payment can also be seen as demonstrations on the Demos page.",
        "En yakın gerçek projemiz Los Angeles'taki bir atölye olan Bloom Mosaic Studio. Henüz bir klinik veya online mağaza müşterimiz yok. Bir klinik için hayali bir kurum olan Lumea Skin Clinic'e kendimiz bir site tasarladık: bu bir müşteri projesi değildir. Randevu alma ve kapora ödemesi de Demolar sayfasında demo olarak görülebilir.",
      ),
    },
    sections: [
      {
        id: "montrer",
        title: L("Présenter ce que vous proposez", "Present what you offer", "Sunduklarınızı tanıtın"),
        items: [
          it(L("Catalogue ou liste de services", "Catalogue or service list", "Katalog veya hizmet listesi"), L("Chaque produit ou service avec sa description. Quand c'est utile, la durée et le prix sont visibles, comme pour les ateliers de Bloom Mosaic.", "Each product or service with its description. When useful, duration and price are visible, as for the Bloom Mosaic workshops.", "Her ürün veya hizmet açıklamasıyla birlikte. Yararlıysa süre ve fiyat görünür, Bloom Mosaic atölyelerinde olduğu gibi.")),
          it(L("Des photos soignées", "Carefully made photos", "Özenli fotoğraflar"), L("Vos produits, votre lieu, votre équipe. Les photos chargent vite sur téléphone.", "Your products, your place, your team. Photos load fast on a phone.", "Ürünleriniz, mekanınız, ekibiniz. Fotoğraflar telefonda hızlı yüklenir.")),
          it(L("Une identité cohérente", "A consistent identity", "Tutarlı bir kimlik"), L("Le ton, les couleurs et la mise en page suivent votre marque, de la première page à la dernière.", "Tone, colours and layout follow your brand, from the first page to the last.", "Ton, renkler ve sayfa düzeni markanızı izler, ilk sayfadan sonuncuya kadar.")),
        ],
      },
      {
        id: "lieu",
        title: L("Se faire trouver sur place", "Be found on the spot", "Yerinde bulunmak"),
        items: [
          it(L("Adresse, horaires, carte", "Address, hours, map", "Adres, saatler, harita"), L("Écrits dans la page et affichés sur Google Maps, avec un bouton pour demander l'itinéraire.", "Written into the page and shown on Google Maps, with a button to get directions.", "Sayfaya yazılır ve Google Haritalar'da gösterilir, yol tarifi için bir düğmeyle.")),
          it(L("Lisible sur téléphone", "Readable on a phone", "Telefonda okunur"), L("Un client qui passe devant votre boutique vous cherche sur son téléphone. Le site est pensé pour ça.", "A customer walking past your shop looks you up on their phone. The site is made for that.", "Butiğinizin önünden geçen bir müşteri sizi telefonunda arar. Site buna göre tasarlanır.")),
        ],
      },
      {
        id: "vendre",
        title: L("Vendre ou donner rendez-vous", "Sell or book appointments", "Satmak veya randevu vermek"),
        items: [
          it(L("Prise de rendez-vous", "Appointment booking", "Randevu alma"), L("Un formulaire, un bouton WhatsApp ou un lien vers votre agenda.", "A form, a WhatsApp button or a link to your calendar.", "Bir form, bir WhatsApp düğmesi veya takviminize bir bağlantı.")),
          it(L("Boutique en ligne", "Online shop", "Online mağaza"), L("Pour vendre directement, avec paiement en ligne. On vous dit ce qui est réaliste selon votre nombre de produits.", "To sell directly, with online payment. We tell you what is realistic depending on your number of products.", "Doğrudan satış için, online ödemeyle. Ürün sayınıza göre neyin gerçekçi olduğunu söyleriz.")),
          it(L("Retrait en magasin", "In-store pickup", "Mağazadan teslim alma"), L("Si vous le souhaitez, le client commande en ligne et vient chercher.", "If you want, the customer orders online and comes to pick up.", "İsterseniz müşteri online sipariş verir ve gelip alır.")),
        ],
      },
      {
        id: "rassurer",
        title: L("Rassurer", "Reassure", "Güven vermek"),
        items: [
          it(L("Des avis réels", "Real reviews", "Gerçek yorumlar"), L("On affiche les avis que vous avez vraiment reçus, avec leur source. On n'en écrit jamais à votre place.", "We show the reviews you really received, with their source. We never write any for you.", "Gerçekten aldığınız yorumları kaynağıyla gösteririz. Sizin adınıza asla yorum yazmayız.")),
          it(L("Une équipe visible", "A visible team", "Görünür bir ekip"), L("Un visage et un nom rassurent. On vous aide à choisir quoi montrer.", "A face and a name reassure. We help you choose what to show.", "Bir yüz ve bir isim güven verir. Neyi göstereceğinizi seçmenize yardım ederiz.")),
        ],
      },
    ],
    projects: ["bloom-mosaic", "voler-coffee"],
    concepts: ["lumea-skin"],
    projectsTitle: L("Un exemple dans nos réalisations", "An example from our work", "Projelerimizden bir örnek"),
    faq: ["ecommerce", "reservation", "prix", "modifier"],
    serviceType: "Création de site web pour boutiques et commerces locaux",
  },
  {
    slug: "seo-visibilite-ia",
    name: L("SEO et visibilité IA", "SEO and AI visibility", "SEO ve yapay zeka görünürlüğü"),
    cardText: L(
      "Un site que Google et les assistants IA savent lire. Sans fausse promesse.",
      "A site Google and AI assistants can read. No empty promises.",
      "Google'ın ve yapay zeka asistanlarının okuyabildiği bir site. Boş vaat yok.",
    ),
    h1: L(
      "Un site que Google et les assistants IA savent lire.",
      "A site Google and AI assistants can read.",
      "Google'ın ve yapay zeka asistanlarının okuyabildiği bir site.",
    ),
    metaTitle: "SEO & visibilité IA pour sites web | Maisé Studio",
    metaDescription:
      "Ce qu'on met en place pour que Google et les assistants IA comprennent votre site : HTML clair, données structurées, plan du site. Sans fausse promesse.",
    summary: L(
      "Maisé Studio construit des sites dont les informations sont lisibles par les moteurs de recherche et par les assistants IA qui s'appuient sur le web : texte dans la page, structure claire, données structurées, plan du site et pages rapides.",
      "Maisé Studio builds sites whose information can be read by search engines and by AI assistants that rely on the web: text in the page, clear structure, structured data, sitemap and fast pages.",
      "Maisé Studio, bilgileri arama motorları ve web'e dayanan yapay zeka asistanları tarafından okunabilen siteler yapar: sayfada metin, net yapı, yapılandırılmış veriler, site haritası ve hızlı sayfalar.",
    ),
    lead: L(
      "On ne promet pas une place dans une réponse de ChatGPT. On construit ce qui dépend du site : qu'il soit rapide, clair, complet et facile à comprendre pour une machine comme pour un client.",
      "We don't promise a place in a ChatGPT answer. We build what depends on the site: that it is fast, clear, complete and easy to understand for a machine as for a customer.",
      "ChatGPT cevabında yer vaat etmiyoruz. Siteye bağlı olanı inşa ediyoruz: hızlı, net, eksiksiz ve hem bir makine hem bir müşteri için anlaşılması kolay olması.",
    ),
    honesty: {
      title: L("Ce qu'on ne peut pas promettre", "What we can't promise", "Vaat edemeyeceklerimiz"),
      text: L(
        "On améliore ce qui dépend de votre site. On ne contrôle ni Google ni les assistants IA, et on ne peut pas garantir qu'ils recommandent votre établissement. Méfiez-vous de toute agence qui vous promet une place dans les réponses de ChatGPT.",
        "We improve what depends on your site. We control neither Google nor AI assistants, and we can't guarantee they recommend your business. Be wary of any agency that promises you a place in ChatGPT's answers.",
        "Sitenize bağlı olanı iyileştiriyoruz. Ne Google'ı ne de yapay zeka asistanlarını kontrol ediyoruz ve işletmenizi önereceklerini garanti edemeyiz. Size ChatGPT cevaplarında yer vaat eden her ajansa temkinli yaklaşın.",
      ),
    },
    sections: [
      {
        id: "technique",
        title: L("Le socle technique", "The technical base", "Teknik temel"),
        items: [
          it(L("Du texte dans la page", "Text in the page", "Sayfada metin"), L("L'information importante est écrite en texte, pas seulement dans une image, une vidéo ou une animation.", "Important information is written as text, not only in an image, a video or an animation.", "Önemli bilgi metin olarak yazılır; yalnızca bir görselde, videoda veya animasyonda değil.")),
          it(L("Un titre et une description par page", "A title and description per page", "Sayfa başına bir başlık ve açıklama"), L("Chaque page a les siens, différents des autres, avec une adresse canonique.", "Each page has its own, different from the others, with a canonical address.", "Her sayfanın diğerlerinden farklı kendi başlığı ve açıklaması, ayrıca kanonik adresi vardır.")),
          it(L("Une structure claire", "A clear structure", "Net bir yapı"), L("Un seul titre principal par page, des sous-titres dans l'ordre, des liens entre les pages.", "One main heading per page, subheadings in order, links between pages.", "Sayfa başına tek ana başlık, sıralı alt başlıklar, sayfalar arası bağlantılar.")),
          it(L("Données structurées", "Structured data", "Yapılandırılmış veriler"), L("Nom, adresse, services et horaires dans un format standard, fidèle à ce qui est écrit dans la page.", "Name, address, services and hours in a standard format, matching what is written in the page.", "Ad, adres, hizmetler ve saatler standart bir biçimde, sayfada yazılanla uyumlu.")),
          it(L("Plan du site et robots", "Sitemap and robots", "Site haritası ve robotlar"), L("Un sitemap.xml et un robots.txt corrects. Les robots des moteurs de recherche ne sont pas bloqués.", "A correct sitemap.xml and robots.txt. Search engine crawlers are not blocked.", "Doğru bir sitemap.xml ve robots.txt. Arama motoru robotları engellenmez.")),
          it(L("Vitesse et téléphone", "Speed and phone", "Hız ve telefon"), L("Des pages qui s'affichent vite et se lisent bien sur un petit écran.", "Pages that display fast and read well on a small screen.", "Hızlı açılan ve küçük ekranda rahat okunan sayfalar.")),
        ],
      },
      {
        id: "local",
        title: L("Être trouvé près de chez vous", "Being found near you", "Yakınınızda bulunmak"),
        items: [
          it(L("Des informations identiques partout", "Identical information everywhere", "Her yerde aynı bilgiler"), L("Même nom, même adresse, mêmes horaires sur le site, sur Google Business Profile et sur vos réseaux.", "Same name, address and hours on the site, on Google Business Profile and on your social networks.", "Sitede, Google Business Profile'da ve sosyal ağlarınızda aynı ad, adres ve saatler.")),
          it(L("Votre fiche Google Business Profile", "Your Google Business Profile listing", "Google Business Profile kaydınız"), L("On vous dit quoi renseigner. La fiche est à vous, c'est vous qui la gérez.", "We tell you what to fill in. The listing is yours, you manage it.", "Neyi dolduracağınızı söyleriz. Kayıt sizindir, siz yönetirsiniz.")),
          it(L("Des pages utiles", "Useful pages", "Yararlı sayfalar"), L("Une page par lieu ou par service réel. Pas de pages en double pour faire du volume.", "One page per real place or service. No duplicate pages to pad the volume.", "Her gerçek mekan veya hizmet için bir sayfa. Hacim yapmak için kopya sayfalar yok.")),
          it(L("Des avis réels", "Real reviews", "Gerçek yorumlar"), L("Ils se construisent chez vos clients. On vous aide à faciliter la démarche, jamais à les inventer.", "They are built with your customers. We help make it easy, never to invent them.", "Müşterilerinizle birlikte oluşur. Süreci kolaylaştırmanıza yardım ederiz, yorumları asla uydurmayız.")),
        ],
      },
      {
        id: "ia",
        title: L("Les assistants IA", "AI assistants", "Yapay zeka asistanları"),
        items: [
          it(L("Un accès ouvert", "Open access", "Açık erişim"), L("On ne bloque pas les robots de recherche des assistants, par exemple OAI-SearchBot pour la recherche de ChatGPT.", "We don't block the search crawlers of assistants, for example OAI-SearchBot for ChatGPT search.", "Asistanların arama botlarını engellemiyoruz; örneğin ChatGPT aramasının OAI-SearchBot'u.")),
          it(L("Des faits faciles à citer", "Facts that are easy to quote", "Alıntılaması kolay bilgiler"), L("Une phrase claire qui dit qui vous êtes, où vous êtes et ce que vous proposez.", "A clear sentence that says who you are, where you are and what you offer.", "Kim olduğunuzu, nerede olduğunuzu ve ne sunduğunuzu söyleyen net bir cümle.")),
          it(L("Des pages qui valent d'être citées", "Pages worth quoting", "Alıntılanmaya değer sayfalar"), L("Des contenus précis et utiles : prix, horaires, services, questions fréquentes.", "Precise and useful content: prices, hours, services, frequently asked questions.", "Kesin ve yararlı içerik: fiyatlar, saatler, hizmetler, sık sorulan sorular.")),
          it(L("Un fichier llms.txt, en complément", "An llms.txt file, as a complement", "Tamamlayıcı olarak llms.txt dosyası"), L("On peut en ajouter un. Il ne remplace pas un site lisible, et aucun outil ne garantit de s'en servir.", "We can add one. It doesn't replace a readable site, and no tool guarantees it will use it.", "Bir tane ekleyebiliriz. Okunabilir bir sitenin yerini tutmaz ve hiçbir araç onu kullanacağını garanti etmez.")),
        ],
      },
    ],
    projects: [],
    faq: ["seo", "chatgpt", "prix"],
    serviceType: "SEO technique et lisibilité pour les moteurs de recherche et assistants IA",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
