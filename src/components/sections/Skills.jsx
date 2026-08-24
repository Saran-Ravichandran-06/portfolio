import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { skills } from "../../data/portfolioData";

const Skills = forwardRef(function Skills(_, ref) {
  return (
    <ContentPanel ref={ref} side="right" kicker="02 — Skills">
      {skills.categories.map((cat) => (
        <div className="skill-group" key={cat.label}>
          <span className="skill-group-label">{cat.label}</span>
          <div className="pill-row">
            {cat.items.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </ContentPanel>
  );
});

export default Skills;
