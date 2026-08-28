import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { skills } from "../../data/portfolioData";

const Skills = forwardRef(function Skills(_, ref) {
  return (
    <ContentPanel ref={ref} side="right" className="skills-panel" title="Skills">
      <div className="skills-grid">
        {skills.categories.map((cat) => (
          <div className="skill-group" key={cat.label}>
            <span className="skill-group-label">{cat.label}</span>
            <div className="skill-stack">
              {cat.items.map((item) => (
                <span className="skill-item" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ContentPanel>
  );
});

export default Skills;
