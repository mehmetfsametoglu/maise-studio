/*!
 * Maisé Studio — client site credit
 * Adds a small "Site conçu par Maisé Studio" line to the footer of a client
 * site. Load it once, anywhere on the page:
 *
 *   <script src="https://www.maisestudio.com/embed/maise-credit.js" defer></script>
 *
 * Optional attributes on the script tag:
 *   data-lang="fr|en|tr"   force a language (default: the page's <html lang>)
 *   data-href="https://…"  override the link target
 *
 * Updating this one file updates every client site at once.
 */
(function () {
  if (document.getElementById("maise-credit")) return;

  var script = document.currentScript;
  var HREF = (script && script.getAttribute("data-href")) || "https://www.maisestudio.com";
  var TEXT = {
    fr: "Site conçu par",
    en: "Website by",
    tr: "Web sitesi tasarımı:",
  };

  function pickLang() {
    var forced = script && script.getAttribute("data-lang");
    var raw = (forced || document.documentElement.lang || "fr").slice(0, 2).toLowerCase();
    return TEXT[raw] ? raw : "fr";
  }

  function mount() {
    var host = document.querySelector("footer") || document.body;
    var wrap = document.createElement("div");
    wrap.id = "maise-credit";
    wrap.style.cssText =
      "text-align:center;padding:14px 16px;font:400 12px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;" +
      "letter-spacing:.02em;color:inherit;opacity:.6";

    var label = document.createTextNode(TEXT[pickLang()] + " ");
    var link = document.createElement("a");
    link.href = HREF;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Maisé Studio";
    link.style.cssText = "color:inherit;text-decoration:underline;text-underline-offset:3px";

    wrap.appendChild(label);
    wrap.appendChild(link);
    host.appendChild(wrap);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
