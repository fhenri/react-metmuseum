import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ObjectImage from './ObjectImage';

function getSearchURL(dptId, criteria) {
    return `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&departmentId=${dptId}&q=${criteria}`;
}

// The main difficulty in this component is to get a random object 
// from the gallery
// we first need to get the list of available object - we try to limit the possibility 
// and then fetch this object to get the image url
function DepartmentCard(props) {
    const objectURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

    const dpt = props.department;

    const [mObject, setMObject] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const searchWord = (dpt != null) 
        && dpt.displayName.split(' ').find(word => word.length > 3);
  
    useEffect(() => {
        fetch(getSearchURL(dpt.departmentId, searchWord))
          .then(response => response.json())
          .then(data => {
            // get random number 
            const random = Math.floor(Math.random() * data.total);
            // get the corresponding object
            const objectId = data.objectIDs[random];
            fetch(`${objectURL}/${objectId}`)
            .then(response => response.json())
            .then(data => setMObject(data))
          })
          .catch(error => {
            console.error('Error fetching random object:', error);
            setErrorMessage(`cannot get object from gallery ${dpt.displayName}`)
          });
      }, [dpt, searchWord]);
    
    return (
        <div className="block flex flex-col max-w-sm m-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 basis-full sm:basis-1/2 md:basis-1/3">
            <h5 className='mb-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                <div dangerouslySetInnerHTML={{ __html: dpt.displayName }} />
            </h5>
            <ObjectImage mObject={mObject} />
            <div className='h-full'></div>
            <Link to={`/department/${dpt.departmentId}`} state={ dpt.displayName } className='inline-flex font-medium text-red-met hover:underline'>
                <span>Visit the Gallery</span>
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
            </Link>
        </div>
    )
}

export default DepartmentCard;
