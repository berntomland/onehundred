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

export default function App() {
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
