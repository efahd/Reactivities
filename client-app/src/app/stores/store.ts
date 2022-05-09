import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import commonStore from "./commonStore";

interface Store {
    activityStore: ActivityStore
    commonStore: commonStore;
}

// user ' , ' for additional lines 
export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new commonStore()
}

// createContext() must be imported from 'React'
export const StoreContext = createContext(store);

//create simple react hooks, return StoreContext
export function useStore() {
    return useContext(StoreContext);
}

