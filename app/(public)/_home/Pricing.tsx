import { Check, CheckCircle2 } from "lucide-react";

export default function Pricing() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Choose the plan that's right for your travel needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Free Adventurer</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Perfect for getting started.</p>

          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-extrabold text-slate-900 dark:text-white">$0</span>
            <span className="text-slate-500">/month</span>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Check className="size-5 text-green-500 shrink-0" />
              <span>Create a Profile</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Check className="size-5 text-green-500 shrink-0" />
              <span>Browse Travelers</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Check className="size-5 text-green-500 shrink-0" />
              <span>Create up to 5 Trips</span>
            </li>

          </ul>

          <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold h-12 rounded-xl transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative p-8 md:p-10 bg-slate-900 dark:bg-blue-600 rounded-[2.5rem] shadow-2xl text-white overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold">Premium Traveler</h3>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">Popular</span>
            </div>
            <p className="text-slate-300 dark:text-blue-100 mb-8">Unlock unlimited possibilities.</p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-extrabold">$9.99</span>
              <span className="text-slate-400 dark:text-blue-200">/month</span>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-blue-400 dark:text-white shrink-0" />
                <span><span className="font-semibold text-white">Include Every thing in free.</span></span>
              </li>

              <li className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-blue-400 dark:text-white shrink-0" />
                <span><span className="font-semibold text-white">Unlimited Trips Create</span></span>
              </li>

            </ul>

            <button className="w-full bg-white text-slate-900 font-bold h-12 rounded-xl hover:bg-slate-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}