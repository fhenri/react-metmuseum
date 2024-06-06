import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ObjectImage from './ObjectImage';

function ObjectCard (props) {
    const objectAPI = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
    const objectId = props.obj;

    const [mObject, setMObject] = useState(null);

    useEffect(() => {
        fetch(`${objectAPI}/${objectId}`)
        .then(response => response.json())
        .then(data => {
            setMObject(data)
        })
        .catch(error => console.error('Error fetching object:', objectId))
    }, [objectId]);
    
    return (
        mObject && (
        <div className="block flex flex-col mx-2 my-2 p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h3 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                <div dangerouslySetInnerHTML={{ __html: mObject.title }} />
            </h3>
            <ObjectImage mObject={mObject} />
            { mObject.artistDisplayName && <h5 className='mb-2 tracking-tight text-gray-900 dark:text-white'>
                by {mObject.artistDisplayName}
            </h5> }
            <div className='h-full'></div>
            <Link to={`/object/${objectId}`} state={ mObject } className='inline-flex font-medium text-red-met hover:underline text-end'>
                View Object Details
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
            </Link>
        </div>)
    )
}

export default ObjectCard;