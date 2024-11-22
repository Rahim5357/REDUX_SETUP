// Reducer function generator that handles different actions based on ActionType
export const ReducerFunctions = (ActionType, initialState) => {
  return function (state = initialState, action) {
    // Clone the payload into 'data' (array or object based on the payload type)
    let data = Array.isArray(action?.payload)
      ? [...action?.payload] // If payload is an array, clone it
      : { ...action?.payload }; // If payload is an object, clone it

    // Switch case to handle different action types
    switch (action?.type) {
      // Action for requesting data (typically when API call starts)
      case ActionType.REQUEST:
        return {
          ...state, // Preserve the current state
          from: action?.payload?.from, // Optionally store the 'from' field from payload
          loading: true, // Set loading to true as we are awaiting the response
        };
      
      // Action when the data request is successful
      case ActionType.SUCCESS: {
        return {
          ...state, // Preserve the current state
          data, // Set the 'data' to the cloned payload
          loading: false, // Set loading to false after successful data retrieval
          success: true, // Indicate success
        };
      }

      // Action when the data request fails
      case ActionType.FAILED:
        return {
          ...state, // Preserve the current state
          data, // Set the 'data' to the cloned payload (even if it's an error)
          loading: false, // Set loading to false after the error
          success: false, // Indicate failure
        };

      // Action to reset the state (usually used to clear data or reset loading)
      case ActionType.RESET:
        return {
          loading: false, // Set loading to false, effectively clearing state
        };

      // Default case returns the current state if no relevant action type is found
      default:
        return state;
    }
  };
};

// Create a reducer for the PayDashboard action types, initializing with an empty object
export const pay_dashboard_reducer = ReducerFunctions(PayDashboard, {});

// Combine the PayDashboard reducer into a larger reducer, e.g., for a dashboard section
export default combineReducers({
  dashboard: combineReducers({
    PayDashboard: pay_dashboard_reducer, // Attach the pay_dashboard_reducer to the dashboard slice
  }),
});
