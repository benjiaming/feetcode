import { useEffect, useState } from 'react'
import './ImageCarousel.css'

type Image = { src: string };
type ImageCarouselProps = { images: Image[] };

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentImage, setCurrentImage] = useState(0)
    const nextImage = () => {
        setCurrentImage(prev => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage(prev => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        images.forEach(i => {
            const img = new Image()
            img.src = i.src
        })
    }, [images])

    return (
        <div className="carousel-images" style={{ backgroundImage: `url(${images[currentImage].src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="arrow" role="button" aria-label="Previous" onClick={prevImage}><span className="inner-arrow">&lt;</span></div>
            <div className="middle">
                {images.map((_, i) => <span key={i} aria-label={`Go to image ${i + 1}`} onClick={() => setCurrentImage(i)} className={i === currentImage ? "dot dot-current" : "dot"}>⋅</span>)}
            </div>
            <div className="arrow" role="button" aria-label="Next" onClick={nextImage}><span className="inner-arrow">&gt;</span></div>
        </div>
    );
}
