import React from "react";
import { Message } from "semantic-ui-react";

interface Props {
    errors: string[] | null;
}
export default function validationErrors({errors}: Props) {
    return (
        // Use message component from semantic UI
        // Check to see if we got errors, {errors && ()}
        // key={i}, where i is an index of the object that we're looping
        // {err} is to display error from the error.item
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err: any, i) => (
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}