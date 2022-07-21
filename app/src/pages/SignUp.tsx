import { ConfirmationForm } from "../components/ConfirmationForm";
import React from "react";
import SignUpForm from "../components/SignUpForm";
import { showConfirmationScreen } from "../state/authSlice";
import { useAppSelector } from "../state/store";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = ({}) => {
  const showConfirmation = useAppSelector(showConfirmationScreen);

  return showConfirmation ? <ConfirmationForm /> : <SignUpForm />;
};
