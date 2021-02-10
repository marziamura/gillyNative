import { createStore } from "redux";
import rootReducer from './reducers';

const myStore = () => createStore(rootReducer);
console.log("Store ", myStore);
export default myStore;