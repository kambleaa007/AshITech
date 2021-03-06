import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Collapse,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { postLogin, fetchLogin } from "./../redux/ActionCreators";

import { connect } from "react-redux";
import { LOGIN_SUCCESS } from "../redux/actionTypes";
import { Loading } from "./LoadingComponent";
import LoginHook from "./hook/LoginHook";

const mapStateToProps = (state) => {
  return {
    login: state.login,
    logins: state.logins,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postLogin: (email, password) => {
    dispatch(postLogin(email, password));
  },
  fetchLogin: () => {
    dispatch(fetchLogin());
  },
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      loginMsg: "Not Logged In",
      userName: "",
      passWord: "",
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.props.fetchLogin();
    //successMess  errMess
    if (this.props.login.successMess != null) {
      localStorage.setItem("token", this.props.login.successMess);
      alert(localStorage.getItem("token"));
    }
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  async handleLogin(evt) {
    //this.toggleModal();

    this.setState({
      userName: this.username.value,
      passWord: this.password.value,
    });

    this.props.postLogin(this.username.value, this.password.value);

    //let isLogin = false;

    // const l = this.props.logins.filter(
    //   (l) =>
    //     l.userName === this.username.value && l.passWord === this.password.value
    // )[0];
    // this.setState({ loginMsg: l });

    // alert(
    //   this.username.value +
    //     " " +
    //     this.password.value +
    //     " sucess: " +
    //     this.props.login.isLoading +
    //     " fail: " +
    //     this.props.login.errMess
    // );

    evt.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="https://raw.githubusercontent.com/kambleaa007/AshITech/master/json-server/assets/images/Logo/logo.JPG"
                height="30"
                widtg="41"
                alt="Completo qué `Confusióne"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
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
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    us
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
                <h1>
                  Ash
                  <b>
                    <i>ITechnologies</i>
                  </b>
                </h1>
                <h4>आईटी टेक्नोलॉजीज Con Fusion`e</h4>
                <p>
                  We take inspiration from the world's biggest programmers cum
                  jobseekers
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader> Login</ModalHeader>

          <ModalBody>
            {this.props.login.isLoading ? (
              <div>
                <Loading />
              </div>
            ) : (
              <Form onSubmit={this.handleLogin}>
                <FormGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    innerRef={(input) => (this.username = input)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    innerRef={(input) => (this.password = input)}
                  />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="remember"
                      innerRef={(input) => (this.remember = input)}
                    />
                    Remember me
                  </Label>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">
                  Login
                </Button>
                errMess: {this.props.login.errMess}
                successMess: {this.props.login.successMess}
                {this.props.login.errMess != null && (
                  <p key="1">Error Message{this.props.login.errMess}</p>
                )}
                {this.props.login.successMess != null && (
                  <p key="2">Success Message{this.props.login.successMess}</p>
                )}
                {this.props.loginMsg && <p key="3">{this.props.loginMsg}</p>}
                UN: {this.state.userName}
                PW: {this.state.passWord}
              </Form>
            )}
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
