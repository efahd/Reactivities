
import React, { useState } from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import axios from 'axios';
import ValidationErrors from './validationErrors';

export default function TestErrors() {

    //configure the baseUrl to go and hit our API.
    const baseUrl = 'http://localhost:5000/api/'

    // Create local state for errors
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    // Gets an activity that's not a GUID
    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        // Use console.log(err), we're throwing back the modal state error as a single array, not a full error object
        // pass the error to display to the site
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {/* check to see if we have errors with &&  */}
            {/* use validationErrors from the file */}
            {errors &&
                <ValidationErrors errors={errors} />
            }
        </>
    )
}
