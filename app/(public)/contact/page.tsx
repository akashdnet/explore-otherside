
import ContactForm from './ContactForm';
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';

export default function ContactPage() {
    return (
        <main className='space-y-9'>
            <ContactHeader />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <ContactInfo />
                <ContactForm />
            </div>
        </main>
    );
}
