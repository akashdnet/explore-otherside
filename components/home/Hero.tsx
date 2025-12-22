import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative  ">

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div suppressHydrationWarning className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Plan Smarter, Travel Better <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FE9A00] to-[#FE9A00]">
                Explore Outside
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Discover amazing destinations and connect with fellow travelers. Share journeys, reduce costs, and create unforgettable memories together with Explore Outside.
            </p>
          </div>


          {/* Search Box */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-xl max-w-md w-full flex items-center gap-2">
            <div className="pl-3 text-slate-400">
              <Search className="size-5" />
            </div>
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 bg-transparent border-none foc text-slate-900 dark:text-white placeholder:text-slate-400 h-12"
            />
            <button className="bg-[#FE9A00] hover:bg-[#FE9A00] text-white font-semibold h-10 px-6 rounded-xl transition-colors">
              Search
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span>Popular:</span>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full cursor-pointer hover:bg-slate-200 transition">Bali</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full cursor-pointer hover:bg-slate-200 transition">Paris</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full cursor-pointer hover:bg-slate-200 transition">Kyoto</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative lg:h-[600px] w-full hidden lg:block">
          <div className="absolute inset-0 bg-linear-to-tr from-[#FE9A00]/20 to-[#FE9A00]/20 rounded-[3rem] transform rotate-3 scale-95" />
          <div
            className="absolute inset-0 bg-cover bg-center rounded-[3rem] shadow-2xl"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop')`
            }}
          >
            <div className="absolute inset-0 bg-black/10 rounded-[3rem]" />
          </div>

          {/* Floating Cards (Optional Decor) */}
          <div className="absolute -bottom-8 -left-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce hover:animate-none transition-all duration-500" style={{ animationDuration: '3s' }}>
            <div className="size-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">🌿</div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Eco Trips</p>
              <p className="text-xs text-slate-500">Trending now</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}