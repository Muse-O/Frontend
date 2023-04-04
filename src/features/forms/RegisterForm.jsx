import React from "react";
import { registerInputList } from "./inputlist";
import { useFormInput } from "../../hooks/useFormInput";
import { Input } from "../../components/Input";
import { RegisterBtn } from "../../components/Buttons";
import { Flex } from "../../components/Flex";

function RegisterForm() {
  const [formState, setFormState, handleInputChange] = useFormInput();
  const handleSubmit = event => {
    event.preventDefault();
    setFormState({});
    alert(JSON.stringify(formState));
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} fd="column" gap="10">
      <RegisterBtn>로고 자리(메인으로 돌아감)</RegisterBtn>
      {registerInputList.map((input, index) => (
        <Input
          key={index}
          label={input.label}
          inputProps={{
            type: input.type,
            name: input.name,
            value: formState[input.name] || "",
            onChange: handleInputChange,
          }}
        />
      ))}
      <RegisterBtn type="submit">회원가입</RegisterBtn>
    </Flex>
  );
}

export default RegisterForm;
