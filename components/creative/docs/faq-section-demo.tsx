"use client";

import { FaqSection } from "@/components/creative/faq-section";

const faqs = [
  {
    question: "Is there a free trial available?",
    answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
  },
  {
    question: "Can I change my plan later?",
    answer: "Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid."
  },
  {
    question: "Can other info be added to an invoice?",
    answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name."
  },
  {
    question: "How does billing work?",
    answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces."
  }
];

export function FaqSectionDemo() {
  return (
    <div className="w-full rounded-2xl bg-zinc-950 border border-white/5 overflow-hidden">
      <FaqSection items={faqs} />
    </div>
  );
}
