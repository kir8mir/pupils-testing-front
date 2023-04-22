import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignIn from "./components/SignIn/SignIn";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessToken"));
 

 useEffect(() => {
  console.log('isLoggedIn', isLoggedIn);
 }, [isLoggedIn])
  return (
    <div className="App">
      {!isLoggedIn ? (
        <SignIn setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <div className="">HELLO</div>
      )}
    </div>
  );
}

export default App;
