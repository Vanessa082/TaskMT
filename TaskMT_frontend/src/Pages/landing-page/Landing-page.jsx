import Herosection from "./heroSection";
import Subscribe from "./subscribe";
import Tblog from "./tblog";
import Testimonial from "./testimonial";

export default function LandingPage() {
  return (
    <>
      <main className="w-full flex flex-col font-sans bg-text-color-1">
        <Herosection />
        <Tblog />
        <Subscribe />
        <Testimonial />
      </main>
    </>
  )
}