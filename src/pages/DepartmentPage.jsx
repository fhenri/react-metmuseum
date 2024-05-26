import { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";

import ObjectResult from '../components/ObjectResult';
import SearchForm from '../components/SearchForm';
import PageTitle from '../components/PageTitle';
import ErrorMessage from '../components/ErrorMessage';

function DepartmentPage() {
  const dptObjectAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds";

  const { departmentId } = useParams();
  const { state } = useLocation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /*
  The idea was to randomize the array so we dont display always object in same order; but performance are just horrible
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  */

  useEffect(() => {
    setIsLoading(true);
    fetch(`${dptObjectAPI}=${departmentId}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data.objectIDs)
          setIsLoading(false);
        })
        .catch(error => {
            setErrorMessage('we cannot get the gallery data');
            console.error('Error fetching gallery object:', error);
        })
  }, [departmentId]);

  function renderResults (results) {
    if (errorMessage || (!isLoading && results.length == 0)) {
      return (<ErrorMessage 
        mainMessage="Sorry, the gallery is closed" 
        subMessage={errorMessage}/>)
    }

    if (isLoading) {
      return (
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      );
    }

    return (
        <ObjectResult objectList={results} />
    );
  }

  return (
    <>
      <div className="sticky top-0 bg-white py-4">
        <PageTitle title={`Welcome to the <span class='text-red-met'>${state ? state : ''}</span> Virtual Gallery`} />
        <SearchForm allDepartments={false} setResults={setResults} setErrorMessage={setErrorMessage} placeholder="Search in gallery..."/>
      </div>

      {renderResults(results)}
    </>
  );
}

export default DepartmentPage;

