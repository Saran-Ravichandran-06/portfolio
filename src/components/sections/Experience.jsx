import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { experience } from "../../data/portfolioData";

const Experience = forwardRef(function Experience(_, ref) {
  return (
    <ContentPanel ref={ref} side="left" className="experience-panel" title="Experience">
      <div className="experience-list">
        {experience.map((item) => (
          <div className="exp-item" key={item.role + item.duration}>
            <div className="exp-header">
              <h3 className="exp-role">{item.role}</h3>
              <span className="exp-date">{item.duration}</span>
            </div>
            <div className="exp-org">
              {item.org} — {item.location}
            </div>
            <ul className="exp-points">
              {item.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ContentPanel>
  );
});

export default Experience;
