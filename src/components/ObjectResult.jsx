import { useState, Suspense } from 'react'

import ObjectList from '../components/ObjectList';

function ObjectResult (props) {

    const results = props.objectList;
    const [nbItems, setNbItems] = useState(20);

    const showMore = results && (results.length > nbItems);

    return (
        results && <Suspense fallback={<div>Loading Elements ...</div>}>
            <ObjectList objectList={results.slice(0, nbItems)} />
            { showMore && <button  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => setNbItems(nbItems + 20)}>
            Show More
            </button> }
        </Suspense>
        )
}

export default ObjectResult;
