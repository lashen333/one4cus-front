"use client";

import { appMessages } from "@/lib/constants/messages";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("App route error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Unexpected error
          </p>

          <h1 className="text-2xl font-semibold text-neutral-900">
            {appMessages.general.somethingWentWrong}
          </h1>

          <p className="text-sm leading-6 text-neutral-600">{appMessages.general.tryAgainLater}</p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}
