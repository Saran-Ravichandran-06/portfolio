import { forwardRef } from "react";

const ContentPanel = forwardRef(function ContentPanel(
  { side = "right", kicker, title, children, className = "" },
  ref
) {
  const sideClass = side === "left" ? "side-left" : side === "right" ? "side-right" : "";
  return (
    <div ref={ref} className={`content-panel ${sideClass} ${className}`}>
      {kicker && <span className="panel-kicker">{kicker}</span>}
      {title && <h2 className="panel-title">{title}</h2>}
      <div className="panel-body">{children}</div>
    </div>
  );
});

export default ContentPanel;
