import Card from './Cad'

export default function FeaturedDestinations() {
  const fPost = ["https://images.unsplash.com/photo-1631817658262-ec3c440ef159", "https://images.unsplash.com/photo-1504896287989-ff1fbde00199?q=80", "https://images.unsplash.com/photo-1542897643-cfccd88c7127"]
  return (
    <section className='space-y-10'>
      <div>
        <h1 className="text-5xl font-bold text-center text-[#FE9A00]">Featured Destinations</h1>
        <p className='text-foreground text-center'> Featured Destinations are quick highlights of top travel spots, showing key details at a glance. </p>
      </div>
      <div className='grid grid-cols-3 gap-10'>
        {fPost.map((post, i) => (
          <Card src={post} key={i} />
        ))}
      </div>
    </section>
  )
}
