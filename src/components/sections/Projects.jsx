import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { projects } from "../../data/portfolioData";

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="github-icon">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const Projects = forwardRef(function Projects(_, ref) {
  return (
    <ContentPanel ref={ref} side="right" className="projects-panel" title="Projects">
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div key={p.name} className="project-card">
            <div className="project-header">
              <h3 className="project-name">{p.name}</h3>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="View on GitHub">
                <GithubIcon />
              </a>
            </div>
            <p className="project-desc">{p.description}</p>
          </div>
        ))}
        {/* Fading cross dividers */}
        <div className="grid-divider-h"></div>
        <div className="grid-divider-v"></div>
      </div>
    </ContentPanel>
  );
});

export default Projects;
