// src\features\legal\components\legal-section.tsx
import type { LegalSection as LegalSectionType } from "../types/legal.types";

type LegalSectionProps = {
  section: LegalSectionType;
};

export function LegalSection({ section }: LegalSectionProps) {
  return (
    <section className="border-b border-slate-200 py-8 last:border-b-0">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{section.title}</h2>

      {section.paragraphs ? (
        <div className="mt-5 space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.id} className="text-base leading-8 text-slate-600">
              {paragraph.text}
            </p>
          ))}
        </div>
      ) : null}

      {section.subsections ? (
        <div className="mt-6 space-y-7">
          {section.subsections.map((subsection) => (
            <div key={subsection.id}>
              <h3 className="text-lg font-semibold text-slate-900">{subsection.title}</h3>

              {subsection.paragraphs ? (
                <div className="mt-3 space-y-3">
                  {subsection.paragraphs.map((paragraph) => (
                    <p key={paragraph.id} className="text-base leading-8 text-slate-600">
                      {paragraph.text}
                    </p>
                  ))}
                </div>
              ) : null}

              {subsection.items ? (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-slate-600">
                  {subsection.items.map((item) => (
                    <li key={item.id}>{item.text}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
