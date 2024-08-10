import React, { useContext } from "react";
import noteContext from "../Context/notes/notecontext";


const NoteItem = (props) => {
  const { note ,updatenote} = props;
  const context = useContext(noteContext);
  const {deletenote} = context;
  const handledelete = ()=>{
    deletenote(note._id)
    props.showalert("Notes Deleted Successfully.","Success!")
  }
  return (
    <div className="col-md-6 my-3" >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{note.title}</h5>
            <p class="card-text">
              {note.description}
            </p>
            <i class="fa-solid fa-trash mx-3" onClick={handledelete}></i>
            <i class="fa-solid fa-pen mx-3" onClick={()=>{updatenote(note)}}></i>
          </div>
    </div>
    </div>
  );
};

export default NoteItem;
