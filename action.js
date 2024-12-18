// Improved ActionTypesFactory function to generate action type constants
export const ActionTypesFactory = (prefix, type) => {
  // Convert both prefix and type to uppercase using native JavaScript toUpperCase()
  const actionPrefix = `${prefix.toUpperCase()}/${type.toUpperCase()}`;

  // Return an object containing all standard action types and a custom generator function
  return {
    REQUEST: `${actionPrefix}_REQUEST`,  // Action type for requesting data
    INPROGRESS: `${actionPrefix}_INPROGRESS`, // Action type when the operation is in progress
    SUCCESS: `${actionPrefix}_SUCCESS`, // Action type when the operation is successful
    FAILED: `${actionPrefix}_FAILED`, // Action type when the operation fails
    CHANGED: `${actionPrefix}_CHANGED`, // Action type for any change in data or state
    RESET: `${actionPrefix}_RESET`, // Action type to reset the state
    custom: (name) => `${actionPrefix}_${name.toUpperCase()}`, // Custom action type generator
  };
};

// Assuming Dashboard action types are generated by ActionTypesFactory
const Dashboard = ActionTypesFactory('dashboard', 'profile'); // This will generate action types for 'dashboard/profile'

// Action creator for requesting dashboard data
export const dashboardRequest = (payload) => {
  return {
    type: Dashboard.REQUEST,  // Use the generated action type for REQUEST
    payload,                  // Include the payload (data to be sent with the action)
  };
};
