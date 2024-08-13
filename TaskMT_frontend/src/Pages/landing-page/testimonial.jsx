import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faTwitter, faGithub, faDev, faReddit } from '@fortawesome/free-brands-svg-icons';

const TestimonialItems = [
    {
        image: "/assets/img1.jpeg",
        quote: {
            text: "This is an amazing System!",
            author: "Wah Vanessa",
        },
    },
    {
        image: "/assets/img2.jpeg",
        quote: {
            text: "I would highly recommend this.",
            author: "Ayuk Gires",
        },
    },
    {
        image: "/assets/img3.jpg",
        quote: {
            text: "A must-have for everyone.",
            author: "Alice Johnson",
        },
    },
];

export default function Testimonial() {
    return (
        <div className="flex flex-col items-center py-10">
            <h2 className="text-text-color-2 text-4xl font-sans text-center font-bold pb-4">What People Say about TaskMT</h2>

            <div className="flex flex-col  items-center gap-4 py-10  px-8 w-7/12">
                {TestimonialItems.map(({ image, quote }, index) => (
                    <div key={index} className="flex border border-black/15 mb-5 items-center rounded-lg transition-all duration-300 shadow-[2px_2px_3px_rgba(0,0,0,0.4)] p-10 w-full gap-10 hover:animate-bounce">
                        <img src={image} alt={`testimonial ${index + 1}`} className="size-16 object-cover rounded-full" />
                        <blockquote>
                            <p>{quote.text}</p>
                            <footer>{quote.author}</footer>
                        </blockquote>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center">
                <h2 className="text-text-color-2 text-4xl font-sans text-center font-bold pb-4">Spread The Word</h2>
                <div className="flex item-center justify-between gap-4">
                    <FontAwesomeIcon icon={faTwitter} size="2x" className="text-cyan-300" />
                    <FontAwesomeIcon icon={faGithub} size="2x" className="text-gray-700" />
                    <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-blue-400" />
                    <FontAwesomeIcon icon={faFacebook} size="2x" className="text-blue-500" />
                    <FontAwesomeIcon icon={faDev} size="2x" className="text-gray-950" />
                    <FontAwesomeIcon icon={faReddit} size="2x" className="text-red-500"/>
                </div>
            </div>
        </div>
    )
}