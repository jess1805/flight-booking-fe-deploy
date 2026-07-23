import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageSquareHeart, Plane, Send, PartyPopper } from "lucide-react";
import { primaryButtonClass, secondaryButtonClass } from "../../styles/sharedStyles";

// mirrors backend categories
const FEEDBACK_CATEGORIES = [
  "Comfort",
  "Delay",
  "Food",
  "Crew",
  "Check-in",
  "Cleanliness",
  "Baggage",
] as const;

const feedbackSchema = z.object({
  flightNumber: z.string().min(1, "Flight number is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  category: z.enum(FEEDBACK_CATEGORIES, { message: "Please select a category" }),
  rating: z.number({ message: "Please select a rating" }).min(1).max(5),
  feedback: z.string().min(10, "Please share a bit more detail (at least 10 characters)"),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

const fieldClass =
  "w-full rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-slate-900 " +
  "transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

const fieldLabelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const fieldErrorClass = "mt-1 text-sm text-red-600";

export function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeedbackForm>({ resolver: zodResolver(feedbackSchema) });

  function onSubmit() {
    setSubmitted(true);
    reset();
  }

  // dismiss modal
  function handleDismissModal() {
    setSubmitted(false);
  }

  function handleGoToHomepage() {
    setSubmitted(false);
    navigate("/");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600">
            <MessageSquareHeart size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Share your feedback</h1>
            <p className="mt-2 text-slate-400">
              Tell us how your flight went — every bit helps us improve.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="flightNumber" className={fieldLabelClass}>
                  Flight number
                </label>
                <input
                  id="flightNumber"
                  placeholder="e.g. AI203"
                  {...register("flightNumber")}
                  className={fieldClass}
                />
                {errors.flightNumber && (
                  <p className={fieldErrorClass}>{errors.flightNumber.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className={fieldLabelClass}>
                  Category
                </label>
                <select
                  id="category"
                  defaultValue=""
                  {...register("category")}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {FEEDBACK_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className={fieldErrorClass}>{errors.category.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="origin" className={fieldLabelClass}>
                  Origin
                </label>
                <input
                  id="origin"
                  placeholder="e.g. DEL"
                  {...register("origin")}
                  className={fieldClass}
                />
                {errors.origin && <p className={fieldErrorClass}>{errors.origin.message}</p>}
              </div>

              <div>
                <label htmlFor="destination" className={fieldLabelClass}>
                  Destination
                </label>
                <input
                  id="destination"
                  placeholder="e.g. BOM"
                  {...register("destination")}
                  className={fieldClass}
                />
                {errors.destination && (
                  <p className={fieldErrorClass}>{errors.destination.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="rating" className={fieldLabelClass}>
                  Rating
                </label>
                <select
                  id="rating"
                  defaultValue=""
                  {...register("rating", { valueAsNumber: true })}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Select a rating
                  </option>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value} / 5
                    </option>
                  ))}
                </select>
                {errors.rating && <p className={fieldErrorClass}>{errors.rating.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="feedback" className={fieldLabelClass}>
                Feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                placeholder="Tell us about your experience…"
                {...register("feedback")}
                className={fieldClass}
              />
              {errors.feedback && <p className={fieldErrorClass}>{errors.feedback.message}</p>}
            </div>

            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 font-semibold text-white transition duration-200 hover:bg-teal-700"
            >
              <Send size={16} />
              Submit feedback
            </button>
          </form>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-teal-500">
          <Plane size={16} />
          <span className="text-sm">Thank you for helping us fly better.</span>
        </div>
      </div>

      {submitted && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-thanks-title"
          className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 px-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600">
              <PartyPopper size={26} className="text-white" />
            </div>
            <h2 id="feedback-thanks-title" className="mt-5 text-xl font-bold text-slate-900">
              Thanks for sharing your feedback!
            </h2>
            <p className="mt-2 text-sm text-slate-600">Go to homepage?</p>
            <div className="mt-4 flex flex-col gap-3">
              <button onClick={handleGoToHomepage} className={primaryButtonClass + " w-full"}>
                Yes
              </button>
              <button onClick={handleDismissModal} className={secondaryButtonClass + " w-full"}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
