import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import type { TeamMember } from "@/content/team";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/team/${member.slug}`}
      className="group flex flex-col rounded-[28px] border border-black/8 bg-white p-6 transition hover:shadow-[0_12px_40px_rgba(14,9,38,0.07)]"
    >
      <div className="flex items-start justify-between gap-4">
        <Avatar initials={member.initials} tone={member.tone} />
        <ArrowUpRight
          size={18}
          className="mt-1 text-navy/25 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-navy"
        />
      </div>
      <h3 className="mt-5 text-lg font-bold text-navy">{member.name}</h3>
      <p className="text-sm text-muted">{member.role}</p>
      <p className="mt-3 text-sm leading-6 text-muted">{member.focus}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {member.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-medium text-muted">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-[11px] uppercase tracking-[0.14em] text-navy/45">
        <span>{member.experience}</span>
        <span>{member.projects.length} projects</span>
      </div>
    </Link>
  );
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <TeamCard key={member.slug} member={member} />
      ))}
    </div>
  );
}
