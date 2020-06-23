import {combineReducers} from 'redux';

import {user} from './user.reducer';
import {alert} from './alert.reducer';
import {location} from './location.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  location,
});

export default rootReducer;
