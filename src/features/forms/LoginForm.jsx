import React from "react";
import { loginInputList } from "./inputlist";
import { useFormInput } from "../../hooks/useFormInput";
import { Input } from "../../components/Input";
import { Flex } from "../../components/Flex";
import { LoginBtn } from "../../components/Buttons";

function LoginForm() {
  const [formState, setFormState, handleInputChange] = useFormInput();
  const handleSubmit = event => {
    event.preventDefault();
    setFormState({});
    // alert(JSON.stringify(formState));
  };

  return (
    <Flex as="form" onSubmit={handleSubmit} fd="column" gap="10">
      {loginInputList.map((input, index) => (
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
      <LoginBtn type="submit">로그인</LoginBtn>
    </Flex>
  );
}

export default LoginForm;
