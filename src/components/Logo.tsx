import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

/**
 * STG Marketing glass monogram. The render's dark background is keyed to
 * transparent so the neon glow blends onto the dark canvas.
 */
export default function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/brand/stg-glass-t.png"
      alt="STG Marketing LLC"
      width={899}
      height={1231}
      priority={priority}
      className={className}
    />
  );
}
