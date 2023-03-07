export function fetchCountries(name) {
	const BASE_URL = 'https://restcountries.com';

	return fetch(`${BASE_URL}/v2/name/${name}?fields=name,capital,population,flags,languages`)
	  .then((response) => {
		// console.log(response)
		  if (!response.ok) {
			 throw new Error(response.statusText)
			} 
		return response.json();
	  })
	  
} 

