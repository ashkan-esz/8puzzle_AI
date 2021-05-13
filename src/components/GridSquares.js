import React from 'react';
import styled from "styled-components/macro";
import Square from './Square';
import { STYLE } from '../styles.js';

const _Grid = ({ className, grid, squareShift }) => (
    <div className={className}>
        {grid.map(({ digit, delta }) => (
            <Square key={digit} transparent={digit === 0} delta={delta} shift={squareShift}>
                {digit}
            </Square>
        ))}
    </div>
)

const Grid = styled(_Grid)`
  width: 270px;
  margin-top: 60px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${STYLE.primaryColor};
  display: flex;
  flex-wrap: wrap;
`;

export default Grid;
