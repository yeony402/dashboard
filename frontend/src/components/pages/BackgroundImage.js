import React from 'react';
import styled from 'styled-components';
import Bg from '../../assets/33.jpg';
import GridLayout from './GridLayout';
import Navbar from './Navbar';

const StyledBackground = styled.div`
  background-image: url(${Bg});
  background-size: cover;
  background-position: center;
  position: scroll;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateZ(0); /* fixed된 요소의 잔상 이슈 해결 */
  will-change: transform;
`;


const BackgroundImage = () => {
  return (
    <StyledBackground>
      <Navbar /> 
      <GridLayout />
    </StyledBackground>
  );
};

export default BackgroundImage;
