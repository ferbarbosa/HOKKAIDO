import React from 'react'
import { useParams } from "react-router-dom";


export const Dashboard: React.FC = () => {
    const {type} = useParams();
    if(type === 'profile' || type === 'orders'){
        return (
            <div>
                <h1>Dashboard: {type}</h1>
            </div>
        )
    }

    return (
        <div>PAGE NOT FOUND</div>
    )
}

export default Dashboard
