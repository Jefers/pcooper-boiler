import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';  // Keep only used icons

gsap.registerPlugin(ScrollTrigger);

const PCooperLanding = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar morph on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        onEnter: () => gsap.to(navbarRef.current, { backgroundColor: "rgba(46,64,54,0.6)", backdropFilter: "blur(12px)", borderColor: "rgba(204,88,51,0.2)", duration: 0.6, ease: "power3.out" }),
        onLeaveBack: () => gsap.to(navbarRef.current, { backgroundColor: "transparent", backdropFilter: "blur(0px)", borderColor: "transparent", duration: 0.6 }),
      });

      // Hero text stagger
      gsap.from(".hero-text", { y: 60, opacity: 0, stagger: 0.08, duration: 1.4, ease: "power3.out" });

      // Features entrance
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: ".features", start: "top 80%" },
        y: 80, opacity: 0, stagger: 0.15, duration: 1.2, ease: "power3.out"
      });

      // Philosophy reveal
      gsap.utils.toArray(".philosophy-line").forEach((line: any) => {
        gsap.from(line, {
          scrollTrigger: { trigger: line, start: "top 85%" },
          opacity: 0, y: 40, duration: 1.3, ease: "power3.out"
        });
      });

      // Protocol stacking (simplified)
      gsap.utils.toArray(".protocol-card").forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(card, { scale: 1 - progress * 0.1, opacity: 1 - progress * 0.5, filter: `blur(${progress * 20}px)`, zIndex: 10 - i });
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="noise pointer-events-none fixed inset-0 z-50" />

      {/* NAVBAR */}
      <nav
        ref={navbarRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-8 px-10 py-4 rounded-full bg-transparent border border-transparent backdrop-blur-none transition-all duration-700 shadow-xl"
      >
        <div className="text-2xl font-bold tracking-tight text-[#CC5833]">P. Cooper</div>
        <div className="hidden md:flex gap-10 text-sm font-medium">
          <a href="#services" className="hover:text-[#CC5833] transition-colors">Services</a>
          <a href="#about" className="hover:text-[#CC5833] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#CC5833] transition-colors">Contact</a>
        </div>
        <button className="group relative overflow-hidden px-8 py-4 rounded-full bg-[#CC5833] text-[#2E4036] font-semibold text-sm uppercase tracking-wider hover:scale-[1.03] transition-transform duration-500">
          <span className="absolute inset-0 bg-[#F2F0E9] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          <span className="relative z-10 flex items-center gap-2">
            Request a quote <ArrowRight size={16} />
          </span>
        </button>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative h-dvh flex items-end pb-32 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092160607-798f3f1f7e5e?auto=format&fit=crop&q=80&w=2000"  // dark forest moss ferns
            alt="Dark organic forest with moss and ferns"
            className="object-cover w-full h-full brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E4036] via-[#2E4036]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <h1 className="hero-text text-5xl md:text-8xl font-bold leading-none tracking-tight">
            Boiler Care
          </h1>
          <p className="hero-text drama text-6xl md:text-[12rem] leading-none text-[#CC5833] mt-2 opacity-90">
            is the foundation.
          </p>
          <p className="hero-text mt-8 text-xl md:text-3xl max-w-3xl font-light">
            Expert repairs and installations to keep your home running smoothly.
          </p>

          <button className="hero-text mt-12 group relative overflow-hidden px-12 py-6 rounded-3xl bg-[#CC5833] text-[#2E4036] font-semibold text-lg uppercase tracking-wider hover:scale-[1.04] transition-transform duration-700 shadow-2xl">
            <span className="absolute inset-0 bg-[#F2F0E9] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-3">
              Request a quote <ArrowRight size={20} />
            </span>
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features py-32 px-8 md:px-16 bg-[#2E4036]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="feature-card group relative bg-[#1A1A1A]/40 backdrop-blur-xl border border-[#CC5833]/10 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4">
            <h3 className="text-3xl font-bold mb-6 text-[#CC5833]">24/7 emergency services</h3>
            <p className="text-lg opacity-90">Rapid response when you need it most — no matter the hour.</p>
          </div>

          <div className="feature-card group relative bg-[#1A1A1A]/40 backdrop-blur-xl border border-[#CC5833]/10 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4">
            <h3 className="text-3xl font-bold mb-6 text-[#CC5833]">Eco-friendly plumbing solutions</h3>
            <p className="text-lg opacity-90">Sustainable options that reduce waste and lower your energy bills.</p>
          </div>

          <div className="feature-card group relative bg-[#1A1A1A]/40 backdrop-blur-xl border border-[#CC5833]/10 rounded-[2.5rem] p-10 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4">
            <h3 className="text-3xl font-bold mb-6 text-[#CC5833]">Guaranteed workmanship</h3>
            <p className="text-lg opacity-90">Every job backed by our promise of quality and reliability.</p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-40 px-8 md:px-16 bg-[#2E4036] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1581092160561-5f6e8d7c6e4f?auto=format&fit=crop&q=80&w=2000"  // organic textures moss ferns lab-like
            alt="Organic moss and fern texture"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-2xl md:text-4xl opacity-70 mb-12 philosophy-line">
            Most boiler services focus on: quick fixes and low prices.
          </p>
          <p className="drama text-5xl md:text-8xl leading-tight text-[#CC5833] philosophy-line">
            We focus on: <span className="text-[#F2F0E9]">sustainable reliability</span>.
          </p>
        </div>
      </section>

      {/* PROTOCOL - Stacking Cards */}
      <section className="relative">
        {[
          { num: "01", title: "Diagnosis", desc: "Thorough inspection using advanced tools to identify issues accurately." },
          { num: "02", title: "Eco-Repair", desc: "Efficient fixes with sustainable parts and methods." },
          { num: "03", title: "Test & Guarantee", desc: "Full system testing and our workmanship promise." }
        ].map((step, i) => (
          <div
            key={i}
            className="protocol-card h-dvh sticky top-0 flex items-center justify-center px-8 bg-[#2E4036] border-t border-[#CC5833]/10"
            style={{ zIndex: 10 - i }}
          >
            <div className="max-w-4xl text-center">
              <div className="mono text-[#CC5833] text-6xl mb-8 opacity-50">{step.num}</div>
              <h2 className="text-6xl md:text-9xl font-bold mb-12">{step.title}</h2>
              <p className="text-2xl md:text-4xl opacity-80 max-w-3xl mx-auto">{step.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-40 px-8 md:px-16 bg-[#2E4036] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-bold mb-12">Keep Your Home Warm & Efficient</h2>
          <button className="group relative overflow-hidden px-16 py-8 rounded-3xl bg-[#CC5833] text-[#2E4036] font-bold text-2xl uppercase tracking-widest hover:scale-[1.04] transition-all duration-700 shadow-2xl">
            <span className="absolute inset-0 bg-[#F2F0E9] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-4">
              Request a quote <ArrowRight size={32} />
            </span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-8 md:px-16 bg-[#2E4036] rounded-t-[4rem] border-t border-[#CC5833]/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-bold text-[#CC5833] mb-4">P. Cooper</h3>
            <p className="opacity-70">Expert repairs and installations to keep your home running smoothly.</p>
          </div>
          <div className="mono text-sm opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              System Operational
            </div>
          </div>
          <div className="text-right">
            <p className="opacity-50 text-sm">© {new Date().getFullYear()} P. Cooper Boiler Service</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PCooperLanding;