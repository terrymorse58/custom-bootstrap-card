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
      
      .tms-card .card-img-hover {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:auto;
        display: none;
      }

      .tms-card .card-img-hover.show {
        display: block;
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
        <img
          class="card-img-hover"
          src=""
          alt="image shown on hover">
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
 * add card to container
 * @param {string} containerId - id of destination container
 * @param {string} imageUrl
 * @param {string} imageAlt
 * @param {string} title
 * @param {string} text
 * @param {string} href - URL to navigate to upon a click
 * @param {string} [imgHoverURL] - image to show on hover (optional)
 */
function addCard ({
    containerId,
    imageUrl,
    imageAlt,
    title,
    text,
    href,
    imgHoverURL = ""
}) {
  const cardsContainer = document.getElementById(containerId);
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

  // hover image (optional)
  if (imgHoverURL) {
    const imgHover = clone.querySelector(
      '.card.tms-card .card-img-hover'
    );
    imgHover.src = imgHoverURL;
    card.addEventListener('pointerenter', () => {
      imgHover.classList.add('show');
    });
    card.addEventListener('pointerleave', () => {
      imgHover.classList.remove('show');

      // add random query string to gifs to force reload each time
      if (imgHoverURL.endsWith('.gif')) {
        imgHover.src = imgHoverURL + '?' +Math.random();
      }
    });
  }

  const hTitle = clone.querySelector('.card-body .card-title');
  hTitle.innerText = title;
  const pText = clone.querySelector('.card-text');
  pText.innerHTML = text;

  cardsContainer.appendChild(clone);
}

// add necessary items to DOM
addCardStyleToHead();
addCardTemplateToBody();

export {
  addCard
}
