/**
 * page.tsx — GDG On Campus IIE
 * Home page: assembles all sections in order.
 *
 * To connect real backend data:
 *   - Add `async` to this function and fetch events/projects server-side
 *   - Pass the fetched data as props to Events and Projects components
 */

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Events from "@/components/sections/Events";
import Projects from "@/components/sections/Projects";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  // ---------------------------------------------------------------------------
  // To fetch data server-side, make this function async and uncomment:
  // ---------------------------------------------------------------------------
  // const events = await fetch("https://your-api.com/events").then(r => r.json());
  // const projects = await fetch("https://your-api.com/projects").then(r => r.json());
  //
  // Then pass: <Events events={events} /> <Projects projects={projects} />
  // ---------------------------------------------------------------------------

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Events />
        <Projects />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
