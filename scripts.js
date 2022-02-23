'use strict'

//VARIABLES BLOCK---start
const page = document.querySelector('html');
const body = document.querySelector('body');

const themesChangerSelect = document.getElementById('themes-drop-list');
const themesChangerButtons = document.querySelectorAll('.themes-changer__tablet-item');
const themesChangerRadioButtons = document.getElementsByName('themes-radio-button');

const galleryItems = document.querySelectorAll('.gallery__item');

const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
//VARIABLES BLOCK---end

//ONLOAD---start
onLoad();
//ONLOAD---end

//COLOR THEME HANDLER---start
themesChangerSelect.addEventListener('change', event => {
  const value = themesChangerSelect.value;

  changeTheme(value);
  changeRadioButtons(value)
  localStorage.setItem('theme', value);
});

themesChangerButtons.forEach(button => {
  button.addEventListener('click', event => {
    const value = event.target.dataset.theme;

    changeTheme(value);
    changeRadioButtons(value);
    themesChangerSelect.value = value;
    localStorage.setItem('theme', value);
  });
});

themesChangerRadioButtons.forEach(radioButton => {
  radioButton.addEventListener('change', event => {
    const value = radioButton.value;

    changeTheme(value);
    themesChangerSelect.value = value;
    localStorage.setItem('theme', value);
  });
});
//COLOR THEME HANDLER---end

//MODAL HANDLER---start
galleryItems.forEach(item => {
  item.addEventListener('click', event => {
    const imgSrc = event.target.src

    modal.innerHTML = `
      <img src="${imgSrc}">
    `;
    modal.classList.add('active');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
  });
});

modal.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  body.style.overflow = '';
  setTimeout(() => modal.querySelector('img').remove(), 200);
});
//MODAL HANDLER---end

//FUNCTIONS---start
function changeRadioButtons(value) {
  themesChangerRadioButtons.forEach(radioButton => {
    radioButton.value === value
      ? radioButton.setAttribute('checked', 'checked')
      : radioButton.removeAttribute('checked');
  });
}

function changeTheme(value) {
  page.removeAttribute('class');
  page.setAttribute('class', value);
}

function onLoad() {
  const theme = localStorage.getItem('theme');

  if (theme) {
    changeRadioButtons(theme)
    themesChangerSelect.value = theme;
    changeTheme(theme);
  }
}
//FUNCTIONS---end
