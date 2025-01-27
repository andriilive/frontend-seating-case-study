'use client';

import {createContext, type PropsWithChildren, useContext, useReducer} from "react";

export type User = {
  email: string,
  firstName: string,
  lastName: string
}

type State = {
  isLoggedIn: boolean,
  user: User | null
}

type Action = {
  type: "SET_USER", user: User
} | {
  type: "LOGOUT"
};

// @ts-expect-error - TODO: fix this
const AuthContext = createContext<{
  isLoggedIn: boolean,
  user: User | null,
  storeUser: (user: User) => void,
  logout: () => void
}>();

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return {...state, isLoggedIn: true, user: action.user};
    case "LOGOUT":
      return {...state, isLoggedIn: false, user: null};
    default:
      return state;
  }
};

const AuthProvider = ({children}: PropsWithChildren) => {
  const user = localStorage.getItem("user");
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: !!user, user: user ? JSON.parse(user) : null
  });

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({type: "LOGOUT"});
  };

  const storeUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({type: "SET_USER", user});
  }

  return (
    <AuthContext.Provider value={{...state, logout, storeUser}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export {AuthProvider, useAuth};