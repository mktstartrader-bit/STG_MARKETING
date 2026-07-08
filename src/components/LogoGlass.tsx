import Image from "next/image";

type LogoGlassProps = {
  className?: string;
  priority?: boolean;
};

/**
 * STG Marketing glass monogram (glossy 3D render). Its dark background is
 * keyed to transparent so the neon glow blends onto the dark canvas. Used as
 * the hero centerpiece; the navbar/footer use the flat mark (Logo).
 */
export default function LogoGlass({ className, priority = false }: LogoGlassProps) {
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
