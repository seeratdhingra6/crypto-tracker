import { combineReducers } from 'redux';
import { dataReducer } from "./dataReducer";
import { userSelectionReducer } from "./userSelectionReducer";

const rootReducer = combineReducers({
    data: dataReducer,
    userSelection: userSelectionReducer
  });

  export default rootReducer;