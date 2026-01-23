import AgendaAnimation from "../../../components/AnimatedIcons/Agenda";
import ShareWithFriendsAnimation from "../../../components/AnimatedIcons/ShareWithFriends";
import SignUpAnimation from "../../../components/AnimatedIcons/SignUp";

const steps = [
  {
    icon: SignUpAnimation,
    title: 'Create Profile',
    description: 'Sign up and tell us about your travel style and interests.',
  },
  {
    icon: AgendaAnimation,
    title: 'Post a Trip or Join a Trip',
    description: 'Share your upcoming travel dates and destinations.',
  },
  {
    icon: ShareWithFriendsAnimation,
    title: 'Match & Travel',
    description: 'Connect with buddies and start your adventure together.',
  },
]

export default function Steps() {
  return (
    <section className="bg-[#F2F2F2] dark:bg-slate-900/50 rounded-3xl py-20 px-10 lg:px-16 text-center my-10">
      <div className="max-w-2xl mx-auto ">
        <h2 className="text-5xl font-bold text-[#FE9A00] dark:text-white tracking-tight mb-4">
          How its works
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Start your journey in 3 simple steps. It's easier than you think to find the perfect travel companion.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">

        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-slate-200 via-blue-200 to-slate-200 dark:from-slate-700 dark:via-blue-900 dark:to-slate-700 border-t-2 border-dashed border-slate-300 dark:border-slate-700 z-0 " />

        {steps.map((step, idx) => {
          const Icon = step.icon;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div className="flex items-center justify-center size-40 rounded-full bg-white dark:bg-slate-800 shadow-xl mb-6 group-hover:-translate-y-2 transition-transform duration-300 border border-slate-100 dark:border-slate-700 ">
                <div className="rounded-full bg-blue-50 flex items-center justify-center text-blue-600 dark:text-blue-400  ">
                  <Icon />
                </div>
              </div>
              <h3 className="font-bold text-xl text-[#FE9A00] dark:text-white mb-3">{step.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}