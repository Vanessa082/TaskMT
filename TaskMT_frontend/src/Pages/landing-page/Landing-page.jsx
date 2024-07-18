import Footer from "../../Component/Common/footer";
import Navbar from "../../Component/Spercific/Navbar/Navbar";
import Herosection from "./heroSection";
import Subscribe from "./subscribe";
import Tblog from "./tblog";
import Testimonial from "./testimonial";

export default function LandingPage() {
    return (
        <>
            <Navbar />

            <main className="w-full flex flex-col font-sans">
               <Herosection/>
               <Tblog/>
               <Subscribe />
               <Testimonial />
               <Footer />
            </main>

            <footer className=""></footer>
        </>
    )
}