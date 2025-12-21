import { tours } from '@/utils/dummy-data'
import TourCardGroup from '../TourCardGroup'
import Banner from './Banner'
import FAQ from './FAQ'
import Hero from './Hero'
import Steps from './Steps'
import Subscribe from './Subscribe'
import Testimonials from './Testimonials'
import WhyChooseUs from './WhyChooseUs'

export default function HomePage() {
    return (
        <>
            <Hero />
            <Steps />
            <Banner />
            <TourCardGroup title="Explore, Match and Travel" data={tours} row={4} />
            <Testimonials />
            <WhyChooseUs />
            <FAQ />
            <Subscribe />
        </>
    )
}
