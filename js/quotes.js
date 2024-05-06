const form = document.querySelector("form");
const numberPages = document.querySelector("#pages");
const numberFeatures = document.querySelector("#features");
const submitButton = document.querySelector(".plan_button");

const pricePerPage = 10;
const pricePerFeature = 5;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const pages = numberPages.value;
  const features = numberFeatures.value;

  if (!pages || !features) {
    alert("Por favor, llena todos los campos");
    return;
  }

  if (pages < 1 || features < 1) {
    alert("Por favor, introduce un número válido");
    return;
  }

  if (pages > 100 || features > 100) {
    alert("El número máximo de páginas o características es 100");
    return;
  }

  const quote = pages * pricePerPage + features * pricePerFeature;
  alert(`El precio aproximado es: $${quote} MXN`);

  const recentQuoteInfo = {
    pages,
    features,
    quote,
  };

  localStorage.setItem("recentQuote", JSON.stringify(recentQuoteInfo));
});

document.addEventListener("DOMContentLoaded", function () {
  const recentQuoteInfo = JSON.parse(localStorage.getItem("recentQuote"));
  if (recentQuoteInfo) {
    alert(
      `Tu última cotización fue de $${recentQuoteInfo.quote} MXN para ${recentQuoteInfo.pages} páginas y ${recentQuoteInfo.features} características.`
    );
    localStorage.removeItem("recentQuote");
  }
});
