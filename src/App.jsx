import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";

// Components
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import HootList from "./components/HootList/HootList";
import HootDetails from "./components/HootDetails/HootDetails";

// Context
import { UserContext } from "./contexts/UserContext";

// services
import * as hootService from "./services/hootService";

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    getAllHoots();

    async function getAllHoots() {
      try {
        const allHoots = await hootService.index();
        setHoots(allHoots);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />

        {user ? (
          <>
            <Route
              path="/hoots"
              element={<HootList hoots={hoots} setHoots={setHoots} />}
            />

            <Route path="/hoots/:hootId" element={<HootDetails />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
