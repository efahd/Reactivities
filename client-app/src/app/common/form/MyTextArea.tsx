import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    // Putting  '?' after the properties, to make that properties optional
    label?: string;
    rows: number;
}

// Make sure the function first letter in Uppercase, as to follow strict react Component PascalCase. eg. MyTextInput
export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        // this ' !! ' will make the object after it, become a boolean. means if the statement is true, then return true, vice versa
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {/* ternary, if true then pass label else pass null */}
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}