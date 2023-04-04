import React from 'react'
import { logininputList } from './inputlist';
import useFormInput from '../../hooks/useFormInput'
import { Input } from '../FormSecend/Input';

function FormThird1() {
  const [formState, setFormState,handleInputChange] = useFormInput();
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormState({})
    alert(JSON.stringify(formState))
    
  };  

  return (
    <form onSubmit={handleSubmit}>
      {logininputList.map((input, index) => (
          <Input
            key={index}
            label={input.label}
            inputProps={{
              type: input.type,
              name: input.name,
              value: formState[input.name] || '',
              onChange: handleInputChange,
            }}
          />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormThird1;