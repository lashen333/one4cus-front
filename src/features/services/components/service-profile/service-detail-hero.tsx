// src\features\services\components\service-profile\service-detail-hero.tsx
import Image from "next/image";
import type { ServiceDetailData } from "../../types/service-profile.types";

type ServiceDetailHeroProps = {
  service: ServiceDetailData;
};

export function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-90 w-full bg-slate-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#e6f0fb] px-3 py-1 text-sm font-semibold text-[#1f78d1]">
            {service.category}
          </span>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
            {service.statusLabel}
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {service.title}
        </h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Location</p>
            <p className="mt-1 text-sm text-slate-500">{service.location}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Starting Rate</p>
            <p className="mt-1 text-sm text-slate-500">{service.priceLabel}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Availability</p>
            <p className="mt-1 text-sm text-slate-500">{service.availabilityLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
