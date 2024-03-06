import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState("");

    const setNotification = (message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};