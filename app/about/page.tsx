import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink } from '@/components/ui/Button'
import { Clay, ClayArch } from '@/components/ui/Clay'
import { ClipReveal, MaskLines, Parallax, Reveal } from '@/components/ui/Motion'
import { brand } from '@/config/brand'
import { unsplash } from '@/lib/unsplash'

export const metadata: Metadata = {
  title: 'Our Story',
  description: `How ${brand.name} thinks about play — open-ended toys, hands-on discovery and toys that are made to be shared.`,
  alternates: { canonical: '/about' },
}

const principles = [
  {
    t: 'Open-ended first',
    d: 'We favour toys that can be many things — a block that becomes a phone, a bridge or a birthday cake. The fewer instructions, the more room for imagination.',
    tone: 'bg-mustard',
  },
  {
    t: 'Made for real hands',
    d: 'Chunky pieces, satisfying weights and textures worth touching. Toys should invite grabbing, stacking, squishing and pouring.',
    tone: 'bg-sky',
  },
  {
    t: 'Chosen with grown-ups in mind',
    d: 'Clear age guidance, honest descriptions and toys that look lovely on a shelf — because the people buying them deserve straightforward information.',
    tone: 'bg-coral text-ivory',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div className="container-play grid items-center gap-12 py-14 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="t-hand text-[30px] text-coral">Hello, we’re {brand.name}</p>
            <MaskLines as="h1" trigger="mount" className="t-display mt-2" lines={['Play is how', 'children think']} lineClasses={['', 'text-olive']} />
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-ink-soft">
                {brand.name} is an online toy shop built around one simple idea: the best toys give children space to invent, build, care and
                create — and give the grown-ups around them something to join in with.
              </p>
            </Reveal>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-6">
            <Clay tone="leaf" shape="blob" className="absolute -top-4 -left-6 h-[40%] w-[46%]" />
            <ClipReveal from="center" className="absolute inset-[6%] mask-blob">
              <div className="relative h-full w-full">
                <Image src={unsplash('1608701451601-dc70a6a79449')} alt="Young child playing with a wooden dollhouse" fill priority sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
              </div>
            </ClipReveal>
            <Parallax distance={30} className="absolute right-0 bottom-[4%] w-[34%] rotate-6">
              <ClayArch bands={['mustard', 'coral', 'sky']} />
            </Parallax>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="bg-olive py-20 text-ivory lg:py-28">
        <div className="container-play grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-hand text-[28px] text-mustard">Our approach to play</p>
            <MaskLines id="approach-title" className="t-h2 mt-1 text-ivory" lines={['Less noise,', 'more wonder']} />
          </div>
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-ivory/85 lg:col-span-6 lg:col-start-7">
            <p>
              Children learn by doing. When they stack rings, pour pretend tea or puzzle out where a piece goes, they are testing ideas about size,
              balance, cause and effect — and having a lovely time doing it.
            </p>
            <p>
              So we look for toys that leave the story to the child: simple shapes, warm materials, bright but considered colour. Toys that work
              just as well on the first day as they do months later, when the game has changed completely.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="philosophy-title" className="bg-cream py-20 lg:py-28">
        <div className="container-play">
          <p className="t-hand text-[28px] text-coral">How we choose</p>
          <MaskLines id="philosophy-title" className="t-h2 mt-1" lines={['Our product philosophy']} />
          <ul className="mt-12 grid gap-5 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.t} className={i === 1 ? 'lg:translate-y-10' : ''}>
                <Reveal delay={i * 0.08} className={`h-full rounded-[28px] p-8 ${p.tone}`}>
                  <span className="font-display text-[44px] leading-none font-extrabold opacity-60">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-[28px] leading-tight font-bold">{p.t}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed opacity-90">{p.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Play in pictures" className="grid grid-cols-2 lg:grid-cols-4">
        {[
          { id: '1596066190600-3af9aadaaea1', alt: 'Young boy exploring toys on a white table in a playroom' },
          { id: '1626187429639-7a77bfad0523', alt: 'Child placing coloured pegs into a wooden board' },
          { id: '1784397367452-b93462145f55', alt: 'Natural wooden building blocks stacked on a table' },
          { id: '1687708522434-6197bb47c933', alt: 'Plush dinosaur and soft toys in a bright playroom' },
        ].map((im, i) => (
          <ClipReveal key={im.id} from={i % 2 ? 'left' : 'up'} delay={i * 0.06} className="relative aspect-[4/5]">
            <div className="relative h-full w-full">
              <Image src={unsplash(im.id)} alt={im.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </ClipReveal>
        ))}
      </section>

      <section className="bg-mustard py-20 text-center lg:py-24">
        <div className="container-play">
          <MaskLines className="t-h2" lines={['Ready to find their', 'next favourite?']} />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/shop">Shop all toys</ButtonLink>
            <ButtonLink href="/contact" variant="ivory">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
