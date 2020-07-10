import {combineReducers} from 'redux';

import {user} from './user.reducer';
import {alert} from './alert.reducer';
import {location} from './location.reducer';
import {workers} from './workers.reducer';
import {userDetails} from './userDetails.reducer';
import {rank} from './rank.reducer';
import {notification} from './notifications.reducer';

const rootReducer = combineReducers({
  user,
  alert,
  location,
  workers,
  userDetails,
  rank,
  notification,
});

export default rootReducer;
