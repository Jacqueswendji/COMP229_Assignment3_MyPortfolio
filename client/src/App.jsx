// App.jsx
// Defines the routes for the six pages of the personal portfolio.

import { Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./pages/Auth";
import Records from "./pages/Records";
import {SessionProvider} from "./auth/session";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <SessionProvider><Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="education" element={<Education />} />
        <Route path="services" element={<Services />} />
        <Route path="signin" element={<Auth key="signin"/>} />
        <Route path="signup" element={<Auth key="signup" signup/>} />
        <Route path="records/:kind" element={<Records/>} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes></SessionProvider>
  );
}

export default App;