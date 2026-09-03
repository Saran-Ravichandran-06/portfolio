import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { techStack } from "../../data/portfolioData";

const TechStack = forwardRef(function TechStack(_, ref) {
  return (
    <ContentPanel ref={ref} side="left" className="tech-panel" title="Tech Stack">
      <div className="tech-stack-container">
        {techStack.groups.map((group) => (
          <div className="tech-group" key={group.label}>
            <span className="tech-group-label">{group.label}</span>
            <span className="tech-group-divider">—</span>
            <div className="tech-item-row">
              {group.items.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </ContentPanel>
  );
});

export default TechStack;
