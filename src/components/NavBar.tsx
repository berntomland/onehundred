import { useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NAV_SECTIONS, SITE_TITLE, DISCORD } from '../content'

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
            <Nav.Link
              as={Link}
              to="/oppgaver"
              className="px-3 fw-semibold"
              onClick={() => setExpanded(false)}
            >
              Min oppgave
            </Nav.Link>
          </Nav>
          <Nav.Link
            href={DISCORD.inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-pill fw-semibold ms-2"
            style={{ background: '#5865F2', color: '#fff', fontSize: '0.9rem' }}
          >
            {DISCORD.navLabel}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
