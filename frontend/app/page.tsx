"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Cpu,
  Clipboard,
  TrendingUp,
  Search,
  Target,
  Share2,
  Code2,
  Users,
  CheckCircle,
  XCircle,
  Zap,
  Star,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";


const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Patterns", href: "#patterns" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const features = [
  {
    emoji: "🧩",
    title: "Pattern Detector",
    desc: "AI identifies which of 8 core patterns applies — and explains exactly why, building your intuition problem by problem.",
    glow: "rgba(124,58,237,0.15)",
    glowStrong: "rgba(124,58,237,0.7)",
    border: "rgba(124,58,237,0.3)",
    hoverBorder: "#7c3aed",
  },
  {
    emoji: "🌳",
    title: "Decision Tree Engine",
    desc: "Step-by-step questions that reveal why one algorithm beats another for this exact problem, not just in general.",
    glow: "rgba(6,182,212,0.15)",
    glowStrong: "rgba(6,182,212,0.7)",
    border: "rgba(6,182,212,0.3)",
    hoverBorder: "#06b6d4",
  },
  {
    emoji: "🔬",
    title: "Code Autopsy",
    desc: "Paste broken code. Get a line-by-line breakdown of logic errors, edge cases, and time/space complexity issues.",
    glow: "rgba(244,63,94,0.15)",
    glowStrong: "rgba(244,63,94,0.7)",
    border: "rgba(244,63,94,0.3)",
    hoverBorder: "#f43f5e",
  },
  {
    emoji: "🧠",
    title: "Pattern Brain",
    desc: "A visual map of your thinking — shows which patterns you recognize instantly and where your blind spots still lurk.",
    glow: "rgba(245,158,11,0.15)",
    glowStrong: "rgba(245,158,11,0.7)",
    border: "rgba(245,158,11,0.3)",
    hoverBorder: "#f59e0b",
  },
  {
    emoji: "🗃️",
    title: "Knowledge Vault",
    desc: "Every analyzed problem auto-generates a personal memory card. Your entire DSA brain, saved and searchable forever.",
    glow: "rgba(16,185,129,0.15)",
    glowStrong: "rgba(16,185,129,0.7)",
    border: "rgba(16,185,129,0.3)",
    hoverBorder: "#10b981",
  },
  {
    emoji: "🎯",
    title: "Guided Thinking Mode",
    desc: "AI never gives the answer. It asks Socratic questions until you arrive at the solution yourself — true deep learning.",
    glow: "rgba(99,102,241,0.15)",
    glowStrong: "rgba(99,102,241,0.7)",
    border: "rgba(99,102,241,0.3)",
    hoverBorder: "#6366f1",
  },
];

const steps = [
  {
    num: "01",
    Icon: Clipboard,
    title: "Paste Any Problem",
    desc: "Paste a LeetCode link, raw problem text, or your attempted solution. Any format works — no special syntax required.",
  },
  {
    num: "02",
    Icon: Cpu,
    title: "AI Breaks It Down",
    desc: "ThinkDSA analyzes constraints, detects patterns, explains the decision tree, and reviews your code — all in seconds.",
  },
  {
    num: "03",
    Icon: TrendingUp,
    title: "Build Your Thinking",
    desc: "Every session trains your Pattern Brain. Over weeks, you stop guessing algorithms. You recognize them instantly.",
  },
];

const patterns = [
  { label: "Arrays + Hashing", bg: "rgba(59,130,246,0.12)", color: "#93c5fd", border: "rgba(59,130,246,0.3)" },
  { label: "Two Pointers", bg: "rgba(124,58,237,0.12)", color: "#c4b5fd", border: "rgba(124,58,237,0.3)" },
  { label: "Sliding Window", bg: "rgba(20,184,166,0.12)", color: "#5eead4", border: "rgba(20,184,166,0.3)" },
  { label: "Binary Search", bg: "rgba(245,158,11,0.12)", color: "#fcd34d", border: "rgba(245,158,11,0.3)" },
  { label: "Trees", bg: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "rgba(16,185,129,0.3)" },
  { label: "Graphs", bg: "rgba(244,63,94,0.12)", color: "#fda4af", border: "rgba(244,63,94,0.3)" },
  { label: "Dynamic Programming", bg: "rgba(249,115,22,0.12)", color: "#fdba74", border: "rgba(249,115,22,0.3)" },
  { label: "Backtracking", bg: "rgba(236,72,153,0.12)", color: "#f9a8d4", border: "rgba(236,72,153,0.3)" },
];

