
function AdvancedSearch ( props ) {

    const dptAvailable = props.dptAvailable;

    return (
        <>
        { dptAvailable && <div>search department</div> }
        <div>search with images</div>
        </>
    );
}

export default AdvancedSearch;