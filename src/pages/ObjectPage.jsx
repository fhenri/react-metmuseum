import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

import PageTitle from '../components/PageTitle';

function ObjectPage () {
    const objectAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    const location = useLocation();
    const { objectId } = useParams();
    //const mObject = location.state;
    const [mObject, setMObject] = useState(location.state);

    const navigate = useNavigate();

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
<div className="sticky absolute top-0 end-0 bg-white flex items-center flew-wrap dark:bg-black py-4">

<button type="button" className="bg-white dark:bg-black flex items-center justify-center w-10 h-10 px-4 cursor-pointer" onClick={ () => navigate(`/object/${objectId-1}`)}>
    <span className="inline-flex items-center justify-center rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg className="w-4 h-4 text-red-met dark:text-red-met rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
        </svg>
        <span className="sr-only">Previous</span>
    </span>
</button>

<PageTitle title={`${mObject ? mObject.title : ''}`} />

<button type="button" className="bg-white dark:bg-black flex items-center justify-center w-10 h-10 px-4 cursor-pointer" onClick={ () => navigate(`/object/${parseInt(objectId)+1}`)}>
    <span className="inline-flex items-center justify-center rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-black dark:group-focus:ring-gray-800/70 group-focus:outline-none">
        <svg className="w-4 h-4 text-red-met dark:text-red-met rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="sr-only">Next</span>
    </span>
</button>
</div>


          <div className='flex flex-col pb-8 md:flex-row space-y-12 md:space-x-24'>
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
                Learn more about the object<span className='text-red-met'> on wikidata</span>
                </a></div> }
            </div>
            <div className='text-left md:text-end md:grow'>
                {renderCarousel(mObject)}

                <a href={mObject.objectURL}>
                  <span className='text-left md:text-end md:w-full'>See the object on the <span className='text-red-met'>met museum</span> website</span>
                </a>
              </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-[180px_800px] md:gap-x-8">
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

function renderCarousel(mObject) {

  return (<>
    { mObject.additionalImages && mObject.additionalImages.length > 0 ?
      <div className="carousel rounded-box md:h-auto md:text-end md:w-full">
      { mObject.primaryImage ?
        <div className="carousel-item">
          <a href={mObject.primaryImage}>
            <img className="object-cover h-48 w-72 md:h-96 cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
          </a> 
        </div> 
        : mObject.primaryImageSmall && <div className="carousel-item">
          <img className="md:text-end md:h-96 object-cover h-48 w-72 cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
        </div>
      }
      {
        mObject.additionalImages.map(image => (
          <div className="carousel-item" key={image}>
            <a href={image}>
              <img src={image} className="object-cover md:h-96 h-48" alt="additional images" />
            </a>
          </div>))
      }
      </div>
    : 
      mObject.primaryImage ?
      <a href={mObject.primaryImage}>
        <img className="md:h-auto md:text-end md:w-full rounded-lg cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
      </a>
      : mObject.primaryImageSmall && <img className="md:h-auto md:text-end md:w-full rounded-lg cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
    }
    </>)
}

function openFullscreen  () {
  document.getElementById('image')?.requestFullscreen()
}

export default ObjectPage;