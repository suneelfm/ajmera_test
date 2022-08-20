const initiatStates = {
  data: {},
};

export const dataReducer = (states = initiatStates, actions) => {
  switch (actions?.type) {
    case "data": {
      return { ...states, data: actions?.data };
    }
    default:
      return states;
  }
};
