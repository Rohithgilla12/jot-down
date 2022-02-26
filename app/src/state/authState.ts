import { Auth } from "aws-amplify";
import { atom } from "jotai";

export const authenticatedAtom = atom<boolean>(false);
export const showConfirmationAtom = atom<boolean>(false);
export const signUpEmailAtom = atom<string>("");

export const signUp = async (email: string, password: string) => {
  //jotai set signUpEmailAtom with email
  atom(
    (get) => get(signUpEmailAtom),
    (_, set, __) => {
      set(signUpEmailAtom, email);
    }
  );
  try {
    await Auth.signIn(email, password);
  } catch (e) {}
};

export const confirmCode = async (email: string, code: string) => {
  try {
    await Auth.confirmSignUp(email, code);
  } catch (e) {}
};
