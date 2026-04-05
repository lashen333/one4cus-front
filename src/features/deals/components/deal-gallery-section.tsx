// src\features\deals\components\deal-gallery-section.tsx
import Image from "next/image";
import type { DealGalleryItem } from "../types/deals.types";

type DealGallerySectionProps = {
  items: DealGalleryItem[];
};

export function DealGallerySection({ items }: DealGallerySectionProps) {
  return (
    <section className="pt-10">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-semibold text-slate-900">Photo Gallery</h3>
        <button type="button" className="text-sm font-semibold text-[#1f78d1] hover:underline">
          View All Photos
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="relative h-40 overflow-hidden rounded-xl bg-slate-100">
            <Image src={item.image} alt={item.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
