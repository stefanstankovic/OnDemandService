import {combineReducers} from 'redux';

import {user} from './user.reducer';
import {alert} from './alert.reducer';
import {location} from './location.reducer';
import {workers} from './workers.reducer';
import {userDetails} from './userDetails.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  location,
  workers,
  userDetails,
});

export default rootReducer;
