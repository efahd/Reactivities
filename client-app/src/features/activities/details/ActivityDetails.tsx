import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer( function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity : activity, loadActivity, loadingInitial} = activityStore;
    // id is declared but do not exist on type {}. hence add type information like this: <{id: string}> 
    const {id} = useParams<{id : string}>();

    //add dependicies [id, loadActivity]
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    //check if there is activity and not undefined else, return loading component from this.
    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Card fluid>
            {/*
                - using backticks `` allow us to directly adds JavaScript Properties inside the strings.
            */}
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span >{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={'2'}>
                    <Button as={Link} to={`/manage/${activity.id}`}  basic color="blue" content='Edit' />
                    <Button as={Link} to='/activities' basic color="grey" content='Cancel' />                    
                </Button.Group>
            </Card.Content>
        </Card>
    )
})