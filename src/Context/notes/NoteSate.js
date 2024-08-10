import React, { useState, useRef } from "react";
import NoteContext from "./notecontext";

const Notestate = (props) => {
  //   const s1 = {
  //     name: "Sam",
  //     college: "IIT Dh",
  //   };
  //   const [stat, setstate] = useState(s1);
  //   const update = () => {
  //     setTimeout(() => {
  //       setstate({
  //         name: "Samarth",
  //         college: "IIT Bombay",
  //       });
  //     }, 1500);
  //   };

  const noteinitial = []
  const [notes1, setnotes] = useState(noteinitial);

    // fetch all note
    const getnotes = async()=>{
      const authToken = localStorage.getItem('tokenlogin');
      console.log("Tokenlogin:", authToken);
      const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('tokenlogin')
      }
    });
      const json = await response.json(); // parses JSON response into native JavaScript objects
      setnotes(json);
      
    }

  // Add note
  const addnote = async(title,description,tag)=>{
    // const note = {
    //   _id: "65818ad5a86d21783b562844",
    //   user: "658137165cb3c7199200f5ea",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "1702988501671",
    //   __v: 0,
    // };
    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token" :localStorage.getItem('tokenlogin')
    },
    body: JSON.stringify({title,description,tag})
  });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    
    setnotes(notes1.concat(json));

    
  }
  // Delete note
  const deletenote = async(id)=>{
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('tokenlogin')
    }
  });
    // const newnote = notes1.filter((note2)=> {return note2._id !== id})
    // setnotes(newnote);
    getnotes();

  }
  // Edit note
  const editnote = async(id,title,description,tag)=>{
    const response = await fetch(`http://localhost:5000/api/notes/updatenotes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('tokenlogin')
    },
    body: JSON.stringify({title,description,tag})
  });
    const json = response.json(); // parses JSON response into native JavaScript objects


    const newnotes = JSON.parse(JSON.stringify(notes1))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if(id === newnotes[index]._id){
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
      
    }
    setnotes(newnotes);
  }


  const editdetails = async(ename,eemail,_id)=>{
    const response = await fetch(`http://localhost:5000/api/auth/edituser`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ename,eemail,_id})
  });
    const json = response.json();
  }


  return (
    // <NoteContext.Provider value={{ stat, update }}>
    <NoteContext.Provider value={{ notes1, addnote,deletenote,editnote,getnotes,editdetails }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default Notestate;
