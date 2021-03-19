import { createStore, applyMiddleware, compose } from "redux";
import modules from "./modules";
import ReduxThunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = createLogger();

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(ReduxThunk))
    : composeWithDevTools(applyMiddleware(ReduxThunk, logger));

export default function configureStore() {
  const store = createStore(modules, enhancer);
  return store;
}
