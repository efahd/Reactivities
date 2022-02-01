import { makeAutoObservable, runInAction } from "mobx";
import agents from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    //bind title using command action.bound

    //if using: makeObservable then must specify the props
    //if using: makeAutoObservable then you don't have to specify the props
    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    // using arrow function here automatically bind this function in class action
    loadActivities = async () => {
        try {
            //getting our activities and pass it into a list
            const activities = await agents.activities.list();

            //function as parameter
            //updating states
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];

                this.activityRegistry.set(activity.id, activity);
            })
            //set loadingInitial observable to false
            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            //Any steps after await aren't in the same tick, so they require action wrapping. Here, we can leverage runInAction
            runInAction(() => {
                //set loadingInitial observable to false
                this.setLoadingInitial(false);
            })
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        /* 
            x on the left side is a variable that will hold the individial activity that make up the activity array.
            using ' === ' which means the value only true if both equal value and equal type.
        */
        // this.selectedActivity = this.activities.find(a => a.id === id);
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    /*
      Using ternary Operator ' ? ' 
      If id is populated then, use this.selectedActivity(id) function to pass the id, if not then, cancelSelectedActivity() will execute and return undefined.
    */
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity : Activity) => {
        this.loading = true;
        activity.id = uuid();
        try{
            await agents.activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    // Handling Submission of the form and display it
    /*
        - Check the presence of activity.id and if it's true then, update setActivities().
        
    */
    updateActivity = async (activity : Activity) => {
        this.loading = true;
        try{
            await agents.activities.update(activity);
            runInAction(() => {
                // ' ... ' is a spread operator and filter if a.id not equal to activity.id then, newly updated activities. if no activity.id then, create new activity using 'uuid' modules.
                // after filter the id, push this activity using spread operator which takes an array and create a new array.
                // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error){
            console.log(error);
            this.loading = false;
        }
    }

    deleteActivity = async (id : string) => {
        this.loading = true;
        try {
            await agents.activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}