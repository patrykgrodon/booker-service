import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { RequestButton, SubmitErrorMessage } from "common/components";
import {
  emailValidator,
  validationMessages,
} from "common/utils/validationPatterns";
import { auth } from "firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { ForgotPasswordFormValues } from "modules/auth/types";
import { useState } from "react";
import FormContainer from "../FormContainer";
import ReturnToLoginLink from "../ReturnToLoginLink";

const defaultValues: ForgotPasswordFormValues = {
  email: "",
};

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({ defaultValues });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSentEmail, setHasSentEmail] = useState(false);

  const submitRemindPassword = async ({ email }: ForgotPasswordFormValues) => {
    setError("");
    setIsLoading(true);
    setHasSentEmail(false);
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}`,
        handleCodeInApp: false,
      });
      setHasSentEmail(true);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  if (hasSentEmail)
    return (
      <Box>
        <Typography variant="h6" sx={{ maxWidth: "100%" }} align="center">
          Email has been successfully sent! <br /> Check your email inbox.
        </Typography>

        <ReturnToLoginLink asButton fullWidth sx={{ mt: 2 }} />
      </Box>
    );

  return (
    <FormContainer
      onSubmit={handleSubmit(submitRemindPassword)}
      title="Reset password"
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
      {error ? <SubmitErrorMessage error={error} /> : null}
      <RequestButton type="submit" isLoading={isLoading}>
        Send
      </RequestButton>
      <ReturnToLoginLink />
    </FormContainer>
  );
};

export default ForgotPasswordForm;
