import { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";

import PageTitle from '../components/PageTitle';

function ObjectItem () {
    const { objectId } = useParams();
    const { state } = useLocation();

    // TODO if state empty fetch from API
    /*
    useEffect(() => {
        setLoadingResults(true)
        fetch(departmentsAPI)
            .then((response) => response.json())
            .then((data) => setDpts(data.departments))
            .catch(error => {
                setErrorMessage('we cannot get the gallery data');
                console.error('Error fetching departments:', error);
            })
            .finally(() => setLoadingResults(false));
    }, [objectId]);
    */

    return (
      <>
        <div className="sticky top-0 bg-white py-4">
          <PageTitle title={`${state ? state.title : ''}`} />
        </div>

        <div className='flex flex-row space-x-24'>
          <div className='text-left pt-12'>
            <h2 className='text-2xl font-bold my-2 text-left inline'>
              {state.artistWikidata_URL ? 
                <a href={state.artistWikidata_URL}>{state.artistDisplayName}</a>
                : state.artistDisplayName
              }
            </h2>
            { state.artistNationality && <span>, {state.artistNationality}</span> }
            { state.objectDate && <div>{state.objectDate}</div> }
            { state.objectWikidata_URL && <a href={state.objectWikidata_URL}>
              Learn more about the object<span className='text-red-600'> on wikidata</span>
              </a> }
          </div>
          <div className='text-end'>
              { state.primaryImage ? 
                <a href={state.primaryImage}>
                  <img className="h-auto max-w-lg rounded-lg  cursor-pointer" src={state.primaryImageSmall} alt={state.title} />
                </a> 
                : state.primaryImageSmall && <img className="h-auto max-w-lg rounded-lg  cursor-pointer" src={state.primaryImageSmall} alt={state.title} />
              }
              <a href={state.objectURL}>
                <span className='text-end w-full'>See the object on the <span className='text-red-600'>met museum</span> website</span>
              </a>
          </div>
        </div>

        <div className="grid grid-cols-[180px_800px] gap-x-8">
          <div className='font-semibold leading-loose'>
            Title
          </div>
          <div>
            {state.title}
          </div>
          <div className='font-semibold leading-loose'>
            Author
          </div>
          <div>
            {state.artistDisplayName}, {state.artistDisplayBio}
          </div>
          <div className='font-semibold leading-loose'>
            Period
          </div>
          <div>
            {state.period}
          </div>
          <div className='font-semibold leading-loose'>
            Culture
          </div>
          <div>
            {state.culture}
          </div>
          <div className='font-semibold leading-loose'>
            Department
          </div>
          <div>
            {state.department}
          </div>
          <div className='font-semibold leading-loose'>
            Classification
          </div>
          <div>
            {state.classification}
          </div>
          <div className='font-semibold leading-loose'>
            Object Name
          </div>
          <div>
            {state.objectName}
          </div>
          <div className='font-semibold leading-loose'>
            Credit Line
          </div>
          <div>
            {state.creditLine}
          </div>
        </div>

      </>
    )
}

export default ObjectItem;