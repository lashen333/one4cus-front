// src\features\services\components\service-profile\service-provider-sidebar.tsx
import { RevealContactButton } from "@/components/shared/reveal-contact-button";
import { Button } from "@/components/ui/button";
import { getProviderInitials } from "@/lib/utils/image-fallbacks";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import type { ServiceDetailData } from "../../types/service-profile.types";

type ServiceProviderSidebarProps = {
  service: ServiceDetailData;
};

export function ServiceProviderSidebar({ service }: ServiceProviderSidebarProps) {
  const provider = service.provider;
  const initials = getProviderInitials(provider.name);
  const avatarSrc = provider.avatar?.trim() ? provider.avatar : null;

  return (
    <aside className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Service Provider</h2>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative size-16 overflow-hidden rounded-full bg-slate-100">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={provider.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#1677c8] text-xl font-bold text-white">
                {initials}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">{provider.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{provider.location}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 rounded-xl border border-slate-200 p-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Phone</span>
            <span className="font-semibold text-slate-900">{provider.phoneMasked}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">WhatsApp</span>
            <span className="font-semibold text-slate-900">{provider.whatsappMasked}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <RevealContactButton
            entityType="service"
            entitySlug={service.slug}
            sourceTitle={service.title}
          />

          <Button className="w-full">
            <span className="inline-flex items-center gap-2">
              <MessageSquare className="size-4" />
              Send Message
            </span>
          </Button>
        </div>

        {/*{provider.id ? (
          <Link
            href={`/providers/${provider.id}`}
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            View Full Provider Profile
          </Link>
        ) : null}
         */}
      </div>

      <div className="rounded-2xl border border-[#cfe1f5] bg-[#f6fbff] p-6">
        <h3 className="text-lg font-semibold text-slate-900">Need this service?</h3>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          Contact the provider to ask about availability, pricing, and service details.
        </p>
      </div>
    </aside>
  );
}
