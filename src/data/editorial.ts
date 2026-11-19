import {FaqItem, JournalEntry, Testimonial} from '../types';
import {ASSETS} from './catalog';

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    slug: 'architecture-of-the-kadwa-loom',
    title: 'The Architecture of the Kadwa Loom',
    kicker: 'Craft Chronicle · Varanasi',
    category: 'Craft Chronicle',
    byline: 'By Meenakshi Rao, Textile Archivist',
    pullQuote:
      'True kadwa weaving leaves the reverse of the silk as disciplined and snag-free as its luminous face.',
    date: 'October 2026',
    readTime: '5 min read',
    coverImage: ASSETS.craftspersonBanarasi,
    excerpt:
      'Inside the quiet lanes of Madanpura, where two master karigars weave every floral motif individually without a single loose thread behind the silk.',
    paragraphs: [
      'Before sunrise settles over the ghats of Varanasi, the rhythmic clack of wooden pit looms begins. In kadwa weaving—the most time-honoured of Banarasi techniques—each motif is interlaced separately with miniature spools known as tillis, leaving the reverse of the saree as clean and snag-free as its luminous face.',
      'Unlike faster cutwork brocades where threads are clipped after weaving, a single kadwa saree demands weeks of synchronized handwork between the master weaver and an apprentice seated beside him. When deep peacock-teal Katan mulberry silk meets soft-burnished brass zari, the cloth achieves a liquid fall that never loses structure.',
      'At ZARIYA, we partner directly with third-generation weaver collectives, ensuring fair loom stipends and preserving archival jangla and shikargah patterns adapted for contemporary proportions.',
    ],
    stylingNotes: [
      'Pair deep peacock Banarasi weaves with antique matte gold jhumkas and an open-back elbow-sleeve silk blouse.',
      'For evening receptions, allow the pallu to fall naturally over the forearm to showcase the full kadwa jangla border.',
    ],
    featuredProductIds: ['zar-001', 'zar-009'],
  },
  {
    slug: 'courtyard-light-pearl-ivory-bridal-minimalism',
    title: 'Courtyard Light: Ivory & Gold for the Modern Bride',
    kicker: 'Autumn Lookbook · Jaipur',
    category: 'Lookbook',
    byline: 'By Tara Singhania, Creative Director',
    pullQuote:
      'Morning courtyard light asks for silk that whispers—pearl-ivory Katan touched with quiet antique brass.',
    date: 'September 2026',
    readTime: '4 min read',
    coverImage: ASSETS.lookbookCourtyard,
    excerpt:
      'Moving beyond heavy crimson alone, contemporary brides are embracing sunlit ivory Katan silks and translucent Chanderi weaves for daytime vows.',
    paragraphs: [
      'Shot across a quiet sandstone colonnade at dawn, our Autumn Lookbook explores stillness in ceremonial dressing. Rather than overwhelming the wearer with layers of stiff embellishment, pure handwoven pearl-ivory silk allows morning light to illuminate subtle zari textures.',
      'Whether worn for an intimate mandap ceremony or an afternoon mehendi, ivory paired with muted sage or antique brass creates an enduring portrait that feels as fresh fifty years from now as it does today.',
    ],
    stylingNotes: [
      'Echo the warm ivory tone with uncut polki studs and fresh mogra woven softly into a low chignon.',
      'Keep pleat width slightly broader (around 5 inches) to let vertical zari butis breathe cleanly.',
    ],
    featuredProductIds: ['zar-008', 'zar-003'],
  },
  {
    slug: 'anatomy-of-authentic-zari',
    title: 'The Anatomy of Authentic Zari',
    kicker: 'Material Study · Textile Archive',
    category: 'Material Study',
    byline: 'By Arvind Kulkarni, Yarn Specialist',
    pullQuote:
      'True luxury whispers rather than glares; real zari bends seamlessly around a supple pure silk core.',
    date: 'September 2026',
    readTime: '4 min read',
    coverImage: ASSETS.zariMacro,
    excerpt:
      'How real silk core, fine metallic twist, and subtle patina distinguish heirloom zari from synthetic shine.',
    paragraphs: [
      'True luxury whispers rather than glares. Synthetic lurex flashes harshly under studio lights and stiffens over time; authentic tested zari is spun by winding ultra-fine metallic ribbon around a supple silk core so the border bends seamlessly with every step.',
      'Our atelier prefers a soft-burnished antique brass finish across peacock teal, charcoal tussar, and pearl Chanderi grounds—lending heirloom warmth without theatrical brightness.',
    ],
    stylingNotes: [
      'Always store zari-woven sarees folded with the metallic face turned inward inside unbleached cotton.',
      'Never spray perfume directly onto silk or zari borders to preserve the natural patina.',
    ],
    featuredProductIds: ['zar-002', 'zar-005', 'zar-007'],
  },
  {
    slug: 'soft-power-of-sheer-organza',
    title: 'The Soft Power of Sheer Organza & Crushed Tissue',
    kicker: 'Autumn Lookbook · New Delhi',
    category: 'Lookbook',
    byline: 'By Tara Singhania, Creative Director',
    pullQuote:
      'Gossamer translucency anchored by disciplined botanical zardozi gives modern eveningwear its poise.',
    date: 'August 2026',
    readTime: '3 min read',
    coverImage: ASSETS.lookbookTwilightOrganza,
    excerpt:
      'Translucent kora silk organza and liquid champagne tissue bring effortless architectural movement to cocktail evenings.',
    paragraphs: [
      'Contemporary Indian eveningwear thrives on contrast: featherlight translucency anchored by disciplined hand-embroidered borders. Our Gulbagh Sage Organza and Noor Champagne Tissue drape without bulk, making them favoured companions for destination weddings and gallery soirées.',
      'On wooden adda frames, master embroidery artisans draw fine antique kasab thread and delicate dabka vines leaf by leaf—keeping the ground breezy enough to catch twilight shadow.',
    ],
    stylingNotes: [
      'Opt for a structured raw-silk bustier or tonal square-neck blouse to balance the airy fluidity of organza.',
      'Pin the shoulder pleats lightly beneath the collarbone for an unbroken diagonal line.',
    ],
    featuredProductIds: ['zar-004', 'zar-006', 'zar-016'],
  },
  {
    slug: 'geometry-of-patan-double-ikat',
    title: 'Mathematical Poetry: The Double-Ikat Looms of Patan',
    kicker: 'Craft Chronicle · Patan, Gujarat',
    category: 'Craft Chronicle',
    byline: 'By Meenakshi Rao, Textile Archivist',
    pullQuote:
      'In Patan Patola weaving, every intersection of warp and weft must meet down to the single millimetre before the loom even turns.',
    date: 'August 2026',
    readTime: '5 min read',
    coverImage: ASSETS.patolaNavratna,
    excerpt:
      'Before a single pick of silk is thrown across the shuttle, both warp and weft skeins are hand-tied and dyed in botanical baths to lock reversible geometry.',
    paragraphs: [
      'Few Indian textiles demand the mathematical discipline of a Patan Patola. Using resist knots tied precisely along bundles of stretched silk thread, master families dye warp and weft separately through vermilion madder, turmeric, and pomegranate rind baths.',
      'Once mounted on the slanted Salvi loom, each weft pick must align with the pre-dyed warp pixel by pixel—producing an heirloom saree whose crisp navratna squares and temple lattices read identically on both faces.',
    ],
    stylingNotes: [
      'Let the crisp geometric pallu drape across the left arm without excessive pinning to honour its architectural symmetry.',
      'Keep jewellery restrained—single kundan ear studs or sleek antique gold bangles.',
    ],
    featuredProductIds: ['zar-010', 'zar-023'],
  },
  {
    slug: 'korvai-joinery-kanchipuram-silks',
    title: 'Korvai Architecture: How Three Shuttles Lock Silk Forever',
    kicker: 'Material Study · Kanchipuram',
    category: 'Material Study',
    byline: 'By Arvind Kulkarni, Yarn Specialist',
    pullQuote:
      'A three-shuttle korvai seam creates an unbreakable structural bond between deep crimson body and antique temple border.',
    date: 'July 2026',
    readTime: '4 min read',
    coverImage: ASSETS.craftspersonKanchipuram,
    excerpt:
      'Why authentic Kanjivaram sarees require two weavers working simultaneously on high-twist three-ply mulberry warp.',
    paragraphs: [
      'Run your fingers along the transition between the body and contrasting border of an authentic Kanjivaram, and you will feel a quiet, raised ridge—the korvai interlock. Rather than printing or stitching a separate band onto a finished saree, two weavers throw three shuttles simultaneously to knot border and body threads at every single pick.',
      'Paired with high-twist three-ply mulberry silk, the resulting cloth commands sculptural drape: holding sharp, regal pleats through a full-day wedding while softening gently over decades.',
    ],
    stylingNotes: [
      'Press pleated folds gently by hand using damp muslin rather than steam directly on high-twist zari.',
      'Style traditional sindoori crimson or bronze-maroon korvais with temple gold coin necklaces.',
    ],
    featuredProductIds: ['zar-002', 'zar-017', 'zar-020'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ananya Deshmukh',
    location: 'Mumbai',
    sareeName: 'Mayur Peacock Katan Banarasi',
    quote:
      'I searched three cities for a Banarasi that felt regal without glaring gold. The peacock-teal Katan silk has an extraordinary soft sheen and draped effortlessly through a six-hour reception.',
  },
  {
    id: 'test-2',
    name: 'Dr. Kavya Subramanian',
    location: 'Chennai',
    sareeName: 'Sindoori Temple Korvai Kanjivaram',
    quote:
      'As someone raised around Kanchipuram weaves, the tightness of the three-shuttle korvai join on my wedding saree genuinely moved my grandmother. Pure heirloom craft from first fold to fall.',
  },
  {
    id: 'test-3',
    name: 'Meera Kapoor',
    location: 'New Delhi',
    sareeName: 'Aabh Pearl & Sage Chanderi',
    quote:
      'Light as morning mist yet deeply poised. ZARIYA’s atelier tailored the blouse to perfection and delivered in breathable muslin packaging ready for my sister’s daytime ceremony.',
  },
];

