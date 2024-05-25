import { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";

import PageTitle from '../components/PageTitle';

function ObjectPage () {
    const objectAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    const location = useLocation();
    const { objectId } = useParams();
    //const mObject = location.state;
    const [mObject, setMObject] = useState(location.state);

    /*
    const location = useLocation();
    const [objectId, setObjectId] = useState('');
    */

    /*
    let navigate = useNavigate();
    const goToPrevious = () => {
      navigate(`object/{objectId-1}`);
    };
      const goToNext = () => {
      navigate(`object/{objectId+1}`);
    };
    */

    // TODO if state empty fetch from API
    useEffect(() => {
      console.log("use effect");

      console.log("fetch from API");
        fetch(`${objectAPI}/${objectId}`)
        .then((response) => response.json())
        .then((data) => setMObject(data))
        .catch(error => {
            console.error('Error fetching object:', error);
        })

        window.scrollTo(0, 0);
    }, [objectId]);

    return (
      <>
        <div className="sticky top-0 bg-white py-4">
          <PageTitle title={`${mObject ? mObject.title : ''}`} />
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
                  <img className="h-auto max-w-lg rounded-lg  cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
                </a> 
                : mObject.primaryImageSmall && <img className="h-auto max-w-lg rounded-lg  cursor-pointer" src={mObject.primaryImageSmall} alt={mObject.title} />
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

export default ObjectPage;