import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  email: '',
  saveEmail: noop,
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})

AuthContext.displayName = 'AuthContext';
