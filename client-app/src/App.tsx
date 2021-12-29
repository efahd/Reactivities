import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

// import { ducks } from './demo';
// import DuckItem from './duckItem';

function App() {
  const [activities, setActivities] = useState([]);

  //use anonymous functions '()'
  //But if we use 'useEffect' as such, it'll undergo infinite loop. Re-render gonna happen.
  //add array '[]' after 'useEffects()' this is to ensure useEffects() only runs once.
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(Response => {
      console.log(Response);
      setActivities(Response.data);
    })
  }, [])

  return (
    // this looks like html, but in fact this is jsx
    <div>
      <Header as='h2' icon='users' content='reactivities' />
      <List>
        {/* use 'any' to get out of typescript restriction */}
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* {ducks.map(duck => (
          // When Adding looping something in Apps.tsx or react, make sure to give element 'key' in each tags
          // Otherwise react wont tell the difference between the elements that its looping. 
          // <div key={duck.name}></div>
          <DuckItem duck={duck} key={duck.name} />
        ))} */}
    </div>
  );
}

export default App;
