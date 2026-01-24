import { Review, Trip } from '@/lib/types'
import TourCardGroup from '../../../components/TourCardGroup'
import Banner from './Banner'
import FAQ from './FAQ'
import FeaturedDestinations from './FeaturedDestinations/FeaturedDestinations'
import Hero from './Hero'
import Steps from './Steps'
import Subscribe from './Subscribe'
import Testimonials from './Testimonials'
import TravelStats from './TravelStats'
import TravelTips from './TravelTips'
import WhyChooseUs from './WhyChooseUs'

export default function HomePage({ trips, reviews }: { trips: Trip[], reviews: Review[] }) {
    return (
        <div className="flex flex-col gap-24">
            <Hero />
            <Steps />
            <TourCardGroup title="Explore, Match and Travel" data={trips} row={4} exploreButton />
            <Banner />
            <FeaturedDestinations />
            <TravelStats />
            <TravelTips />
            <Testimonials />
            <WhyChooseUs />
            <FAQ />
            <Subscribe />
        </div>
    )
}
