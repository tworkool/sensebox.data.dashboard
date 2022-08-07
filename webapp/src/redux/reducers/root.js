import { combineReducers } from "redux";
import { appStateInit, appStateReducer } from "./app_state";

const rootInit = {
  appState: appStateInit,
};

const rootReducer = combineReducers({
  appState: appStateReducer,
});

export { rootInit, rootReducer };
