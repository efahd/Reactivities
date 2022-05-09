
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {ReactDatePickerProps} from 'react-datepicker'; // Manually type this import to initiate react-datepicker


// Make sure the function first letter in Uppercase, as to follow strict react Component PascalCase. eg. MyTextInput
// ReactDatePickerProps have way too many props, hence we should use 'Partial<type>' means everything that we dont use are optional.
export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    // Using ' ! ' after a variables, means to tell our component that we know that this variable will have a name properties. 
    const [field, meta, helpers] = useField(props.name!);

    return (
        // this ' !! ' will make the object after it, become a boolean. means if the statement is true, then return true, vice versa
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field}
                {...props}
                // Datepicker use Javascript Date Objects, hence new Date
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {/* ternary, if true then pass label else pass null */}
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}