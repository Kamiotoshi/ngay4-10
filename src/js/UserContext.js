// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('userName');
//     return storedUser ? { name: storedUser } : null;
//   });

//   const login = (userName) => {
//     localStorage.setItem('userName', userName);
//     setUser({ name: userName });
//   };

//   const logout = () => {
//     localStorage.removeItem('userName');
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
