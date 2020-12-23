import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuth } from './hooks/auth.hook';
import { AuthContext } from "./context/AuthContext";
import Routes from './routes/frontendRoutes';

const App = () => {
  // const { email, saveEmail, token, login, logout, userId } = useAuth();
  // const isAuthenticated = !!token;

  return (
    // <AuthContext.Provider value={{
    //   email, token, login, logout, userId, isAuthenticated
    // }}>
      <BrowserRouter>
        {/* {isAuthenticated && <Header />} */}
        <Routes />
      </BrowserRouter>
    // </AuthContext.Provider>
  );
}

export default App;
