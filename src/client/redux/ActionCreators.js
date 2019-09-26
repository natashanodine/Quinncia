import  * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (photoId, rating, author, comment) => (dispatch) => {

    const newComment = {
        photoId: photoId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {

    const newFeedback = {
        firstname:firstname,
        lastname:lastname,
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message
    };
    newFeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback',{
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response =>{
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response ;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => {alert('Thanks For your Feedback! ' + JSON.stringify(response))})
    .catch(error =>  { console.log('post Feedback', error.message); alert('Your Feedback could not be posted\nError: '+error.message); });
}


export const fetchPhotos = () => (dispatch) => {
    dispatch(photosLoading(true));

    return fetch(baseUrl + 'photos')
        .then(response => {
            if(response.ok) {
                return response;
            }else{
                var error = new Error('Error' + response.status +': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json() )
        .then(photos => dispatch(addPhotos(photos)))
        .catch(error => dispatch(photosFailed(error.message)));
}

export const photosLoading = () => ({
    type:ActionTypes.PHOTOS_LOADING
});

export const photosFailed = (errmess) => ({
    type:ActionTypes.PHOTOS_FAILED,
    payload:errmess
});

export const addPhotos = (photos) => ({
    type:ActionTypes.ADD_PHOTOS,
    payload:photos
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok) {
                return response;
            }else{
                var error = new Error('Error' + response.status +': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json() )
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errmess
});

export const addComments = (comments) => ({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});
