import { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NAV_SECTIONS, SITE_TITLE } from '../content'

export default function NavBar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <Navbar
      expand="md"
      sticky="top"
      variant="dark"
      bg="dark"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand
          href="#welcome"
          className="fw-bold fs-5"
          onClick={() => setExpanded(false)}
        >
          {SITE_TITLE}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-center">
            {NAV_SECTIONS.map(({ id, label }) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                className="px-3"
                onClick={() => setExpanded(false)}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