const patternCards = [
  { name: "Arrays + Hashing", signal: "When you need O(1) lookups or counting frequencies across an array...", count: 42, border: "rgba(59,130,246,0.3)" },
  { name: "Two Pointers", signal: "When the array is sorted and you need to find pairs or eliminate search space...", count: 31, border: "rgba(124,58,237,0.3)" },
  { name: "Sliding Window", signal: "When you need the max/min of a contiguous subarray of fixed or variable size...", count: 28, border: "rgba(20,184,166,0.3)" },
];

const testimonials = [
  {
    quote: "I used to memorize 200 LeetCode solutions before interviews. ThinkDSA made me realize I was doing it completely wrong. Now I can approach problems I have never seen before.",
    name: "Arjun S.",
    role: "3rd Year CS, NIT Trichy",
    initials: "AS",
    bg: "#7c3aed",
  },
  {
    quote: "The Why not this algorithm section changed everything for me. I always knew what to use, never why. That is what interviewers actually test.",
    name: "Priya M.",
    role: "Placed at Amazon",
    initials: "PM",
    bg: "#0891b2",
  },
  {
    quote: "Guided Thinking Mode is brutal in the best way. It refuses to just give you the answer. Annoying at first. Then you realize you are actually learning.",
    name: "Rohit K.",
    role: "2nd Year, BITS Pilani",
    initials: "RK",
    bg: "#d97706",
  },
];

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const sections = document.querySelectorAll(".fade-in-section");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ backgroundColor: "#0a0a0f", color: "#f1f0f5", minHeight: "100vh" }}>

      {/* ═══════ NAVBAR ═══════ */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,30,46,0.8)" : "none",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}>
                <Brain size={18} color="#a78bfa" />
              </div>
              <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.2rem", fontWeight: 700, color: "#f1f0f5" }}>
                Think<span style={{ color: "#a78bfa" }}>DSA</span>
              </span>
            </div>
            {/* Desktop links */}
            <div className="hidden md:flex" style={{ gap: "2rem" }}>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  style={{ background: "none", border: "none", color: "#9ca3af", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f0f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                >
                  {link.label}
                </button>
              ))}
            </div>
            {/* Desktop CTAs */}
            <div className="hidden md:flex" style={{ gap: "12px", alignItems: "center" }}>
              <button
                onClick={() => router.push('/login')}
                style={{ padding: "8px 18px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#d1d5db", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d1d5db"; }}
              >
                Login
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="pulse-glow"
                style={{ padding: "8px 20px", borderRadius: "999px", background: "#7c3aed", color: "#fff", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#6d28d9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#7c3aed")}
              >
                Start Free
              </button>
            </div>
            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", padding: 8 }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden" style={{ background: "rgba(10,10,15,0.98)", borderTop: "1px solid #1e1e2e", padding: "1rem 1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "12px" }}>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  style={{ background: "none", border: "none", color: "#d1d5db", textAlign: "left", padding: "10px 14px", borderRadius: 8, fontSize: "0.875rem", cursor: "pointer" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => router.push('/login')} style={{ flex: 1, padding: "10px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "#d1d5db", fontSize: "0.875rem", cursor: "pointer" }}>Login</button>
              <button onClick={() => router.push('/signup')} style={{ flex: 1, padding: "10px", borderRadius: "999px", background: "#7c3aed", color: "#fff", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer" }}>Start Free</button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section
        className="dot-grid"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: "80px" }}
      >
        <div style={{ position: "absolute", top: "-15%", left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
          <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: "2rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: "999px", border: "1px solid rgba(124,58,237,0.35)", background: "rgba(124,58,237,0.1)", color: "#c4b5fd", fontSize: "0.875rem", fontWeight: 500 }}>
              <Zap size={13} color="#a78bfa" />
              AI-Powered Pattern Recognition
            </span>
          </div>

          <h1
            className="hero-headline"
            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}
          >
            Stop Memorizing <span className="gradient-text">Solutions.</span>
            <br />
            Start Recognizing <span style={{ color: "#06b6d4" }}>Patterns.</span>
          </h1>

          <p
            className="hero-subtext"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.125rem", lineHeight: 1.7, color: "#9ca3af", maxWidth: "600px", margin: "0 auto 2.5rem" }}
          >
            ThinkDSA&apos;s AI coach does not give you answers — it trains your brain to think like a senior engineer. Paste any DSA problem. Watch how a pro would approach it.
          </p>

          <div className="hero-ctas" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2.5rem" }}>
            <button
              onClick={() => router.push('/signup')}
              className="pulse-glow"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: "999px", background: "#7c3aed", color: "#fff", fontSize: "1.0625rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#6d28d9"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#7c3aed"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Analyze Your First Problem <ArrowRight size={20} />
            </button>
            <button
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#e5e7eb", fontSize: "1.0625rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              onClick={() => handleNavClick("#how-it-works")}
            >
              See How It Works
            </button>
          </div>

          <div className="hero-social" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <div style={{ display: "flex" }}>
              {["#7c3aed", "#0891b2", "#d97706", "#e11d48", "#059669"].map((bg, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: bg, border: "2px solid #0a0a0f", marginLeft: i === 0 ? 0 : -8 }} />
              ))}
            </div>
            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Joined by <span style={{ color: "#a78bfa", fontWeight: 600 }}>2,400+ BTech CS students</span> · 100% Free to start
            </span>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", opacity: 0.35 }}>
          <div style={{ width: 2, height: 36, background: "linear-gradient(to bottom, transparent, #7c3aed)", borderRadius: 2 }} />
        </div>
      </section>

      {/* ═══════ DEMO ═══════ */}
      <section id="demo" style={{ padding: "6rem 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="fade-in-section" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>
              See It <span className="gradient-text">In Action</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.0625rem" }}>Paste any DSA problem. Get a full thinking breakdown.</p>
          </div>

          <div className="fade-in-section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
            {/* Left panel */}
            <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid #1e1e2e", background: "#111118" }}>
              <div style={{ padding: "12px 20px", borderBottom: "1px solid #1e1e2e", background: "#0d0d14", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(239,68,68,0.7)" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(245,158,11,0.7)" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(34,197,94,0.7)" }} />
                </div>
                <span style={{ color: "#6b7280", fontSize: "0.75rem", marginLeft: 8, fontWeight: 500 }}>Problem Input</span>
              </div>
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ fontFamily: "monospace", fontSize: "0.82rem", lineHeight: 1.7, background: "#0a0a0f", border: "1px solid #1e1e2e", borderRadius: "0.75rem", padding: "1rem", color: "#d1d5db", minHeight: 140 }}>
                  <span style={{ color: "#4b5563" }}>// Problem Statement</span><br /><br />
                  Given an array of integers <span style={{ color: "#a78bfa" }}>nums</span> and an integer <span style={{ color: "#06b6d4" }}>target</span>, return indices of the two numbers such that they add up to target.<br /><br />
                  <span style={{ color: "#4b5563" }}>// Example: nums = [2,7,11,15], target = 9</span><br />
                  <span style={{ color: "#4b5563" }}>// Output: [0, 1]</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["C", "C++", "Python", "Java"].map((lang, i) => (
                    <button key={lang} style={{ padding: "6px 16px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, border: i === 2 ? "1px solid rgba(124,58,237,0.4)" : "1px solid #1e1e2e", background: i === 2 ? "rgba(124,58,237,0.2)" : "#0a0a0f", color: i === 2 ? "#a78bfa" : "#6b7280", cursor: "pointer" }}>
                      {lang}
                    </button>
                  ))}
                </div>
                <button style={{ width: "100%", padding: "12px", borderRadius: 12, background: "#7c3aed", color: "#fff", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Cpu size={16} /> Analyze Problem
                </button>
              </div>
            </div>

            {/* Right panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ padding: "1.25rem", borderRadius: "1rem", border: "1px solid #1e1e2e", background: "#111118" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                  <Search size={15} color="#06b6d4" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#e5e7eb" }}>Pattern Detected</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                  <span style={{ padding: "6px 14px", borderRadius: 8, fontSize: "0.875rem", fontWeight: 700, background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" }}>Hashing</span>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>Recognition signals:</span>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {["Need to find complement of current element", "Fast O(1) lookup required", "Single pass solution is possible"].map((s) => (
                    <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.875rem", color: "#d1d5db", listStyle: "none" }}>
                      <CheckCircle size={14} color="#34d399" style={{ marginTop: 2, flexShrink: 0 }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: "1.25rem", borderRadius: "1rem", border: "1px solid #1e1e2e", background: "#111118" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                  <Brain size={15} color="#a78bfa" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#e5e7eb" }}>Why This Pattern?</span>
                </div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#9ca3af", margin: 0 }}>
                  Brute force checks every pair → <span style={{ color: "#f87171" }}>O(N²)</span>. But we only need to know: <span style={{ color: "#fbbf24", fontStyle: "italic" }}>&quot;Have I seen target - current before?&quot;</span> HashMap answers that in <span style={{ color: "#34d399" }}>O(1)</span>. One pass through the array is all you need.
                </p>
              </div>

              <div style={{ padding: "1.25rem", borderRadius: "1rem", border: "1px solid #1e1e2e", background: "#111118" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                  <AlertTriangle size={15} color="#f59e0b" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#e5e7eb" }}>Why Not These?</span>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8, padding: 0, margin: 0 }}>
                  {[{ p: "Two Pointers", r: "Array is not sorted" }, { p: "HashSet", r: "Need index, not just existence" }, { p: "Nested Loop", r: "Too slow for large N — O(N²)" }].map(({ p, r }) => (
                    <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.875rem", listStyle: "none" }}>
                      <XCircle size={14} color="#f87171" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span><span style={{ color: "#e5e7eb", fontWeight: 600 }}>{p}</span><span style={{ color: "#6b7280" }}> — {r}</span></span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ padding: "1.25rem", borderRadius: "1rem", border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
                  <Lightbulb size={15} color="#f59e0b" />
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fbbf24" }}>Future Trigger</span>
                </div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#fcd34d", margin: 0 }}>
                  When you need to find a <strong>complement</strong> or check <strong>previous values fast</strong> → think{" "}
                  <span style={{ background: "rgba(245,158,11,0.2)", color: "#fbbf24", padding: "2px 8px", borderRadius: 4, fontSize: "0.75rem", fontWeight: 700 }}>HashMap</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section id="features" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="fade-in-section" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>
              Everything You Need to <span className="gradient-text">Think Better</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.0625rem", maxWidth: 520, margin: "0 auto" }}>
              Six precision tools designed to transform how you approach DSA problems permanently.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="fade-in-section glass-card"
                style={{ padding: "1.5rem", transitionDelay: `${i * 70}ms`, cursor: "default", transition: "transform 0.25s ease, border-color 0.25s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ width: "100%", height: 2, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${f.glowStrong}, transparent)`, marginBottom: "1.25rem" }} />
                <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: f.glow, border: `1px solid ${f.border}`, marginBottom: "1rem", fontSize: "1.5rem" }}>
                  {f.emoji}
                </div>
                <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.0625rem", fontWeight: 700, color: "#f1f0f5", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#6b7280", margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" style={{ padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div className="fade-in-section" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>
              From Confused to <span className="gradient-text">Confident</span> in 3 Steps
            </h2>
          </div>
          <div className="fade-in-section" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center", flex: "1 1 250px", minWidth: 0 }}>
                <div className="glass-card" style={{ padding: "1.75rem", flex: 1, position: "relative" }}>
                  <div style={{ position: "absolute", top: 12, right: 16, fontFamily: "var(--font-space-grotesk)", fontSize: "5rem", fontWeight: 700, lineHeight: 1, color: "rgba(124,58,237,0.07)", userSelect: "none", pointerEvents: "none" }}>{step.num}</div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", marginBottom: "1.25rem" }}>
                    <step.Icon size={20} color="#a78bfa" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.125rem", fontWeight: 700, color: "#f1f0f5", marginBottom: "0.6rem" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "#6b7280", margin: 0 }}>{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block" style={{ width: 48, flexShrink: 0, height: 2, background: "repeating-linear-gradient(90deg, rgba(124,58,237,0.45) 0px, rgba(124,58,237,0.45) 8px, transparent 8px, transparent 16px)", margin: "0 4px" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PATTERNS ═══════ */}
      <section id="patterns" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="fade-in-section" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>
              Master 8 Core Patterns That <span className="gradient-text">Crack 90% of Interviews</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.0625rem", maxWidth: 520, margin: "0 auto" }}>
              Every problem maps to one of eight fundamental patterns. Learn the patterns once. Solve thousands of problems.
            </p>
          </div>
          <div className="fade-in-section" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem", marginBottom: "3.5rem" }}>
            {patterns.map((p) => (
              <button
                key={p.label}
                style={{ padding: "10px 20px", borderRadius: "999px", fontSize: "0.875rem", fontWeight: 600, border: `1px solid ${p.border}`, background: p.bg, color: p.color, cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="fade-in-section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {patternCards.map((card) => (
              <div
                key={card.name}
                className="glass-card"
                style={{ padding: "1.5rem", borderColor: card.border, transition: "transform 0.25s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1rem", fontWeight: 700, color: "#f1f0f5", marginBottom: "0.6rem" }}>{card.name}</h3>
                <p style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: "#6b7280", marginBottom: "1rem" }}>
                  <span style={{ color: "#a78bfa", fontWeight: 600 }}>Recognition Signal:</span> {card.signal}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "999px", background: "rgba(124,58,237,0.15)", color: "#a78bfa", fontWeight: 600 }}>{card.count} Problems</span>
                  <button
                    style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
                  >
                    Explore Pattern <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section style={{ padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div className="fade-in-section" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>
              What <span className="gradient-text">Students Say</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {testimonials.map((t, i) => (
              <div key={t.name} className="fade-in-section glass-card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", transitionDelay: `${i * 100}ms` }}>
                <div style={{ display: "flex", gap: 4, marginBottom: "1rem" }}>
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#9ca3af", flex: 1, marginBottom: "1.25rem" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#f1f0f5" }}>{t.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" style={{ padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="fade-in-section" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.875rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>
              Start Free. <span className="gradient-text">Upgrade When You&apos;re Ready.</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.0625rem" }}>No credit card required. Cancel anytime.</p>
          </div>
          <div className="fade-in-section" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: 700, margin: "0 auto" }}>
            {/* Free */}
            <div className="glass-card" style={{ padding: "2rem", borderRadius: "1rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", marginBottom: 8 }}>Free</div>
              <div style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "3rem", fontWeight: 700, color: "#f1f0f5", marginBottom: 4 }}>₹0</div>
              <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>per month, forever</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "2rem", padding: 0 }}>
                {[{ t: "30 AI problem analyses/month", ok: true }, { t: "Pattern Library access", ok: true }, { t: "Knowledge Vault (up to 20 entries)", ok: true }, { t: "Pattern Brain tracking", ok: true }, { t: "Unlimited analyses", ok: false }, { t: "Code Autopsy deep review", ok: false }, { t: "Guided Thinking Mode", ok: false }, { t: "Company-wise problem sets", ok: false }].map(({ t, ok }) => (
                  <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", listStyle: "none" }}>
                    {ok ? <CheckCircle size={15} color="#34d399" style={{ flexShrink: 0 }} /> : <XCircle size={15} color="#374151" style={{ flexShrink: 0 }} />}
                    <span style={{ color: ok ? "#d1d5db" : "#4b5563" }}>{t}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push('/signup')}
                style={{ width: "100%", padding: "12px", borderRadius: 10, border: "1px solid rgba(124,58,237,0.5)", background: "transparent", color: "#a78bfa", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >Start Free</button>
            </div>

            {/* Pro */}
            <div style={{ position: "relative", padding: "2rem", borderRadius: "1rem", border: "1px solid rgba(124,58,237,0.5)", background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, #111118 60%)", boxShadow: "0 0 40px rgba(124,58,237,0.2), 0 0 80px rgba(124,58,237,0.08)" }}>
              <div style={{ position: "absolute", top: -14, right: 24, padding: "4px 14px", borderRadius: "999px", background: "#f59e0b", color: "#0a0a0f", fontSize: "0.75rem", fontWeight: 700 }}>Most Popular</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 8 }}>Pro</div>
              <div style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "3rem", fontWeight: 700, color: "#f1f0f5", marginBottom: 4 }}>₹299</div>
              <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>per month · <span style={{ color: "#34d399" }}>₹1,999/year — save 44%</span></div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "2rem", padding: 0 }}>
                {["Everything in Free", "Unlimited AI analyses", "Full Code Autopsy", "Guided Thinking Mode", "Company-wise problem sets (Google, Amazon, Microsoft)", "Spaced repetition reminders", "Priority support"].map((t) => (
                  <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.875rem", listStyle: "none" }}>
                    <CheckCircle size={15} color="#a78bfa" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ color: "#d1d5db" }}>{t}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push('/signup')}
                className="pulse-glow"
                style={{ width: "100%", padding: "12px", borderRadius: 10, background: "#7c3aed", color: "#fff", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#6d28d9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#7c3aed")}
              >Get Pro</button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA BANNER ═══════ */}
      <section
        className="fade-in-section cta-banner"
        style={{ margin: "0 1rem 2rem", borderRadius: "1.5rem", padding: "6rem 1.5rem", position: "relative", overflow: "hidden", textAlign: "center" }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.1, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
            Your Next Interview Is Closer Than You Think.
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem", color: "rgba(255,255,255,0.8)", marginBottom: "2.5rem" }}>
            Start analyzing problems today. Build the thinking skills that get you hired.
          </p>
          <button
            onClick={() => router.push('/signup')}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 40px", borderRadius: "999px", background: "#fff", color: "#7c3aed", fontSize: "1.0625rem", fontWeight: 700, border: "none", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Analyze Your First Problem — It&apos;s Free <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: "#080810", borderTop: "1px solid #1e1e2e", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2.5rem", paddingBottom: "2.5rem", borderBottom: "1px solid #1e1e2e", marginBottom: "2rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.875rem" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)" }}>
                  <Brain size={16} color="#a78bfa" />
                </div>
                <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "1.1rem", fontWeight: 700, color: "#f1f0f5" }}>Think<span style={{ color: "#a78bfa" }}>DSA</span></span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "#4b5563", marginBottom: "0.5rem" }}>Train your mind. Crack the interview.</p>
              <p style={{ fontSize: "0.75rem", color: "#374151" }}>© 2025 ThinkDSA. Built for BTech CS students.</p>
            </div>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", marginBottom: "1rem" }}>Platform</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, padding: 0 }}>
                {["Features", "Patterns", "How It Works", "Pricing"].map((link) => (
                  <li key={link} style={{ listStyle: "none" }}>
                    <button onClick={() => handleNavClick(`#${link.toLowerCase().replace(/ /g, "-")}`)} style={{ background: "none", border: "none", color: "#4b5563", fontSize: "0.875rem", cursor: "pointer", transition: "color 0.2s", padding: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
                    >{link}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", marginBottom: "1rem" }}>Resources</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, padding: 0 }}>
                {["DSA Roadmap", "Blog", "Changelog"].map((link) => (
                  <li key={link} style={{ listStyle: "none" }}>
                    <a href="#" style={{ color: "#4b5563", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#6b7280", marginBottom: "1rem" }}>Follow Us</h4>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ Icon: Share2, label: "Twitter/X" }, { Icon: Code2, label: "GitHub" }, { Icon: Users, label: "LinkedIn" }].map(({ Icon, label }) => (
                  <a key={label} href="#" aria-label={label}
                    style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "#111118", border: "1px solid #1e1e2e", color: "#4b5563", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(124,58,237,0.15)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,58,237,0.4)"; (e.currentTarget as HTMLAnchorElement).style.color = "#a78bfa"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#111118"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1e1e2e"; (e.currentTarget as HTMLAnchorElement).style.color = "#4b5563"; }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <p style={{ fontSize: "0.75rem", color: "#374151" }}>Made with ❤️ for CS students grinding it out. You&apos;ve got this.</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy Policy", "Terms of Service"].map((link) => (
                <a key={link} href="#" style={{ fontSize: "0.75rem", color: "#374151", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#6b7280")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
                >{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
