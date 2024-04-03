
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledNavbar = styled.nav`

  color: white;
  padding: 5px 15px;
  text-align: left;
  height: 30px
`;

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  const formattedDateTime = currentTime.toLocaleString();

  return (
    <StyledNavbar>
      <ul>
        <li><h3>{formattedDateTime}</h3></li>
        <li><h4>Development of storage and safety infrastructure technology for liquified hydrogen</h4></li>
      </ul>
    </StyledNavbar>
  );
};

export default Navbar;
