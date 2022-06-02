// import { useReducer, useCallback } from "react";

// function httpReducer(state, action) {
//   if (action.type === "SEND") {
//     return {
//       data: null,
//       error: null,
//       status: "pending",
//     };
//   }

//   if (action.type === "SUCCESS") {
//     return {
//       data: action.responseData,
//       error: null,
//       status: "completed",
//     };
//   }

//   if (action.type === "ERROR") {
//     return {
//       data: null,
//       error: action.errorMessage,
//       status: "completed",
//     };
//   }

//   return state;
// }

// function useHttp(requestFunction, startWithPending = false) {
//   const [httpState, dispatch] = useReducer(httpReducer, {
//     status: startWithPending ? "pending" : null,
//     data: null,
//     error: null,
//   });

//   const sendRequest = useCallback(
//     async function (requestData) {
//       dispatch({ type: "SEND" });
//       try {
//         const responseData = await requestFunction(requestData);
//         dispatch({ type: "SUCCESS", responseData });
//       } catch (error) {
//         dispatch({
//           type: "ERROR",
//           errorMessage: error.message || "Something went wrong!",
//         });
//       }
//     },
//     [requestFunction]
//   );

//   return {
//     sendRequest,
//     ...httpState,
//   };
// }

// export default useHttp;

import React, { useState, useCallback } from "react";
import requestAPIs from "../api/requestAPIs";

const useHttp = (applyData) => {
  //requestConfig is moved from here to the below function
  // const useHttp = (requestConfig,applyData) => { //requestConfig is moved from here to the below function
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",

          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });
        if (!response.ok) {
          throw new Error("Request to fetch data failed.");
        }
        const data = await response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      }
      setIsLoading(false);
    },
    [applyData]
  ); // since the requestConfig is now a parameter, we only have to add the data
  return {
    isLoading, //isLoading:isLoading can be written like this
    error,
    sendRequest,
  };
};

export default useHttp;
