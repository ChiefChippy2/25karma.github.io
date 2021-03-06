import React, { useRef } from 'react';
import { MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import './Searchbar.css';
import { ReactIcon } from 'components';

/*
* Styled input with search button
*
* @param {string} props.defaultValue   The default value of the searchbar
* @param {string} props.tag            Tag to include at the end of the search query (ex. 'guild')
*/
export function Searchbar(props) {

	const refInput = useRef("input")
	const history = useHistory();
	
	/*
	* Checks if the key that was pressed was the Enter key
	*
	* @param {KeyboardEvent} event Generated by onKeyDown listener
	*/
	function handleKeyDown(event) {
		if(event.key === "Enter") {
			search();
		}
	}
	
	/*
	* Searches for a player based on the text currently in the input
	*/
	function search() {
		const slug = refInput.current.value.trim();
		if (slug !== '') {
			// Clear the input
			refInput.current.value = '';
			// Redirect page
			let query;
			if (props.tag) {
				query = encodeURIComponent(`${slug} ${props.tag}`);
			}
			else {
				query = encodeURIComponent(slug);
			}
			history.push(`/search/${query}`);
		}
	}

	return (
		<div className="py-1 px-2 input">
			<input
			ref={refInput}
			type="text" 
			onKeyDown={handleKeyDown} 
			defaultValue={props.defaultValue}
			autoFocus
			onFocus={(event)=>{event.target.select()}}
			spellCheck={false}
			/>
			<button onClick={search}>
				<ReactIcon icon={MdSearch} clickable />
			</button>
		</div>
	);
}