import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted By Efahd</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" /> {activity.date}     
                    <Icon name="marker" /> {activity.venue}
                </span>
            </Segment>
            {/* secondary props inside, means the CSS for it will be slightly different than the default Segment CSS*/}
            <Segment secondary>
                Attendees go here
            </Segment>
            {/* clearing props inside, means to clear any previous float which mess the styling. */}
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`activities/${activity.id}`}
                    color='teal'
                    floated="right"
                    content="View"
                />
            </Segment>
        </Segment.Group>
    )
}