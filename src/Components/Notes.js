import React from "react";
import { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../Context/notes/notecontext";
import NoteItem from "./NoteItem";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes1, getnotes , editnote } = context;
  
  const history = useHistory(); 
  useEffect(() => {
    if(localStorage.getItem('tokenlogin') !== null){
      getnotes();

    }
    else{
      history.push("/login")
    }
  }, []);
  const {showalert} = props;
  const [note2, setnote2] = useState({id:"",etitle:"",edescription:"",etag:""})
  const updatenote = (currentNote) => {
    ref.current.click();
    setnote2({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
  };

  
  const handleclick = (e)=>{
    e.preventDefault();
    refclose.current.click();
    editnote(note2.id,note2.etitle,note2.edescription,note2.etag)
    props.showalert("Notes Updated Successfully.","Success!")
  }
  const onchange = (e)=>{
    setnote2({...note2,[e.target.name]:e.target.value})
  }
  const ref = useRef(null);
  const refclose = useRef(null);
  return (
    <div className="container">
      <button
        ref={ref}
        type="button"
        class="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form className="container my-3">
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    onChange={onchange}
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note2.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edescription"
                    className="form-control"
                    id="edescription"
                    onChange={onchange}
                    minLength={5}
                    required
                    value={note2.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="etag"
                    className="form-control"
                    id="etag"
                    onChange={onchange}
                    value={note2.etag}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button  type="button" class="btn btn-primary" onClick={handleclick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="container">
          {notes1.length === 0 && 'NO NOTES'}
        </div>
        {notes1.map((note) => {
          return <NoteItem note={note} updatenote={updatenote} showalert={showalert} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
