
export default function Subscribe() {
    return (
        <section className="shadow-2xl rounded-2xl py-18">
            <h1 className="text-5xl font-bold text-center text-[#FE9A00] mb-8">Subscribe to our newsletter</h1>
            <div className="flex gap-2 justify-center relative items-center ">
                {/* image
                <div className=" relative bg-black w-1/2">
                    <SendMailAnimation />
                </div> */}

                {/* form  */}
                <div className="flex flex-col gap-5 justify-center bg-[#F2F2F2] p-8 rounded-3xl shadow-sm h-fit">
                    <div className="flex flex-col gap-2 leading-relaxed text-lg">
                        <p className="text-slate-600">Get the latest news, discounts and updates on our services and promotions.</p>
                    </div>
                    <div className="">
                        <form className="flex gap-2">
                            <input type="email" placeholder="Enter your email" className="p-3 border border-gray-300 rounded-xl flex-1 bg-white" />
                            <button className="bg-[#FE9A00] hover:bg-[#e08900] text-white px-6 py-3 rounded-xl font-bold transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
