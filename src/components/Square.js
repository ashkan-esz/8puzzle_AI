import React from 'react';
import styled from "styled-components/macro";
import { STYLE } from '../styles.js';
import { animated, Spring, interpolate, config } from 'react-spring';

const _Square = ({ children, className, style, delta, shift }) => {
    return (
        <Spring config={config.gentle} native to={delta}>
            {({ x, y }) => (
                <animated.div
                    className={className}
                    style={{
                        ...style,
                        transform: interpolate(
                            [x, y],
                            (x, y) => `translate3d(${x * shift}px,${y * shift}px, 0)`
                        )
                    }}
                >
                    <span>{children || '-'}</span>
                </animated.div>
            )}
        </Spring>
    )
}

const Square = styled(_Square)`
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  margin: 5px;
  background-color: white;
  color: ${STYLE.backgroundColor};
  opacity: ${props => (props.transparent ? 0 : 1)};
  text-align: center;
  font-weight: bolder;
  font-family: 'Viga', sans-serif;
  font-size: 3.6em;
  border-radius: 10%;
  position: relative;
  span {
    height: 90px;
    line-height: 90px;
    display: block;
  }
`;

export default Square;
