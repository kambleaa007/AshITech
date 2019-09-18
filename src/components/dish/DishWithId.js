

export const DishWithId = ({ match }) => {
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