import { IMAGE_WIDTH, IMAGE_HEIGHT } from "../data/sceneConfig";

// Where on screen (as a fraction of viewport width/height) the focal
// object should land, given which side the content panel occupies.
// Individual scenes may override the x-fraction via scene.anchorX /
// scene.anchorXMobile when the object sits close to an image edge and
// the default would be geometrically unreachable without cropping.
function getAnchor(scene, isMobile) {
  if (isMobile) {
    // Stacked layout: image band sits in the upper portion of the screen,
    // content panel below it. Keep the subject centered horizontally,
    // slightly above center vertically so it isn't hidden by the panel.
    const x = scene.anchorXMobile ?? 0.5;
    const y = scene.anchorYMobile ?? 0.46;
    return { x, y };
  }
  const fallback =
    scene.contentSide === "right" ? 0.27 : scene.contentSide === "left" ? 0.73 : 0.5;
  const x = scene.anchorX ?? fallback;
  return { x, y: 0.5 };
}

// Base "cover" scale so the full image always fills the viewport with
// no letterboxing, regardless of window aspect ratio.
export function getBaseScale(vw, vh) {
  return Math.max(vw / IMAGE_WIDTH, vh / IMAGE_HEIGHT);
}

// Computes the { scale, x, y } CSS transform values for a given scene.
// transform ends up applied as: scale(S) translate(tx, ty)
//
// tx/ty are clamped so the scaled image always fully covers the
// viewport — the camera will get as close as possible to centering the
// focal point at its anchor, but will never reveal empty space at an
// edge, even when the object sits close to the source photo's border.
export function computeCamera(scene, vw, vh, isMobile) {
  const baseScale = getBaseScale(vw, vh);
  const zoom = isMobile ? scene.zoomMobile ?? scene.zoom : scene.zoom;
  const S = baseScale * zoom;

  const anchor = getAnchor(scene, isMobile);
  const targetX = anchor.x * vw;
  const targetY = anchor.y * vh;

  const focalX = scene.focus.x * IMAGE_WIDTH;
  const focalY = scene.focus.y * IMAGE_HEIGHT;

  let tx = targetX / S - focalX;
  let ty = targetY / S - focalY;

  const minTx = vw / S - IMAGE_WIDTH;
  const minTy = vh / S - IMAGE_HEIGHT;

  tx = Math.min(0, Math.max(minTx, tx));
  ty = Math.min(0, Math.max(minTy, ty));

  return { scale: S, x: tx, y: ty };
}
