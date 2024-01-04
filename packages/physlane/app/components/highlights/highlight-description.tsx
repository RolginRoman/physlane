"use client";

import { cn } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { HTMLAttributes, PropsWithChildren } from "react";
import { useSelectedHighlight } from "./state";

export const HighlightsDescriptions = ({
  highlights,
}: {
  highlights: { title: string; card: typeof HighlightCard }[];
}) => {
  return (
    <AnimatePresence>
      {highlights.map((highlight) => (
        <highlight.card key={highlight.title} title={highlight.title} />
      ))}
    </AnimatePresence>
  );
};

const HighlightCard = ({
  title,
  children,
  className,
}: {
  title: string;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  const [selectedTitle] = useSelectedHighlight();
  if (!selectedTitle || selectedTitle !== title) {
    return null;
  }

  return (
    <motion.div
      key={title}
      className={cn(
        "h-full w-full rounded-2xl bg-gradient-to-tr px-8 py-12",
        className
      )}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { ease: "easeIn" },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.1, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
};

export const DiscoverPower = ({ title }: { title: string }) => {
  return (
    <HighlightCard title={title} className="from-purple-200 to-white">
      <Text as="span" weight={"bold"} size="6">
        Your Path to Empowered Fitness
      </Text>
      <Text as="div" size="4" className="mt-2">
        Discover the power of knowledge with Physlane, our cutting-edge web app
        that merges fitness and analytics. Gain invaluable insights into your
        body metrics, guiding informed decisions on your health and fitness
        journey.
      </Text>
    </HighlightCard>
  );
};

export const Goals = ({ title }: { title: string }) => {
  return (
    <HighlightCard title={title} className="from-red-200 to-white">
      <Text as="span" weight={"bold"} size="6">
        Your Path to Effortless Progress Tracking
      </Text>
      <Text as="div" size="4" className="mt-2">
        Easily track your progress, set achievable goals, and monitor real-time
        results with our user-friendly interface. Whether your aim is weight
        loss, muscle building, or overall wellness, Physlane equips you with the
        tools and data for success.
      </Text>
    </HighlightCard>
  );
};

export const Analytics = ({ title }: { title: string }) => {
  return (
    <HighlightCard title={title} className="from-green-50 to-white">
      <Text as="span" weight={"bold"} size="6">
        Streamlined Body Metrics Insights
      </Text>
      <Text as="div" size="4" className="mt-2">
        Bid farewell to confusing spreadsheets and intricate fitness apps.
        Physlane delivers a user-friendly experience that prominently features
        your body metrics. Our intuitive charts and graphs transform data into
        meaningful insights, allowing you to grasp your body&apos;s nuances like
        never before.
      </Text>
    </HighlightCard>
  );
};

export const Privacy = ({ title }: { title: string }) => {
  return (
    <HighlightCard title={title} className="from-amber-200 to-white">
      <Text as="span" weight={"bold"} size="6">
        Securing Your Health Data
      </Text>
      <Text as="div" size="4" className="mt-2">
        At Physlane, we value the confidentiality of your health data. Be
        confident that your information is secure with us, safeguarded by the
        most advanced encryption and security measures.
      </Text>
    </HighlightCard>
  );
};

export const Accessibility = ({ title }: { title: string }) => {
  return (
    <HighlightCard title={title} className="from-indigo-200 to-white">
      <Text as="span" weight={"bold"} size="6">
        Analytics Across All Devices
      </Text>
      <Text as="div" size="4" className="mt-2">
        Access Physlane from your desktop to your smartphone, whether
        you&apos;re at home, the gym, or on the move, to have your fitness
        analytics within easy reach. Join us today to take charge of your
        fitness journey.
      </Text>
    </HighlightCard>
  );
};
