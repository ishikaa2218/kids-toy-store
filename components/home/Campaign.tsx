import Image from 'next/image'
import { ButtonLink } from '@/components/ui/Button'
import { Clay } from '@/components/ui/Clay'
import { MaskLines, Parallax, Reveal, ScrollMask } from '@/components/ui/Motion'
import { Block3D } from '@/components/ui/Block3D'
import { unsplash } from '@/lib/unsplash'

/** Full-bleed colour-and-photo blocks, after the WOODIC campaign grid. */
export function Campaign() {
  return (
    <section aria-label="Featured collections" className="grid lg:grid-cols-2">
      {/* Row 1 */}
      <ScrollMask className="relative min-h-[380px] overflow-hidden bg-wood lg:min-h-[600px]">
        <Parallax distance={40} className="absolute -inset-y-[8%] inset-x-0">
          <Image
            src={unsplash('1560859251-d563a49c5e4a')}
            alt="Wooden sailboat toys on wheels with peg-doll sailors"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: '50% 62%' }}
          />
        </Parallax>
      </ScrollMask>
      <div className="relative flex flex-col justify-center overflow-hidden bg-mustard px-[var(--gutter)] py-16 lg:px-16 lg:py-20">
        <span aria-hidden className="absolute top-10 right-10 [perspective:600px] lg:top-14 lg:right-16">
          <span className="float-a block [transform-style:preserve-3d] [transform:rotateX(-18deg)_rotateY(-34deg)]">
            <span className="block [animation:kh-spin_18s_linear_infinite] [transform-style:preserve-3d]">
              <Block3D size="clamp(48px,5vw,72px)" tone="coral" faces={{ front: 'W', right: 'O', back: 'O', left: 'D' }} />
            </span>
          </span>
        </span>
        <Clay tone="leaf" shape="pill" className="absolute right-24 bottom-12 h-6 w-20 rotate-[-20deg]" />
        <MaskLines
          className="font-display text-[clamp(44px,5.6vw,92px)] leading-[0.92] font-[850]"
          lines={['A world of', 'wooden toys']}
          lineClasses={['text-coral', 'text-olive-deep']}
        />
        <Reveal>
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-ink/80">
            Cars with animal drivers, rolling sailboats and parades of chunky shapes — toys with a warm, solid feel in small hands.
          </p>
          <ButtonLink href="/shop?category=wooden-toys" className="mt-8">
            Shop wooden toys
          </ButtonLink>
        </Reveal>
      </div>

      {/* Row 2 */}
      <div className="relative order-4 flex flex-col justify-center overflow-hidden bg-coral px-[var(--gutter)] py-16 text-ivory lg:order-3 lg:px-16 lg:py-20">
        <Clay tone="mustard" shape="blob" className="absolute -bottom-10 -left-8 h-36 w-48 rotate-12" />
        <MaskLines
          className="relative font-display text-[clamp(44px,5.6vw,92px)] leading-[0.92] font-[850] text-mustard"
          lines={['Little chefs,', 'big adventures']}
          lineClasses={['', 'text-ivory']}
        />
        <Reveal className="relative">
          <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-ivory/90">
            Play kitchens, cooktops and tea parties for serving up pretend breakfasts, picnics and very important guests.
          </p>
          <ButtonLink href="/shop?category=pretend-play" variant="ivory" className="mt-8">
            Shop pretend play
          </ButtonLink>
        </Reveal>
      </div>
      <ScrollMask className="relative order-3 min-h-[380px] overflow-hidden bg-sand lg:order-4 lg:min-h-[600px]">
        <Parallax distance={40} className="absolute -inset-y-[8%] inset-x-0">
          <Image
            src={unsplash('1624895672076-adeb9a79c589')}
            alt="Toy cooktop with a pan holding a play egg and a small pot"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </Parallax>
      </ScrollMask>
    </section>
  )
}
