import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { usersApi, baseUrl } from "../constants/api";

const AppContext = createContext();

function ContextProvider({ children }) {
  const [mentors, setMentors] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Axios.get(usersApi).then((response) => setUserData(response.data));
  }, []);

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Axios.get(baseUrl);
        if (response.status === 200) {
          setMentors(response.data.record.mentors);
        } else throw new Error("Fetch failed with status " + response.status);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const context = {
    mentors,
    setMentors,
    userData,
    setUserData,
    loggedInUser,
    setLoggedInUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AppContext.Provider value={context}>{children}</AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContextProvider, AppContext };
