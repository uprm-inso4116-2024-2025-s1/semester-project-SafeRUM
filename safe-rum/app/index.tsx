import { Redirect } from "expo-router";
import React from "react";

// App starts here
const StartPage = () => {
  return <Redirect href='/userAuthScreen' />;
};

export default StartPage;