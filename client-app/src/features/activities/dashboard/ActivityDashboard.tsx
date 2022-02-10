import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {

    //destructuring the object from store
    const { activityStore } = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    
    /* 
      - use anonymous functions '()'
      - But if we use 'useEffect' as such, it'll undergo infinite loop. Re-render gonna happen.
      - add array '[]' after 'useEffects()' this is to ensure useEffects() only runs once.
      - check to see if activity registry from Map()  size NOT 0
    */
    useEffect(() => {
        if(activityRegistry.size <= 1 ) loadActivities();
    }, [activityRegistry.size, loadActivities])


    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )

})