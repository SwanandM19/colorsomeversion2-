// Centralized room/wall/mask registry for the Colour Visualizer (Phase 1).
// Nothing in the UI hardcodes an image or mask path directly — everything
// reads from this file, so adding a room later (once its photo + mask are
// ready) is a data change here, not a component change.

export interface VisualizerWall {
  id: string;
  /** Shown in the wall picker, e.g. "Accent Wall", "Facade Wall". */
  label: string;
  /** Grayscale/alpha mask — white = paintable, black = untouched, with a
   * soft (feathered) edge in between. Same pixel-aspect as `image`. */
  maskSrc: string;
}

export interface VisualizerRoom {
  id: string;
  name: string;
  /** Working image used for the live canvas preview. */
  image: string;
  /** Small image for the room-picker card. */
  thumbnail: string;
  walls: VisualizerWall[];
  /** "active" rooms are selectable; "comingSoon" rooms render disabled with
   * `note` explaining what's blocking them — see the Phase 1 report for the
   * current list of missing assets. */
  status: "active" | "comingSoon";
  note?: string;
  /** Drives the "Explore Suitable Products" deep link — a real taxonomy
   * category (interior vs exterior paints), not a fabricated shade↔product
   * match. */
  surfaceType: "interior" | "exterior";
}

export const VISUALIZER_ROOMS: VisualizerRoom[] = [
  {
    id: "living-room",
    name: "Living Room",
    image: "/visualizer/rooms/living-room.webp",
    thumbnail: "/visualizer/rooms/living-room-thumb.webp",
    // Uses LRoom.png — an empty-room shot sourced specifically for this
    // feature (replaces the old cluttered LivingRoom.png). One dominant
    // wall fills most of the frame with zero furniture/decor in front of
    // it, so a single generous rectangle mask covers it cleanly; only the
    // curtain (left) and door panel (right) needed to stay outside the
    // paintable area. No second wall exists in this frame.
    walls: [
      { id: "main-wall", label: "Main Wall", maskSrc: "/visualizer/masks/living-room-main-wall.png" },
    ],
    status: "active",
    surfaceType: "interior",
  },
  {
    id: "exterior",
    name: "Exterior",
    image: "/visualizer/rooms/exterior.webp",
    thumbnail: "/visualizer/rooms/exterior-thumb.webp",
    // Uses ExteriorW.png (replaces Exterior.png, whose only usable walls
    // — a recessed balcony pillar and a shrub-crowded boundary wall — were
    // both compromised). This photo was sourced specifically for the
    // feature: one dominant flat facade filling ~80% of frame width, sky
    // above, paving below, nothing resting against it. A single generous
    // rectangle mask covers it cleanly; only a foreground tree (left) and
    // background trees (right) needed to stay outside the paintable area.
    walls: [
      { id: "main-wall", label: "Facade Wall", maskSrc: "/visualizer/masks/exterior-main-wall.png" },
    ],
    status: "active",
    surfaceType: "exterior",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: "/visualizer/rooms/bedroom.webp",
    thumbnail: "/visualizer/rooms/bedroom-thumb.webp",
    // Uses Bed_Visualizerr.png, shot nearly front-on with minimal
    // perspective skew. Flat side wall fills the right half of the frame;
    // the paintable rectangle starts clear of the bed's throw-blanket/
    // bedspread corner (which curves out further than the curtain does).
    walls: [
      { id: "main-wall", label: "Side Wall", maskSrc: "/visualizer/masks/bedroom-main-wall.png" },
    ],
    status: "active",
    surfaceType: "interior",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    image: "/visualizer/rooms/kitchen.webp",
    thumbnail: "/visualizer/rooms/kitchen-thumb.webp",
    walls: [],
    status: "comingSoon",
    note: "Visible wall area is a thin strip above the cabinets — too small for a convincing preview. Needs replacement photography.",
    surfaceType: "interior",
  },
];

export function getActiveRooms(): VisualizerRoom[] {
  return VISUALIZER_ROOMS.filter((r) => r.status === "active");
}

export function getRoomById(id: string): VisualizerRoom | undefined {
  return VISUALIZER_ROOMS.find((r) => r.id === id);
}
