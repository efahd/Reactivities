import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({activities, selectActivity, deleteActivity}:Props) {
    return (
        <Segment>
            <Item.Group divided>                
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            {/* 
                                - Use as='a' Use to form a link for the header title.
                            */}
                            <Item.Header as={'a'}>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/*
                                    when using onclick function, it will execute as soon as the component render finished.
                                    Use this ' () => ' function with no parameters, this way it won't execute immediately as the component renders,
                                    as it will wait till it is clicked.
                                */}
                                <Button onClick={() => selectActivity(activity.id)} floated="right" content="View" color="blue" />
                                <Button onClick={() => deleteActivity(activity.id)} floated="right" content="Delete" color="red" />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )    
}