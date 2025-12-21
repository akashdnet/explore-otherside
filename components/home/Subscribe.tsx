import SendMailAnimation from "../AnimatedIcons/SendMail";

export default function Subscribe() {
    return (
        <section>
            <h1 className="text-5xl font-bold text-center text-[#FE9A00]">Subscribe to our newsletter</h1>
            <div className="grid grid-cols-2 items-center ">
                {/* image  */}
                <SendMailAnimation />

                {/* form  */}
                <div className="flex flex-col gap-5 justify-center bg-[#F2F2F2] h-2/3 p-5 rounded">
                    <div className="flex flex-col gap-2 leading-relaxed text-lg">
                        <p>Get the latest news, discounts and updates on our services and promotions.</p>
                    </div>
                    <div className="">
                        <form className="flex gap-2">
                            <input type="email" placeholder="Enter your email" className="p-2 border border-gray-300 rounded flex-1" />
                            <button className="bg-[#FE9A00] text-white p-2 rounded">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
