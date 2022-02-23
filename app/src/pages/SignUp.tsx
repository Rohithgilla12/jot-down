import { useAtom } from "jotai";
import React from "react";
import { ConfirmationForm } from "../components/ConfirmationForm";
import SignUpForm from "../components/SignUpForm";
import { showConfirmationAtom } from "../state/authState";

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = ({}) => {
  const [showConfirmation, _] = useAtom(showConfirmationAtom);

  return showConfirmation ? <ConfirmationForm /> : <SignUpForm />;
};
