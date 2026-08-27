import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { profile } from "../../data/portfolioData";

const About = forwardRef(function About(_, ref) {
  return (
    <ContentPanel ref={ref} side="left" className="about-panel" title="About Me">
      <div className="about-lede">
        {profile.summary.map((line, idx) => (
          <p key={idx} style={{ marginBottom: '0.3rem' }}>{line}</p>
        ))}
      </div>
      <div className="about-meta">
        <span>{profile.location}</span>
        <span>{profile.email}</span>
      </div>
    </ContentPanel>
  );
});

export default About;
