import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
    user: null,
    isAuthenticated: false,
}

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

    const login = (email, password) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({ type: 'login', payload: FAKE_USER })
        }
    }

    const logout = () => {
        dispatch({ type: 'logout' })
    }

    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout
    }}>{children}</AuthContext.Provider>
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'logout':
            return { ...state, user: null, isAuthenticated: false };
        default: throw new Error('Unknown action');
    }
}

const useAuth = () => {

    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("authcontext was used outisde the provider")

        return context;
}

export { AuthProvider, useAuth };