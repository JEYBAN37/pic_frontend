interface Slide {
  title: string;
  text: string;
  img: string;
}

interface CarouselProps {
  items: Slide[];
  speed?: number; // píxeles por segundo
}

export default function InfiniteCarousel({ items, speed = 50 }: CarouselProps) {
  const doubledItems = [...items, ...items]; // duplicamos para el loop

  // ancho aproximado de cada slide (en px) incluyendo gap
  const slideWidth = 293.23; // ajusta según tu diseño real
  const gapWidth = 32; // gap-8 = 2rem = 32px
  const totalWidth = (slideWidth + gapWidth) * items.length;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex gap-8"
        style={{
          animation: `scroll ${totalWidth / speed}s linear infinite`
        }}
      >
        {doubledItems.map((slide, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-1/3 flex flex-col bg-white rounded-2xl border border-gray-300 shadow-xl "
          >
            <div className="h-40 w-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="rounded-t-2xl w-full h-full object-cover"
              />
            </div>
            <h1 className="text-blue-500 hover:text-[#a5cd6a] font-bold text-xl px-4 mt-4">
              {slide.title}
            </h1>
            <p className="text-gray-600 text-sm p-4 text-balance">{slide.text}</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${totalWidth}px);
          }
        }
      `}</style>
    </div>
  );
}
