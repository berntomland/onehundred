import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PasswordGate from './components/PasswordGate'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/sections/About'
import GettingThere from './components/sections/GettingThere'
import Parking from './components/sections/Parking'
import Sleeping from './components/sections/Sleeping'
import Pack from './components/sections/Pack'
import Program from './components/sections/Program'
import Weather from './components/sections/Weather'
import DiscordSection from './components/sections/DiscordSection'
import Footer from './components/Footer'
import ProgramPage from './pages/ProgramPage'
import SjekklistePage from './pages/SjekklistePage'
import InnkjopPage from './pages/InnkjopPage'
import OppgaverPage from './pages/OppgaverPage'
import OppgaverAdminPage from './pages/OppgaverAdminPage'
import TurPage from './pages/TurPage'

function MainSite() {
  return (
    <PasswordGate>
      <NavBar />
      <Hero />
      <About />
      <GettingThere />
      <Parking />
      <Sleeping />
      <Pack />
      <Program />
      <Weather />
      <DiscordSection />
      <Footer />
    </PasswordGate>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/program" element={
          <PasswordGate>
            <ProgramPage />
          </PasswordGate>
        } />
        <Route path="/sjekkliste" element={
          <PasswordGate>
            <SjekklistePage />
          </PasswordGate>
        } />
        <Route path="/innkjop" element={
          <PasswordGate>
            <InnkjopPage />
          </PasswordGate>
        } />
        <Route path="/oppgaver" element={
          <PasswordGate>
            <OppgaverPage />
          </PasswordGate>
        } />
        <Route path="/oppgaver-admin" element={
          <PasswordGate>
            <OppgaverAdminPage />
          </PasswordGate>
        } />
        <Route path="/tur" element={
          <PasswordGate>
            <TurPage />
          </PasswordGate>
        } />
      </Routes>
    </BrowserRouter>
  )
}
