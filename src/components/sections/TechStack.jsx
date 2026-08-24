import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { techStack } from "../../data/portfolioData";

const TechStack = forwardRef(function TechStack(_, ref) {
  return (
    <ContentPanel ref={ref} side="left" kicker="03 — Tech Stack">
      {techStack.groups.map((group) => (
        <div className="skill-group" key={group.label}>
          <span className="skill-group-label">{group.label}</span>
          <div className="pill-row">
            {group.items.map((item) => (
              <span className="pill accent" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </ContentPanel>
  );
});

export default TechStack;
