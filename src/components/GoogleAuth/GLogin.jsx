import { useState } from "react";

import { GoogleLogin } from "react-google-login";

const clientId =
  "936524965025-qdhmlquieqlvcoor458lgtlh4oao58dv.apps.googleusercontent.com";

const GLogin = () => {
  const [gAccessToken, setGAccessToken] = useState("");
  const onSuccess = (res) => {
    console.log("Login Successfull. Current User =>", res);
    setGAccessToken(res.code);
    const encURL = encodeURIComponent(res.code);
    console.log(encURL, " is the decoded url");
  };
  console.log(gAccessToken, "this is the code token received");

  const onFailure = (res) => {
    console.log("Login failed. Res=> ", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        // isSignedIn={true}
        accessType={"offline"}
        responseType={"code"}
      />
    </div>
  );
};

export default GLogin;
