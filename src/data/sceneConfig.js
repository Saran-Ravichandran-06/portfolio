// Master image natural dimensions (px)
export const IMAGE_WIDTH = 1536;
export const IMAGE_HEIGHT = 1024;

// Focal points are expressed as fractions (0–1) of the master image,
// derived from the actual object positions in the workspace photo.
// contentSide: 'left' | 'right' | 'full' — which side the CONTENT panel sits on
// (the image / focal object sits on the opposite side).
// zoom / zoomMobile: moderate cinematic zoom — enough to make the object the
// clear focal point without cropping in close or losing the surrounding room.
// anchorX / anchorXMobile / anchorYMobile: optional overrides for where the
// focal point should land on screen.
// focusRadius: radius (in image-space px) of the sharp "in focus" zone used
// by the depth-of-field overlay — roughly matched to the object's own size.

export const scenes = [
  {
    id: "hero",
    label: "Hero",
    focus: { x: 0.5, y: 0.46 },
    zoom: 1,
    zoomMobile: 1,
    contentSide: "full",
  },
  {
    id: "about",
    label: "About",
    target: "Notes",
    focus: { x: 0.449, y: 0.137 },
    zoom: 1.65,
    zoomMobile: 1.35,
    contentSide: "left",
    anchorX: 0.72,
    anchorYMobile: 0.38,
    focusRadius: 300,
  },
  {
    id: "skills",
    label: "Skills",
    target: "Laptop",
    focus: { x: 0.244, y: 0.566 },
    zoom: 1.5,
    zoomMobile: 1.3,
    contentSide: "right",
    anchorX: 0.27,
    anchorYMobile: 0.42,
    focusRadius: 300,
  },
  {
    id: "techStack",
    label: "Tech Stack",
    target: "Coffee",
    focus: { x: 0.755, y: 0.781 },
    zoom: 1.55,
    zoomMobile: 2.5,
    contentSide: "left",
    anchorX: 0.73,
    anchorYMobile: 0.42,
    focusRadius: 220,
  },
  {
    id: "projects",
    label: "Projects",
    target: "Headphones",
    focus: { x: 0.277, y: 0.762 },
    zoom: 1.5,
    zoomMobile: 2.3,
    contentSide: "right",
    anchorX: 0.27,
    anchorYMobile: 0.42,
    focusRadius: 250,
  },
  {
    id: "experience",
    label: "Experience",
    target: "Books",
    focus: { x: 0.788, y: 0.61 },
    zoom: 2.0,
    zoomMobile: 1.8,
    contentSide: "left",
    anchorX: 0.73,
    anchorYMobile: 0.4,
    focusRadius: 260,
  },
  {
    id: "contact",
    label: "Contact",
    focus: { x: 0.5, y: 0.46 },
    zoom: 1,
    zoomMobile: 1,
    contentSide: "full",
  },
];
