import React , {useState} from 'react'
import { useHistory } from "react-router-dom";

const Signup = (props) => {
    const [cred, setcred] = useState({name:"" ,email:"",password:""})
    const onchange = (e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
      }
      const history = useHistory(); 
    const handlesub = async(e)=>{
        e.preventDefault();
        
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name:cred.name ,email:cred.email,password:cred.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success === true){
          localStorage.setItem('tokensign',json.tokenauth)
          props.showalert("Your account is created Successfully.","Success!")
          history.push("/home")
        }
        else{
          props.showalert("Failed to create your account.","Failed!")
        }

        

    }
  return (
    <div className="container">
        <form onSubmit={handlesub}>
        <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={cred.name}
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={onchange}
          />
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
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup