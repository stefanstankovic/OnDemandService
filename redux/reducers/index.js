import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {alert} from './alert.reducer';
import {location} from './location.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  location,
});

export default rootReducer;
