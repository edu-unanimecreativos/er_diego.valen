import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import Contact from './pages/Contact'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}