import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { RequestButton } from "common/components";
import { ForgotPasswordFormValues } from "modules/auth/types";
import {
  validationMessages,
  emailValidator,
} from "common/utils/validationPatterns";
import FormContainer from "./FormContainer";
import ReturnToLoginLink from "./ReturnToLoginLink";

const defaultValues: ForgotPasswordFormValues = {
  email: "",
};

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({ defaultValues });

  const submitRemindPassword = () => {
    // To do
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(submitRemindPassword)}
      title={"Remind password"}
    >
      <TextField
        {...register("email", {
          required: validationMessages.required,
          pattern: emailValidator,
        })}
        type="email"
        size="small"
        label="E-mail"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RequestButton type="submit">Send</RequestButton>
      <ReturnToLoginLink />
    </FormContainer>
  );
};

export default ForgotPasswordForm;
