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
    console.log("signUp");
    await Auth.signUp(email, password);
  } catch (e) {
    console.log(e);
  }
};

export const confirmCode = async (email: string, code: string) => {
  try {
    await Auth.confirmSignUp(email, code);
  } catch (e) {
    console.error(e);
  }
};
