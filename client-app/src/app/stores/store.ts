import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

// createContext() must be imported from 'React'
export const StoreContext = createContext(store);

//create simple react hooks, return StoreContext
export function useStore() {
    return useContext(StoreContext);
}

