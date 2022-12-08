import { atom } from "recoil";

export const loggedInState = atom({
    key: 'AuthState',
    default: false
  });
  
export const tokenState = atom({
    key: 'TokenState',
    default: ''
  });

export const userState = atom({
  key: 'UserState',
  default: {name: "New User"}
})

export const paramState = atom({
  key: 'ParamState',
  default: ""
})