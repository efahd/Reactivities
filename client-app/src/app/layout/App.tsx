import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/homepage';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


// this looks like html, but in fact this is jsx.
// When Adding looping something in Apps.tsx or react, make sure to give element 'key' in each tags
// otherwise react wont tell the difference between the elements that its looping. 
// We need <Fragment> or <> or <div> .Because we need to allow return multiple element inside react component.
// using 'exact' to appear ONLY ON that page.
// adding '/id' in path acts as a placeholder, which will replace to the ACTUAL activity id.
// if the route component highlighted in yellow, means those do not OBSERVED the activity store.
// if the route component highlighted in blue, means those I added observer(), to observe the activity store.


function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      {/* this line path={'/(.+)'} means, that any route that match '/' OR '+' it will match this route method  */}
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
