import styled from 'styled-components';

const ButtonSet = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 10px;

  div {
    margin: 0 ${props => props.margin + 'px'};
  }
`;

export default ButtonSet;
