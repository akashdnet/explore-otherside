import Image from "next/image";

export default function StatsGridLayout() {
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-4 p-6">
            <div className=" h-48 shadow-2xl p-4 rounded-lg  flex flex-col justify-center items-center">
                {/* <h2 className="font-bold">Row 1 - Col A</h2> */}
                <Image
                    src={"/img/users.gif"}
                    width={50}
                    height={50}
                    alt="icon"
                />
                <p className="font-bold text-2xl">600+</p>
                <p className="font-bold">Happy Travelers</p>
            </div>
            <div
                className=" row-span-2 bg-green-200 p-4 rounded-lg shadow"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1699554204687-93ce87c6c880')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* <h2 className="font-bold">Row 1 - Col B</h2> */}
            </div>
            <div className="  p-4 rounded-lg  flex flex-col justify-center items-center shadow-2xl">
                {/* <h2 className="font-bold">Row 1 - Col C</h2> */}
                {/* <LocationEdit className="w-10 h-10" /> */}
                <Image
                    src={"/img/location.gif"}
                    width={50}
                    height={50}
                    alt="icon"
                />
                <p className="font-bold text-2xl">1.2K+</p>
                <p className="font-bold">Destinations</p>
            </div>
            <div
                className=" bg-pink-200 p-4 rounded-lg shadow"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1758272959994-f1a4beffa257')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* <h2 className="font-bold">Row 1 - Col D</h2> */}
            </div>
            <div className=" shadow-2xl p-4 rounded-lg flex flex-col justify-center items-center">
                {/* <h2 className="font-bold">Row 2 - Col A</h2> */}
                <Image
                    src={"/img/events.gif"}
                    width={50}
                    height={50}
                    alt="icon"
                />
                <p className="font-bold text-2xl">100+</p>
                <p className="font-bold">Trips Organized</p>
            </div>
            <div className="col-span-2  p-4 rounded-lg shadow-2xl flex justify-between items-center">
                {/* <h2 className="font-bold">Row 2 - Col B</h2> */}
                <span className="font-bold">Our Guides <br />are experienced <br />and over the world. </span>
                <Image
                    src={"/img/ntwrk.png"}
                    width={300}
                    height={200}
                    alt="icon"
                />
            </div>



        </div>
    );
}
