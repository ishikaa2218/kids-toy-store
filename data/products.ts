import type { Product } from '@/types'
import { detailCrop, unsplash } from '@/lib/unsplash'

/**
 * DEMO CATALOGUE — product concepts, prices (INR) and suggested ages are
 * placeholder data for the preview store, not confirmed inventory.
 * Photography: Unsplash (free to use under the Unsplash License).
 * Material, dimensions, contents and safety fields are only filled where
 * they are evident; everything else is left out rather than invented.
 */
const p = (id: string) => unsplash(id)

export const products: Product[] = [
  {
    id: 'p01',
    slug: 'wooden-animal-parade',
    name: 'Wooden Animal Parade',
    category: 'wooden-toys',
    price: 899,
    tagline: 'Three friendly shapes, ready for a walk.',
    description:
      'A trio of chunky wooden animal shapes lined up for a parade. Simple silhouettes are easy for small hands to hold, and leave plenty of room for stories about where the animals are going next.',
    images: [
      { src: p('1703581698778-2224c729135b'), alt: 'Three wooden animal shapes in a row on a bright yellow background' },
      { src: detailCrop('1703581698778-2224c729135b', 0.5, 0.52, 2), alt: 'Close-up of the wooden animal shapes' },
    ],
    ageLabel: '2 years+',
    ageGroups: ['0-2', '3-5'],
    material: 'Wood',
    tone: 'mustard',
  },
  {
    id: 'p02',
    slug: 'wooden-racing-friends',
    name: 'Wooden Racing Friends',
    category: 'wooden-toys',
    price: 1299,
    tagline: 'Animal drivers, flags up, ready to race.',
    description:
      'A set of wooden race cars, each with its own animal driver and a little pennant flag. Line them up on the floor, push them across the table, or set up a race track out of whatever is nearby.',
    images: [
      { src: p('1622172498642-0720d6a2500f'), alt: 'Wooden toy race cars with animal drivers on a chequered track', focus: '50% 55%' },
      { src: detailCrop('1622172498642-0720d6a2500f', 0.5, 0.6, 2), alt: 'Close-up of a wooden race car and its lion driver' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    material: 'Wood',
    featured: true,
    tone: 'sand',
  },
  {
    id: 'p03',
    slug: 'sailboat-rollers',
    name: 'Sailboat Rollers',
    category: 'wooden-toys',
    price: 1149,
    tagline: 'Little boats on wheels, with peg-doll sailors.',
    description:
      'Rolling wooden sailboats crewed by peg-doll sailors. They glide across floors and tabletops, and the sailors can swap boats as the adventure changes course.',
    images: [
      { src: p('1560859251-d563a49c5e4a'), alt: 'Wooden sailboats on wheels with peg-doll sailors on a wooden table', focus: '50% 60%' },
      { src: detailCrop('1560859251-d563a49c5e4a', 0.62, 0.6, 2), alt: 'Close-up of a peg-doll sailor in a wooden boat' },
    ],
    ageLabel: '2 years+',
    ageGroups: ['0-2', '3-5'],
    material: 'Wood',
    featured: true,
    tone: 'wood',
  },
  {
    id: 'p04',
    slug: 'classic-wooden-train',
    name: 'Classic Wooden Train',
    category: 'wooden-toys',
    price: 1599,
    tagline: 'Engine, coal wagon and freight car — all aboard.',
    description:
      'A traditional wooden train with an engine, coal wagon and freight car. Push it along the floor, load the wagons and unload them again — the kind of repetitive play young children love.',
    images: [
      { src: p('1505003098838-83ce5356c228'), alt: 'Classic wooden toy train with an engine and wagons on a table', focus: '55% 60%' },
      { src: detailCrop('1505003098838-83ce5356c228', 0.7, 0.55, 2), alt: 'Close-up of the wooden train engine' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    material: 'Wood',
    tone: 'sand',
  },
  {
    id: 'p05',
    slug: 'striped-wooden-yo-yos',
    name: 'Striped Wooden Yo-Yos',
    category: 'wooden-toys',
    price: 449,
    tagline: 'Bright stripes that blur when they spin.',
    description:
      'Brightly striped wooden yo-yos with a satisfying weight in the hand. A classic skill toy for practising rhythm and coordination — and for showing off once the trick finally works.',
    images: [
      { src: p('1646954843635-126c0fe8f3d7'), alt: 'Pile of brightly striped wooden yo-yos' },
      { src: detailCrop('1646954843635-126c0fe8f3d7', 0.45, 0.45, 2), alt: 'Close-up of a striped wooden yo-yo' },
    ],
    ageLabel: '6 years+',
    ageGroups: ['6-8', '9-plus'],
    material: 'Wood',
    tone: 'coral',
  },
  {
    id: 'p06',
    slug: 'pastel-play-kitchen',
    name: 'Pastel Play Kitchen',
    category: 'pretend-play',
    price: 8999,
    tagline: 'A little kitchen for big cooking plans.',
    description:
      'A child-sized play kitchen in soft pastel tones, with a hob, sink, oven door and hooks for utensils. A home base for pretend cooking, tidying up and serving imaginary meals to the whole family.',
    images: [
      { src: p('1624895674105-6c63a2b0ce96'), alt: 'Pastel pink child-sized play kitchen with utensils hanging above', focus: '50% 40%' },
      { src: detailCrop('1624895674105-6c63a2b0ce96', 0.5, 0.35, 1.8), alt: 'Close-up of the play kitchen hob and utensils' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    tone: 'coral',
  },
  {
    id: 'p07',
    slug: 'mini-cooktop-play-set',
    name: 'Mini Cooktop Play Set',
    category: 'pretend-play',
    price: 1899,
    tagline: 'Pots, pans and a sunny-side-up egg.',
    description:
      'A tabletop pretend cooktop with a pan, pot and play food. Small enough to set up anywhere, so breakfast can be served on the floor, at the table or in a blanket fort.',
    images: [
      { src: p('1624895672076-adeb9a79c589'), alt: 'Toy cooktop with a pan holding a play egg and a small cooking pot' },
      { src: detailCrop('1624895672076-adeb9a79c589', 0.35, 0.6, 2), alt: 'Close-up of the play egg in the toy pan' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5'],
    featured: true,
    tone: 'sand',
  },
  {
    id: 'p08',
    slug: 'tea-party-set',
    name: 'Tea Party Set',
    category: 'pretend-play',
    price: 1299,
    tagline: 'Teapot, cups and saucers for little hosts.',
    description:
      'A teal tea set with a teapot, cups and saucers for hosting tea parties. Pouring, passing and serving help children practise careful hand movements — and good manners for their guests.',
    images: [
      { src: p('1674121068900-7fc132be3564'), alt: 'Child’s hand lifting a teal toy teapot beside matching cups', focus: '50% 40%' },
      { src: detailCrop('1674121068900-7fc132be3564', 0.4, 0.45, 2), alt: 'Close-up of the teal toy teapot and cups' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    featured: true,
    tone: 'sky',
  },
  {
    id: 'p09',
    slug: 'shape-sorter-board',
    name: 'Shape Sorter Board',
    category: 'puzzles-games',
    price: 749,
    tagline: 'Match each shape to its pegs.',
    description:
      'A wooden board of pegs with chunky coloured shapes to sort and stack. Matching shapes to the right pegs builds early problem-solving, colour recognition and a steady grip.',
    images: [
      { src: p('1774464593838-85b320eb7453'), alt: 'Wooden shape sorter board with colourful shapes on pegs', focus: '50% 55%' },
      { src: detailCrop('1774464593838-85b320eb7453', 0.5, 0.55, 1.8), alt: 'Close-up of the coloured wooden shapes' },
    ],
    ageLabel: '18 months+',
    ageGroups: ['0-2', '3-5'],
    material: 'Wood',
    tone: 'cream',
  },
  {
    id: 'p10',
    slug: 'chunky-number-puzzle',
    name: 'Chunky Number Puzzle',
    category: 'puzzles-games',
    price: 999,
    tagline: 'Big numbers, bright colours, easy grips.',
    description:
      'A wooden puzzle board with chunky, colourful numbers and a rainbow counting arc. Lifting the numbers out and finding their places again turns counting into something children can hold.',
    images: [
      { src: p('1685358268305-c621b38e75d8'), alt: 'Wooden number puzzle board with colourful numbers and a rainbow arc' },
      { src: p('1685358272306-6e96880aa97d'), alt: 'A child’s hands placing pieces into the wooden number puzzle' },
      { src: p('1685358230675-5cb5a9016232'), alt: 'Close-up of chunky wooden puzzle numbers in a child’s hand' },
    ],
    ageLabel: '2 years+',
    ageGroups: ['0-2', '3-5'],
    material: 'Wood',
    featured: true,
    tone: 'leaf',
  },
  {
    id: 'p11',
    slug: 'wooden-bear-puzzle',
    name: 'Wooden Bear Puzzle',
    category: 'puzzles-games',
    price: 649,
    tagline: 'A big bear with little bears inside.',
    description:
      'A wooden bear-shaped puzzle with smaller bear pieces that fit inside. A gentle first puzzle with a story built in — and it looks lovely on a shelf once the bears are home.',
    images: [
      { src: p('1670000515046-9ad35ebb755d'), alt: 'Wooden bear puzzle beside a small wooden house', focus: '45% 60%' },
      { src: detailCrop('1670000515046-9ad35ebb755d', 0.42, 0.65, 2), alt: 'Close-up of the wooden bear puzzle pieces' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5'],
    material: 'Wood',
    tone: 'sand',
  },
  {
    id: 'p12',
    slug: 'colourful-jigsaw-puzzle',
    name: 'Colourful Jigsaw Puzzle',
    category: 'puzzles-games',
    price: 699,
    tagline: 'A table-top project for patient puzzlers.',
    description:
      'A colourful jigsaw for older children who enjoy a longer challenge. Spread the pieces out, sort the edges, and work on it a little at a time — on your own or as a family.',
    images: [
      { src: p('1684773585761-fde68b4ece42'), alt: 'Colourful jigsaw puzzle pieces spread across a wooden table' },
      { src: detailCrop('1684773585761-fde68b4ece42', 0.5, 0.5, 2), alt: 'Close-up of jigsaw puzzle pieces' },
    ],
    ageLabel: '9 years+',
    ageGroups: ['9-plus'],
    tone: 'wood',
  },
  {
    id: 'p13',
    slug: 'wooden-brain-teaser',
    name: 'Wooden Brain Teaser',
    category: 'puzzles-games',
    price: 399,
    tagline: 'Take it apart. Now put it back.',
    description:
      'An interlocking wooden puzzle that comes apart into notched pieces. Getting it back together takes patience, spatial thinking and more than one attempt — which is exactly the point.',
    images: [
      { src: p('1649778977937-12381ec8f8f4'), alt: 'Hand holding a small interlocking wooden brain teaser puzzle', focus: '45% 50%' },
      { src: detailCrop('1649778977937-12381ec8f8f4', 0.47, 0.5, 2.4), alt: 'Close-up of the interlocking wooden pieces' },
    ],
    ageLabel: '8 years+',
    ageGroups: ['6-8', '9-plus'],
    material: 'Wood',
    tone: 'cream',
  },
  {
    id: 'p14',
    slug: 'rainbow-ring-stacker',
    name: 'Rainbow Ring Stacker',
    category: 'building-stacking',
    price: 699,
    tagline: 'Big to small, bottom to top.',
    description:
      'A stacking toy with rings in graded sizes and a rounded top piece. Stacking in order — and happily out of order — helps little ones explore size, colour and balance.',
    images: [
      { src: p('1629583908828-2cb711a77327'), alt: 'Rainbow ring stacking toy with a rounded wooden top', focus: '50% 45%' },
      { src: detailCrop('1629583908828-2cb711a77327', 0.5, 0.55, 2), alt: 'Close-up of the colourful stacking rings' },
    ],
    ageLabel: '1 year+',
    ageGroups: ['0-2'],
    featured: true,
    tone: 'sky',
  },
  {
    id: 'p15',
    slug: 'wooden-rainbow-arch',
    name: 'Wooden Rainbow Arch',
    category: 'building-stacking',
    price: 1199,
    tagline: 'Stack it, nest it, turn it into a tunnel.',
    description:
      'Nesting wooden arches in rainbow colours. Stack them into a rainbow, line them up as a tunnel, or use them as bridges, cradles and walls — an open-ended toy that grows with the child.',
    images: [
      { src: p('1536293182766-c9c0c4133b55'), alt: 'Small wooden rainbow arch toy on a white surface in soft light', focus: '50% 70%' },
      { src: detailCrop('1536293182766-c9c0c4133b55', 0.5, 0.72, 2.4), alt: 'Close-up of the nested rainbow arches' },
    ],
    ageLabel: '1 year+',
    ageGroups: ['0-2', '3-5'],
    material: 'Wood',
    tone: 'cream',
  },
  {
    id: 'p16',
    slug: 'alphabet-block-set',
    name: 'Alphabet Block Set',
    category: 'building-stacking',
    price: 899,
    tagline: 'Letters to stack, spell and topple.',
    description:
      'Wooden blocks printed with colourful letters. Build towers first and words later — the same blocks keep finding new uses as children grow.',
    images: [
      { src: p('1558907353-ceb54f3882ed'), alt: 'Stacked wooden alphabet blocks with colourful letters' },
      { src: detailCrop('1558907353-ceb54f3882ed', 0.5, 0.5, 1.8), alt: 'Close-up of the alphabet letters on the blocks' },
    ],
    ageLabel: '2 years+',
    ageGroups: ['0-2', '3-5'],
    material: 'Wood',
    tone: 'sky',
  },
  {
    id: 'p17',
    slug: 'painted-nesting-dolls',
    name: 'Painted Nesting Dolls',
    category: 'building-stacking',
    price: 1049,
    tagline: 'A doll inside a doll inside a doll.',
    description:
      'Brightly painted nesting dolls that open to reveal a smaller doll inside each one. Opening, ordering and nesting them again is a small puzzle in itself.',
    images: [
      { src: p('1790426538913-cd1b73a8cb3c'), alt: 'Set of brightly painted nesting dolls on a shelf', focus: '50% 45%' },
      { src: detailCrop('1790426538913-cd1b73a8cb3c', 0.55, 0.4, 2), alt: 'Close-up of the painted faces of the nesting dolls' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    featured: true,
    tone: 'coral',
  },
  {
    id: 'p18',
    slug: 'honey-teddy-bear',
    name: 'Honey Teddy Bear',
    category: 'plush',
    price: 1099,
    tagline: 'Soft, round and ready for bedtime.',
    description:
      'A classic soft teddy bear with a round face and a checked bow. The kind of bear that gets carried everywhere, tucked in every night and told every secret.',
    images: [
      { src: p('1602734846297-9299fc2d4703'), alt: 'Brown teddy bear with a checked bow on a warm orange background', focus: '50% 40%' },
      { src: detailCrop('1602734846297-9299fc2d4703', 0.5, 0.35, 2), alt: 'Close-up of the teddy bear’s face' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    featured: true,
    tone: 'orange',
  },
  {
    id: 'p19',
    slug: 'floppy-ear-bunny',
    name: 'Floppy-Ear Bunny',
    category: 'plush',
    price: 899,
    tagline: 'Long ears, soft paws, gentle face.',
    description:
      'A soft bunny with long floppy ears and a calm, sleepy face. A quiet companion for naps, car journeys and reading together.',
    images: [
      { src: p('1763832328828-86684ffc66b4'), alt: 'Soft plush bunny with long floppy ears sitting by a window', focus: '50% 50%' },
      { src: detailCrop('1763832328828-86684ffc66b4', 0.55, 0.45, 2), alt: 'Close-up of the plush bunny' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    tone: 'sand',
  },
  {
    id: 'p20',
    slug: 'bluebell-puppy-plush',
    name: 'Bluebell Puppy',
    category: 'plush',
    price: 949,
    tagline: 'A blue pup with very huggable ears.',
    description:
      'A cheerful blue puppy plush with big floppy ears. Bright enough to spot across the room, soft enough to fall asleep on.',
    images: [
      { src: p('1759990639053-80b6c7acb10b'), alt: 'Blue plush puppy sitting on green grass', focus: '50% 45%' },
      { src: detailCrop('1759990639053-80b6c7acb10b', 0.5, 0.42, 2), alt: 'Close-up of the blue puppy plush' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    tone: 'leaf',
  },
  {
    id: 'p21',
    slug: 'counting-abacus',
    name: 'Counting Abacus',
    category: 'creative-learning',
    price: 749,
    tagline: 'Slide, count, start again.',
    description:
      'A wooden-frame abacus with rows of colourful beads. Sliding beads across makes counting, adding and patterns visible — and satisfyingly clicky.',
    images: [
      { src: p('1548690596-f1722c190938'), alt: 'Wooden abacus with rows of colourful beads on a white background' },
      { src: detailCrop('1548690596-f1722c190938', 0.5, 0.5, 2), alt: 'Close-up of the abacus beads' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8'],
    tone: 'cream',
  },
  {
    id: 'p22',
    slug: 'rainbow-xylophone',
    name: 'Rainbow Xylophone',
    category: 'creative-learning',
    price: 999,
    tagline: 'Eight bright bars, endless tunes.',
    description:
      'A rainbow xylophone with a mallet for first music-making. Tap from one end to the other, invent a song, or play along to a favourite rhyme.',
    images: [
      { src: p('1509781827353-fb95c262fc40'), alt: 'Toddler playing a rainbow xylophone with a mallet', focus: '55% 50%' },
      { src: detailCrop('1509781827353-fb95c262fc40', 0.6, 0.55, 2), alt: 'Close-up of the rainbow xylophone bars' },
    ],
    ageLabel: '1 year+',
    ageGroups: ['0-2', '3-5'],
    featured: true,
    tone: 'mustard',
  },
  {
    id: 'p23',
    slug: 'chunky-crayon-jar',
    name: 'Chunky Crayon Jar',
    category: 'creative-learning',
    price: 349,
    tagline: 'A rainbow in a jar, ready to draw.',
    description:
      'A jar of colourful wax crayons for drawing, colouring and scribbling. Keep it on the table so ideas can be drawn the moment they arrive.',
    images: [
      { src: p('1594423701030-8b44bb1c92f9'), alt: 'Glass jar filled with colourful wax crayons' },
      { src: detailCrop('1594423701030-8b44bb1c92f9', 0.5, 0.35, 2), alt: 'Close-up of crayon tips in the jar' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8', '9-plus'],
    tone: 'sky',
  },
  {
    id: 'p24',
    slug: 'rainbow-modelling-clay',
    name: 'Rainbow Modelling Clay',
    category: 'creative-learning',
    price: 549,
    tagline: 'Squish, roll and shape a rainbow.',
    description:
      'Soft modelling clay in a rainbow of colours. Roll snakes, press shapes and sculpt tiny creatures — hands-on making that strengthens little fingers along the way.',
    images: [
      { src: p('1579018024219-fa9694ca5698'), alt: 'Child’s hands shaping a rainbow made of colourful modelling clay', focus: '50% 45%' },
      { src: detailCrop('1579018024219-fa9694ca5698', 0.55, 0.45, 2), alt: 'Close-up of the colourful clay rainbow' },
    ],
    ageLabel: '3 years+',
    ageGroups: ['3-5', '6-8', '9-plus'],
    featured: true,
    tone: 'coral',
  },
]

export const getProduct = (slug: string) => products.find((x) => x.slug === slug)
export const getProductById = (id: string) => products.find((x) => x.id === id)
export const featuredProducts = products.filter((x) => x.featured)

/** Category-based recommendations (simple, transparent logic). */
export function relatedProducts(product: Product, limit = 4) {
  const same = products.filter((x) => x.category === product.category && x.id !== product.id)
  const shared = products.filter(
    (x) => x.category !== product.category && x.ageGroups.some((a) => product.ageGroups.includes(a)),
  )
  return [...same, ...shared].slice(0, limit)
}
