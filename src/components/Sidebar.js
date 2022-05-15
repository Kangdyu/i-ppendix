import styled from 'styled-components';

const Container = styled.nav`
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

const NavList = styled.ul``;

const NavListItem = styled.li`
  padding: 16px 50px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: ${props => (props.selected ? '#00D768' : '')};
  color: ${props => (props.selected ? 'white' : 'black')};
  font-weight: ${props => (props.selected ? 'bold' : 'regular')};
`;

function Sidebar({ courses }) {
  return (
    <Container>
      <Logo>i-ppendix</Logo>
      <NavList>
        <NavListItem selected>Home</NavListItem>
        {courses.map(course => (
          <NavListItem key={course.id}>{course.name}</NavListItem>
        ))}
      </NavList>
    </Container>
  );
}

export default Sidebar;
