import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { About } from "./Components/About";
import Home from "./Components/Home";
import Alert from "./Components/Alert";
import Notestate from "./Context/notes/NoteSate";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react";
import Userdetails from "./Components/Userdetails";

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message,type)=>{
      setalert(
          {
              msg : message,
              ty : type
          }
      )
      setTimeout(()=>{
        setalert(null);
      },1500);
  }
  return (
    <>
      <Notestate>
        <Router>
          <Navbar showalert={showalert} />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/About">
                <About showalert={showalert} />
              </Route>
              <Route exact path="/Home">
                <Home showalert={showalert} />
              </Route>
              <Route exact path="/login">
                <Login showalert={showalert} />
              </Route>
              <Route exact path="/signup">
                <Signup showalert={showalert}/>
              </Route>
              <Route exact path="/ud">
                <Userdetails showalert={showalert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
