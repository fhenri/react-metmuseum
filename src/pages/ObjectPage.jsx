import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

import PageTitle from '../components/PageTitle';

function ObjectPage () {
    const objectAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    const location = useLocation();
    const { objectId } = useParams();
    //const mObject = location.state;
    const [mObject, setMObject] = useState(location.state);

    let navigate = useNavigate();
    const goToPrevious = () => {
      console.log("go to previous page")
      navigate(`/object/${objectId-1}`);
    };
    const goToNext = () => {
        console.log("go to next page")
        navigate(`/object/${objectId+1}`);
    };

    // TODO if state empty fetch from API
    useEffect(() => {
      if (!location.state) {
        fetch(`${objectAPI}/${objectId}`)
        .then((response) => response.json())
        .then((data) => setMObject(data))
        .catch(error => {
            console.error('Error fetching object:', error);
        })
      }
      window.scrollTo(0, 0);
    }, [location, objectId]);

    return (
      <>{mObject && renderObjectDetails(mObject)}</>
    );

    function renderObjectDetails (mObject) {
      return (
        <>
          <div className="sticky top-0 bg-white py-4">
            <PageTitle title={`${mObject ? mObject.title : ''}`} />
          </div>

<div>
<button type="button" className="absolute top-0 start-0 z-30 bg-white flex items-center justify-center h-full px-4 cursor-pointer" onClick={ () => navigate(`/object/${objectId-1}`)}>
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
        </svg>
        <span className="sr-only">Previous</span>
    </span>
</button>
<button type="button" className="absolute top-0 end-0 z-30 bg-white flex items-center justify-center h-full px-4 cursor-pointer" onClick={() => navigate(`/object/${parseInt(objectId)+1}`)}>
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-black dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg className="w-4 h-4 text-black dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="sr-only">Next</span>
    </span>
</button>
</div>


          <div className='flex flex-row space-x-24'>
            <div className='text-left pt-12'>
              <h2 className='text-2xl font-bold my-2 text-left inline'>
                {mObject.artistWikidata_URL ? 
                  <a href={mObject.artistWikidata_URL}>{mObject.artistDisplayName}</a>
                  : mObject.artistDisplayName
                }
              </h2>
              { mObject.artistNationality && <span>, {mObject.artistNationality}</span> }
              { mObject.objectDate && <div>{mObject.objectDate}</div> }
              { mObject.objectWikidata_URL && <div><a href={mObject.objectWikidata_URL}>
                Learn more about the object<span className='text-red-600'> on wikidata</span>
                </a></div> }
            </div>
            <div className='text-end'>
                { mObject.primaryImage ? 
                  <a href={mObject.primaryImage}>
                    <img className="h-auto max-w-lg rounded-lg cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
                  </a> 
                  : mObject.primaryImageSmall && <img className="h-auto max-w-lg rounded-lg cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
                }
                <a href={mObject.objectURL}>
                  <span className='text-end w-full'>See the object on the <span className='text-red-600'>met museum</span> website</span>
                </a>
            </div>
          </div>

          <div className="grid grid-cols-[180px_800px] gap-x-8">
            <div className='font-semibold leading-loose'>
              Title
            </div>
            <div>
              {mObject.title}
            </div>
            <div className='font-semibold leading-loose'>
              Author
            </div>
            <div>
              {mObject.artistDisplayName}, {mObject.artistDisplayBio}
            </div>
            <div className='font-semibold leading-loose'>
              Period
            </div>
            <div>
              {mObject.period}
            </div>
            <div className='font-semibold leading-loose'>
              Culture
            </div>
            <div>
              {mObject.culture}
            </div>
            <div className='font-semibold leading-loose'>
              Department
            </div>
            <div>
              {mObject.department}
            </div>
            <div className='font-semibold leading-loose'>
              Classification
            </div>
            <div>
              {mObject.classification}
            </div>
            <div className='font-semibold leading-loose'>
              Object Name
            </div>
            <div>
              {mObject.objectName}
            </div>
            <div className='font-semibold leading-loose'>
              Credit Line
            </div>
            <div>
              {mObject.creditLine}
            </div>
          </div>

        </>
      )
    }
}

export default ObjectPage;