"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export interface AccordionItem {
  title: string;
  icon?: string;
  content: string;
}

interface AccordionItemProps extends AccordionItem {
  isOpen?: boolean;
  onOpen?: () => void;
}

interface AccordionProps {
  items: AccordionItem[];
  activeIndex?: number;
}

const AccordionItem = ({
  title,
  icon,
  content,
  isOpen,
  onOpen,
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <>
      {content && title && (
        <div className="w-full">
          <div
            className="flex justify-between items-center rounded-2xl cursor-pointer px-4 py-3 hover:bg-primary-100"
            onClick={onOpen}
          >
            <div className="flex items-center gap-3">
              {icon && <Icon icon={icon} height="1.5rem" />}
              <h4 className="font-semibold text-lg">{title}</h4>
            </div>
            <span
              className={`transition-transform duration-300 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
            >
              <Icon icon="mage:chevron-down" height="1.5rem" />
            </span>
          </div>
          <div
            ref={contentRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out`}
            style={{ height }}
          >
            <p className="px-4 py-1 bg-background text-primary-700 text-justify text-md sm:text-base">
              {content}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const Accordion = ({ items, activeIndex }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    activeIndex ?? null
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ul className="w-full flex flex-col gap-4 3xl:gap-2">
      {items.map((item, index) => (
        <li key={index}>
          <AccordionItem
            title={item.title}
            icon={item.icon}
            content={item.content}
            isOpen={openIndex === index}
            onOpen={() => handleToggle(index)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
