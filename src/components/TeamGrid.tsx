"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Star, ShieldCheck, Zap, UserPlus } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { TeamMember, SeniorityLevel, Department } from "@/content/team";
import { seniorityLevels, departments } from "@/content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  const isSenior = member.seniority === "Senior / Lead";
  const isJunior = member.seniority === "Junior / Associate";

  return (
    <div className="flex flex-col h-full group">
      <SpotlightCard className="flex flex-col justify-between h-full p-6 sm:p-7 transition-all duration-300 group-hover:-translate-y-1">
        <div>
          {/* Header Row: Photo, Seniority Pill, & Rates */}
          <div className="flex items-start justify-between gap-3">
            <Link href={`/team/${member.slug}`} className="block focus:outline-none">
              <Avatar
                initials={member.initials}
                tone={member.tone}
                image={member.image}
                alt={member.name}
                size="md"
                showStatus
              />
            </Link>

            <div className="text-right">
              {/* Seniority badge */}
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isSenior
                    ? "bg-navy text-accent-2"
                    : isJunior
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-paper text-navy/80 border border-black/8"
                }`}
              >
                {member.seniority}
              </span>

              {/* Rates */}
              <div className="mt-1.5 font-mono text-xs font-bold text-navy">
                <span>{member.hourlyRate}</span>
                <span className="text-[10px] font-normal text-muted"> / {member.monthlyRate}</span>
              </div>
            </div>
          </div>

          {/* Member Name & Role */}
          <div className="mt-4">
            <Link href={`/team/${member.slug}`}>
              <h3 className="text-lg font-bold text-navy group-hover:text-navy-light transition flex items-center gap-1.5">
                {member.name}
                <ArrowUpRight
                  size={15}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-2"
                />
              </h3>
            </Link>
            <p className="text-xs font-medium text-navy/70 mt-0.5">{member.role}</p>
          </div>

          {/* Why Hire Callout */}
          <div className="mt-3.5 rounded-xl bg-paper/80 border border-black/5 p-3 text-[11px] leading-relaxed text-muted">
            <span className="font-bold text-navy text-[10px] uppercase tracking-wider block mb-1">
              Why hire:
            </span>
            <p className="line-clamp-2">{member.whyHire}</p>
          </div>

          {/* Skills Badges */}
          <div className="mt-3.5 flex flex-wrap gap-1">
            {member.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-navy/70 border border-black/5"
              >
                {skill}
              </span>
            ))}
            {member.skills.length > 4 && (
              <span className="rounded-md bg-paper px-1.5 py-0.5 text-[10px] font-medium text-muted">
                +{member.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions: Availability + Hire Button */}
        <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-navy/80">{member.availability}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/contact?engineer=${member.slug}&seniority=${encodeURIComponent(member.seniority)}`}
              className="inline-flex items-center gap-1 rounded-full bg-navy px-3 py-1.5 text-xs font-bold text-white transition hover:bg-navy-light shadow-sm"
              title={`Hire ${member.name} for your engineering pod`}
            >
              <UserPlus size={12} />
              Hire Direct
            </Link>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [seniorityFilter, setSeniorityFilter] = useState<string>("all");
  const [deptFilter, setDeptFilter] = useState<string>("all");

  const filteredMembers = members.filter((member) => {
    if (seniorityFilter !== "all" && member.seniority !== seniorityFilter) return false;
    if (deptFilter !== "all" && member.department !== deptFilter) return false;
    return true;
  });

  return (
    <div>
      {/* Interactive Filter Toolbar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
        {/* Seniority Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted mr-1 hidden sm:inline">
            Tier:
          </span>
          <button
            type="button"
            onClick={() => setSeniorityFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              seniorityFilter === "all" ? "bg-navy text-white" : "bg-paper text-navy/70 hover:text-navy"
            }`}
          >
            All Roles ({members.length})
          </button>
          {seniorityLevels.map((lvl) => {
            const count = members.filter((m) => m.seniority === lvl).length;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setSeniorityFilter(lvl)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  seniorityFilter === lvl ? "bg-navy text-white" : "bg-paper text-navy/70 hover:text-navy"
                }`}
              >
                {lvl} ({count})
              </button>
            );
          })}
        </div>

        {/* Department Filter Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted">Department:</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="rounded-xl border border-black/10 bg-paper px-3 py-1.5 text-xs font-semibold text-navy outline-none focus:border-navy"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Team Cards */}
      {filteredMembers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-black/8 bg-white p-12 text-center text-muted">
          <p className="text-sm font-semibold text-navy">No engineers match the selected filter.</p>
          <button
            type="button"
            onClick={() => {
              setSeniorityFilter("all");
              setDeptFilter("all");
            }}
            className="mt-3 rounded-full bg-navy px-4 py-1.5 text-xs font-bold text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
