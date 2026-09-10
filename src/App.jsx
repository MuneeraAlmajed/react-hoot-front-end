import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";

// Components
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import HootList from "./components/HootList/HootList";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";

// Context
import { UserContext } from "./contexts/UserContext";

// services
import * as hootService from "./services/hootService";

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

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

  const handleAddHoot = async (hootFormData) => {
  const newHoot = await hootService.create(hootFormData);
  setHoots([newHoot, ...hoots]);
  navigate('/hoots');
};

const handleDeleteHoot = async (hootId) => {
  await hootService.deleteHoot(hootId);
  setHoots(hoots.filter((hoot) => hoot._id !== hootId));
  navigate('/hoots');
};

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
            <Route path="/hoots/:hootId" element={<HootDetails handleDeleteHoot={handleDeleteHoot} />} />
            <Route path ='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot}/>}/>
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
