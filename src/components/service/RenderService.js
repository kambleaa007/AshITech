import React  from 'react';
import { Loading } from './../LoadingComponent';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col, Grid } from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';


export function RenderService({service, isLoading, errMess}){
    if(isLoading){return <Loading />;}
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else{
        return(
            <div key={service.id}>
                <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-150%) '
            }}>           

            {
            service != null &&   
                   
                <Card body outline color="secondary">
                    <Link to={`/service/${service.id}`}>
                    <p>Service Number: </p>{service.id}
                    <CardImg width="100px" src={service.serviceImage} alt={service.serviceName} />
                    <CardBody>
                        Service Name: <CardTitle>{service.serviceName}</CardTitle>
                        Service Category: {service.serviceCategory ? <CardSubtitle>{service.serviceCategory}</CardSubtitle> : null}
                        Service Label: {service.serviceLabel ? <CardSubtitle>{service.serviceLabel}</CardSubtitle> : null}
                        Service Rating: {service.serviceRating ? <CardSubtitle>{service.serviceRating}</CardSubtitle> : null}
                        Service Description: <CardText>{service.serviceDescription}</CardText>
                    </CardBody>
                    </Link>
                </Card> 
                                   
            }                    
                
            </FadeTransform>

            </div>
        )
    }

}