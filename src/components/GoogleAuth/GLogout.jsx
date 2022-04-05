import React from "react";
import { GoogleLogout } from "react-google-login";
const clientId =
"936524965025-qdhmlquieqlvcoor458lgtlh4oao58dv.apps.googleusercontent.com";

const GLogout = () => {
  const onSuccess = (res) => {
    console.log("Logged out successfully.");
  };
  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        style={{ marginTop: '100px' }}
      />
    </div>
  );
};

export default GLogout;
