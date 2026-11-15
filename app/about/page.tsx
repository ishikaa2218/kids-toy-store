import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink } from '@/components/ui/Button'
import { MaskLines, Reveal } from '@/components/ui/Motion'
import { brand } from '@/config/brand'
import { unsplash } from '@/lib/unsplash'

export const metadata: Metadata = {
  title: 'About Us',
  description: `How ${brand.name} thinks about play — open-ended toys, hands-on discovery and toys that are made to be shared.`,
  alternates: { canonical: '/about' },
}

const principles = [
  {
    t: 'Open-ended first',
    d: 'We favour toys that can be many things — a block that becomes a phone, a bridge or a birthday cake. The fewer instructions, the more room for imagination.',
    dot: 'bg-butter',
  },
  {
    t: 'Made for real hands',
    d: 'Chunky pieces, satisfying weights and textures worth touching. Toys should invite grabbing, stacking, squishing and pouring.',
    dot: 'bg-sky',
  },
  {
    t: 'Chosen with grown-ups in mind',
    d: 'Clear age guidance, honest descriptions and toys that look lovely on a shelf — because the people buying them deserve straightforward information.',
    dot: 'bg-tangerine',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="container-play grid items-center gap-12 pt-12 pb-20 lg:grid-cols-12 lg:pt-20 lg:pb-28">
          <div className="lg:col-span-6">
            <p className="t-eyebrow text-tangerine-deep">About Us</p>
            <MaskLines as="h1" trigger="mount" className="t-display mt-4" lines={['Play is how', 'children think']} />
            <Reveal delay={0.3}>
              <p className="t-lead mt-6 max-w-[46ch]">
                {brand.name} is an online toy shop built around one simple idea: the best toys give children space to invent, build, care and
                create — and give the grown-ups around them something to join in with.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="relative lg:col-span-6">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-panel)] bg-oat">
              <Image
                src={unsplash('1608701451601-dc70a6a79449')}
                alt="Young child playing with a wooden dollhouse"
                fill
                priority
                sizes="(min-width:1024px) 600px, 92vw"
                className="object-cover"
              />
            </div>
            <Image src="/clay/house.webp" alt="" width={160} height={142} unoptimized aria-hidden className="absolute -bottom-8 -left-4 w-24 rotate-[-8deg] sm:w-28" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="panel py-20 lg:py-28">
        <div className="container-play grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-eyebrow text-tangerine-deep">Our approach to play</p>
            <MaskLines id="approach-title" className="t-h2 mt-4" lines={['Less noise,', 'more wonder']} />
          </div>
          <Reveal className="space-y-5 text-[17px] leading-relaxed text-ink-soft lg:col-span-6 lg:col-start-7 lg:text-[18px]">
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

        <div className="container-play mt-20 border-t border-line pt-16 lg:mt-24 lg:pt-20">
          <h2 className="t-h2">How we choose</h2>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <li key={p.t}>
                <Reveal delay={i * 0.08}>
                  <span className={`grid size-12 place-items-center rounded-full font-display text-[20px] font-semibold ${p.dot}`}>{i + 1}</span>
                  <h3 className="t-h3 mt-5">{p.t}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{p.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <ul aria-label="Play in pictures" className="container-wide mt-20 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-4">
          {[
            { id: '1596066190600-3af9aadaaea1', alt: 'Young boy exploring toys on a white table in a playroom' },
            { id: '1626187429639-7a77bfad0523', alt: 'Child placing coloured pegs into a wooden board' },
            { id: '1784397367452-b93462145f55', alt: 'Natural wooden building blocks stacked on a table' },
            { id: '1687708522434-6197bb47c933', alt: 'Plush dinosaur and soft toys in a bright playroom' },
          ].map((im, i) => (
            <li key={im.id}>
              <Reveal delay={i * 0.06} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-tile)] bg-oat">
                <Image src={unsplash(im.id)} alt={im.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-paper pb-24 text-center lg:pb-32">
        <div className="container-play">
          <MaskLines className="t-h2" lines={['Ready to find their', 'next favourite?']} />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/shop">Shop all toys</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
