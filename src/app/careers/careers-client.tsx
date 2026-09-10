"use client";

import { useMemo, useState } from "react";
import { Container, Eyebrow, Section } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/CtaBand";
import { jobs, jobTeams } from "@/content/jobs";

export function CareersClient() {
  const [team, setTeam] = useState<(typeof jobTeams)[number]>("All");
  const filtered = useMemo(
    () => (team === "All" ? jobs : jobs.filter((job) => job.team === team)),
    [team],
  );

  return (
    <>
      <Section className="dot-grid pb-8">
        <Container>
          <Eyebrow>We&apos;re hiring</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Build software with people who care about craft
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            On-site and hybrid roles. Predictable hours. A studio that ships enterprise work without burnout theatre.
          </p>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <h2 className="text-2xl font-semibold text-navy">How we work</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Ship with confidence", body: "Named stages, weekly truth, and a production checklist." },
              { title: "Craft over volume", body: "One system operators can run beats ten demos." },
              { title: "A real team", body: "Standups, reviews, and a studio — not a silent roster." },
              { title: "Always learning", body: "Budget for tools, courses, and the next model release." },
            ].map((item) => (
              <article key={item.title} className="rounded-3xl border border-line p-5">
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <h2 className="mt-14 text-2xl font-semibold text-navy">Open roles</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {jobTeams.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTeam(item)}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  team === item ? "bg-navy text-white" : "border border-line text-muted"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            {filtered.map((job) => (
              <article key={job.slug} className="rounded-3xl border border-line p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{job.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {job.team} · {job.type} · {job.location} · {job.experience}
                    </p>
                  </div>
                  <a href="#apply" className="text-sm font-medium text-accent">
                    Apply
                  </a>
                </div>
                <p className="mt-3 text-sm text-muted">{job.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-paper px-2 py-1 text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <div id="apply">
        <LeadForm
          kind="career"
          eyebrow="Apply"
          title="Send your work"
          intro="If the role is not listed, still write. We keep strong people on file."
          submitLabel="Submit application"
          extraFields="career"
        />
      </div>
      <CtaBand title="Don't see the role?" body="Send a note anyway — we hire for craft, not just openings." />
    </>
  );
}
