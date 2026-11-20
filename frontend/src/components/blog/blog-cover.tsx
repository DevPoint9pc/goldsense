import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/utils";

interface BlogCoverProps {
  image: ImageAsset | null;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function BlogCover({ image, sizes, priority, className }: BlogCoverProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-gs-sand", className)}>
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
        />
      )}
    </div>
  );
}
