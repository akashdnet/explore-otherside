
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
    const faqs = [
        {
            question: "How do I join a trip?",
            answer: "Simply create an account, browse the Explore Trips page, and click 'Request to Join' on any trip that interests you. The trip organizer will review your request.",
        },
        {
            question: "Is it safe to travel with strangers?",
            answer: "We prioritize safety by verifying user profiles. We recommend chatting with the organizer and other participants before the trip to ensure everyone is a good fit.",
        },
        {
            question: "Can I create my own trip?",
            answer: "Absolutely! Once you're signed in, go to your dashboard and click 'Create Trip'. You can set the destination, budget, dates, and itinerary.",
        },
        {
            question: "What happens if a trip is cancelled?",
            answer: "If an organizer cancels a trip, all participants are notified immediately. We encourage organizers to communicate clearly with their group.",
        },
        {
            question: " Is there a fee to use the platform?",
            answer: "Creating an account and exploring trips is free. Some advanced features or premium trips may have associated costs.",
        }
    ];

    return (
        <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12 space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Everything you need to know about finding your travel buddy.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-100">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 dark:text-slate-400">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
