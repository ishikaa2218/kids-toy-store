import { ButtonLink } from '@/components/ui/Button'
import { Clay, ClayArch } from '@/components/ui/Clay'
import { MaskLines, Parallax, Reveal } from '@/components/ui/Motion'

const beliefs = [
  {
    title: 'Imagination leads',
    body: 'The best toys don’t tell children what to do. A wooden car can be a race, a delivery or a rescue — whatever the story needs today.',
  },
  {
    title: 'Hands first',
    body: 'Stacking, sorting, squishing and pouring are how little ones make sense of the world. We look for toys that invite touching.',
  },
  {
    title: 'Made to be shared',
    body: 'Tea parties need guests and races need rivals. We love toys that pull grown-ups, siblings and friends into the game.',
  },
]

export function Story() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden bg-cream py-20 lg:py-32">
      <div className="container-play grid items-center gap-14 lg:grid-cols-12">
        {/* clay sculpture: a stacked toy tower */}
        <div className="relative mx-auto h-[360px] w-full max-w-[460px] lg:col-span-5 lg:h-[520px]" aria-hidden>
          <Parallax distance={20} className="absolute bottom-0 left-[10%] h-[24%] w-[80%]">
            <Clay tone="olive" shape="pill" className="h-full w-full" />
          </Parallax>
          <Parallax distance={40} className="absolute bottom-[22%] left-[22%] h-[26%] w-[56%]">
            <Clay tone="mustard" shape="tile" className="h-full w-full -rotate-3" />
          </Parallax>
          <Parallax distance={60} className="absolute bottom-[46%] left-[18%] w-[64%]">
            <ClayArch bands={['coral', 'orange', 'mustard']} />
          </Parallax>
          <Parallax distance={85} className="absolute bottom-[78%] left-[40%] size-[20%]">
            <Clay tone="sky" shape="ball" className="h-full w-full" />
          </Parallax>
          <Parallax distance={30} className="absolute right-0 bottom-[6%] size-[12%]">
            <Clay tone="leaf" shape="pebble" className="h-full w-full" />
          </Parallax>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="t-hand text-[28px] text-coral">Why we love play</p>
          <MaskLines id="story-title" className="t-h2 mt-1" lines={['Toys that leave room', 'for the story']} />
          <ol className="mt-10 border-t-2 border-ink/10">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <li className="grid grid-cols-[3.5rem_1fr] gap-4 border-b-2 border-ink/10 py-6">
                  <span className="font-display text-[34px] leading-none font-extrabold text-mustard">{i + 1}</span>
                  <div>
                    <h3 className="t-h3">{b.title}</h3>
                    <p className="mt-2 max-w-[52ch] text-[16px] leading-relaxed text-ink-soft">{b.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <ButtonLink href="/about" variant="outline" className="mt-10">
            Read our story
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
