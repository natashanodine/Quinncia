import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Photos } from './photos';
import { Comments } from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback }  from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            photos: Photos,
            comments: Comments,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}
