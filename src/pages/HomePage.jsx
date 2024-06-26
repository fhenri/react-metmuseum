import { useEffect, useState } from 'react';

import DepartmentList from '../components/DepartmentList';
import SearchForm from '../components/SearchForm';
import PageTitle from '../components/PageTitle';
import ErrorMessage from '../components/ErrorMessage';
import ObjectResult from '../components/ObjectResult';
import NavBottom from '../components/NavBottom';

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
            <nav className="sticky top-0 bg-white dark:bg-dark-bgcolor py-4">
                <PageTitle title="Welcome to <span class='text-red-met'>The Met Museum</span> Virtual Tour" />
                <SearchForm allDepartments={true} setResults={setResults} placeholder="Search in museum..." setErrorMessage={setErrorMessage}/>
            </nav>

            { errorMessage ? 
                <ErrorMessage 
                    mainMessage="Sorry, the museum is closed" 
                    subMessage={errorMessage}/>
                : renderResults(results, dpts)
            }

            <NavBottom />
        </>
    )
}

    
export default Home;