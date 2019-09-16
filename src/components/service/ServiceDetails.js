import React, { Component }  from 'react';
import { Loading } from './../LoadingComponent';

// export default function ServiceDetails ( props, { match }) {
//     if (props.isLoading) {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <Loading />
//                 </div>
//             </div>
//         );
//     }
//     else {    
//         const service = props.services.services.filter(service => service.id === parseInt(match.params.serviceId, 10))[0]
//         return (
//             <div>
//                 {service}
//             </div>
//         );
//     }
// }   


export const ServiceDet = ({match, services}) => {
    if(services.isLoading){
        return(
            <Loading />
        );
    }
    const serv = services.services.filter(service => service.id === parseInt(match.params.serviceId, 10))[0]
    return(
        <div>
            Loaded{serv} 
        </div>
    );

}