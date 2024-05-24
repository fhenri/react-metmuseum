import ObjectCard from './ObjectCard';

function ObjectList(props) {

    const objectList = props.objectList;

    return (
        <div className="grid grid-cols-5 [&>*:nth-child(5n+1)]:ml-0 [&>*:nth-child(5n)]:mr-0">
        {objectList.map(obj => (
            <ObjectCard obj={obj} key={obj} />
        ))}
        </div>
    )
}

export default ObjectList;
