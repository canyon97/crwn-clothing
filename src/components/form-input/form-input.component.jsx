import { FormLabelInput, Input, Group } from "./form-input.styles.jsx";

// We explicitly define label, for value, required
// etc we just pass additional props that are defined
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && 
      <FormLabelInput 
        shrink={otherProps.value.length}
      >{label}
      </FormLabelInput>}
    </Group>
  );
};

export default FormInput;
