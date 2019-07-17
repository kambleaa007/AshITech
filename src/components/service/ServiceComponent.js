import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchServices } from './../../redux/ActionCreators';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
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
        return(
            <div className="container">
                <div>works</div>
                <div>{
                    this.props.services.services.map((i)=>{
                        return(<div><RenderService service={i} isLoading={this.props.services.isLoading} errMess={this.props.services.errMess} /></div>);
                    })
                
                }</div>
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
            <Card>
                {service.id}
                <CardImg src={service.serviceImage} alt={service.serviceName} />
                <CardBody>
                    <CardTitle>{service.serviceName}</CardTitle>
                    {service.serviceCategory ? <CardSubtitle>{service.serviceCategory}</CardSubtitle> : null}
                    {service.serviceLabel ? <CardSubtitle>{service.serviceLabel}</CardSubtitle> : null}
                    {service.serviceRating ? <CardSubtitle>{service.serviceRating}</CardSubtitle> : null}
                    <CardText>{service.serviceDescription}</CardText>
                </CardBody>
            </Card>                
            }
                    
                
            </FadeTransform>
            </div>
        )
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Service);    