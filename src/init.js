import { applyMiddleware, createStore, combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import thunk from 'redux-thunk'

// Reducers
import { authReducer } from 'modules/auth';
import { firebaseReducer } from 'modules/firebase';

export const history = createBrowserHistory();

const reducer = combineReducers({
	auth: authReducer,
	firebase: firebaseReducer,
	routing: routeReducer
});

export default (initialState) => {
	const history = createBrowserHistory();
	const rrr = syncHistory(history);

	const store = applyMiddleware(
		rrr, thunk
	)(createStore)(reducer, initialState);

	// Required for replaying actions from devtools to work
	rrr.listenForReplays(store);

	return store;
};