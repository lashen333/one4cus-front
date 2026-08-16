// src\features\home\components\lead-form-modal.tsx
//signup become aprovider form model

// src\features\home\components\lead-form-modal.tsx
"use client";

import { useState } from "react";

type LeadType = "provider" | "signup";

type LeadFormModalProps = {
  open: boolean;
  leadType: LeadType;
  onClose: () => void;
};

const FORM_COPY = {
  provider: {
    title: "Become a Provider",
    description: "Enter your details and our team will contact you.",
    buttonLabel: "Submit Provider Request",
  },
  signup: {
    title: "Sign Up",
    description: "Enter your details and our team will contact you.",
    buttonLabel: "Submit",
  },
};

export function LeadFormModal({ open, leadType, onClose }: LeadFormModalProps) {
  const [name, setName] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!open) return null;

  const copy = FORM_COPY[leadType];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatusMessage("");
    setIsSuccess(false);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CONTACT_WEBHOOK_URL;

      if (!webhookUrl) {
        throw new Error("Google Sheet webhook URL is not configured.");
      }

      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          formType: "lead",
          leadType,
          name,
          phoneOrEmail,
          sourcePage: window.location.pathname,
          userAgent: window.navigator.userAgent,
        }),
      });

      setIsSuccess(true);
      setStatusMessage("Submitted successfully. Our team will contact you soon.");
      setName("");
      setPhoneOrEmail("");
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-sm text-slate-500 hover:bg-slate-100"
          aria-label="Close form"
        >
          ✕
        </button>

        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">{copy.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{copy.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Name *</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone Number or Email *
            </label>
            <input
              value={phoneOrEmail}
              onChange={(event) => setPhoneOrEmail(event.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900"
              placeholder="Enter phone number or email"
            />
          </div>

          {statusMessage ? (
            <p
              className={`rounded-lg px-3 py-2 text-sm ${
                isSuccess ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}
            >
              {statusMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#1f78d1] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1471cd] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : copy.buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
