import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ChevronDown,
  CircleHelp,
} from "lucide-react";

import { FAQ_DATA } from "../data/faqs.js";

export default function FAQAccordion() {
  const [openFaq, setOpenFaq] =
    useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((current) =>
      current === index
        ? null
        : index
    );
  };

  return (
    <section
      className="
        mx-auto
        mb-16
        max-w-3xl
        px-4
        py-12

        sm:px-6
        sm:py-16
      "
    >
      {/* HEADING */}

      <div className="mb-8 text-center sm:mb-10">

        <div
          className="
            mx-auto
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-2xl
            bg-[#FCECEC]
            text-[#B33A3A]
          "
        >
          <CircleHelp
            size={20}
            strokeWidth={2}
          />
        </div>

        <h2
          className="
            mt-4
            text-2xl
            font-black
            tracking-tight
            text-[#183B5B]

            sm:text-4xl
          "
        >
          Frequently Asked Questions
        </h2>

        <p
          className="
            mx-auto
            mt-2
            max-w-lg
            text-xs
            leading-relaxed
            text-stone-500

            sm:text-sm
          "
        >
          Quick answers about rooms,
          facilities and staying at Nandu
          PG.
        </p>
      </div>


      {/* QUESTIONS */}

      <div className="space-y-3">
        {FAQ_DATA.map(
          (faq, index) => {
            const isOpen =
              openFaq === index;

            return (
              <div
                key={`${faq.question}-${index}`}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-white
                  transition-all
                  duration-300

                  ${
                    isOpen
                      ? "border-[#183B5B]/25 shadow-[0_8px_24px_rgba(24,59,91,0.08)]"
                      : "border-[#E7E2D8] shadow-sm"
                  }
                `}
              >
                {/* QUESTION */}

                <button
                  type="button"
                  onClick={() =>
                    toggleFaq(index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    text-left

                    sm:px-6
                    sm:py-5
                  "
                  aria-expanded={
                    isOpen
                  }
                >
                  <span
                    className={`
                      text-sm
                      font-bold
                      transition-colors

                      sm:text-[15px]

                      ${
                        isOpen
                          ? "text-[#183B5B]"
                          : "text-stone-800"
                      }
                    `}
                  >
                    {faq.question}
                  </span>


                  {/* ARROW */}

                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300

                      ${
                        isOpen
                          ? "bg-[#183B5B] text-white"
                          : "bg-[#E8F0F7] text-[#183B5B]"
                      }
                    `}
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={2.2}
                      className={`
                        transition-transform
                        duration-300

                        ${
                          isOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </span>
                </button>


                {/* ANSWER */}

                <AnimatePresence
                  initial={false}
                >
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6">
                        <div className="mb-4 h-px bg-[#E7E2D8]" />

                        <p
                          className="
                            text-sm
                            leading-relaxed
                            text-stone-500
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}