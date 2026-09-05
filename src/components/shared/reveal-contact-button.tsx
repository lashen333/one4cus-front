// src\components\shared\reveal-contact-button.tsx
//contact number reveal
// src/components/shared/reveal-contact-button.tsx
"use client";

import { pushToDataLayer } from "@/lib/analytics/gtm";
import { Phone } from "lucide-react";
import { useState } from "react";

type RevealContactButtonProps = {
  entityType: "service" | "deal" | "provider";
  entitySlug: string;
  sourceTitle: string;
  pageName?: string;
  sectionName?: string;
};

export function RevealContactButton({
  entityType,
  entitySlug,
  sourceTitle,
  pageName = "profile_page",
  sectionName,
}: RevealContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorContact, setVisitorContact] = useState("");
  const [revealedContact, setRevealedContact] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trackingSectionName =
    sectionName ?? (entityType === "deal" ? "deals_category" : "service_category");

  const formId = `form_reveal_number_${entityType}`;

  async function handleReveal() {
    setErrorMessage("");

    if (!visitorName.trim() || !visitorContact.trim()) {
      setErrorMessage("Please add your name and phone number or email.");
      return;
    }

    pushToDataLayer({
      event: "reveal_number_submit",
      page_name: pageName,
      section_name: trackingSectionName,
      element_name: "btn_reveal_number_submit",
      form_id: formId,
      entity_type: entityType,
      entity_slug: entitySlug,
      source_title: sourceTitle,
    });

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

      pushToDataLayer({
        event: "reveal_number_success",
        page_name: pageName,
        section_name: trackingSectionName,
        element_name: "btn_reveal_number_submit",
        form_id: formId,
        entity_type: entityType,
        entity_slug: entitySlug,
        source_title: sourceTitle,
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to reveal contact.");

      pushToDataLayer({
        event: "reveal_number_error",
        page_name: pageName,
        section_name: trackingSectionName,
        element_name: "btn_reveal_number_submit",
        form_id: formId,
        entity_type: entityType,
        entity_slug: entitySlug,
        source_title: sourceTitle,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          pushToDataLayer({
            event: "reveal_number_open",
            page_name: pageName,
            section_name: trackingSectionName,
            element_name: "btn_reveal_number_open",
            form_id: formId,
            entity_type: entityType,
            entity_slug: entitySlug,
            source_title: sourceTitle,
          });

          setIsOpen(true);
        }}
        data-page-name={pageName}
        data-section-name={trackingSectionName}
        data-element-name="btn_reveal_number_open"
        data-form-id={formId}
        data-entity-type={entityType}
        data-entity-slug={entitySlug}
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
              <form
                id={formId}
                name={formId}
                data-page-name={pageName}
                data-section-name={trackingSectionName}
                data-element-name={formId}
                data-form-id={formId}
                data-entity-type={entityType}
                data-entity-slug={entitySlug}
                onSubmit={(event) => {
                  event.preventDefault();
                  handleReveal();
                }}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-slate-700">Your Name</label>
                  <input
                    name="visitor_name"
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
                    name="visitor_contact"
                    value={visitorContact}
                    onChange={(event) => setVisitorContact(event.target.value)}
                    type="text"
                    placeholder="Enter phone number or email"
                    className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-[#1f78d1]"
                  />
                </div>

                {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-page-name={pageName}
                  data-section-name={trackingSectionName}
                  data-element-name="btn_reveal_number_submit"
                  data-form-id={formId}
                  data-entity-type={entityType}
                  data-entity-slug={entitySlug}
                  className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#1f78d1] text-sm font-medium text-white transition hover:bg-[#1768b7] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Reveal Number"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
