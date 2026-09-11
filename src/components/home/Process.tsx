"use client";

import React, { useState } from "react";
import {
  FileCode,
  Users2,
  CheckCircle,
  Rocket,
  ShieldCheck,
  ArrowRight,
  GitBranch,
  Search,
  Sparkles,
} from "lucide-react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface StepDetails {
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  deliverables: string[];
  team: string;
  icon: React.ReactNode;
}

const steps: StepDetails[] = [
  {
    number: "01",
    title: "Discovery & Blueprint",
    subtitle: "We translate business goals into technical specifications, API schemas, and clickable prototypes.",
    duration: "Day 1 – 3",
    deliverables: ["Product Requirement Doc (PRD)", "System Architecture Diagram", "Figma Clickable Prototype"],
    team: "Lead Architect + Product Designer",
    icon: <Search size={20} />,
  },
  {
    number: "02",
    title: "Pod Assembly & CI/CD",
    subtitle: "A dedicated pod of engineers is provisioned with automated testing pipelines and repo templates.",
    duration: "Day 4 – 5",
    deliverables: ["Private Monorepo Setup", "Automated CI/CD Pipeline", "Staging Environment Provisioned"],
    team: "DevOps Engineer + Senior Dev",
    icon: <GitBranch size={20} />,
  },
  {
    number: "03",
    title: "Dual-Track Sprint Execution",
    subtitle: "Rapid 14-day agile sprints with daily standups, live demo builds, and transparent velocity tracking.",
    duration: "Sprint 1 – N",
    deliverables: ["Bi-Weekly Deployable Builds", "Interactive Preview Links", "Clean Git Commits"],
    team: "2x Full-Stack + Mobile Engineer",
    icon: <FileCode size={20} />,
  },
  {
    number: "04",
    title: "Automated QA & Security Gate",
    subtitle: "Every line of code undergoes automated vulnerability scanning, load testing, and manual senior review.",
    duration: "Continuous",
    deliverables: ["OWASP Security Scan", "99%+ Test Coverage Report", "SOC-2 Ready Audit Trail"],
    team: "QA Automation + Security Lead",
    icon: <ShieldCheck size={20} />,
  },
  {
    number: "05",
    title: "Global Launch & SLA",
    subtitle: "Seamless App Store, Play Store, and cloud deployment with zero downtime and guaranteed uptime SLA.",
    duration: "Launch Day",
    deliverables: ["App Store & Play Store Approval", "Production Domain DNS & SSL", "24/7 SLA Monitoring"],
    team: "Full Pod + Operations Lead",
    icon: <Rocket size={20} />,
  },
];

export function Process() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = steps[activeStepIndex];

  return (
    <Section id="process" className="relative">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>How We Ship</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-5xl">
            From Day 1 to Production in 5 Proven Stages
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            No endless back-and-forth. No black-box development. Transparent sprints, verifiable milestones, and senior engineer accountability.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Delivery process stages"
          className="mt-12 flex gap-3 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          {steps.map((step, idx) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`flex min-w-[200px] flex-1 items-center gap-3 rounded-2xl border p-4 text-left transition-all ${activeStepIndex === idx
                  ? "border-navy bg-navy text-white shadow-lg"
                  : "border-black/8 bg-white text-navy hover:border-black/20 hover:bg-paper"
                }`}
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${activeStepIndex === idx ? "bg-accent-2 text-navy" : "bg-black/5 text-navy/60"
                  }`}
              >
                {step.number}
              </span>
              <div className="overflow-hidden">
                <div className="text-xs font-semibold truncate">{step.title}</div>
                <div className={`text-[11px] ${activeStepIndex === idx ? "text-accent-2" : "text-muted"}`}>
                  {step.duration}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Active Step Stage Showcase */}
        <SpotlightCard className="mt-6 p-7 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-accent-2 shadow-sm">
                  {activeStep.icon}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Stage {activeStep.number} of 05 &middot; {activeStep.duration}
                  </span>
                  <h3 className="text-2xl font-bold text-navy sm:text-3xl">{activeStep.title}</h3>
                </div>
              </div>

              <p className="mt-4 text-base leading-relaxed text-muted">{activeStep.subtitle}</p>

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-navy">Key Deliverables</div>
                <ul className="mt-3 space-y-2 text-sm text-navy/80">
                  {activeStep.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl bg-paper px-4 py-2.5 text-xs text-navy">
                <Users2 size={16} className="text-muted" />
                <span className="font-semibold">Pod Assignment:</span>
                <span className="text-muted">{activeStep.team}</span>
              </div>
            </div>

            {/* Visual Stage Console */}
            <div className="rounded-2xl border border-black/8 bg-paper p-6 text-xs">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="font-mono text-navy font-semibold">Stage_{activeStep.number}_Verification.json</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  Validated
                </span>
              </div>

              <div className="mt-4 space-y-3 font-mono">
                <div className="rounded-xl bg-white p-3 border border-black/5">
                  <div className="text-muted text-[10px]">CURRENT PHASE</div>
                  <div className="text-sm font-bold text-navy mt-0.5">{activeStep.title}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white p-3 border border-black/5">
                    <div className="text-muted text-[10px]">ESTIMATED TIME</div>
                    <div className="text-xs font-bold text-navy mt-0.5">{activeStep.duration}</div>
                  </div>
                  <div className="rounded-xl bg-white p-3 border border-black/5">
                    <div className="text-muted text-[10px]">CODE REVIEW</div>
                    <div className="text-xs font-bold text-emerald-700 mt-0.5">Senior Architect</div>
                  </div>
                </div>

                <div className="rounded-xl bg-navy p-3 text-white">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/60">Quality Assurance</span>
                    <span className="text-accent-2 font-bold">100% Pass Rate</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-accent-2 transition-all duration-500"
                      style={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="mt-5 flex items-center justify-between pt-3 border-t border-black/5">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((i) => Math.max(0, i - 1))}
                  className="rounded-lg px-3 py-1 text-xs font-semibold text-navy/70 hover:text-navy disabled:opacity-30"
                >
                  &larr; Previous Stage
                </button>
                <button
                  type="button"
                  disabled={activeStepIndex === steps.length - 1}
                  onClick={() => setActiveStepIndex((i) => Math.min(steps.length - 1, i + 1))}
                  className="rounded-lg bg-navy px-3 py-1 text-xs font-semibold text-white hover:bg-navy-light disabled:opacity-30"
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </Container>
    </Section>
  );
}
