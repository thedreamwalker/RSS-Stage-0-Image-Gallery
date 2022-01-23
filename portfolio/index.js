console.log(`Оценка: 85 из 85\n
— Вёрстка соответствует макету. Ширина экрана 768px +48 \(выполнено и проверено через pixelperfect\)\n
— Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15 (Прокрутки не появляется и контент остается)\n
— На ширине экрана 768рх и меньше реализовано адаптивное меню +22 (адаптивное меню реализовано)`);

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-list');
const menuLinks = document.querySelectorAll('.nav-item');

const openMenu = () => {
  menu.classList.toggle('is-active');
  hamburger.classList.toggle('is-active');
}

/*
const closeMenu = (event) => {
    menu.classList.remove('is-active');
    hamburger.classList.remove('is-active');
}

menuLinks.forEach((el) => el.addEventListener('click', closeMenu));
*/

const closeMenu = (event) => {
  if (event.target && event.target.closest('.nav-item a')) {
    menu.classList.remove('is-active');
    hamburger.classList.remove('is-active');
  }
}

hamburger.addEventListener('click', openMenu);
menu.addEventListener('click', closeMenu);