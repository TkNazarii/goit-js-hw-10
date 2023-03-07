import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const cartInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(sendValue, DEBOUNCE_DELAY))

function sendValue(event) {
	event.preventDefault();
	list.innerHTML = ''
	cartInfo.innerHTML = ''

	const myValue = input.value.trim()
	console.log(myValue);	

	if (!myValue) {
		return
	}

		fetchCountries(myValue)
			.then((data) => {
				
				if (data.length > 10) {
					console.log('arr > 10');
					Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
				} else if (data.length === 1) {		
					createMarkup(data)
					createMarkupInfo(data)
				} else {
					createMarkup(data)
				}
			})
			.catch((error) => {
				console.log(error);
					Notiflix.Notify.failure("Oops, there is no country with that name");
			})
	

}

function createMarkup(arr) {
	const markap = arr.map(({ name, flags: { svg } }) => `<li class="country-item"><img src="${svg}" alt="flag" width=50px><h2>${name}</h2>
</li>`
	)

	list.innerHTML = markap.join('')
}

function createMarkupInfo(arr) {
	const markap = arr.map(({ capital, population, languages: [{ name }] }) => `<p class="country-info">Capital: ${capital}</p><p class="country-info">Рopulation: ${population}</p><p class="country-info">Languages: ${name}</p>`)

	cartInfo.innerHTML = markap.join('')
}



