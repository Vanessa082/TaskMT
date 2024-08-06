export default function Subscribe() {
    return (
            <div className="gap-8 flex  flex-col items-center justify-between text-text-color-1 bg-custom-gradient transition-all duration-300 ease-custom-cubic py-10" >
                <h2 className="font-sans text-4xl">Just let go of your thoughts.</h2>
                <p>To keep your mind clear, add a task to your project for today or schedule it for a later time.</p>
                <form action="">
                    <input type="text" />
                    <button>Subscribe to Tblog</button>
                </form>
            </div>
    )
}