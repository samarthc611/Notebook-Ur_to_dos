import React, { useContext } from "react";
import Notes from "./Notes";
import noteContext from "../Context/notes/notecontext";
import { useState } from "react";

const Home = (props) => {
  const context = useContext(noteContext);
  const {  addnote} = context;
  const {showalert} = props;
  const [note2, setnote2] = useState({title:"",description:"",tag:""})
  
  const handleclick = (e)=>{
    e.preventDefault();
    addnote(note2.title,note2.description,note2.tag);
    props.showalert("Note added Successfully.","Success!")
    setnote2({title:"",description:"",tag:""})
  }
  const onchange = (e)=>{
    setnote2({...note2,[e.target.name]:e.target.value})
  }

  return (
    <>
      <div className="container">
        <h1>Add notes</h1>
        <form className="container my-3">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={onchange}
              name="title"
              aria-describedby="emailHelp"
              minLength={5}
              required
              value={note2.title}
            />
            
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="form-control"
              id="description"
              onChange={onchange}
              minLength={5}
              value={note2.description}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              className="form-control"
              id="tag"
              value={note2.tag}
              onChange={onchange}
            />
          </div>
          
          <button disabled={note2.title.length <5  || note2.description.length <5  } type="submit" className="btn btn-primary" onClick={handleclick}>
            Add note
          </button>
        </form>
        <h1>Your Notes</h1>
        <div className="container">
        <Notes showalert={showalert}/>

        </div>

        
      </div>
    </>
  );
};

export default Home;
