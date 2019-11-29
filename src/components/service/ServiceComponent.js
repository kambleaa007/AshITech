import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { fetchServices } from './../../redux/ActionCreators';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Row, Col, Grid, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';
import { Loading } from './../LoadingComponent';
import { ModalC } from './Modal';
import { ServiceDet } from './ServiceDetails';
import { RenderService } from './RenderService';


const mapStateToProps = state => {
    return {
        services: state.services
    };
};

const mapDispatchToProps = (dispatch) => ({    
    fetchServices: () => { dispatch(fetchServices()) }    
});



export class Service extends Component{

    componentDidMount(){
        //this.props.fetchServices();
    }

    render(){

        const service = this.props.services.services.map((i)=>{
            return(                
            <Col sm="3" key={i.id}>                        
                <RenderService service={i} isLoading={this.props.services.isLoading} errMess={this.props.services.errMess} />
            </Col>   
            );                    
        });        
        
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Service</BreadcrumbItem>
                    </Breadcrumb>

                    {/* 
                        <div >services works</div>                    
                    */}
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>

                    <ModalC buttonLabel = "Window Click" className="modal-90w"/>

                </div>
                
                <Row>{ service }</Row>

                    {/* 
                    <Route path={`${this.props.match.path}/:serviceId`} component={()=><ServiceDet services={ this.props.services } />} />
                    <Route path={`${this.props.match.path}/inService`} component={()=><div>Loaded in Service !!!</div>} /> 
                    <Route path={`${this.props.match.path}/:serviceId`} component={()=><ServiceDet services={ this.props.services } />} /> 
                    */}

                   
                    
            </div>
        );
    }

}







export default connect(mapStateToProps, mapDispatchToProps)(Service);    




