import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { L, UI } from "@/lib/l10n";
import { pageMetadata } from "@/lib/seo";
import { PageHero, T } from "@/components/page-kit";

// Describes what the code actually does today: no analytics, no advertising
// cookies, no stored form data. If any of that changes, update this page first.
export const metadata: Metadata = pageMetadata({
  title: "Confidentialité et cookies | Maisé Studio",
  description: "Les données que ce site utilise, et celles qu'il n'utilise pas.",
  path: "/confidentialite",
  noindex: true, // TODO(owner): remove once the mentions légales are completed.
});

const BLOCKS: { title: L; text: L }[] = [
  {
    title: L("Ce que ce site ne fait pas", "What this site does not do", "Bu sitenin yapmadıkları"),
    text: L(
      "Aucun outil de mesure d'audience, aucune publicité, aucun cookie de suivi. Pour cette raison, le site n'affiche pas de bannière de cookies.",
      "No audience measurement tool, no advertising, no tracking cookie. For this reason, the site shows no cookie banner.",
      "Ziyaretçi ölçüm aracı, reklam ve takip çerezi yoktur. Bu nedenle site bir çerez bildirimi göstermez.",
    ),
  },
  {
    title: L("Ce qui est enregistré sur votre appareil", "What is saved on your device", "Cihazınızda kaydedilenler"),
    text: L(
      "Votre choix de langue et de thème (clair ou sombre) est gardé dans le stockage local de votre navigateur, pour que le site s'affiche comme vous l'avez laissé. Une indication permet aussi de ne montrer l'écran d'accueil animé qu'une fois par visite. Rien de cela ne quitte votre appareil.",
      "Your choice of language and theme (light or dark) is kept in your browser's local storage, so the site appears as you left it. A marker also lets the animated opening screen show only once per visit. None of this leaves your device.",
      "Dil ve tema (açık veya koyu) tercihiniz, sitenin bıraktığınız gibi görünmesi için tarayıcınızın yerel depolamasında tutulur. Ayrıca bir işaret, animasyonlu açılış ekranının ziyaret başına yalnızca bir kez gösterilmesini sağlar. Bunların hiçbiri cihazınızdan çıkmaz.",
    ),
  },
  {
    title: L("Le formulaire de contact et WhatsApp", "The contact form and WhatsApp", "İletişim formu ve WhatsApp"),
    text: L(
      "Le formulaire ne conserve rien sur nos serveurs. Il prépare un message que vous envoyez vous-même sur WhatsApp. Ce message est alors soumis aux conditions de WhatsApp. Si vous nous écrivez par e-mail, nous utilisons votre adresse uniquement pour vous répondre.",
      "The form keeps nothing on our servers. It prepares a message that you send yourself on WhatsApp. That message is then subject to WhatsApp's terms. If you write to us by email, we use your address only to reply to you.",
      "Form sunucularımızda hiçbir şey saklamaz. WhatsApp'ta kendinizin göndereceği bir mesaj hazırlar. Bu mesaj daha sonra WhatsApp'ın koşullarına tabidir. Bize e-posta ile yazarsanız adresinizi yalnızca size yanıt vermek için kullanırız.",
    ),
  },
  {
    title: L("Aperçus des sites d'exemple", "Previews of the example sites", "Örnek site önizlemeleri"),
    text: L(
      "Sur les pages des sites d'exemple, l'aperçu interactif est chargé depuis le site d'exemple (hébergé sur lovable.app) seulement si vous cliquez sur le bouton. Avant ce clic, aucune donnée n'est envoyée.",
      "On the example site pages, the interactive preview is loaded from the example site (hosted on lovable.app) only if you click the button. Before that click, no data is sent.",
      "Örnek site sayfalarında etkileşimli önizleme, örnek siteden (lovable.app üzerinde barındırılır) yalnızca düğmeye tıklarsanız yüklenir. Bu tıklamadan önce hiçbir veri gönderilmez.",
    ),
  },
  {
    title: L("Google Maps", "Google Maps", "Google Haritalar"),
    text: L(
      "Sur la page des démonstrations, une carte Google Maps d'exemple s'affiche seulement si vous cliquez dessus. Avant ce clic, aucune donnée n'est envoyée à Google.",
      "On the demos page, a sample Google Maps map is shown only if you click it. Before that click, no data is sent to Google.",
      "Demolar sayfasında örnek bir Google Haritalar haritası yalnızca tıklarsanız gösterilir. Bu tıklamadan önce Google'a hiçbir veri gönderilmez.",
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        crumbs={[{ name: UI.home, href: "/" }, { name: L("Confidentialité", "Privacy", "Gizlilik") }]}
        title={L("Confidentialité et cookies.", "Privacy and cookies.", "Gizlilik ve çerezler.")}
      />
      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed text-foreground/85">
          {BLOCKS.map((b) => (
            <div key={b.title.fr}>
              <h2 className="mb-3 text-base font-semibold text-foreground">
                <T l={b.title} />
              </h2>
              <p>
                <T l={b.text} />
              </p>
            </div>
          ))}
          <div>
            <h2 className="mb-3 text-base font-semibold text-foreground">
              <T l={L("Vos droits et nous contacter", "Your rights and contacting us", "Haklarınız ve bize ulaşmak")} />
            </h2>
            <p>
              <T
                l={L(
                  "Vous pouvez nous demander l'accès, la correction ou la suppression des échanges que nous avons conservés en écrivant à ",
                  "You can ask us for access to, correction of or deletion of the exchanges we have kept by writing to ",
                  "Sakladığımız yazışmalara erişim, düzeltme veya silme talebini şu adrese yazarak iletebilirsiniz: ",
                )}
              />
              <a href={`mailto:${SITE.email}`} className="text-accent underline-offset-4 hover:underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
