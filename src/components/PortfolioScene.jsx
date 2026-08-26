import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import workspaceImg from "../assets/workspace.webp";
import { scenes, IMAGE_WIDTH, IMAGE_HEIGHT } from "../data/sceneConfig";
import { computeCamera } from "../hooks/useCameraRig";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import TechStack from "./sections/TechStack";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import DotNav from "./DotNav";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FOCUS_RADIUS = 280;

export default function PortfolioScene() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const groupRef = useRef(null);
  const focusRef = useRef(null);
  const dotRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const techRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  const panelsById = {
    hero: heroRef,
    about: aboutRef,
    skills: skillsRef,
    techStack: techRef,
    projects: projectsRef,
    experience: experienceRef,
    contact: contactRef,
  };

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    let ctx;
    const cam = { scale: 1, x: 0, y: 0 };
    const focusVars = {
      mx: IMAGE_WIDTH / 2,
      my: IMAGE_HEIGHT / 2,
      mr: DEFAULT_FOCUS_RADIUS,
      opacity: 0,
    };

    function applyCam() {
      if (groupRef.current) {
        groupRef.current.style.transform = `scale(${cam.scale}) translate(${cam.x}px, ${cam.y}px)`;
      }
    }

    function applyFocus() {
      const el = focusRef.current;
      if (!el) return;
      el.style.setProperty("--mx", `${focusVars.mx}px`);
      el.style.setProperty("--my", `${focusVars.my}px`);
      el.style.setProperty("--mr", `${focusVars.mr}px`);
      el.style.opacity = focusVars.opacity;
    }

    function setup() {
      if (ctx) ctx.revert();
      ctx = gsap.context(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 900;

        const first = computeCamera(scenes[0], vw, vh, isMobile);
        cam.scale = first.scale;
        cam.x = first.x;
        cam.y = first.y;
        applyCam();

        focusVars.mx = scenes[0].focus.x * IMAGE_WIDTH;
        focusVars.my = scenes[0].focus.y * IMAGE_HEIGHT;
        focusVars.mr = scenes[0].focusRadius ?? DEFAULT_FOCUS_RADIUS;
        focusVars.opacity = scenes[0].contentSide === "full" ? 0 : 1;
        applyFocus();

        scenes.forEach((scene, i) => {
          const el = panelsById[scene.id]?.current;
          if (!el) return;
          gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            pin: stageRef.current,
            anticipatePin: 1,
            onUpdate: (self) => {
              const step = Math.round(self.progress * (scenes.length - 1));
              setActiveIndex((prev) => (prev === step ? prev : step));
            },
          },
        });

        for (let i = 1; i < scenes.length; i++) {
          const stepStart = i - 1;
          const scene = scenes[i];
          const prevScene = scenes[i - 1];
          const target = computeCamera(scene, vw, vh, isMobile);

          tl.to(
            cam,
            {
              scale: target.scale,
              x: target.x,
              y: target.y,
              duration: 0.62,
              ease: "power2.inOut",
              onUpdate: applyCam,
            },
            stepStart
          );

          tl.to(
            focusVars,
            {
              mx: scene.focus.x * IMAGE_WIDTH,
              my: scene.focus.y * IMAGE_HEIGHT,
              mr: scene.focusRadius ?? DEFAULT_FOCUS_RADIUS,
              opacity: scene.contentSide === "full" ? 0 : 1,
              duration: 0.62,
              ease: "power2.inOut",
              onUpdate: applyFocus,
            },
            stepStart
          );

          const prevEl = panelsById[prevScene.id]?.current;
          if (prevEl) {
            tl.to(
              prevEl,
              {
                opacity: 0,
                y: prevScene.contentSide === "left" ? -14 : 14,
                duration: 0.3,
                ease: "power1.in",
              },
              stepStart
            );
          }

          const curEl = panelsById[scene.id]?.current;
          if (curEl) {
            tl.fromTo(
              curEl,
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" },
              stepStart + 0.4
            );
          }
        }
      });
    }

    setup();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
      }, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      dot.classList.toggle("active", i === activeIndex);
    });
  }, [activeIndex]);

  const handleJump = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const vh = window.innerHeight;
    const top = track.offsetTop + i * vh;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollHeight = `${scenes.length * 100}vh`;

  return (
    <>
      <div className="scroll-track" ref={trackRef} style={{ height: scrollHeight }}>
        <div className="stage" ref={stageRef}>
          <div
            className="scene-transform-group"
            ref={groupRef}
            style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
          >
            <img
              className="scene-image-base"
              src={workspaceImg}
              alt="Cozy, warm-lit developer workspace with a monitor, laptop, motivational wall notes, mug of coffee, red headphones, and stacked books on a wooden desk"
            />
            <div
              className="scene-image-focus"
              ref={focusRef}
              style={{ backgroundImage: `url(${workspaceImg})` }}
            />
            <div
              className="scene-profile-pic"
              style={{
                position: 'absolute',
                left: '50%',
                top: '40%',
                transform: 'translate(-50%, -50%)',
                width: '135px',
                height: '135px',
                borderRadius: '50%',
                backgroundImage: "url('/profile.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 0 25px rgba(237, 187, 125, 0.72), inset 0 0 15px rgba(229, 180, 131, 0.6)',
                border: '1px solid rgba(214, 172, 118, 0.72)',
                filter: 'sepia(0.4) contrast(1.2) brightness(0.9) saturate(1.8) hue-rotate(-7deg)',
                zIndex: 10,
                transition: 'opacity 0.5s ease'
              }}
            />
          </div>
          <div className="scene-vignette" />
          <div className="scene-grain" />
          <div className="panel-layer">
            <Hero ref={heroRef} />
            <About ref={aboutRef} />
            <Skills ref={skillsRef} />
            <TechStack ref={techRef} />
            <Projects ref={projectsRef} />
            <Experience ref={experienceRef} />
            <Contact ref={contactRef} />
          </div>
        </div>
      </div>
      <DotNav activeIndex={activeIndex} onJump={handleJump} dotRefs={dotRefs} />
    </>
  );
}
