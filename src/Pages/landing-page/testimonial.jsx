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
    <div className="flex flex-col items-center py-10 px-4 lg:px-8">
      <h2 className="text-primary-color text-4xl font-bold text-center mb-8">
        What People Say About TaskMT
      </h2>

      <div className="flex flex-col items-center gap-8 lg:w-10/12">
        {TestimonialItems.map(({ image, quote }, index) => (
          <div key={index} className="flex items-start border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-lg gap-6 bg-white transition-transform transform hover:scale-105">
            <img src={image} alt={`testimonial ${index + 1}`} className="w-16 h-16 object-cover rounded-full" />
            <blockquote className="flex flex-col">
              <p className="text-lg text-text-color-2">{quote.text}</p>
              <footer className="mt-2 text-sm text-gray-600">— {quote.author}</footer>
            </blockquote>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-12">
        <h2 className="text-primary-color text-3xl font-bold text-center mb-4">
          Spread The Word
        </h2>
        <div className="flex gap-6">
          <FontAwesomeIcon icon={faTwitter} size="2x" className="text-cyan-300 hover:text-cyan-400 transition-colors duration-200" />
          <FontAwesomeIcon icon={faGithub} size="2x" className="text-gray-700 hover:text-gray-800 transition-colors duration-200" />
          <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-blue-400 hover:text-blue-500 transition-colors duration-200" />
          <FontAwesomeIcon icon={faFacebook} size="2x" className="text-blue-500 hover:text-blue-600 transition-colors duration-200" />
          <FontAwesomeIcon icon={faDev} size="2x" className="text-gray-800 hover:text-gray-900 transition-colors duration-200" />
          <FontAwesomeIcon icon={faReddit} size="2x" className="text-red-500 hover:text-red-600 transition-colors duration-200" />
        </div>
      </div>
    </div>
  );
}
