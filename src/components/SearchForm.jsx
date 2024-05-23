import { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import AdvancedSearch from './AdvancedSearch';

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
            console.log(data);
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
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="100px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xmlSpace="preserve">
                <path d="M78.798,44.552L50.484,28.888c-0.301-0.167-0.667-0.167-0.968,0L21.095,44.611c-0.399,0.221-0.598,0.684-0.484,1.125s0.512,0.75,0.968,0.75h1.016v1.418c0,0.552,0.448,1,1,1h1.219v1.419c0,0.552,0.448,1,1,1h1.417v17.353h-1.417c-0.552,0-1,0.448-1,1v1.419h-1.219c-0.552,0-1,0.448-1,1v2.419c0,0.552,0.448,1,1,1h52.812c0.552,0,1-0.448,1-1v-2.419c0-0.552-0.448-1-1-1h-1.219v-1.419c0-0.552-0.448-1-1-1h-1.416V51.324h1.417c0.552,0,1-0.448,1-1v-1.419h1.219c0.552,0,1-0.448,1-1v-1.418h1.016c0.006,0,0.013-0.001,0.02,0c0.552,0,1-0.448,1-1C79.442,45.06,79.174,44.695,78.798,44.552z M50,30.906l24.548,13.581H25.452L50,30.906z M29.23,51.324h2.838v17.352H29.23V51.324z M34.068,51.324h2.838v17.353h-2.838V51.324z M46.581,51.324v17.353h-2.838V51.324H46.581z M56.257,51.324v17.353h-2.838V51.324H56.257z M61.095,68.675h-2.838V51.324h2.838V68.675z M51.419,68.675h-2.838V51.324h2.838V68.675z M41.743,68.675h-2.837V51.324h2.837V68.675z M75.405,73.514H24.594v-0.419h1.219h48.374h1.219V73.514zM73.187,71.095H26.813v-0.419h46.374V71.095z M63.095,68.676V51.324h2.838v17.353H63.095z M70.771,68.675h-2.838V51.324h2.838V68.675z M73.188,49.324h-1.417h-4.838h-4.838h-4.838h-4.838h-4.838h-4.838h-4.837h-4.838H28.23h-1.417v-0.419h46.375V49.324zM75.406,46.905h-1.219H25.813h-1.219v-0.418h50.812V46.905z"/>
                </svg>
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