import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; // manually type this import to initiate Yup method
import MyTextInput from "../../../app/common/form/myTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { CategoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

export default observer(function ActivityForm() {

    const history = useHistory();
    const { activityStore } = useStore();

    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    // id is declared but do not exist on type {}. hence add type information like this: <{id: string}> 
    const { id } = useParams<{ id: string }>();

    //Populate intialState with empty field and store inside component state which is UseState()
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        // this date variables can be nullable. to avoid null warnings
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect(() => {
        //putting an exclamation mark '!' to tell typescript, the variables will not be undefined!
        // add dependencies, means only execute the code if the parameter: id, loadActivity has changed. else only execute the if statement once.
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);


    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }



    //check to see if we're loading
    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color="teal" />
            {/* Formik enableReinitialize, would reset the form when the new intial values changes. */}
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {/* {({})} , the additional {} inside {()} to destructure the properties that we're interested in getting from Formik */}
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder="title" />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={CategoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color="teal" />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated="right" 
                            positive type='submit' 
                            content='submit' 
                        />
                        <Button as={Link} to='/activities' floated="right" type='button' content='cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})