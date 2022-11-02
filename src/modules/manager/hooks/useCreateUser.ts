import {
  CustomerFormValues,
  ServiceProviderFormValues,
  UserType,
} from "common/types";
import { useAuth } from "modules/auth/contexts/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "routes";

const useCreateUser = (userType: UserType) => {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBack = () => navigate(Routes.Login);
  const submitHandler = async (
    formValues: CustomerFormValues | ServiceProviderFormValues
  ) => {
    setError("");
    setIsLoading(true);
    try {
      const { confirmPassword, ...restValues } = formValues;
      userType === "customer"
        ? await createUser(userType, restValues as CustomerFormValues)
        : await createUser(userType, restValues as ServiceProviderFormValues);
      navigate(Routes.Dashboard);
    } catch (err: any) {
      const errMsg = err.message.includes("email-already-in-use")
        ? "Email already in use"
        : err.message;
      setError(errMsg);
    }
    setIsLoading(false);
  };
  return { error, isLoading, handleBack, submitHandler };
};

export default useCreateUser;
