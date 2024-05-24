import { Link } from "react-router-dom";

function ObjectImage (props) {

    const { mObject } = props;
    
    return (
    <>
        {
        mObject ?
            mObject.primaryImageSmall && 
            <Link to={`/object/${mObject.objectID}`} state={ mObject }>
                <img className="rounded-t-lg" src={mObject.primaryImageSmall} alt={mObject.title} />
            </Link>
            : <span>Loading image ...</span>
        }
    </>
    )
}

export default ObjectImage;