// Saga utility function to handle API calls and dispatch appropriate actions
export const sagaAdminFunctions = (action_type, method, api, data, headers) => {
  return function* () {
    let res = null; // Variable to store API response
    let params = undefined; // Variable to store request parameters

    // Check if data has params and assign it separately
    if (data?.params) {
      params = data.params;
      delete data.params; // Remove params from data to avoid conflicts
    }

    try {
      // Handle POST or PUT requests, where data is sent in the body
      if (method === "post" || method === "put") {
        res = yield call(endpointAdminApi[method], api, data, {
          headers,
          params, // Include params if present
        });
      } else {
        // Handle other methods (GET, DELETE, etc.), where data is passed as query params
        res = yield call(endpointAdminApi[method], api, {
          headers,
          params: data, // Use data as params in the request
        });
      }

      // Check if the response status is less than 400 (successful)
      if (res.status < 400) {
        yield put({
          type: action_type.SUCCESS, // Dispatch success action with response data
          payload: res.data,
        });
      } else {
        // Dispatch failure action if response status indicates an error
        yield put({
          type: action_type.FAILED,
          payload: res.data, // Include response data in the payload
        });
      }
    } catch (err) {
      // In case of any error, dispatch failure action with error data
      yield put({
        type: action_type.FAILED,
        payload: err?.response?.data, // Send error response data, if available
      });
    }
  };
};

// Example of using sagaAdminFunctions inside a saga for a specific API request
function payDashboard(req) {
  return sagaAdminFunctions(PayDashboard, "get", apis.candidateDashboardAPI, req.payload, {}, true)();
}

// Saga watcher that listens for PayDashboard.REQUEST action and triggers payDashboard saga
export function* dashboardWatcher() {
  yield takeEvery(PayDashboard.REQUEST, payDashboard);
}

// Root saga that listens for all sagas and runs them concurrently
export function* rootSagas() {
  yield all([
    dashboardWatcher(), // Add dashboardWatcher to the root saga
  ]);
}



