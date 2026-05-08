// src\components\shared\reveal-contact-button.tsx
//contact number reveal
"use client";

import { Phone } from "lucide-react";
import { useState } from "react";

type RevealContactButtonProps = {
  entityType: "service" | "deal" | "provider";
  entitySlug: string;
  sourceTitle: string;
};

export function RevealContactButton({
  entityType,
  entitySlug,
  sourceTitle,
}: RevealContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorContact, setVisitorContact] = useState("");
  const [revealedContact, setRevealedContact] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleReveal() {
    setErrorMessage("");

    if (!visitorName.trim() || !visitorContact.trim()) {
      setErrorMessage("Please add your name and phone number or email.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact-reveal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entityType,
          entitySlug,
          sourceTitle,
          visitorName,
          visitorContact,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Failed to reveal contact.");
      }

      setRevealedContact(result.data.revealedContact);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to reveal contact.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#1f78d1] text-sm font-medium text-[#1f78d1] transition hover:bg-blue-50"
      >
        <Phone className="size-4" />
        Reveal Phone Number
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Reveal Contact Number</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Add your details to view the provider contact number.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {revealedContact ? (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-700">Contact Number</p>
                <p className="mt-1 text-2xl font-bold text-green-800">{revealedContact}</p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Your Name</label>
                  <input
                    value={visitorName}
                    onChange={(event) => setVisitorName(event.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#1f78d1]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Phone Number or Email
                  </label>
                  <input
                    value={visitorContact}
                    onChange={(event) => setVisitorContact(event.target.value)}
                    type="text"
                    placeholder="Enter phone number or email"
                    className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#1f78d1]"
                  />
                </div>

                {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

                <button
                  type="button"
                  onClick={handleReveal}
                  disabled={isSubmitting}
                  className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#1f78d1] text-sm font-medium text-white transition hover:bg-[#1768b7] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Reveal Number"}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
