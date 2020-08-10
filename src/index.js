import './styles.css';
import menu from './menu.json';
import menuTemplate from './menuItems.hbs';

const refs = {
  body: document.querySelector('body'),
  menuList: document.querySelector('.js-menu'),
  switchInput: document.querySelector('.js-switch-input'),
};
// console.log(refs.switchInput);
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
// ======================створення розмітки=================================
function generateMenuList(elements) {
  const menuItems = elements.map(elem => menuTemplate(elem)).join('');
  refs.menuList.insertAdjacentHTML('afterbegin', menuItems);
}
generateMenuList(menu);

// =======================перевірка поточної теми==========================
checkTheme();
// ==========================функції по зміні теми та перевірці поточної теми======================================
function switchTheme(e) {
  if (e.target.checked) {
    refs.body.classList.add(Theme.DARK),
      refs.body.classList.remove(Theme.LIGHT);
    localStorage.setItem('userTheme', Theme.DARK);
    // console.log(localStorage.getItem('userTheme'));
  } else {
    refs.body.classList.remove(Theme.DARK);
    refs.body.classList.add(Theme.LIGHT);
    localStorage.setItem('userTheme', Theme.LIGHT);
  }
}

function checkTheme() {
  let currentTheme = localStorage.getItem('userTheme');
  // console.log(currentTheme);
  if (currentTheme) {
    refs.body.classList.add(currentTheme);
  }
  if (currentTheme === Theme.DARK) {
    refs.switchInput.checked = true;
  }
}
// ===========================observer-для практики ==================================
const images = refs.menuList.querySelectorAll('img');

const observeElem = (entries, observer) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('src', entry.target.dataset.fullimage);
      observer.unobserve(entry.target);
    }
  });
};
const options = {
  rootMargin: '50px',
  // threshold:1
};

const obs = new IntersectionObserver(observeElem, options);

if (images.length) {
  images.forEach(image => obs.observe(image));
}
// =========================================================================
refs.switchInput.addEventListener('change', switchTheme);
