import React, { useEffect, useContext } from 'react';
import noteContext from '../Context/notes/notecontext';
import Notestate from '../Context/notes/NoteSate';

export const About = () => {
  // const a = useContext(noteContext);

  // useEffect(() => {
  //   a.update();
  // }, []);

  return (
    <div>This is about</div>
    // <div>This is about {a.stat.college}</div>
  );
}
