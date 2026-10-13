
const classes = [
  {
    id: 1,
    name: "Vinyasa Flow",
    type: "Yoga",
    day: "Monday",
    time: "08:00 – 09:00",
    instructor: "Hazem",
  },
  {
    id: 2,
    name: "Spin & Strength",
    type: "Cardio",
    day: "Tuesday",
    time: "10:00 – 11:00",
    instructor: "Aamir Gazian",
  },
  {
    id: 3,
    name: "Pilates Core",
    type: "Core",
    day: "Wednesday",
    time: "12:00 – 13:00",
    instructor: "Judith Lethuwa",
  },
  {
    id: 4,
    name: "HIIT Express",
    type: "HIIT",
    day: "Thursday",
    time: "17:00 – 18:00",
    instructor: "Aamir Gazian",
  },
];

export default function ClassSchedule() {
  return (
    <section
      id="schedule"
      className="bg-slate-100 px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-semibold uppercase tracking-widest text-lime-700">
          Find your session
        </p>

        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
          Weekly class schedule
        </h2>

        <p className="mt-3 max-w-2xl text-slate-600">
          Explore our sessions and find a time that works for you.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="rounded-full bg-lime-100 px-3 py-1 text-sm font-semibold text-lime-800">
                {item.type}
              </span>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {item.name}
              </h3>

              <p className="mt-4 font-semibold text-slate-800">
                {item.day}
              </p>

              <p className="mt-1 text-slate-600">{item.time}</p>

              <p className="mt-4 text-sm text-slate-500">
                Instructor: {item.instructor}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