export const FAQS: FaqItem[] = [
  {
    category: 'Craft & Authenticity',
    question: 'Are all ZARIYA sarees genuinely handwoven?',
    answer:
      'Yes. Every Banarasi, Kanjivaram, Chanderi, Paithani, and Tussar saree in our catalogue is woven on handlooms by partner weaver clusters in Varanasi, Kanchipuram, Chanderi, Yeola, and Bhagalpur, accompanied by our ZARIYA Provenance Card naming the weave region and loom hours.',
  },
  {
    category: 'Blouse & Tailoring',
    question: 'Do sarees include a blouse piece, and do you offer tailoring?',
    answer:
      'Every saree includes a matching unstitched silk or silk-cotton blouse piece (0.9m to 1.0m). You may select Complimentary Custom Tailoring on the product page—our atelier stylists contact you after order confirmation for measurements and silhouette preferences.',
  },
  {
    category: 'Orders & Shipping',
    question: 'How long does dispatch take across India and internationally?',
    answer:
      'Ready-to-ship sarees dispatch within 48 hours via insured courier (2–4 business days in metro cities, 4–6 days pan-India). Custom-tailored orders ship within 10–12 business days. International express delivery arrives in 7–10 business days.',
  },
  {
    category: 'Care',
    question: 'How should I care for pure silk and antique zari sarees?',
    answer:
      'We recommend professional dry cleaning only. Store each drape wrapped in the complimentary unbleached cotton muslin bag provided with your order, and refold along alternating creases every 3–4 months to keep silk fibres supple.',
  },
];
