import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    // boolean, NOT Boolean. the word must be type correctly. lol
    submitting: boolean;
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {

    /*
        - Display the content 'activity' props inside the form if it is available.
        - Using ?? where if the activity on the left is null then the statement on the right will be used for the initial state.
    */
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
    
    /*
        Populate intialState and store inside component state which is UseState()
    */
    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
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

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                <Button loading={submitting} floated="right" positive type='submit' content='submit' />
                <Button onClick={closeForm} floated="right" type='button' content='cancel' />
            </Form>
        </Segment>
    )
}