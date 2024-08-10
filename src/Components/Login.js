import React ,{useState} from "react";
import { useHistory } from "react-router-dom";
import Alert from "./Alert";

const Login = (props) => {
    const [cred, setcred] = useState({email:"",password:""})
    const {showalert} = props;
    const onchange = (e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
      }
      const history = useHistory(); 
    const handlesub = async(e)=>{
        e.preventDefault();
        
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email:cred.email,password:cred.password})
        });
        const json = await response.json();
        console.log(json);

        if(json.success === true){
          localStorage.setItem('tokenlogin',json.tokenauth)
          showalert("Logged in Successfully.","Success!")
          history.push("/home")
        }
        else{
          showalert("Failed to login.","Failed!")
        }

    }
  return (
    <div className="container">
      <h2>Login to continue to noteBOOK</h2>
      <form onSubmit={handlesub}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            value={cred.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onchange}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            value={cred.password}
            id="password"
            name="password"
            onChange={onchange}
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary" >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
