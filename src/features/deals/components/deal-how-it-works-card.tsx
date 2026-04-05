// src\features\deals\components\deal-how-it-works-card.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function DealHowItWorksCard() {
  return (
    <section className="pt-10 pb-16">
      <div className="grid gap-6 rounded-2xl bg-[#eef5fb] p-8 lg:grid-cols-[1fr_320px] lg:items-center">
        <div>
          <h3 className="text-3xl font-semibold text-slate-900">How it Works</h3>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-500">
            Learn about our extraction process and how your capital is utilized to generate high
            returns.
          </p>
          <div className="mt-6">
            <Button>Watch Explainer Video</Button>
          </div>
        </div>

        <div className="flex h-44 items-center justify-center rounded-xl bg-black">
          <button
            type="button"
            className="inline-flex size-14 items-center justify-center rounded-full bg-white text-slate-900"
          >
            <ArrowRight className="size-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
