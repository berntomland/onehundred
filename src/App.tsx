import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Welcome from './components/sections/Welcome'
import GettingThere from './components/sections/GettingThere'
import Parking from './components/sections/Parking'
import Sleeping from './components/sections/Sleeping'
import Program from './components/sections/Program'
import Weather from './components/sections/Weather'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <Welcome />
      <GettingThere />
      <Parking />
      <Sleeping />
      <Program />
      <Weather />
      <Footer />
    </>
  )
}
