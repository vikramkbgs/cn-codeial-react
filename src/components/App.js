
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';


import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';

function PrivateRoute(Component) {
  const auth = useAuth();
  return (
    <Route
      render={() => {
        if (auth.user) {
          return <Component/>;
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
          <Route exact path="/register" element={<Signup/>}></Route>
          <Route exact path="/Settings" element={<PrivateRoute Component={Settings}/>}></Route>
          <Route exact path="/user/:userid" element={<PrivateRoute Component={UserProfile}/>}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
