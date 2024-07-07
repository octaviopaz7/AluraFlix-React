import styled from "styled-components"
import Home from "./pages/Home/Home"
import NuevoVideo from "./pages/NuevoVideo/NuevoVideo"
import GlobalStyles from "./componentes/GlobalStyles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const Background = styled.div`
  background: #000000E5;
  width: 100%;
  min-height: 100vh;
`

function App() {

  return (
    <Router>
      <Background>
        <GlobalStyles/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo-video" element={<NuevoVideo />} />
        </Routes>
      </Background>
    </Router>
  )
}

export default App
