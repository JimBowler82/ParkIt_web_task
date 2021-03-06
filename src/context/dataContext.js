import React, { createContext, useContext, useReducer } from "react";

const DataContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "new_query":
      return {
        topic: action.payload.topic,
        data: [...action.payload.data],
      };
    case "scroll":
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
      };
    default:
      return state;
  }
}

const initialState = {
  topic: "All",
  data: [],
};

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ photoData: state, setPhotoData: dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
