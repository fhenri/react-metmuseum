import { useState, useEffect, Suspense } from 'react'
import { useParams, useLocation } from "react-router-dom";

import ObjectList from '../components/ObjectList';
import SearchForm from '../components/SearchForm';
import PageTitle from '../components/PageTitle';
import ErrorMessage from '../components/ErrorMessage';

function DepartmentPage() {
  const dptObjectAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds";

  const { departmentId } = useParams();
  const { state } = useLocation();

  const [errorMessage, setErrorMessage] = useState(null);
  const [results, setResults] = useState([]);

  /*
  The idea was to randomize the array but performance are just horrible
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  */

  useEffect(() => {
    fetch(`${dptObjectAPI}=${departmentId}`)
        .then((response) => response.json())
        .then((data) => setResults(data.objectIDs))
        .catch(error => {
            setErrorMessage('we cannot get the gallery data');
            console.error('Error fetching gallery object:', error);
        })
  }, [departmentId]);

  function renderResults (results) {
    if (errorMessage) {
      return (<ErrorMessage 
        mainMessage="Sorry, the gallery is closed" 
        subMessage={errorMessage}/>)
    }

    return (
      <Suspense fallback={<div>Loading Elements ...</div>}>
        <ObjectList objectList={results} />
      </Suspense>
    );
  }

  return (
    <>
      <div className="sticky top-0 bg-white py-4">
        <PageTitle title={`Welcome to the Virtual Gallery <span class='text-red-600'>${state ? state : ''}</span>`} />
        <SearchForm allDepartments={false} setResults={setResults} setErrorMessage={setErrorMessage} placeholder="Search in gallery..."/>
      </div>

      {renderResults(results)}
    </>
  );
}

export default DepartmentPage;

