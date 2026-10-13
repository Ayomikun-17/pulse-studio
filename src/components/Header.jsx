
export default function Header() {
  return (
    <header className="bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <a href="#home" className="text-2xl font-black tracking-tight">
          PULSE<span className="text-lime-400">.</span>
        </a>

        <div className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-sm sm:gap-x-6">
          <a href="#home" className="hover:text-lime-400">Home</a>
          <a href="#trainers" className="hover:text-lime-400">Trainers</a>
          <a href="#membership" className="hover:text-lime-400">Membership</a>
          <a href="#contact" className="hover:text-lime-400">Contact</a>
        </div>
      </nav>
    </header>
  );
}
