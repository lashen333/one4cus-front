import { appMessages } from "@/lib/constants/messages";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">404 error</p>

          <h1 className="text-2xl font-semibold text-neutral-900">Page not found</h1>

          <p className="text-sm leading-6 text-neutral-600">{appMessages.general.notFound}</p>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
