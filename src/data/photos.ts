import type { ImageMetadata } from "astro";

import p2 from "../assets/photos/drouthy-cobbler-2026-11-06-2.jpg";
import p72 from "../assets/photos/drouthy-cobbler-2026-11-06-72.jpg";
import p131 from "../assets/photos/drouthy-cobbler-2026-11-06-131.jpg";
import p158 from "../assets/photos/drouthy-cobbler-2026-11-06-158.jpg";
import p221 from "../assets/photos/drouthy-cobbler-2026-11-06-221.jpg";
import p237 from "../assets/photos/drouthy-cobbler-2026-11-06-237.jpg";
import p243 from "../assets/photos/drouthy-cobbler-2026-11-06-243.jpg";
import p246 from "../assets/photos/drouthy-cobbler-2026-11-06-246.jpg";
import p259 from "../assets/photos/drouthy-cobbler-2026-11-06-259.jpg";
import p290 from "../assets/photos/drouthy-cobbler-2026-11-06-290.jpg";
import p316 from "../assets/photos/drouthy-cobbler-2026-11-06-316.jpg";
import p363 from "../assets/photos/drouthy-cobbler-2026-11-06-363.jpg";
import p395 from "../assets/photos/drouthy-cobbler-2026-11-06-395.jpg";
import p422 from "../assets/photos/drouthy-cobbler-2026-11-06-422.jpg";
import p429 from "../assets/photos/drouthy-cobbler-2026-11-06-429.jpg";

export interface Photo {
  src: ImageMetadata;
  alt: string;
  // CSS object-position for square tile crops, when the default center cuts off a face
  position?: string;
}

export const photoCredit = "Craig Chisholm Music Photography";
export const photoCreditUrl = "https://craigchisholmmusicphotography.tumblr.com/";
export const photoEvent = "Drouthy Cobbler, November 2026";

// Homepage hero — full line-up on stage
export const heroPhoto: Photo = {
  src: p221,
  alt: "Seagles on stage under purple lights — bass, two acoustic guitars and a Telecaster across the front line, with keys and drums behind",
};

// Homepage photo strip
export const featuredPhotos: Photo[] = [
  { src: p246, alt: "George, Seagles' keyboard player, at the Hammond organ", position: "50% 20%" },
  { src: p259, alt: "Seagles' drummer singing backing vocals behind the kit" },
  { src: p131, alt: "Mike, Seagles' lead vocalist, singing in profile, gripping the mic", position: "50% 15%" },
];

// Gallery page, in display order
export const galleryPhotos: Photo[] = [
  heroPhoto,
  { src: p363, alt: "Fraser, Seagles' bassist, grinning mid-song under pink stage light" },
  featuredPhotos[2],
  { src: p243, alt: "The Seagles front line playing acoustic and electric guitars under purple light" },
  { src: p158, alt: "Seagles guitarist in a red bandana smiling to the crowd with a Les Paul" },
  featuredPhotos[0],
  { src: p316, alt: "Seagles' vocalist, bassist and guitarist together under warm red light" },
  { src: p429, alt: "Seagles guitarist in a plaid shirt playing a Telecaster" },
  featuredPhotos[1],
  { src: p72, alt: "Two Seagles guitarists side by side, Telecaster and twelve-string acoustic" },
  { src: p395, alt: "Seagles' lead vocalist smiling between songs" },
  { src: p290, alt: "Seagles guitarist in a red bandana singing harmony on acoustic guitar" },
  { src: p237, alt: "Seagles guitarist in a red bandana moving to the music under purple stage lights" },
  { src: p2, alt: "Three Seagles guitarists playing together under blue light" },
  { src: p422, alt: "Seagles' lead vocalist at the mic beside the Telecaster guitarist" },
];
