import ObjectCard from './ObjectCard';

function ObjectList(props) {

    const objectList = props.objectList;

    return (
        <div className="flex flex-wrap w-[calc(100%+30px)]">
        {objectList.map(obj => (
            <ObjectCard obj={obj} key={obj} />
        ))}
        </div>
    )
}

export default ObjectList;
