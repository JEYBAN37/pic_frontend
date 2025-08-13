import ReactMarkdown from "react-markdown";


export function CustomSlide({ title, text }: { title?: string; text?: string; }) {
    return (
        <div className="px-8 py-4">
            <h1 className="hover:text-blue-600 text-xl sm:text-3xl font-bold text-green-600">
                {title}
            </h1>
            <div className="text-sm font-normal text-gray-500 py-4 whitespace-pre-line"> <ReactMarkdown>{text}</ReactMarkdown></div>
        </div>
    );
}

export interface SlideData {
    title: string;
    text: string;
}


export function SlidesList({ slides }: { slides: SlideData[] }) {
    return (
        <div>
            {slides.map((slide, idx) => (
                <CustomSlide
                    key={idx}
                    title={slide.title}
                    text={slide.text}
                />
            ))}
        </div>
    );
}

// Ejemplo de uso:
// <SlidesList slides={slidesData} />