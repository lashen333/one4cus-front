import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";

type ProviderRatingProps = {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
  centered?: boolean;
};

export function ProviderRating({
  rating,
  reviewCount,
  size = "md",
  centered = false,
}: ProviderRatingProps) {
  const totalStars = 5;

  return (
    <div className={cn("flex flex-col gap-1", centered && "items-center justify-center")}>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalStars }).map((_, index) => {
          const filled = index < Math.round(rating);

          return (
            <Star
              key={index}
              className={cn(
                size === "sm" ? "size-4" : "size-5",
                filled ? "fill-[#1f78d1] text-[#1f78d1]" : "fill-slate-200 text-slate-200",
              )}
            />
          );
        })}
      </div>

      {typeof reviewCount === "number" ? (
        <p className="text-sm text-slate-500">{reviewCount} Reviews</p>
      ) : null}
    </div>
  );
}
