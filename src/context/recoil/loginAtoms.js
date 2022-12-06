import { atom } from "recoil";

export const loggedInState = atom({
    key: 'AuthState',
    default: false
  });
  
export const tokenState = atom({
    key: 'TokenState',
    default: ''
  });