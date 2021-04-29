import React from 'react';
import styled from "styled-components/macro";

const _Button = ({className, icon, onClick, active, children}) => (
    <div className={className} onClick={onClick}>
        {icon && <img src={icon} alt={'button'}/>}
        {children}
    </div>
)

const Button = styled(_Button)`
  background-color: ${props => props.active ? 'cyan' : 'white'};
  width: ${props => props.icon ? '70px' : '80px'};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;

  img {
    width: 30%;
  }

  :hover {
    cursor: pointer;
    background-color: lightpink;
  }
`;

export default Button;
