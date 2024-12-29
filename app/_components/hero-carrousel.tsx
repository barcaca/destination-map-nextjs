import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel'
import carrouselImage1 from '@/public/1-sean-oulashin-unsplash.jpg'
import carrouselImage2 from '@/public/2-johannes-krupinski-unsplash.jpg'
import carrouselImage3 from '@/public/3-holly-mandarich-unsplash.jpg'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    title: 'Explore praias paradisíacas"',
    image: carrouselImage1,
    alt: 'beira mar durante a hora dourada',
  },
  {
    id: 2,
    title: 'Descubra novos destinos',
    image: carrouselImage2,
    alt: 'uma vista de uma aldeia em um lado da montanha',
  },
  {
    id: 3,
    title: 'Planeje sua próxima aventura',
    image: carrouselImage3,
    alt: 'pessoa carregando mochila amarela e preta caminhando entre plantas verdes',
  },
]

const HeroCarrousel = () => {
  return (
    <div className="relative w-full" aria-label="Destaques do Destination Map">
      <Carousel opts={{ loop: true }} autoPlay autoPlayInterval={8000}>
        <CarouselContent>
          {slides.map(slide => {
            return (
              <CarouselItem key={slide.id}>
                <div className="relative overflow-hidden rounded-lg p-1">
                  <div className="relative h-[60vh] w-full overflow-hidden rounded-xl lg:h-[80vh]">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      className="object-cover"
                      priority
                      fill
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-center font-bold text-4xl text-white md:text-6xl">
                          {slide.title}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  )
}

export { HeroCarrousel }
