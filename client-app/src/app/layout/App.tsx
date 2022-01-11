import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  /* 
    - adding initial states
    - adding union type ' | ' means, the intial states can be either Activity or Undefined
  */
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  /*
      - use anonymous functions '()'
      - But if we use 'useEffect' as such, it'll undergo infinite loop. Re-render gonna happen.
      - add array '[]' after 'useEffects()' this is to ensure useEffects() only runs once.
  */
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(Response => {
      setActivities(Response.data);
    })
  }, [])

  function handleSelectActivity(id: String) {
    /* 
        x on the left side is a variable that will hold the individial activity that make up the activity array.
        using ' === ' which means the value only true if both equal value and equal type.
    */
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  /*
      Using ternary Operator ' ? ' 
      If id is populated then, use handleSelectACtivity(id) to pass the id, if not then, handleCancelSelectActivity() will execute and return undefined.
  */
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  
  function handleFormClose() {
    setEditMode(false);
  }

  // Handling Submission of the form and display it
  function handleCreateOrEditActivity(activity: Activity){
    /*
      - Check the presence of activity.id and if it's true then, update setActivities().
      - ' ... ' is a spread operator and filter if x.id not equal to activity.id then, newly updated activities. if no activity.id then, create new activity using 'uuid' modules.
    */
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    /*
        - this looks like html, but in fact this is jsx.
        - use 'any' to get out of typescript restriction.      
        - When Adding looping something in Apps.tsx or react, make sure to give element 'key' in each tags
        - otherwise react wont tell the difference between the elements that its looping. 
        - We need <Fragment> or <> or <div> .Because we need to allow return multiple element inside react component.
    */
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
