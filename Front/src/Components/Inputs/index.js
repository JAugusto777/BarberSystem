import React from 'react';
import InputContainer from './style';

const Input = ( {onClick, onChange, type}) => {

    return(
        <InputContainer onClick={onClick} onChange={onChange} type={type}>
        </InputContainer>
    )
};

export default Input;