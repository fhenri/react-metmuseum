import { useEffect, useState, Suspense } from 'react';

import DepartmentList from '../components/DepartmentList';
import SearchForm from '../components/SearchForm';
import PageTitle from '../components/PageTitle';
import ErrorMessage from '../components/ErrorMessage';
import ObjectResult from '../components/ObjectResult';

function Home() {
    const departmentsAPI = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

    const [dpts, setDpts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    //const searchResults = createContext([])
    const [results, setResults] = useState([]);

    useEffect(() => {
        const cachedData = sessionStorage.getItem('departmentsData');

        if (cachedData) {
            setDpts(JSON.parse(cachedData));
        } else {
            fetch(departmentsAPI)
            .then((response) => response.json())
            .then((data) => {
                setDpts(data.departments);
                sessionStorage.setItem('departmentsData', JSON.stringify(data.departments));
            })
            .catch(error => {
                setErrorMessage('we cannot get the gallery data');
                console.error('Error fetching departments:', error);
            })
        }
    }, []);

    function renderResults (results, dpts) {
        if (results && results.length > 0) {
            return (<ObjectResult objectList={results} />);
        } else {
            return (<DepartmentList departmentList={dpts} />);
        }
    }
    
    return (
        <>
            <div className="sticky top-0 bg-white py-4">
                <PageTitle title="Welcome to the <span class='text-red-600'>Met Museum</span> Virtual Tour" />
                <SearchForm allDepartments={true} setResults={setResults} placeholder="Search in museum..." setErrorMessage={setErrorMessage}/>
            </div>

            { errorMessage ? 
                <ErrorMessage 
                    mainMessage="Sorry, the museum is closed" 
                    subMessage={errorMessage}/>
                : renderResults(results, dpts)
            }        
        </>
    )
}

    
export default Home;