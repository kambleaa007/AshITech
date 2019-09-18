import React  from 'react';
import { Loading } from './../LoadingComponent';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Link } from 'react-router-dom';


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

// const mapStateToProps = state => {
//     return {        
//         services: state.services
//     };
// };

// const mapDispatchToProps = (dispatch) => ({
//     fetchServices: () => { dispatch(fetchServices()) }   
// });

// class ServDett extends Component{
//     componentDidMount() {
//         this.props.fetchServices();
//     }

// }
// withRouter(connect(mapStateToProps, mapDispatchToProps)(ServDett));



// export const ServiceDet = ({match},props) => {

//     return(
//         <div>
//             {props.services.services}
//         </div>
//     );

//     const services = props.services.services;

//     if(services.isLoading){
//         return(
//             <Loading />
//         );
//     }
//     const serv = services.filter(service => service.id === parseInt(match.params.serviceId, 10))[0]
//     return(
//         <div>
//             serviceId{match.params.serviceId}
//             Loaded{serv}            
            
//         </div>
//     );

// }

function RenderService({ service }) {
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg width="100%" src={service.serviceImage} alt={service.serviceName} />
                <CardBody>
                    <CardTitle>{service.serviceName}</CardTitle>
                    <CardText>{service.serviceDescription}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

export const ServiceDet = props => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.service) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to='/service'>Service</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Service Name: {props.service.serviceName}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.service.serviceName}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderService service={props.service} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <div>
                            <h4>Service Category: {props.service.serviceCategory}</h4>
                            <h4>Service Label: {props.service.serviceLabel}</h4>
                            <h4>Service Rating: {props.service.serviceRating}</h4>
                            <h4>Service Features: {props.service.featured}</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                Problem in Loading id got is {props.id} service length is {props.services.length}            
            </div>
            
        );
    }
}




export default ServiceDet;