
import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    // Putting  '?' after the properties, to make that properties optional
    label?: string;
    options: any;
}

// Make sure the function first letter in Uppercase, as to follow strict react Component PascalCase. eg. MyTextInput
export default function MySelectInput(props: Props) {
    //'helpers' allow us to manually sets values & touch status of our input components
    const [field, meta, helpers] = useField(props.name);

    return (
        // this ' !! ' will make the object after it, become a boolean. means if the statement is true, then return true, vice versa
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select 
                clearable
                options={props.options}
                value={field.value || null}
                // e for event, d for data
                onChange={(e, d) => helpers.setValue(d.value)}
                // we need to configure this, to see if the component is being touched or not
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {/* ternary, if true then pass label else pass null */}
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}