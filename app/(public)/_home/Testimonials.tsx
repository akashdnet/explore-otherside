// components/Testimonials.tsx
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Johnson Hill",
    role: "CEO",
    company: "Insugent",
    text: "Excellence work shown that leads to long-term relationships. I’m grateful to professionals, expertise, and commitment to understanding client’s needs and our mission!",
    rating: 4.8,
    image: "/images/johnson.png",
  },
  {
    id: 2,
    name: "Parker Lane",
    role: "Lead Designer",
    company: "",
    text: "Your design team provides a better solution and meets the deadline for timely and cost-effective project management.",
    rating: 4.9,
    image: "/images/parker.png",
  },
  {
    id: 3,
    name: "Valentine",
    role: "CEO",
    company: "Insugent",
    text: "The design of each quality of the house delivered is beyond what we expected and the process was smooth. You are the best in the quality assurance design.",
    rating: 4.8,
    image: "/images/valentine.png",
  },
  {
    id: 4,
    name: "Garrett Oswald",
    role: "CEO",
    company: "Insugent",
    text: "Responsive team! Attentive and respect to bringing vision to life. Their team is professional, organized, and communicates well. We are thankful for our new house!",
    rating: 4.9,
    image: "/images/garrett.png",
  },
  {
    id: 5,
    name: "Unknown",
    role: "",
    company: "",
    text: "",
    rating: 0,
    image: "/images/unknown.png",
  },
];

export default function Testimonial() {
  return (
    <section className=" bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-[#FE9A00] dark:text-white tracking-tight mb-4">
          What Our Travelers Say
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Join thousands of happy travelers who found their perfect travel buddies.
        </p>
      </div>
      {/*  testimonial */}
      <div className="grid grid-cols-2 gap-14">
        <div className="flex gap-8 items-center">
          <Image className="rounded-4xl object-cover h-full" alt="image" src={"https://images.unsplash.com/photo-1675106565090-cc6f00672b50"} width={150} height={200} />
          <div className="space-y-7">
            <p>"Our friends’ adventure in Bandarban was full of fun and excitement. From booking to travel arrangements, everything was handled smoothly. We had the freedom to enjoy without worries, and the memories will stay with us forever."</p>
            <div className="flex justify-between">
              <div><h1 className="font-bold">Sami & Friends</h1>
                <h2 className="font-semibold">Bandarban Hills </h2></div>
              <div>
                <h1 className="font-extrabold text-center">4.3</h1>
                <p>⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 items-cover ">
          <Image className="rounded-4xl object-center h-full" alt="image" src={"https://images.unsplash.com/photo-1662013605218-1a695783dec2"} width={150} height={200} />
          <div className="space-y-7">
            <p>"As a solo traveler, the platform arranged my hotel perfectly. The forest trip was peaceful and safe, and I felt confident because everything was well-managed. Reading others’ positive stories gave me courage, and my own experience matched that trust."</p>
            <div className="flex justify-between">
              <div><h1 className="font-bold">Rohim Mia</h1>
                <h2 className="font-semibold">Sylhet Forest, Bangladesh</h2></div>
              <div>
                <h1 className="font-extrabold text-center">4.3</h1>
                <p>⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 items-center">

          <div className="space-y-7">
            <p>"Staying in a calm city was exactly what we needed. The hotel was comfortable, the staff attentive, and the environment peaceful. Thanks to the platform, our family enjoyed a stress-free and relaxing trip."</p>
            <div className="flex justify-between">
              <div><h1 className="font-bold">Karim Family </h1>
                <h2 className="font-semibold">Cox’s Bazar City  </h2></div>
              <div>
                <h1 className="font-extrabold text-center">4.3</h1>
                <p>⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
          <Image className="rounded-4xl object-cover h-full" alt="image" src={"https://images.unsplash.com/photo-1763257470279-fbf738d8e314"} width={150} height={200} />
        </div>
        <div className="flex gap-8 items-center">

          <div className="space-y-7">
            <p>"Our family cultural tour in Beijing was unforgettable. The guides explained traditions with care, the schedule was smooth, and every detail reflected professionalism. We felt connected to the culture and enjoyed every moment together."</p>
            <div className="flex justify-between">
              <div><h1 className="font-bold">Chen Family</h1>
                <h2 className="font-semibold">Beijing, China  </h2></div>
              <div>
                <h1 className="font-extrabold text-center">4.3</h1>
                <p>⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
          <Image className="rounded-4xl object-cover h-full" alt="image" src={"https://images.unsplash.com/photo-1767603308062-07ac70a9c689?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} width={150} height={200}

          />
        </div>
      </div>
    </section>
  );
}
