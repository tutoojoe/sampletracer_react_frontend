import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { default_url } from "./constants";
import { Grid } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const userDetailsHandler = () => {
    axios.get(`${default_url}/api/userlist/`).then((res) => {
      console.log(res.data);
      setUsersList(res.data);
    });
  };

  console.log("the below is the data from userslist", usersList);

  

  return (
    <div>
      UserList
      <Button variant="outlined" onClick={userDetailsHandler}>
        Get user details
      </Button>
      <ul>
      {usersList.map((obj)=>(
          <li key={obj.pk}>{obj.first_name}</li>
      ))}
  
      </ul>
    </div>
  );
};

export default UserList;
