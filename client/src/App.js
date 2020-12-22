import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuth } from './hooks/auth.hook';
import { AuthContext } from "./context/AuthContext";
import { useRoutes } from './routes/frontendRoutes';
import Header from "./modules/header/Header";

const App = () => {
  const { email, saveEmail, token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      email, token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        {isAuthenticated && <Header email={email} logout={logout} />}
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
