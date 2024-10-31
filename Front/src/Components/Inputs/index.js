import React from 'react';
import InputContainer from './style';

const Input = ( {onClick, onChange, type, placeholder}) => {

    return(
        <InputContainer onClick={onClick} onChange={onChange} type={type} placeholder={placeholder} >
        </InputContainer>
    )
};

export default Input;