import { projectImages } from './images';

export const projectsData = [
  {
    id: 'fintech-revolution',
    title: 'Fintech Revolution',
    brand: 'PayFlow',
    industry: 'Financial Technology',
    services: ['Branding', 'App Design', 'Web Development'],
    categories: ['Fintech', 'Mobile App'],
    coverImage: projectImages.project1,
    accentColor: 'from-blue-500 to-purple-600',
    description: 'A complete redesign and repositioning of a leading mobile payment platform.',
    clientGoals: [
      'Modernize the brand identity to appeal to Gen-Z and Millennials.',
      'Improve the user experience for peer-to-peer payments.',
      'Increase conversion rates for premium accounts.'
    ],
    challenges: 'The existing platform was visually outdated and suffered from a complex user flow that led to high drop-off rates during the onboarding process.',
    strategy: 'We conducted extensive user research to identify pain points, then rebuilt the user journey from the ground up, focusing on simplicity and speed.',
    designProcess: 'Our design system was built around the concept of fluid motion and trust. We utilized a clean interface with vibrant gradients to indicate successful actions.',
    results: {
      metrics: [
        { label: 'Increase in Onboarding', value: '+120%' },
        { label: 'Active Users', value: '2.5M' },
        { label: 'App Store Rating', value: '4.9/5' }
      ]
    },
    gallery: [
      projectImages.gallery1,
      projectImages.gallery2,
      projectImages.gallery3,
    ]
  },
  {
    id: 'aura-skincare',
    title: 'Aura Skincare',
    brand: 'Aura',
    industry: 'Beauty & Wellness',
    services: ['E-commerce Development', 'Creative Direction'],
    categories: ['E-commerce', 'Branding'],
    coverImage: projectImages.auraSkincare,
    accentColor: 'from-emerald-400 to-teal-500',
    description: 'An immersive digital storefront for a premium, organic skincare line.',
    clientGoals: [
      'Create a digital experience that reflects the purity of the products.',
      'Implement a seamless, high-converting checkout flow.',
      'Integrate AR features for virtual try-on.'
    ],
    challenges: 'Standing out in a highly saturated beauty market required an approach that went beyond standard e-commerce grid layouts.',
    strategy: 'We designed an editorial-style shopping experience, utilizing large imagery, smooth scroll animations, and interactive product explorations.',
    designProcess: 'The aesthetic is rooted in nature—soft earthy tones, elegant typography, and glassmorphism elements that give a sense of transparency.',
    results: {
      metrics: [
        { label: 'Conversion Rate', value: '+65%' },
        { label: 'Average Order Value', value: '+$42' },
        { label: 'Return Customers', value: '45%' }
      ]
    },
    gallery: [
      projectImages.gallery3,
      projectImages.gallery1,
      projectImages.gallery2,
    ]
  },
  {
    id: 'nova-ai',
    title: 'Nova AI Platform',
    brand: 'Nova',
    industry: 'Artificial Intelligence',
    services: ['SaaS Platform', 'Marketing Strategy', 'UI/UX'],
    categories: ['SaaS', 'AI'],
    coverImage: projectImages.novaAi,
    accentColor: 'from-orange-500 to-red-600',
    description: 'Transforming a complex machine learning API into an intuitive, accessible dashboard.',
    clientGoals: [
      'Simplify complex data visualization for non-technical users.',
      'Launch a disruptive go-to-market campaign.',
      'Establish brand authority in the generative AI space.'
    ],
    challenges: 'The core technology was highly technical, and the interface needed to abstract that complexity without losing advanced functionality.',
    strategy: 'We created a modular dashboard system with progressive disclosure, allowing power users to drill down while keeping the primary interface clean.',
    designProcess: 'A dark, futuristic theme with neon accents sets the tone for cutting-edge technology, while clear, sans-serif typography ensures readability of complex data.',
    results: {
      metrics: [
        { label: 'MRR Growth', value: '310%' },
        { label: 'Time on Platform', value: '+45m' },
        { label: 'Enterprise Signups', value: '1,200+' }
      ]
    },
    gallery: [
      projectImages.gallery2,
      projectImages.gallery3,
      projectImages.gallery1,
    ]
  },
  {
    id: 'vertex-logistics',
    title: 'Vertex Logistics',
    brand: 'Vertex',
    industry: 'Logistics & Supply Chain',
    services: ['Web App', 'Brand Strategy'],
    categories: ['Web App', 'Enterprise'],
    coverImage: projectImages.project1,
    accentColor: 'from-indigo-500 to-blue-600',
    description: 'A global logistics management platform designed for scale and real-time tracking.',
    clientGoals: [
      'Unify multiple legacy systems into a single dashboard.',
      'Provide real-time global tracking visualizations.',
      'Rebrand to reflect a modern, tech-forward approach.'
    ],
    challenges: 'Integrating massive amounts of legacy data into a clean, modern interface without disrupting existing enterprise workflows.',
    strategy: 'We ran parallel tracks—developing a robust API layer while iterating on the frontend UI through extensive prototyping and user testing with logistics managers.',
    designProcess: 'The design language prioritizes clarity and efficiency. High-contrast elements draw attention to critical alerts, while interactive maps provide spatial context.',
    results: {
      metrics: [
        { label: 'Workflow Efficiency', value: '+40%' },
        { label: 'Error Reduction', value: '-85%' },
        { label: 'Global Adoption', value: '100%' }
      ]
    },
    gallery: [
      projectImages.gallery1,
      projectImages.gallery3,
      projectImages.gallery2,
    ]
  }
];
