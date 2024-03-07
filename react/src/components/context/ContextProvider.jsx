import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { message } from "antd";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    logout: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState("");
    const [sessionTimeout, setSessionTimeout] = useState(null);

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

            resetSessionTimeout();
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            clearTimeout(sessionTimeout);
        }
    };

    const resetSessionTimeout = () => {
        clearTimeout(sessionTimeout);
        const timeout = setTimeout(() => {
            logout();

            message.error("Session expired. Please login again.");
        }, 10 * 60 * 1000);
        setSessionTimeout(timeout);
    };

    const logout = () => {
        setUser({});
        setToken(null);
    };

    useEffect(() => {
        resetSessionTimeout();

        return () => clearTimeout(sessionTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
                logout,
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
``;
