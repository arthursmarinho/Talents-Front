import Image from "next/image";

export default function HeroContent() {
  return (
    <div className="relative w-full h-screen hidden sm:block">
      <Image
        src="/login/hero.jpg"
        alt="login image"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
