import React from "react";
import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";
import { BsSun, BsMoon } from "react-icons/bs";

const NavbarComponent = ({ darkTheme, toggleTheme, changeHandler, handleSortChange }) => {
  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: darkTheme ? "#7C8363" : "#DDE7DF",
        color: darkTheme ? "#EDF4F2" : "#31473A",
        borderBottom: `2px solid ${darkTheme ? "#7C8363" : "#DDE7DF"}`,
      }}
    >
      <Container>
        <Navbar.Brand
          href="#home"
          style={{
            color: darkTheme ? "#EDF4F2" : "#31473A",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Country Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center flex-column flex-lg-row">
            
            
            <NavDropdown
              title="Sort By"
              id="sort-by-dropdown"
              className="w-100 w-lg-auto me-lg-3"
              style={{
                borderRadius: "5px",
              }}
            >
              <NavDropdown.Item
                href="#"
                disabled
                style={{
                  backgroundColor: darkTheme ? "#31473A" : "#EDF4F2",
                  color: darkTheme ? "#EDF4F2" : "#31473A",
                }}
              >
                Select Sort Option
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#alpha-asc"
                onClick={() => handleSortChange("name", "asc")}
                style={{
                  backgroundColor: darkTheme ? "#31473A" : "#EDF4F2",
                  color: darkTheme ? "#EDF4F2" : "#31473A",
                }}
              >
                Alpha Asc
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#alpha-desc"
                onClick={() => handleSortChange("name", "desc")}
                style={{
                  backgroundColor: darkTheme ? "#31473A" : "#EDF4F2",
                  color: darkTheme ? "#EDF4F2" : "#31473A",
                }}
              >
                Alpha Desc
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#population-asc"
                onClick={() => handleSortChange("population", "asc")}
                style={{
                  backgroundColor: darkTheme ? "#31473A" : "#EDF4F2",
                  color: darkTheme ? "#EDF4F2" : "#31473A",
                }}
              >
                Population Asc
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#population-desc"
                onClick={() => handleSortChange("population", "desc")}
                style={{
                  backgroundColor: darkTheme ? "#31473A" : "#EDF4F2",
                  color: darkTheme ? "#EDF4F2" : "#31473A",
                }}
              >
                Population Desc
              </NavDropdown.Item>
            </NavDropdown>

            
            <Form className="d-flex w-100 w-lg-auto me-lg-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                style={{
                  backgroundColor: darkTheme ? "#31473A" : "#EDF4F2",
                  color: darkTheme ? "#EDF4F2" : "#31473A",
                  border: `2px solid ${darkTheme ? "#EDF4F2" : "#7C8363"}`,
                }}
                aria-label="Search"
                onChange={changeHandler}
              />
            </Form>

            
            <Form>
              <Form.Check
                type="switch"
                id="dark-mode-switch"
                checked={darkTheme}
                onChange={toggleTheme}
                style={{
                  color: darkTheme ? "#EDF4F2" : "#31473A",
                  fontWeight: "bold",
                }}
                label={
                  darkTheme ? (
                    <BsMoon style={{ color: darkTheme ? "#EDF4F2" : "#31473A" }} />
                  ) : (
                    <BsSun style={{ color: darkTheme ? "#EDF4F2" : "#31473A" }} />
                  )
                }
              />
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
