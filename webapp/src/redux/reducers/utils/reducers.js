const actionReducer = (state, action) => {
  const isRequest = action.type.toLowerCase().includes("requested");

  if (action.payload && !isRequest) {
    // normale Aktionen verändern den Zustand
    return { ...state, ...action.payload };
  } else {
    // Aktionen, die als API Abfragen mit dem Suffix "requested" gekennzeichnet sind, verändern den Zustand nicht
    return state;
  }
};

export { actionReducer };
