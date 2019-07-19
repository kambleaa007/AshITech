import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchServices } from './../../redux/ActionCreators';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col, Grid } from 'reactstrap';
import { FadeTransform } from 'react-animation-components';
import { Loading } from './../LoadingComponent';

const mapStateToProps = state => {
    return {
        services: state.services
    };
};

const mapDispatchToProps = (dispatch) => ({    
    fetchServices: () => { dispatch(fetchServices()) }    
});

class Service extends Component{

    componentDidMount(){
        this.props.fetchServices();
    }

    render(){
        
        const service = this.props.services.services.map((i)=>{
            return(                
            <Col sm="3">                        
                <RenderService service={i} isLoading={this.props.services.isLoading} errMess={this.props.services.errMess} />
            </Col>   
            );                    
        });        
        
        
        return(
            <div className="container">
                <div >services works</div>
                <Row>{ service }</Row>
            </div>
        );
    }

}


function RenderService({service, isLoading, errMess}){
    if(isLoading){return <Loading />;}
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else{
        return(
            <div>
                <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>           

            {
            service != null &&   
                   
                <Card body outline color="secondary">
                    <p>Service Number: </p>{service.id}
                    <CardImg width="100px" src={service.serviceImage} alt={service.serviceName} />
                    <CardBody>
                        Service Name: <CardTitle>{service.serviceName}</CardTitle>
                        Service Category: {service.serviceCategory ? <CardSubtitle>{service.serviceCategory}</CardSubtitle> : null}
                        Service Label: {service.serviceLabel ? <CardSubtitle>{service.serviceLabel}</CardSubtitle> : null}
                        Service Rating: {service.serviceRating ? <CardSubtitle>{service.serviceRating}</CardSubtitle> : null}
                        Service Description: <CardText>{service.serviceDescription}</CardText>
                    </CardBody>
                </Card> 
                                   
            }                    
                
            </FadeTransform>
            </div>
        )
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Service);    