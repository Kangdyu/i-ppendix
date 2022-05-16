import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 360px;
  border-right: 1px solid #ddd;
  padding: 36px 20px;
`;

const Logo = styled.span`
  display: block;
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 50px;
`;

const NavListItem = styled.li`
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledLink = styled(NavLink)`
  display: block;
  width: 100%;
  height: 100%;
  padding: 16px 50px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #cfeeda;
  }

  &.active {
    background-color: #00d768;
    color: white;
    font-weight: bold;
  }
`;

function Sidebar({ courses }) {
  return (
    <Nav>
      <Logo>i-ppendix</Logo>
      <ul>
        <NavListItem selected>
          <StyledLink to='/'>Home</StyledLink>
        </NavListItem>
        {courses.map(course => (
          <NavListItem key={course.id}>
            <StyledLink to={`/course/${course.id}`}>{course.name}</StyledLink>
          </NavListItem>
        ))}
      </ul>
    </Nav>
  );
}

export default Sidebar;
