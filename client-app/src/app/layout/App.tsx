import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  //destructuring the object from store
  const {activityStore} = useStore();

  /* 
    - use anonymous functions '()'
    - But if we use 'useEffect' as such, it'll undergo infinite loop. Re-render gonna happen.
    - add array '[]' after 'useEffects()' this is to ensure useEffects() only runs once.
  */
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])


  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    /*
        - this looks like html, but in fact this is jsx.
        - use 'any' to get out of typescript restriction.      
        - When Adding looping something in Apps.tsx or react, make sure to give element 'key' in each tags
        - otherwise react wont tell the difference between the elements that its looping. 
        - We need <Fragment> or <> or <div> .Because we need to allow return multiple element inside react component.
    */
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>       
        <ActivityDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
