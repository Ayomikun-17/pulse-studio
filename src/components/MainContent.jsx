import { useState } from "react";
import trainers from "../data/trainers.js";
import TrainerCard from "./TrainerCard";

export default function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    <section id="trainers" className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-12">
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

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <p className="mt-6 text-slate-600">
            No trainers found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
