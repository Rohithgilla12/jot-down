import { Auth } from "aws-amplify";
import { atom } from "jotai";

export const authenticatedAtom = atom<boolean>(false);
export const showConfirmationAtom = atom<boolean>(false);

export const signUp = async (email: string, password: string) => {
  try {
    await Auth.signIn(email, password);
  } catch (e) {}
};
