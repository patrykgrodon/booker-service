import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { RequestButton, SubmitErrorMessage } from "common/components";
import { useAuth } from "modules/auth/contexts/authContext";
import { UserDocValues } from "modules/auth/types";

import {
  maxLengthValidator,
  minLengthValidator,
  validationMessages,
} from "common/utils/validationPatterns";
import FormContainer from "../FormContainer";
import { doc } from "firebase/firestore";
import { db } from "firebase-config";

type NoUserDataFormProps = {
  email: string;
  userId: string;
};

const NoUserDataForm = ({ email, userId }: NoUserDataFormProps) => {
  const defaultValues: UserDocValues = {
    email,
    companyName: "",
    city: "",
    phoneNumber: "",
    street: "",
    streetNumber: "",
  };
  const {
    handleSubmit,
    register: registerField,
    formState: { errors },
  } = useForm<UserDocValues>({ defaultValues });
  const { refetchUser, saveUserDoc } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSaveUserData = async (formValues: UserDocValues) => {
    setError("");
    setIsLoading(true);
    try {
      await saveUserDoc(doc(db, "users", userId), formValues);
      refetchUser();
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit(handleSaveUserData)} title="">
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          {...registerField("companyName", {
            required: validationMessages.required,
            minLength: minLengthValidator(3),
            maxLength: maxLengthValidator(100),
          })}
          size="small"
          label="Company name"
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          fullWidth
        />

        <TextField
          {...registerField("phoneNumber", {
            required: validationMessages.required,
          })}
          size="small"
          label="Phone number"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          fullWidth
        />
        <TextField
          {...registerField("city", {
            required: validationMessages.required,
          })}
          size="small"
          label="City"
          error={!!errors.city}
          helperText={errors.city?.message}
          fullWidth
        />
        <TextField
          {...registerField("street", {
            required: validationMessages.required,
          })}
          size="small"
          label="Street"
          error={!!errors.street}
          helperText={errors.street?.message}
          fullWidth
        />
        <TextField
          {...registerField("streetNumber", {
            required: validationMessages.required,
          })}
          size="small"
          label="Street number"
          error={!!errors.streetNumber}
          helperText={errors.streetNumber?.message}
          fullWidth
        />
      </Box>
      {error ? <SubmitErrorMessage error={error} /> : null}
      <RequestButton type="submit" isLoading={isLoading}>
        Save
      </RequestButton>
    </FormContainer>
  );
};

export default NoUserDataForm;
