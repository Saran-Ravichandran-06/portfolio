import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { projects } from "../../data/portfolioData";

const Projects = forwardRef(function Projects(_, ref) {
  return (
    <ContentPanel ref={ref} side="right" kicker="04 — Projects">
      <ul className="project-list">
        {projects.map((p, i) => (
          <li key={p.name}>
            <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
            <span>{p.name}</span>
          </li>
        ))}
      </ul>
    </ContentPanel>
  );
});

export default Projects;
