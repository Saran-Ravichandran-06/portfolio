import { forwardRef } from "react";
import ContentPanel from "../ContentPanel";
import { experience } from "../../data/portfolioData";

const Experience = forwardRef(function Experience(_, ref) {
  return (
    <ContentPanel ref={ref} side="left" kicker="05 — Experience">
      <div className="timeline">
        {experience.map((item) => (
          <div className="timeline-item" key={item.role + item.duration}>
            <span className="timeline-date">{item.duration}</span>
            <div className="timeline-role">{item.role}</div>
            <div className="timeline-org">
              {item.org} · {item.location}
            </div>
            <ul className="timeline-points">
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
