import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PhotoDetail from './PhotoDetailComponent';
import { connect } from 'react-redux';
import { postFeedback, postComment, fetchPhotos, fetchComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return{
        photos:state.photos,
        comments:state.comments
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (id, rating, author, comment) => dispatch(postComment(id, rating, author, comment)),
    fetchPhotos: () => {dispatch(fetchPhotos())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments())
});


class Main extends Component {
    
    componentDidMount(){
        this.props.fetchPhotos();
        this.props.fetchComments();
    }


  render() {

      const PhotoWithId = ({match}) => {
          return(
              <PhotoDetail photo={this.props.photos.photos.filter((photo) => photo.id === parseInt(match.params.id,10))[0]}
                  isLoading={this.props.photos.isLoading}
                  errMess={this.props.photos.errMess}
                  comments={this.props.comments.comments.filter((comment) => comment.id === parseInt(match.params.id,10))}
                  commentsErrMess={this.props.comments.errMess}
                  postComment={this.props.postComment} />
          );
      }

    return (
      <div>
        <Header />
        <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch location={this.props.location} >
                    <Route exact path="/photo" component={() => <Menu photos={this.props.photos} /> } />
                    <Route path="/photo/:id" component={PhotoWithId} />
                    <Redirect to="/photo" />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
