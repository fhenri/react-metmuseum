
function ObjectImage (props) {

    const { mObject } = props;
    
    return (
    <>
        {
        mObject ?
            mObject.primaryImageSmall && <img className="rounded-t-lg" src={mObject.primaryImageSmall} alt={mObject.title} />
            : <span>Loading image ...</span>
        }
    </>
    )
}

export default ObjectImage;