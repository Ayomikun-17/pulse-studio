
import { useEffect, useState } from "react";
import TrainerCard from "./TrainerCard";
import QuantityStepper from "./QuantityStepper";

const API_URL = "http://localhost:5000/api/trainers";

export default function MainContent() {
  const [trainers, setTrainers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sessionCounts, setSessionCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load trainers.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The API returned unexpected data.");
        }

        setTrainers(data);
      } catch (err) {
        console.error("Error fetching trainers:", err);
        setError(
          "Unable to load trainers. Please check that the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchTrainers();
  }, []);

  const categories = [
    "All",
    "Strength",
    "Muscle",
    "Cardio",
    "Mobility",
    "Boxing",
  ];

  const filteredTrainers =
    selectedCategory === "All"
      ? trainers
      : trainers.filter(
          (trainer) => trainer.category === selectedCategory
        );

  return (
    <section
      id="trainers"
      className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-semibold uppercase tracking-widest text-lime-700">
            Meet the team
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Train with the best
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Find a trainer who matches your goals, from strength training
            to cardio and mobility.
          </p>
        </div>

        {loading && (
          <p className="text-slate-600" role="status">
            Loading trainers...
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-red-700" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="mb-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-lime-400 text-slate-950"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredTrainers.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTrainers.map((trainer) => (
                  <div key={trainer.id} className="flex flex-col">
                    <TrainerCard trainer={trainer} />

                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
                      <p className="mb-3 text-sm font-semibold text-slate-700">
                        Sessions to plan
                      </p>

                      <QuantityStepper
                        value={sessionCounts[trainer.id] ?? 0}
                        onChange={(newValue) =>
                          setSessionCounts((previous) => ({
                            ...previous,
                            [trainer.id]: newValue,
                          }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-slate-600">
                No trainers found in this category.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
