import Cookies from 'js-cookie';
import { default0 } from './index';

/*
* Adds commas to a large number and strips decimal places to user preference
*
* @param {number} num    The number to format
* @return {string}       The comma-separated, decimal-stripped number (ex. 32984.012974205 --> 32,984.01)
*/
export function formatNum(num) {
    const decimal = Cookies.get('decimal') || 2;
	num = default0(num);
	return num.toLocaleString('en', {   
			minimumFractionDigits: 0,
			maximumFractionDigits: decimal,
		});
}

/*
* Pushes a value to the recentSearches cookie
*
* @param {string} ele    Value to add to the recentSearches cookie
*/
export function pushToRecentSearches(ele) {
	const str = String(ele);
	let cookie = Cookies.get('recentSearches');
	if (cookie === undefined) {
		cookie = '[]';
	}
	const array = JSON.parse(cookie);
	const maxLength = 30;
	
	// The new player name is put at the front of the queue
	let newArray = [str];
	// Subsequent player names are added after
	for (const a of array) {
		// To avoid repetitions in the queue
		if (!newArray.includes(a)) {
			newArray.push(a);
		}
	}
	Cookies.set('recentSearches', JSON.stringify(newArray.slice(0,maxLength)), {expires:365});
}