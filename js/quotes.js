const quoutesContainer = document.querySelector(".plans");
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

  // remove previous quote
  const previousQuote = document.querySelector(".quote");
  if (previousQuote) {
    previousQuote.remove();
  }

  const quoteElement = document.createElement("div");
  quoteElement.className = "quote";
  quoteElement.innerHTML = `        
    <div class="recent_quote">
      <h3>Your quote is:</h3>
      <ul>
        <li>
          <b>Pages:</b>
          <span>${pages}</span>
        </li>
        <li>
          <b>Features:</b>
          <span>${features}</span>
        </li>
        <li>
          <b>Price:</b>
          <span>$ ${quote} MXN</span>
        </li>
      </ul>
    </div>`;
  quoutesContainer.appendChild(quoteElement);

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
    const { pages, features, quote } = recentQuoteInfo;
    const quoteElement = document.createElement("div");
    quoteElement.className = "quote";
    quoteElement.innerHTML = `        
      <div class="recent_quote">
        <h3>Last Quote Generated</h3>
        <ul>
          <li>
            <b>Pages:</b>
            <span>${pages}</span>
          </li>
          <li>
            <b>Features:</b>
            <span>${features}</span>
          </li>
          <li>
            <b>Price:</b>
            <span>$ ${quote} MXN</span>
          </li>
        </ul>
      </div>`;
    quoutesContainer.appendChild(quoteElement);
  }
});
