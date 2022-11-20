import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useHistory } from 'react-router-dom'
import { Navbar, NavDropdown, FormControl, Container, Row, Nav, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';


export default function Header(props) {
  let history = useHistory();
  const searchBar = () => {
    let query = document.getElementById("search").value;
    if (query) {
      history.push(`/search/${query}`);
    }
  }
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("email");
    alert("Thanks, you have logout!");
    history.push('/');
    window.location.reload();
  }

  if (props.loggedAsStudent) {
    return (
      <header className="p-3 mb-3"> 
      
        <Navbar bg="light" expand="lg">
          <Navbar.Brand id="schoolName">Jordan Guitar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0 flex-wrap"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="active nav-link" href="/">Home</Nav.Link>
              <Nav.Link href="/bookingCourses">BookingCourses</Nav.Link>
              <Nav.Link href="/bookingGigs">BookingGigs</Nav.Link>
              <Nav.Link href="/guitarLessons">Guitar Lessons</Nav.Link>
              <Nav.Link href="/gigs">Gigs</Nav.Link>
              <Nav.Link href="/messageBoard">Message Board</Nav.Link>
              <Nav.Link href="/fileUpload">FileUpload</Nav.Link>
              <Nav.Link href="/fileDownload">FileDownload</Nav.Link>
              <Nav.Link href="/pricing">Pricing</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/studentStatus">Hi, Student</NavDropdown.Item>
                <NavDropdown.Item href="/updatePersonInformation">Update</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/test">Test</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/" disabled>Link</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="container mt-4 mb-4 w-50">
        <div className="search container">
          <input type="search" name="search" id="search" />
          <button onClick={searchBar}>Search</button>
        </div>
      </div>
      </header>
    );

  }

  else if (props.loggedAsTeacher) {
    return (
      <header className="p-3 mb-3">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand id="schoolName">Jordan Guitar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0 flex-wrap"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="active nav-link" href="/">Home</Nav.Link>
              <Nav.Link href="/courseCreation">CourseCreation</Nav.Link>
              <Nav.Link href="/gigCreation">GigCreation</Nav.Link>
              <Nav.Link href="/bookingCourses">ShowCourses</Nav.Link>
              <Nav.Link href="/bookingGigs">ShowGigs</Nav.Link>
              <Nav.Link href="/guitarLessons">Guitar Lessons</Nav.Link>
              <Nav.Link href="/gigs">Gigs</Nav.Link>
              <Nav.Link href="/messageBoard">Message Board</Nav.Link>
              <Nav.Link href="/fileUpload">FileUpload</Nav.Link>
              <Nav.Link href="/fileDownload">FileDownload</Nav.Link>
              <Nav.Link href="/pricing">Pricing</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/teacherStatus">Hi, Teacher</NavDropdown.Item>
                <NavDropdown.Item href="/updatePersonInformation">Update</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/test">Test</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/" disabled>Link</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="container mt-4 mb-4 w-50">
        <div className="search container">
          <input type="search" name="search" id="search" />
          <button onClick={searchBar}>Search</button>
        </div>
      </div>
      </header>
    );
  }

  else if (props.loggedAsAdministrator) {
    return (
      <header className="p-3 mb-3">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand id="schoolName">Jordan Guitar</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0 flex-wrap"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="active nav-link" href="/">Home</Nav.Link>
              <Nav.Link href="/courseCreation">CourseCreation</Nav.Link>
              <Nav.Link href="/gigCreation">GigCreation</Nav.Link>
              <Nav.Link href="/bookingCourses">ShowCourses</Nav.Link>
              <Nav.Link href="/bookingGigs">ShowGigs</Nav.Link>
              <Nav.Link href="/guitarLessons">Guitar Lessons</Nav.Link>
              <Nav.Link href="/gigs">Gigs</Nav.Link>
              <Nav.Link href="/messageBoard">Message Board</Nav.Link>
              <Nav.Link href="/fileUpload">FileUpload</Nav.Link>
              <Nav.Link href="/fileDownload">FileDownload</Nav.Link>
              <Nav.Link href="/pricing">Pricing</Nav.Link>
              {/* <Nav.Link href="/booking">Booking</Nav.Link> */}
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/admin">Hi, Admin</NavDropdown.Item>
                <NavDropdown.Item href="/updatePersonInformation">Update</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/test">Test</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/" disabled>Link</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="container mt-4 mb-4 w-50">
        <div className="search container">
          <input type="search" name="search" id="search" />
          <button onClick={searchBar}>Search</button>
        </div>
      </div>
      </header>
    );
  }

  return (
    <header className="p-3 mb-3">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand id="schoolName">Jordan Guitar</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0 flex-wrap"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="active nav-link" href="/">Home</Nav.Link>
            <Nav.Link href="/bookingCourses">BookingCourses</Nav.Link>
            <Nav.Link href="/bookingGigs">BookingGigs</Nav.Link>
            <Nav.Link href="/guitarLessons">Guitar Lessons</Nav.Link>
            <Nav.Link href="/gigs">Gigs</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">login</NavDropdown.Item>
              <NavDropdown.Item href="/Register">Register</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/test">Test</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/" disabled>Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4 mb-4 w-50">
        <div className="search container">
          <input type="search" name="search" id="search" />
          <button onClick={searchBar}>Search</button>
        </div>
      </div>
    </header>
  );
}