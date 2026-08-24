import { scenes } from "../data/sceneConfig";

export default function DotNav({ activeIndex, onJump, dotRefs }) {
  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {scenes.map((scene, i) => (
        <button
          key={scene.id}
          ref={(el) => (dotRefs.current[i] = el)}
          className={i === activeIndex ? "active" : ""}
          data-label={scene.label}
          aria-label={`Go to ${scene.label}`}
          onClick={() => onJump(i)}
        />
      ))}
    </nav>
  );
}
