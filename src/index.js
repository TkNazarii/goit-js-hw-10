import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  cartInfo: document.querySelector('.country-info'),
};

const { input, list, cartInfo } = refs;

// слухач інпута при зміні інпута виконується
input.addEventListener('input', debounce(sendValue, DEBOUNCE_DELAY));

// слухач списку 1 при виборі дія
list.addEventListener('click', choice);

// функція кліку по країні
function choice(evt) {
  if (evt.target.className === 'country-list') {
    return;
  }
  // 1-ший батько від кліку з таким класом
  const myLi = evt.target.closest('.country-item');
  const textItem = myLi.lastElementChild;
  const newValue = textItem.textContent;

  // функція запиту з вибраною країною
  fetchThen(newValue);
}

function sendValue(event) {
  event.preventDefault();
  list.innerHTML = '';
  cartInfo.innerHTML = '';
  // забираєм пробіли
  const myValue = input.value.trim();
  // якщо пусте поле
  if (!myValue) {
    return;
  }
  // запит з введеними даними
  fetchThen(myValue);
}
// розмітка початкова
function createMarkup(arr) {
  const markap = arr.map(
    ({
      name,
      flags: { svg },
    }) => `<li class="country-item"><img class="country-img" src="${svg}" alt="flag" width=50px><h2 class="country-text">${name}</h2>
				</li>`
  );
  // закидаєм розмітку
  list.innerHTML = markap.join('');
}
// розмітка доповнення
function createMarkupInfo(arr) {
  const markap = arr.map(
    ({ capital, population, languages: [{ name }] }) =>
      `<p class="country-info">Capital: ${capital}</p><p class="country-info">Рopulation: ${population}</p><p class="country-info">Languages: ${name}</p>`
  );

  cartInfo.innerHTML = markap.join('');
}
// обробка запиту
function fetchThen(value) {
  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        createMarkup(data);
        createMarkupInfo(data);
      } else {
        createMarkup(data);
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
