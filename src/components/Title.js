import React from 'react';
import styled from "styled-components/macro";
import { STYLE } from '../styles.js';

const _Title = ({ className, img, text }) => (
    <div className={className}>
        {img && <img src={img}  alt={'title'}/>}
        {text && <span>{text}</span>}
    </div>
)

const Title = styled(_Title)`
  width: 300px;
  img {
    width: 100%;
    margin: 10px 0 5px;
  }
  span {
    width: 100%;
    display: block;
    height: 2em;
    margin: 10px 0 5px;
    color: white;
    font-family: ${STYLE.fontFamily}, sans-serif;
  }
  text-align: center;
  margin: 20px 0 10px;
  @media (max-width: 480px) {
    width: 200px;
    margin: 20px auto 10px;
  }
`;

export default Title;
