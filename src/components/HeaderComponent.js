import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { postLogin } from './../redux/ActionCreators';

import { connect } from 'react-redux';
import { LOGIN_SUCCESS } from '../redux/actionTypes';
import { Loading } from './LoadingComponent';


const mapStateToProps = state => {
    return {        
        login: state.login
    };
};

const mapDispatchToProps = (dispatch) => ({    
    postLogin: (email, password) => { dispatch(postLogin(email, password)) }    
});

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            loginMsg: "Not Logged In"
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount(){
        if(this.props.login.successMess != null){
            localStorage.setItem('token',this.props.login.successMess);
            alert(localStorage.getItem('token'));
        }
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleLogin(evt){
        this.toggleModal();

        this.props.postLogin(this.username.value, this.password.value);        
        
        
        // alert(this.username.value + " " + this.password.value + " sucess: "+ this.props.login.isLoading + " fail: "+ this.props.login.errMess);

        evt.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="30" widtg="41" alt="Ristorance Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar >

                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span> About us
                                </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Menu
                                </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact us
                                </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/service">
                                        <span className="fa fa-briefcase fa-lg"></span> Services
                                </NavLink>
                                </NavItem>

                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg">Login</span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ash<b><i>ITechnologies</i></b></h1>
                                <h4>आईटी टेक्नोलॉजीज Con Fusion`e</h4>
                                <p>We take inspiration from the world's biggest programmers cum jobseekers</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Login</ModalHeader>
                    
                    <ModalBody>
                        { this.props.login.isLoading ? 
                            <div>
                                <Loading />
                            </div>       
                            :  
                            <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username" innerRef={(input) => this.username = input } />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password" innerRef={(input) => this.password = input } />
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input } />
                                        Remember me
                                    </Label>
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Login</Button>
                                {this.props.login.errMess != null && <p key="1">{this.props.login.errMess}</p>}
                                {this.props.login.successMess != null && <p key="2">{this.props.login.successMess}</p>}
                            </Form>                   
                        }                        
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);

