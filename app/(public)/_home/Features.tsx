import { Lock, Map, MessageSquareHeart, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Profiles',
    description: 'Travel safely with verified user identities and social connections.'
  },
  {
    icon: Lock,
    title: 'Secure Matching',
    description: 'Your privacy is our priority. Smart matching algorithms keep you safe.'
  },
  {
    icon: Map,
    title: 'Trip Itineraries',
    description: 'Plan your trip together with shared itineraries and budget tools.'
  },
  {
    icon: MessageSquareHeart,
    title: 'Community Reviews',
    description: 'Read reviews from other travelers to find the best buddies.'
  },
]

export default function Features() {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Why Choose TravBud?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            We're not just a travel app. We're a community dedicated to making solo travel safer, more fun, and accessible to everyone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <Icon className="size-8 text-blue-600 mb-4" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Feature Image / Decoration */}
        <div className="relative h-[600px] hidden lg:block rounded-[3rem] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1887&auto=format&fit=crop')` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
        </div>
      </div>
    </section>
  )
}