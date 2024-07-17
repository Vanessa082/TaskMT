import Navbar from "../../Component/Spercific/Navbar/Navbar";
import landing from "../../../public/assets/landing.svg"

export default function LandingPage() {
    return (
        <>
        <Navbar />
        <main>
            <div>
                <p>Welcome to TaskMT</p>
                <p>Unlock Your Full Portential</p>
            </div>
                <img src={landing} alt={Landing_icon} />
        </main>
        </>
    )
}