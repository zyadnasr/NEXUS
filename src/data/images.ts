// All project images imported as ES modules so Vite can process,
// fingerprint and resolve them correctly in both dev and production.

import project1 from '../images/Project-1.avif';
import auraSkincare from '../images/aura-skincare.avif';
import novaAi from '../images/nova-ai.avif';
import gallery1 from '../images/gallery-1.avif';
import gallery2 from '../images/gallery-2.avif';
import gallery3 from '../images/gallery-3.avif';

export const projectImages = {
  project1,
  auraSkincare,
  novaAi,
  gallery1,
  gallery2,
  gallery3,
} as const;
