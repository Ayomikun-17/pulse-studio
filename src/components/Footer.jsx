
export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 px-5 py-12 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <a href="#home" className="text-2xl font-black">
            PULSE<span className="text-lime-400">.</span>
          </a>

          <p className="mt-4 max-w-sm leading-7 text-slate-400">
            Move better. Feel stronger. Show up. Build healthy habits
            and work towards your fitness goals with Pulse Studio.
          </p>
        </div>

        <div>
          <h2 className="font-bold">Explore</h2>

          <ul className="mt-4 space-y-3 text-slate-400">
            <li><a href="#home" className="hover:text-lime-400">Home</a></li>
            <li><a href="#trainers" className="hover:text-lime-400">Our trainers</a></li>
            <li><a href="#schedule" className="hover:text-lime-400">Class schedule</a></li>
            <li><a href="#membership" className="hover:text-lime-400">Membership</a></li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold">Contact & hours</h2>

          <p className="mt-4 text-slate-400">
            Email: info@pulsestudio.example
          </p>

          <p className="mt-3 text-slate-400">
            Monday – Friday: 06:00 – 20:00
          </p>

          <p className="mt-2 text-slate-400">
            Saturday – Sunday: 07:00 – 15:00
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-sm text-slate-500">
        © {new Date().getFullYear()} Pulse Studio. All rights reserved.
      </div>
    </footer>
  );
}
