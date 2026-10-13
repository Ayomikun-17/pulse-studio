
const memberships = [
  {
    id: 1,
    name: "Starter",
    price: 399,
    description: "A great start to your fitness journey.",
    features: [
      "8 classes per month",
      "Open gym access",
      "Locker access",
    ],
    featured: false,
  },
  {
    id: 2,
    name: "Regular",
    price: 699,
    description: "For people ready to build consistency.",
    features: [
      "Unlimited classes",
      "Open gym access",
      "Free fitness assessment",
      "Bring a friend",
    ],
    featured: true,
  },
  {
    id: 3,
    name: "Elite",
    price: 1099,
    description: "More support for reaching your goals.",
    features: [
      "Unlimited classes",
      "4 personal training sessions",
      "Nutrition guidance",
      "Priority booking",
    ],
    featured: false,
  },
];

function MembershipCard({ plan }) {
  return (
    <article
      className={`flex flex-col rounded-2xl border p-6 ${
        plan.featured
          ? "border-lime-400 bg-slate-950 text-white shadow-xl"
          : "border-slate-200 bg-white text-slate-900 shadow-sm"
      }`}
    >
      {plan.featured && (
        <span className="mb-4 w-fit rounded-full bg-lime-400 px-3 py-1 text-xs font-bold uppercase text-slate-950">
          Most popular
        </span>
      )}

      <h3 className="text-2xl font-bold">{plan.name}</h3>

      <p
        className={`mt-2 text-sm ${
          plan.featured ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {plan.description}
      </p>

      <p className="mt-6 text-4xl font-black">
        R{plan.price}
        <span className="text-base font-normal"> / month</span>
      </p>

      <ul className="mt-6 flex-1 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="font-bold text-lime-600">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`mt-8 rounded-lg px-5 py-3 text-center font-bold transition ${
          plan.featured
            ? "bg-lime-400 text-slate-950 hover:bg-lime-300"
            : "bg-slate-950 text-white hover:bg-slate-800"
        }`}
      >
        Choose {plan.name}
      </a>
    </article>
  );
}

export default function Membership() {
  return (
    <section id="membership" className="bg-white px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-semibold uppercase tracking-widest text-lime-700">
            Membership plans
          </p>

          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Invest in yourself
          </h2>

          <p className="mt-4 text-slate-600">
            Choose a plan that suits your goals, routine, and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {memberships.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
