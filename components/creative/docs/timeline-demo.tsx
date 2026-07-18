"use client";

import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineDot,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

export function TimelineDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-zinc-950/40 border border-white/5 backdrop-blur-md">
      <Timeline>
        <TimelineItem>
          <TimelineDot className="bg-indigo-500" />
          <TimelineContent>
            <TimelineTime>February 2024</TimelineTime>
            <TimelineTitle>Application UI code in Tailwind CSS</TimelineTitle>
            <TimelineDescription>
              Get access to over 20+ pages including a dashboard layout, charts,
              kanban board, calendar, and pre-order E-commerce & Marketing pages.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineDot className="bg-zinc-600" />
          <TimelineContent>
            <TimelineTime>March 2024</TimelineTime>
            <TimelineTitle>Marketing UI design in Figma</TimelineTitle>
            <TimelineDescription>
              All of the pages and components are first designed in Figma and we
              keep a parity between the two versions even as we update the
              project.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineDot className="bg-zinc-600" />
          <TimelineContent>
            <TimelineTime>April 2024</TimelineTime>
            <TimelineTitle>E-Commerce UI code in Tailwind CSS</TimelineTitle>
            <TimelineDescription>
              Get started with dozens of web components and interactive elements
              built on top of Tailwind CSS.
            </TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
