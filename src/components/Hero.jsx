
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[480px] items-center bg-slate-950 bg-cover bg-center px-5 py-20 text-white sm:px-8 lg:px-12"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(2,6,23,0.95), rgba(2,6,23,0.55)), url('/images/hero-bg.jpg')",
      }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="font-semibold uppercase tracking-[0.25em] text-lime-400">
          Welcome to Pulse Studio
        </p>

        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
          Move better. Feel stronger. Show up.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
          Build strength, improve your fitness, and find a community that
          keeps you moving towards your goals.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#membership"
            className="rounded-lg bg-lime-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-lime-300"
          >
            Join Pulse
          </a>

          <a
            href="#trainers"
            className="rounded-lg border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            Meet Our Trainers
          </a>
        </div>
      </div>
    </section>
  );
}
