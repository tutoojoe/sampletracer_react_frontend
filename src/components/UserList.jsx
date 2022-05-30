import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import axios from "../components/api/axios";
import requestAPIs from "../components/api/requestAPIs";

// import { default_url } from "./constants";
// import { Grid } from "@mui/icons-material";
// import { Typography } from "@mui/material";
// import { Box } from "@mui/system";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const userDetailsHandler = async () => {
    try {
      const response = await axios.post(requestAPIs.users);
      console.log(response.data);
      setUsersList(response.data);
    } catch (error) {
      console.log("could not fetch user list. Error>", error);
    }
  };

  return (
    <div>
      UserList
      <Button variant="outlined" onClick={userDetailsHandler}>
        Get user details
      </Button>
      <ul>
        {usersList.map((obj) => (
          <li key={obj.pk}>{obj.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
