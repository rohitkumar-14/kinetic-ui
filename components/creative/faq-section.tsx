"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface FaqSectionProps {
  title?: string;
  description?: string;
  items: FaqItem[];
}

export function FaqSection({
  title = "Frequently Asked Questions",
  description = "Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.",
  items
}: FaqSectionProps) {
  return (
    <section className="py-24 sm:py-32 w-full">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-base leading-7 text-zinc-400"
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-white/10 px-2"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium text-zinc-200 hover:text-white hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-base leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
