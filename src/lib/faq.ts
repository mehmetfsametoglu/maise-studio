import { PACKAGES, EXTRA_LANGUAGE, formatEur } from "@/lib/pricing";
import { L } from "@/lib/l10n";

// Buying questions, answered short. Prices come from lib/pricing.ts.
// Answers only state what the site already says about how Maisé works.
// Where a precise commitment (a delay, a hosting fee) is not documented,
// the answer says it is settled in the quote instead of inventing a number.
// English and Turkish are translations of the French; French is the reference.

export type Faq = { id: string; q: L; a: L };

const ess = PACKAGES.essentiel;
const sig = PACKAGES.signature;
const extra = formatEur(EXTRA_LANGUAGE.eur);

export const FAQ: Faq[] = [
  {
    id: "prix",
    q: L(
      "Combien coûte un site internet chez Maisé Studio ?",
      "How much does a website cost at Maisé Studio?",
      "Maisé Studio'da bir web sitesi ne kadar tutar?",
    ),
    a: L(
      `Deux formules. ${ess.name} à partir de ${formatEur(ess.eur)}, ${sig.name} à partir de ${formatEur(sig.eur)}. Ce sont des prix indicatifs : le devis final dépend du nombre de pages et de ce que vous voulez y mettre. Le configurateur de la page d'accueil donne une estimation en quelques clics.`,
      `Two packages. ${ess.name} from ${formatEur(ess.eur)}, ${sig.name} from ${formatEur(sig.eur)}. These are indicative prices: the final quote depends on the number of pages and what you want on them. The calculator on the home page gives an estimate in a few clicks.`,
      `İki paket var. ${ess.name} ${formatEur(ess.eur)}'dan, ${sig.name} ${formatEur(sig.eur)}'dan başlar. Bunlar gösterge niteliğinde fiyatlardır: nihai teklif sayfa sayısına ve içeriğe bağlıdır. Ana sayfadaki hesaplayıcı birkaç tıklamada tahmini fiyat verir. Türkiye için TL fiyatları hesaplayıcıda gösterilir.`,
    ),
  },
  {
    id: "essentiel",
    q: L("Que comprend l'offre Essentiel ?", "What does the Essentiel package include?", "Essentiel paketine neler dahil?"),
    a: L(
      `Un site simple et rapide qui présente votre activité. Il est dessiné pour votre activité, il s'adapte au téléphone et il est structuré pour être bien compris par Google. Une langue est incluse, chaque langue en plus coûte ${extra}.`,
      `A simple, fast site that presents your business. It is designed for your business, it adapts to phones and it is structured so Google can understand it. One language is included, each extra language costs ${extra}.`,
      `İşletmenizi tanıtan basit ve hızlı bir site. İşletmenize göre tasarlanır, telefona uyum sağlar ve Google'ın iyi anlayacağı şekilde yapılandırılır. Bir dil dahildir, her ek dil ${extra}.`,
    ),
  },
  {
    id: "signature",
    q: L("Que comprend l'offre Signature ?", "What does the Signature package include?", "Signature paketine neler dahil?"),
    a: L(
      "Le même site, avec animations et effets 3D pour se démarquer. C'est la formule à choisir si vous voulez un site qui se remarque, avec du mouvement et plus de relief.",
      "The same site, with animations and 3D effects to stand out. It is the package to pick if you want a site that gets noticed, with movement and more depth.",
      "Aynı site, öne çıkmak için animasyonlar ve 3D efektlerle. Dikkat çeken, hareketli ve daha derinlikli bir site istiyorsanız tercih edeceğiniz paket.",
    ),
  },
  {
    id: "delai",
    q: L("Combien de temps faut-il pour créer un site ?", "How long does it take to build a website?", "Bir siteyi oluşturmak ne kadar sürer?"),
    a: L(
      "Cela dépend du nombre de pages et de la rapidité avec laquelle vous nous envoyez textes et photos. On vous donne une date précise dans le devis, avant de commencer.",
      "It depends on the number of pages and how quickly you send us texts and photos. We give you a precise date in the quote, before we start.",
      "Sayfa sayısına ve metinleri ile fotoğrafları bize ne kadar hızlı gönderdiğinize bağlıdır. Başlamadan önce teklifte kesin bir tarih veriyoruz.",
    ),
  },
  {
    id: "paris",
    q: L("Travaillez-vous uniquement à Paris ?", "Do you only work in Paris?", "Yalnızca Paris'te mi çalışıyorsunuz?"),
    a: L(
      "Non. On est basés à Paris et on travaille aussi à distance. Nos sites en ligne sont à Paris, à Istanbul et à Los Angeles, en français, en turc et en anglais.",
      "No. We are based in Paris and we also work remotely. Our live sites are in Paris, Istanbul and Los Angeles, in French, Turkish and English.",
      "Hayır. Paris merkezliyiz ve uzaktan da çalışıyoruz. Yayındaki sitelerimiz Paris, İstanbul ve Los Angeles'ta; Fransızca, Türkçe ve İngilizce.",
    ),
  },
  {
    id: "propriete",
    q: L(
      "Le site m'appartient-il après la livraison ?",
      "Do I own the site after delivery?",
      "Teslimden sonra site bana mı ait olur?",
    ),
    a: L(
      "Oui. À la fin du projet, on met en ligne avec votre nom de domaine et le site est à vous. Les détails (domaine, hébergement) sont écrits dans le devis.",
      "Yes. At the end of the project we put it online with your domain name and the site is yours. The details (domain, hosting) are written in the quote.",
      "Evet. Proje sonunda sizin alan adınızla yayına alıyoruz ve site sizindir. Ayrıntılar (alan adı, barındırma) teklifte yazılıdır.",
    ),
  },
  {
    id: "modifier",
    q: L(
      "Puis-je modifier le menu ou les contenus moi-même ?",
      "Can I edit the menu or the content myself?",
      "Menüyü veya içerikleri kendim değiştirebilir miyim?",
    ),
    a: L(
      "Oui, si vous le souhaitez. On peut mettre en place un espace pour modifier vous-même vos textes, votre menu et vos photos. Dites-nous à quelle fréquence votre carte change et on choisit la solution la plus simple.",
      "Yes, if you want to. We can set up a simple area where you edit your texts, menu and photos yourself. Tell us how often your menu changes and we pick the simplest solution.",
      "Evet, isterseniz. Metinlerinizi, menünüzü ve fotoğraflarınızı kendinizin değiştirebileceği bir alan kurabiliriz. Menünüzün ne sıklıkla değiştiğini söyleyin, en basit çözümü seçelim.",
    ),
  },
  {
    id: "reprise",
    q: L("Pouvez-vous reprendre un site existant ?", "Can you take over an existing site?", "Mevcut bir siteyi devralabilir misiniz?"),
    a: L(
      "Envoyez-nous le lien. On regarde ce qui peut être gardé et on vous dit franchement s'il vaut mieux repartir de zéro.",
      "Send us the link. We look at what can be kept and tell you honestly if it is better to start from scratch.",
      "Bize bağlantıyı gönderin. Nelerin korunabileceğine bakar, sıfırdan başlamanın daha iyi olup olmadığını dürüstçe söyleriz.",
    ),
  },
  {
    id: "langues",
    q: L("Faites-vous les sites multilingues ?", "Do you build multilingual sites?", "Çok dilli siteler yapıyor musunuz?"),
    a: L(
      `Oui, en français, en anglais et en turc. Le site est écrit dans la langue de vos clients. Chaque langue en plus de la première coûte ${extra}.`,
      `Yes, in French, English and Turkish. The site is written in your customers' language. Each language beyond the first costs ${extra}.`,
      `Evet, Fransızca, İngilizce ve Türkçe. Site, müşterilerinizin dilinde yazılır. İlkinin ötesindeki her dil ${extra}.`,
    ),
  },
  {
    id: "reservation",
    q: L("Pouvez-vous intégrer une réservation ?", "Can you add bookings?", "Rezervasyon ekleyebilir misiniz?"),
    a: L(
      "Oui. Selon votre cas, c'est un bouton WhatsApp, un formulaire ou un lien vers l'outil de réservation que vous utilisez déjà. On choisit la solution qui vous demande le moins de travail au quotidien. Une démonstration de réservation est visible sur la page Démos.",
      "Yes. Depending on your case, it is a WhatsApp button, a form or a link to the booking tool you already use. We pick the solution that asks the least daily work from you. A booking demo is on the Demos page.",
      "Evet. Durumunuza göre bir WhatsApp düğmesi, bir form veya zaten kullandığınız rezervasyon aracına bir bağlantı. Size günlük olarak en az iş çıkaran çözümü seçiyoruz. Bir rezervasyon demosu Demolar sayfasında var.",
    ),
  },
  {
    id: "domaine",
    q: L(
      "Est-ce que vous vous occupez du domaine et de l'hébergement ?",
      "Do you handle the domain and hosting?",
      "Alan adı ve barındırmayı siz mi hallediyorsunuz?",
    ),
    a: L(
      "Oui. La mise en ligne comprend le nom de domaine, l'hébergement et une dernière vérification. Le devis précise ce qui est inclus et ce qui reste à votre charge.",
      "Yes. Launch includes the domain name, hosting and a final check. The quote states what is included and what you pay for yourself.",
      "Evet. Yayına alma; alan adını, barındırmayı ve son bir kontrolü içerir. Teklif, nelerin dahil olduğunu ve nelerin size ait olduğunu belirtir.",
    ),
  },
  {
    id: "seo",
    q: L("Le SEO est-il inclus ?", "Is SEO included?", "SEO dahil mi?"),
    a: L(
      "La base technique, oui : pages claires, titres et descriptions, plan du site, vitesse, informations de votre établissement écrites dans la page. Aucune position n'est garantie sur Google : cela dépend aussi de la concurrence et de votre fiche Google Business Profile.",
      "The technical base, yes: clear pages, titles and descriptions, sitemap, speed, your business information written into the page. No Google ranking is guaranteed: it also depends on competition and on your Google Business Profile listing.",
      "Teknik temel evet: net sayfalar, başlıklar ve açıklamalar, site haritası, hız, işletme bilgilerinizin sayfaya yazılması. Google'da hiçbir sıralama garanti edilmez: bu aynı zamanda rekabete ve Google Business Profile kaydınıza bağlıdır.",
    ),
  },
  {
    id: "chatgpt",
    q: L(
      "Pouvez-vous faire apparaître mon entreprise sur ChatGPT ?",
      "Can you make my business appear in ChatGPT?",
      "İşletmemi ChatGPT'de gösterebilir misiniz?",
    ),
    a: L(
      "Non, personne ne peut le garantir. On peut rendre votre site facile à lire et à comprendre pour les moteurs de recherche et les assistants IA : texte dans la page, données structurées, plan du site, accès des robots. Ce que ces outils choisissent d'afficher ensuite ne dépend pas de nous.",
      "No, nobody can guarantee that. We can make your site easy for search engines and AI assistants to read and understand: text in the page, structured data, sitemap, crawler access. What these tools then choose to show is not up to us.",
      "Hayır, bunu kimse garanti edemez. Sitenizi arama motorlarının ve yapay zeka asistanlarının okuması ve anlaması için kolaylaştırabiliriz: sayfada metin, yapılandırılmış veriler, site haritası, botlara erişim. Bu araçların sonrasında neyi göstermeyi seçeceği bize bağlı değildir.",
    ),
  },
  {
    id: "restaurants",
    q: L(
      "Travaillez-vous avec des restaurants et des cafés ?",
      "Do you work with restaurants and cafés?",
      "Restoranlar ve kafelerle çalışıyor musunuz?",
    ),
    a: L(
      "Oui, c'est notre domaine principal. Le bar Le 40 à Paris, le restaurant Route 95 et le café Vøler à Istanbul ont chacun un site que nous avons réalisé. Vous les trouvez dans nos réalisations.",
      "Yes, it is our main field. The bar Le 40 in Paris, the restaurant Route 95 and the café Vøler in Istanbul each have a site we built. You can find them in our work.",
      "Evet, ana alanımız bu. Paris'teki Le 40 barı, İstanbul'daki Route 95 restoranı ve Vøler kafesinin her birinin bizim yaptığımız bir sitesi var. Projelerimizde bulabilirsiniz.",
    ),
  },
  {
    id: "ecommerce",
    q: L("Faites-vous du e-commerce ?", "Do you do e-commerce?", "E-ticaret yapıyor musunuz?"),
    a: L(
      "On peut ajouter une boutique en ligne ou un catalogue de produits à un site. Parlez-nous du nombre de produits et du mode de paiement souhaité, on vous dit ce qui est réaliste dans votre budget.",
      "We can add an online shop or a product catalogue to a site. Tell us how many products you have and how you want to be paid, and we tell you what is realistic for your budget.",
      "Bir siteye online mağaza veya ürün kataloğu ekleyebiliriz. Kaç ürününüz olduğunu ve nasıl ödeme almak istediğinizi söyleyin, bütçenize göre neyin gerçekçi olduğunu söyleriz.",
    ),
  },
];

export const faqById = (ids: string[]) => ids.map((id) => FAQ.find((f) => f.id === id)!).filter(Boolean);

// Structured data stays in French, the language the page is served in.
export const faqJsonLd = (items: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q.fr,
    acceptedAnswer: { "@type": "Answer", text: f.a.fr },
  })),
});
