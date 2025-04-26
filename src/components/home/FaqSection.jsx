"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import image15 from "../../../public/assests/image15.png";
const faqs = [
  {
    question: "What is Next.js?",
    answer:
      "Next.js is a React framework that enables server-side rendering and static site generation for React applications.",
  },
  {
    question: "How does Tailwind CSS work?",
    answer:
      "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML.",
  },
  {
    question: "What are the benefits of using Next.js?",
    answer:
      "Next.js offers benefits like improved performance through server-side rendering, static site generation, and built-in routing.",
  },
  {
    question: "Can I use Tailwind CSS with Next.js?",
    answer:
      "Yes, Tailwind CSS can be seamlessly integrated with Next.js to style components using utility classes.",
  },
  {
    question: "How do I create a responsive layout with Tailwind CSS?",
    answer:
      "Tailwind CSS provides responsive utility classes that allow you to apply different styles at various breakpoints for a responsive design.",
  },
];

export default function FAQSection() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center p-4  lg:p-8 text-white">
      {/* Left Section - Images */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-8 lg:mb-0 ">
        <div className="relative lg:mt-32">
          {/* First Image */}
          <Image
            src={image15}
            alt="Image 1"
            height={200}
            width={200}
            objectFit="cover"
            className="rounded-lg w-80 h-80 lg:96 lg:h-96 xl:w-[550px]  xl:h-[550px] "
          />
          {/* Second Image - Positioned relative to the first image */}
          <div className="absolute top-24 -right-8 xl-right-16 lg:-right-32">
            <Image
              src={image15}
              alt="Image 2"
              height={200}
              width={200}
              objectFit="cover"
              className="rounded-lg w-60 h-48 lg:w-72 lg:h-60 xl:w-96 xl:h-80"
            />
          </div>
        </div>
      </div>

      {/* Right Section - FAQ */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center  mt-10">
          Frequently Asked <br /> Questions
        </h2>
        <p className="text-sm lg:text-base mb-3 text-center lg:text-left">
          Do you need some help with something or do you have questions on some
          features?
        </p>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
