import { forwardRef } from "react";
import { profile } from "../../data/portfolioData";

const Hero = forwardRef(function Hero(_, ref) {
  return (
    <div ref={ref} className="hero-panel">
      <h1 className="hero-name">{profile.name}</h1>
      <p className="hero-title">{profile.title}</p>
      <p className="hero-summary">{profile.tagline}</p>
      <div className="scroll-cue">
        <span>Scroll to explore</span>
        <span className="scroll-cue-line" />
      </div>
    </div>
  );
});

export default Hero;
