// import { createContext, useState, useContext } from "react";

//   const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const login = (email, password) => {
//         localStorage.setItem('email', email);
//         localStorage.setItem('password', password);
//         setIsLoggedIn(true);
//     };

//     const logout = () => {
//         localStorage.removeItem('email');
//         localStorage.removeItem('password');
//         setIsLoggedIn(false);
//     };

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export{AuthContext}