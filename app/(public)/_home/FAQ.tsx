import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";




const FAQData = [
    {
        question: "Do you provide visa assistance?",
        answer: "Yes, our team provides complete visa assistance to make your travel easier. We guide you through the entire process, from filling out applications to preparing the required documents. Our experts also keep you updated on the latest visa rules and requirements for different countries. This way, you can avoid unnecessary stress and focus on planning your trip while we handle the paperwork."
    },
    {
        question: "Can I add friends or companions to my tour?",
        answer: "Absolutely! With our Tour Mate feature, you can add participants to your booking and enjoy the trip together. This means you don’t have to travel alone — you can share the experience with friends, family, or even new companions. Traveling with tour mates makes the journey more fun, creates lasting memories, and ensures that every destination feels more special when shared."
    },
    {
        question: "How does the smart search work?",
        answer: "Our smart search is designed to save you time and make planning simple. All you need to do is type in your preferred location or trip idea, and the system instantly shows you the most relevant destinations, packages, and deals. It is fast, easy to use, and ensures that you don’t waste time browsing through endless options. With clear results and smooth navigation, you can plan your next adventure in just a few clicks."
    },
    {
        question: "What happens if I need to cancel my booking?",
        answer: "We understand that plans can change, so we offer flexible cancellation policies. If you cancel at least 7 days before your trip, you are eligible for a full refund. For cancellations closer to the travel date, we provide partial refunds depending on the package. Our goal is to make sure you feel secure when booking with us, knowing that you have options if something unexpected comes up."
    },
    {
        question: "Is customer support available during the trip?",
        answer: "Yes, we provide 24/7 customer support to assist you at every step of your journey. Whether you face issues with flights, hotels, or local arrangements, our team is always ready to help. You can reach us anytime through phone, email, or chat, and we will make sure your travel experience stays smooth and enjoyable. Having round‑the‑clock support means you can travel with peace of mind."
    }
];





export default function FAQ() {
    return (
        <section className="space-y-9  ">
            <h1 className="text-5xl font-bold text-center text-[#FE9A00]">FAQ</h1>
            <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-1"
            >
                {FAQData.map((item, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                        <AccordionTrigger className="text-xl leading-relaxed font-bold">{item.question}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p className="leading-relaxed text-lg">{item.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}

            </Accordion>
        </section>
    )
}


