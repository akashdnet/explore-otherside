import BannerImage from "@/public/img/banner1.png"


export default function Banner() {
    return (
        <section
            className="w-full h-[300px] rounded-3xl "
            style={{
                backgroundImage: `url(${BannerImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}></section>
    )
}
