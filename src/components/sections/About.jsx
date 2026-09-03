import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { profile } from "../../data/portfolioData";

const About = forwardRef(function About(_, ref) {
  return (
    <ContentPanel ref={ref} side="left" className="about-panel" title="About Me">
      <ul className="about-lede-list">
        {profile.summary.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
      <div className="about-meta">
        <span className="eyebrow">{profile.email}</span>
        <span className="eyebrow" style={{ marginTop: '0.1rem' }}>{profile.location}</span>
      </div>
    </ContentPanel>
  );
});

export default About;
