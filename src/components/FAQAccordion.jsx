import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleHelp } from "lucide-react";
import { FAQ_DATA } from "../data/faqs.js";

export default function FAQAccordion() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((current) => current === index ? null : index);
  };

  return (
    <section className="mx-auto mb-16 max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center sm:mb-10">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FCECEC] text-[#B33A3A]">
          <CircleHelp size={20} strokeWidth={2} />
        </div>

        <h2 className="mt-4 text-2xl font-black tracking-tight text-[var(--pg-heading)] sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-[var(--pg-text-muted)] sm:text-sm">
          Quick answers about rooms, facilities and staying at Nandu PG.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((faq, index) => {
          const isOpen = openFaq === index;

          return (
            <div
              key={`${faq.question}-${index}`}
              className={`overflow-hidden rounded-2xl border border-[var(--pg-border)] bg-[var(--pg-surface)] transition-all duration-300 ${
                isOpen ? "shadow-[0_8px_24px_rgba(24,59,91,0.08)]" : "shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
                aria-controls={`nandu-faq-answer-${index}`}
                id={`nandu-faq-question-${index}`}
              >
                <span className="text-sm font-bold text-[var(--pg-text)] transition-colors sm:text-[15px]">
                  {faq.question}
                </span>

                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "bg-[#183B5B] text-white"
                      : "bg-[var(--pg-surface-soft)] text-[var(--pg-heading)]"
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown
                    size={16}
                    strokeWidth={2.2}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`nandu-faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`nandu-faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 sm:px-6">
                      <div className="mb-4 h-px bg-[var(--pg-border)]" />
                      <p className="text-sm leading-relaxed text-[var(--pg-text-muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
