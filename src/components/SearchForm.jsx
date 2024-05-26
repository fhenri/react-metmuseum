import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import AdvancedSearch from './AdvancedSearch';
import MuseumLogo from './M-full-01.svg';

function SearchForm ( props ) {

    const searchAPI = "https://collectionapi.metmuseum.org/public/collection/v1/search";
    const { departmentId } = useParams();

    function getSearchURL(dptId, criteria) {
        let searchUrl =  `${searchAPI}?q=${criteria}`;
        if (departmentId) {
            searchUrl = searchUrl.concat(`&departmentId=${dptId}`);
        }
        return searchUrl;
    }
    
    const [query, setQuery] = useState('');
    const [advSearch, setAdvSearch] = useState(false);

    //const [searchResults, setSearchResults] = useState([]);
    //const searchResults = useContext(searchResults);
    const { setResults, setErrorMessage, placeholder } = props

    function searchObjects (event) {
        event.preventDefault();
        fetch(getSearchURL(departmentId, query))
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            setResults(data.objectIDs);
            //setResults([...data.objectIDs]);  // Spread into a new array
        })
        .catch(error => {
            setErrorMessage('search not available');
            console.error('Error searching:', error)
        })
    }

    function renderAdvancedSearch(isAllDepartmentSearch) {
        return (
            advSearch ?
                <AdvancedSearch dptAvailable={isAllDepartmentSearch} />
                : <div className="block text-right" onClick={() => setAdvSearch(true)}>advanced search</div>
        )
    }
    
    return (
        <form onSubmit={searchObjects} >
            <div className='flex flex-col my-5'>
                <div className="flex items-center">
                    <label htmlFor="query" className="sr-only">Search</label>
                    <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <img src={ MuseumLogo } className="h-12" alt="Search" />                
                </div>
                <input type="text" id="query" name="query" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-20 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} required />
                    </div>
                    <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
                {/*}
                <div className="flex-row-reverse hover:pointer-events-auto">
                    { renderAdvancedSearch(props.allDepartments) }
                </div>
                */}
            </div>
        </form>
    );
}

export default SearchForm;