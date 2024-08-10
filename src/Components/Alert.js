import React from "react";

const Alert = (props) => {
  return (
    <div style={{height:'50px',marginTop:'50px'}}>
    {props.alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{props.alert.ty}</strong> {props.alert.msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>}
    </div>
  );
};

export default Alert;
