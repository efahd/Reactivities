import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

export default observer( function ActivityForm() {

    const history = useHistory();
    const {activityStore} = useStore();

    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    // id is declared but do not exist on type {}. hence add type information like this: <{id: string}> 
    const {id} = useParams<{id: string}>();

    //Populate intialState with empty field and store inside component state which is UseState()
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        //putting an exclamation mark '!' to tell typescript, the variables will not be undefined!
        // add dependencies, means only execute the code if the parameter: id, loadActivity has changed. else only execute the if statement once.
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`) )
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    // Handle the changes in the input field and assign both html input OR Text area element.
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        //match the two properties inside the input element
        const {value, name} = event.target;
        /*
            - use of ... For spreading the existing properties in the activity.
            - use [] For exact matching properties name.
        */
        setActivity({...activity, [name]: value})
    }

    //check to see if we're loading
    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={loading} floated="right" positive type='submit' content='submit' />
                <Button as={Link} to='/activities' floated="right" type='button' content='cancel' />
            </Form>
        </Segment>
    )
})