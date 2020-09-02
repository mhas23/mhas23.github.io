import React from 'react';

const Checkbox = ({ type = 'checkbox', id, name, checked = false, onChange }) => {
   

  return (<input type={type} id={id} name={name} checked={checked} onChange={onChange}  /> )
}
export default Checkbox;