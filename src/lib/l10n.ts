// Text that exists in the site's three languages. The content pages (services,
// case studies, FAQ) keep their copy as { fr, en, tr } objects and a client
// view picks the visitor's language. French is what the server renders, so
// it is also what crawlers read; metadata and JSON-LD stay French too.

import type { Lang } from "@/lib/i18n";

export type L = Record<Lang, string>;

export const L = (fr: string, en: string, tr: string): L => ({ fr, en, tr });

export const pick = (text: L, lang: Lang) => text[lang];

// Interface strings used only by the content pages.
export const UI = {
  home: L("Accueil", "Home", "Ana sayfa"),
  services: L("Services", "Services", "Hizmetler"),
  work: L("Réalisations", "Work", "Projeler"),
  faq: L("Questions fréquentes", "FAQ", "Sık sorulan sorular"),
  breadcrumb: L("Fil d'Ariane", "Breadcrumb", "Sayfa yolu"),
  from: L("à partir de", "from", "başlangıç"),
  calc: L("Calculer mon prix", "Calculate my price", "Fiyatımı hesapla"),
  priceTitle: L("Combien ça coûte", "What it costs", "Ne kadar tutar"),
  priceLang: L(
    "Une langue est incluse, chaque langue en plus coûte",
    "One language is included, each extra language costs",
    "Bir dil dahildir, her ek dil",
  ),
  priceDisclaimer: L(
    "Prix indicatif. Le devis final dépend du périmètre du projet.",
    "Indicative price. The final quote depends on the scope of the project.",
    "Gösterge niteliğinde fiyat. Nihai teklif projenin kapsamına bağlıdır.",
  ),
  anotherQuestion: L("Une autre question ?", "Another question?", "Başka bir sorunuz mu var?"),
  allAnswers: L("Toutes les réponses", "All the answers", "Tüm cevaplar"),
  or: L("ou", "or", "veya"),
  writeUs: L("écrivez-nous", "write to us", "bize yazın"),
  closingTitle: L("Parlons de votre projet.", "Let's talk about your project.", "Projenizi konuşalım."),
  closingText: L(
    "Réponse en moins de 3 heures, tous les jours.",
    "We answer within 3 hours, every day.",
    "Her gün 3 saat içinde yanıt veriyoruz.",
  ),
  talk: L("Parler de votre projet", "Talk about your project", "Projenizi konuşalım"),
  seeWork: L("Voir nos réalisations", "See our work", "Projelerimizi görün"),
  viewLive: L("Voir le site en ligne", "Visit the live site", "Yayındaki siteyi görün"),
  shotsNote: L(
    "Captures du site en ligne, sur ordinateur (1440 px) et sur téléphone (390 px).",
    "Screenshots of the live site, on a computer (1440 px) and on a phone (390 px).",
    "Yayındaki sitenin bilgisayar (1440 px) ve telefon (390 px) ekran görüntüleri.",
  ),
  brief: L("En bref", "At a glance", "Özet"),
  factActivity: L("Activité", "Business", "Faaliyet"),
  factPlace: L("Lieu", "Place", "Yer"),
  factLang: L("Langue du site", "Site language", "Sitenin dili"),
  factRole: L("Rôle de Maisé", "Maisé's role", "Maisé'nin rolü"),
  factServices: L("Services", "Services", "Hizmetler"),
  design: L("Direction visuelle", "Visual direction", "Görsel yön"),
  features: L("Ce que le site propose", "What the site offers", "Sitenin sunduğu"),
  sameType: L("Un projet du même type ?", "A similar project?", "Benzer bir projeniz mi var?"),
  seeOffer: L("Voir notre offre :", "See our offer:", "Teklifimize bakın:"),
  others: L("Autres réalisations", "Other projects", "Diğer projeler"),
  caseClosingTitle: L("Un site pour votre commerce ?", "A website for your business?", "İşletmeniz için bir site mi?"),
  caseClosingText: L(
    "Parlez-nous de votre activité. On vous répond avec une première idée et un prix.",
    "Tell us about your business. We reply with a first idea and a price.",
    "Bize işletmenizden bahsedin. İlk bir fikir ve bir fiyatla dönüş yapıyoruz.",
  ),
  servicesKicker: L("Services", "Services", "Hizmetler"),
  servicesTitle: L("Tout ce qu'il faut pour votre site.", "Everything your website needs.", "Siteniz için gereken her şey."),
  servicesLead: L(
    "Du design à la mise en ligne, le même studio s'occupe de tout. Choisissez la page qui ressemble le plus à votre activité.",
    "From design to launch, the same studio handles everything. Pick the page closest to your business.",
    "Tasarımdan yayına, aynı stüdyo her şeyi üstlenir. İşletmenize en çok benzeyen sayfayı seçin.",
  ),
  servicesByActivity: L("Nos pages par activité", "Our pages by business type", "Faaliyete göre sayfalarımız"),
  servicesClosingTitle: L("Pas sûr de ce qu'il vous faut ?", "Not sure what you need?", "Neye ihtiyacınız olduğundan emin değil misiniz?"),
  servicesClosingText: L(
    "Écrivez-nous votre activité. On vous répond avec ce qui a du sens pour vous.",
    "Tell us your business. We reply with what makes sense for you.",
    "Faaliyetinizi yazın. Size uygun olanla dönüş yapıyoruz.",
  ),
  faqKicker: L("Questions", "Questions", "Sorular"),
  faqTitle: L("Ce qu'on nous demande avant de commencer.", "What people ask before they start.", "Başlamadan önce bize sorulanlar."),
  faqLead: L(
    "Des réponses courtes. Si la vôtre n'est pas ici, écrivez-nous.",
    "Short answers. If yours isn't here, write to us.",
    "Kısa cevaplar. Sorunuzun cevabı burada yoksa bize yazın.",
  ),
  faqSection: L("Prix, délais et contenu", "Price, timing and content", "Fiyat, süre ve içerik"),
  faqClosingTitle: L("Une autre question ?", "Another question?", "Başka bir sorunuz mu var?"),
  nf404: L("Erreur 404", "Error 404", "404 hatası"),
  nfTitle: L("Cette page n'existe pas.", "This page doesn't exist.", "Bu sayfa mevcut değil."),
  nfText: L(
    "Le lien est peut-être ancien, ou l'adresse contient une faute. Voici où aller.",
    "The link may be old, or the address may contain a typo. Here is where to go.",
    "Bağlantı eski olabilir ya da adreste bir yazım hatası olabilir. İşte gidebileceğiniz yerler.",
  ),
  contact: L("Contact", "Contact", "İletişim"),
  conceptLabel: L("Site d'exemple, pas un projet client", "Example site, not a client project", "Örnek site, müşteri projesi değil"),
  conceptTitle: L("Sites d'exemple", "Example sites", "Örnek siteler"),
  conceptLead: L(
    "Des sites complets que nous avons dessinés nous-mêmes, pour des lieux imaginaires, afin de montrer ce que nous ferions pour un hôtel ou une clinique. Ce ne sont pas des projets clients.",
    "Complete sites we designed ourselves, for imaginary venues, to show what we would do for a hotel or a clinic. They are not client projects.",
    "Hayali mekanlar için kendimizin tasarladığı, bir otel veya klinik için neler yapacağımızı göstermek üzere hazırlanmış eksiksiz siteler. Müşteri projesi değildirler.",
  ),
  conceptSection: L(
    "Un site d'exemple que nous avons conçu",
    "An example site we designed",
    "Tasarladığımız bir örnek site",
  ),
  conceptSee: L("Voir le site d'exemple", "See the example site", "Örnek siteyi görün"),
  previewTitle: L("Aperçu interactif", "Interactive preview", "Etkileşimli önizleme"),
  previewLoad: L("Afficher l'aperçu interactif", "Show the interactive preview", "Etkileşimli önizlemeyi göster"),
  previewNote: L(
    "L'aperçu se charge seulement quand vous cliquez. Les boutons de contact du site d'exemple ne servent qu'à la démonstration.",
    "The preview loads only when you click. The contact buttons of the example site are for demonstration only.",
    "Önizleme yalnızca tıkladığınızda yüklenir. Örnek sitedeki iletişim düğmeleri yalnızca gösterim içindir.",
  ),
  previewOpen: L("Ouvrir dans un nouvel onglet", "Open in a new tab", "Yeni sekmede aç"),
  deviceDesktop: L("Ordinateur", "Computer", "Bilgisayar"),
  devicePhone: L("Téléphone", "Phone", "Telefon"),
  conceptAbout: L("Ce que montre ce site", "What this site shows", "Bu sitenin gösterdikleri"),
  conceptClosingTitle: L(
    "Un site comme celui-ci pour votre établissement ?",
    "A site like this for your business?",
    "İşletmeniz için bunun gibi bir site mi?",
  ),
  conceptClosingText: L(
    "Dites-nous votre activité. On vous répond avec une première idée et un prix.",
    "Tell us your business. We reply with a first idea and a price.",
    "Faaliyetinizi söyleyin. İlk bir fikir ve bir fiyatla dönüş yapıyoruz.",
  ),
  examplesBack: L("Démos", "Demos", "Demolar"),
} as const;
