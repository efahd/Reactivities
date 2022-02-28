import { makeAutoObservable, runInAction } from "mobx";
import agents from "../api/agent";
import { Activity } from "../models/activity";

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

    //reduce function has an initial value, hence need to use the {} bracket and specify type of key inside them.
    
    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                // string date will represent as key for each of the objects.
                // inside the [object] bracket are the object properties access.
                // single line ternary code. compare1 = compare2 ? [if match] : [if not match]
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    // using arrow function here automatically bind this function in class action
    loadActivities = async () => {
        this.loadingInitial = true;

        try {
            //getting our activities and pass it into a list
            const activities = await agents.activities.list();

            //function as parameter
            //updating states
            activities.forEach(activity => {
                this.setActivity(activity);
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

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        // if we have the activity from activityRegistry, return selectedActivity

        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agents.activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })                
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    //return the activity id or return undefined.
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    //set activity date
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agents.activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
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
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
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
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agents.activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }


}