const logos = ["Flutter", "React Native", "Laravel", "Python", "Next.js", "AWS", "Figma", "Kotlin"];

export function LogoMarquee() {
  const items = [...logos, ...logos];
  return (
    <div className="relative z-10 bg-navy py-7" data-nav-surface="dark">
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-20 pr-20 text-[15px] font-semibold tracking-[0.18em] text-white/80 uppercase">
          {items.map((logo, index) => (
            <span key={`${logo}-${index}`} className="whitespace-nowrap">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
