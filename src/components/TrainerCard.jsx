
export default function TrainerCard({ trainer }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={trainer.image}
        alt={trainer.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <span className="rounded-full bg-lime-100 px-3 py-1 text-sm font-semibold text-lime-800">
          {trainer.category}
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-900">
          {trainer.name}
        </h3>

        <p className="mt-2 text-slate-600">
          {trainer.specialty}
        </p>

        <p className="mt-3 text-sm text-slate-500">
          Schedule: {trainer.schedule}
        </p>
      </div>
    </article>
  );
}
