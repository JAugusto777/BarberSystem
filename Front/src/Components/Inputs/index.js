import React from 'react';
import InputContainer from './style';


const Input = ( {onClick, onChange, type, placeholder, autocomplete}) => {

    return(
        <InputContainer onClick={onClick} onChange={onChange} type={type} placeholder={placeholder} autoComplete={autocomplete} />
            
     )
};

export default Input;