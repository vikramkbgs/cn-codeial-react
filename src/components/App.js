import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';

import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }
        return <Navigate to="/login" />;
      }}
    />
  );
}

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  console.log('auth', auth);
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Signup />}></Route>
          <PrivateRoute  exact path="/settings" element={<Settings />}></PrivateRoute>
          <PrivateRoute  exact path="/user/:userId" element={<UserProfile />}></PrivateRoute>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
