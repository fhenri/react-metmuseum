import DepartmentCard from './DepartmentCard';

function DepartmentList ( props ) {

    const dpts = props.departmentList;

    return (
        <div className="flex flex-wrap">
            {dpts.map(dpt => (
                <DepartmentCard department={dpt} key={dpt.departmentId}/>
            ))}
        </div>
    )
}

export default DepartmentList;