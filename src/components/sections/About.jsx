import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { profile } from "../../data/portfolioData";

const About = forwardRef(function About(_, ref) {
  return (
    <ContentPanel ref={ref} side="left" kicker="01 — About Me">
      <p className="about-lede">{profile.summary}</p>
      <div className="about-meta">
        <span>{profile.location}</span>
        <span>{profile.email}</span>
      </div>
    </ContentPanel>
  );
});

export default About;
