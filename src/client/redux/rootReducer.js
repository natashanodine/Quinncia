import { combineReducers } from 'redux';
import { Photos } from './photos';
import { Comments } from './comments';
//import { createForms } from 'react-redux-form';


export default combineReducers({
    photos: Photos,
    comments: Comments,
            /*...createForms({
                feedback: InitialFeedback
				
	
})*/
});
