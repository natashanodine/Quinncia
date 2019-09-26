import  * as ActionTypes from './ActionTypes';


export const Photos = ( state = {
        isLoading : true,
        errMess : null,
        photos : []
    }, action ) => {
    switch(action.type){
        case  ActionTypes.ADD_PHOTOS:
            return {...state, isLoading:false, errMess:null, photos:action.payload};

        case  ActionTypes.PHOTOS_FAILED:
            return {...state, isLoading:false, errMess:action.payload, photos:[]};

        case  ActionTypes.PHOTOS_LOADING:
            return {...state, isLoading:true, errMess:null, photos:[]};

        default:
            return state;
    }
}
