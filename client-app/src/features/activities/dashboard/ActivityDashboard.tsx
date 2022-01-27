import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    // this is a function (), hence return is required, which is the symbol ' => '
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: Boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity,
    editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting = {submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {/*
                    - using && For anything on the right statement will execute as long as the left statement is not null or undefined.
                    - Display the activity details if there's an activities in index[0] of activity Array.
                */}
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                        submitting = {submitting}
                    />}
            </Grid.Column>
        </Grid>
    )

}