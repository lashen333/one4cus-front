// src\components\layout\site-footer.tsx
import { PageContainer } from "./page-container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <PageContainer className="py-10">
        <div className="flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 one4cus. All rights reserved.</p>
          <p>Public marketplace frontend</p>
        </div>
      </PageContainer>
    </footer>
  );
}