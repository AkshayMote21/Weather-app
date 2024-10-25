import { createContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "SEARCH":
      return {...state, city: action.payload}
    default:
      return state
    }
}
  
const initialState = { city : null };
export const AppContext = createContext();

  function MyContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider> 
    );
  }
  export default MyContextProvider;