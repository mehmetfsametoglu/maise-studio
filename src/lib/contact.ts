// WhatsApp links never carry the studio's number. They point at a server
// route that builds the wa.me URL and redirects, so the number stays out of
// the HTML, the JS bundle and every client-side request.
export const CONTACT_REDIRECT = "/api/contact-redirect";

export function whatsappHref(text?: string) {
  return text ? `${CONTACT_REDIRECT}?text=${encodeURIComponent(text)}` : CONTACT_REDIRECT;
}
