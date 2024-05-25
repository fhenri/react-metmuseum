import { Suspense } from 'react';
import DepartmentCard from './DepartmentCard';

function DepartmentList ( props ) {

    const dpts = props.departmentList;

    return (
        <Suspense fallback={<div>Loading Elements ...</div>}>
            <div className="flex flex-wrap">
                {dpts.map(dpt => (
                    <DepartmentCard department={dpt} key={dpt.departmentId}/>
                ))}
            </div>
        </Suspense>
    )
}

export default DepartmentList;