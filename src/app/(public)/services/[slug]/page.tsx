// src\app\(public)\services\[slug]\page.tsx
type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-[calc(100vh-128px)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Service Detail: {slug}
        </h1>
      </div>
    </main>
  );
}