import { useEffect, useState, createContext, Suspense } from 'react';
import { Link } from 'react-router-dom';

import DepartmentList from '../components/DepartmentList';
import ObjectList from '../components/ObjectList';
import SearchForm from '../components/SearchForm';
import PageTitle from '../components/PageTitle';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
    const departmentsAPI = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

    const [dpts, setDpts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    //const searchResults = createContext([])
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log("call to fetch department data");
        fetch(departmentsAPI)
            .then((response) => response.json())
            .then((data) => setDpts(data.departments))
            .catch(error => {
                setErrorMessage('we cannot get the gallery data');
                console.error('Error fetching departments:', error);
            })
    }, []);

    function renderResults (results, dpts) {
        if (results && results.length > 0) {
            return (<ObjectList objectList={results} />);
        } else {
            return (<DepartmentList departmentList={dpts} />);
        }
    }
    
    return (
        <>
            <div className="sticky top-0 bg-white py-4">
                <PageTitle title="Welcome to the Virtual Visit of the <span class='text-red-600'>Met Museum</span>" />
                <SearchForm allDepartments={true} setResults={setResults} placeholder="Search in museum..." setErrorMessage={setErrorMessage}/>
            </div>

            { errorMessage ? 
                <ErrorMessage 
                    mainMessage="Sorry, the museum is closed" 
                    subMessage={errorMessage}/>
                : <Suspense fallback={<div>Loading Elements ...</div>}>
                    { renderResults(results, dpts) }
                  </Suspense>
              
            }        
        </>
    )
}

    
export default Home;