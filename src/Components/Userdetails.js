import React, { useEffect } from 'react';
import { useContext, useRef, useState } from 'react';
import noteContext from '../Context/notes/notecontext';
import { useHistory } from "react-router-dom";

const Userdetails = (props) => {
    const history = useHistory(); 
  const context = useContext(noteContext);
  const { editdetails } = context;
  const [ud, setud] = useState({ id: '', name: '', email: '' });
  const [editu, seteditu] = useState({ name: '', email: '' });

  const refud = useRef(null);
  const refudcl = useRef(null);

  const edit = (e) => {
    e.preventDefault();
    refud.current.click();
  };

  const onChange = (e) => {
    seteditu({ ...editu, [e.target.name]: e.target.value });
  };

  const handleclick = (e) => {
    e.preventDefault();
    // Use editu.name and editu.email here instead of ud.name and ud.email
    editdetails(editu.name, editu.email, ud.id);
    refudcl.current.click();
    history.push("/ud")
    setud({id:editu.id, name: editu.name, email: editu.email })
    props.showalert('User Details Updated Successfully.', 'Success!');
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('tokenlogin'),
          },
        });
        const json = await response.json();
        setud({ id: json._id, name: json.name, email: json.email });
        seteditu({ id: json._id, name: json.name, email: json.email });
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  return (
    <>
      <button
        type="button"
        ref={refud}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit User Details
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Edit username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nname"
                    name="name"
                    onChange={onChange}
                    value={editu.name}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Edit Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="nemail"
                    name="email"
                    onChange={onChange}
                    value={editu.email}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refudcl} className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1>User Details</h1>
        <form>
          <div className="form-group">
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              className="form-control"
              id="uname"
              name="uname"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={ud.name}
              readOnly
            />
            <label htmlFor="uemail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="uemail"
              name="uemail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={ud.email}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">ID</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={editu.id}
              readOnly
            />
          </div>

          <button type="submit" onClick={edit} className="btn btn-primary">
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default Userdetails;
