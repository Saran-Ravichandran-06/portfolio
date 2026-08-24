import workspaceImg from "../assets/workspace.webp";
import { scenes } from "../data/sceneConfig";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

const bodyById = {
  hero: Hero,
  about: About,
  skills: Skills,
  techStack: TechStack,
  projects: Projects,
  experience: Experience,
  contact: Contact,
};

export default function StaticFallback() {
  return (
    <div className="static-fallback">
      {scenes.map((scene) => {
        const Body = bodyById[scene.id];
        const zoom = scene.contentSide === "full" ? 100 : 160;
        const bgStyle = {
          backgroundImage: `url(${workspaceImg})`,
          backgroundPosition: `${scene.focus.x * 100}% ${scene.focus.y * 100}%`,
          backgroundSize: `${zoom}%`,
        };
        return (
          <section
            key={scene.id}
            className={`static-section side-${scene.contentSide}`}
          >
            <div className="static-image" style={bgStyle} />
            <div className="scene-vignette" />
            <div className="static-overlay">
              <Body />
            </div>
          </section>
        );
      })}
    </div>
  );
}
