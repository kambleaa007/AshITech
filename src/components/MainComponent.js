import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Service from './service/ServiceComponent';
import { ServiceDet } from './service/ServiceDetails'

import { Switch, Route, Redirect, withRouter, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback, fetchServices } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        services: state.services
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    fetchServices: () => { dispatch(fetchServices()) }   
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchServices();
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        }

        const ServiceWithId = ({ match }) => {
            return(
                <ServiceDet
                    service={this.props.services.services.filter(s => s.id === parseInt(match.params.serviceId, 10))[0] }
                    isLoading={this.props.services.isLoading}
                    errMess={this.props.services.errMess}
                    id={parseInt(match.params.serviceId, 10)}
                    services={this.props.services.services}
                />
            );
        }

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <BrowserRouter  >
                        <Switch>
                            <Route path="/home" component={HomePage} />
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Route exact path="/aboutus" component={<About leaders={this.props.leaders} />} />
                            <Route exact path="/service" component={() => <Service />} />

                            <Route exact path="/service/:serviceId" component={ ServiceWithId } />
                            <Route exact path="/service/inService" component={()=>{<div>Loaded in Service !!!</div>}} />
                            
                            <Redirect to="/home" />
                        </Switch>
                        </BrowserRouter>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
