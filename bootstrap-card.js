// bootstrap-card.js   a custom bootstrap card

const cssRules = `
       .tms-card {
        vertical-align: top !important;
        border: 1px solid rgba(0, 0, 0, 0.125);
        box-sizing: border-box;
        transition: transform .3s ease, box-shadow .2s ease;
        margin-bottom: 30px;
        transform: scale(1.0);
      }

      .tms-card:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
        transform: scale(1.04);
        transition: transform .7s ease, box-shadow .7s ease;
      }
    `;
const STYLESHEET_ID = 'tms-card-styles';

const tmsCardTemplateContent = `
      <div class="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-6">
      <div class="card tms-card">
        <img
          class="card-img-top"
          src=""
          alt="placeholder image">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
    `;
const TEMPLATE_ID = 'tms-card-template';


// add style sheet to document head if iit's not already there
function addCardStyleToHead () {
  let styleSheet = document.getElementById(STYLESHEET_ID);
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = STYLESHEET_ID;
    styleSheet.textContent = cssRules;
    document.head.appendChild(styleSheet);
  }
}

// add <template> to body if it's not already there
function addCardTemplateToBody () {
  let template = document.getElementById(TEMPLATE_ID);
  if (!template) {
    template = document.createElement('template');
    template.id = TEMPLATE_ID;
    document.body.appendChild(template);
  }
  template.innerHTML = tmsCardTemplateContent;
}

/**
 * add card to row
 * @param {string} rowId - id attribute of destination row
 * @param {string} imageUrl
 * @param {string} imageAlt
 * @param {string} title
 * @param {string} text
 * @param {string} href - URL to navigate to upon a click
 */
function addCard ({
    rowId,
    imageUrl,
    imageAlt,
    title,
    text,
    href}) {
  const cardsRow = document.getElementById(rowId);
  const template = document.getElementById(TEMPLATE_ID);
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector('.card.tms-card');
  if (href) {
    card.addEventListener('click', (evt) => {
      window.location.href = href;
      return false;
    });
  }
  const image = clone.querySelector('.card.tms-card img');
  image.src = imageUrl;
  image.alt = imageAlt;
  image.title = title;
  const hTitle = clone.querySelector('.card-body .card-title');
  hTitle.innerText = title;
  const pText = clone.querySelector('.card-text');
  pText.innerHTML = text;

  cardsRow.appendChild(clone);
}

// add necessary items to DOM
addCardStyleToHead();
addCardTemplateToBody();

export {
  addCard
}
