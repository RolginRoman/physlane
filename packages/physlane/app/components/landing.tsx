import { Button, Icons, Link } from "@physlane/ui";
import { Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { ReactNode } from "react";
import HeroImage from "../assets/hero-gym-t.jpeg";
import { HighlightFeatures } from "./highlights/highlights";

export default function Landing() {
  return (
    <main className="mx-auto max-w-screen-lg space-y-8 p-4 py-8 lg:px-0">
      <section className="flex min-h-[60svh] w-full flex-col justify-between space-y-8 md:my-12 lg:min-h-[40svh]">
        <div className="pointer-events-none absolute left-0 right-0 top-0 aspect-square after:absolute after:inset-0 after:block after:h-full after:w-full after:bg-gradient-to-t after:from-white after:to-white/0 after:content-['']">
          <Image
            src={HeroImage}
            fill
            className="h-full w-full object-cover opacity-20"
            alt="Hero image"
            priority
          />
        </div>
        <Heading size={"9"} className="z-[1] [text-wrap:balance]">
          Your Personal Health & Fitness Analytics Hub 🏋️
        </Heading>
        <div className="inline-block w-fit">
          <Link href="/signup">
            <Button size={"lg"} className="flex-col py-10 text-2xl lg:py-8">
              <Text>Sign up</Text>
            </Button>
          </Link>
          <Text className="mt-2 block text-center italic" size={"1"}>
            (totally free)
          </Text>
        </div>
      </section>

      <section className="relative z-[1]">
        <Heading as="h2" className="mb-8">
          Features
        </Heading>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <Heading as="h3">
              Weight tracking{" "}
              <Icons.ActivitySquare className="inline-block h-6 w-6 align-text-top" />
            </Heading>
            <p>Track and achieve your ideal weight</p>
          </Card>
          <Card>
            <Heading
              as="h3"
              className="flex items-start justify-between space-x-2"
            >
              <span className="whitespace-nowrap">
                Nutrition{" "}
                <Icons.Carrot className="inline-block h-6 w-6 align-text-top" />
              </span>
              <Text className="absolute right-2 top-2 block rounded-sm bg-gray-100 px-0.5 py-1 text-xs text-gray-700 ">
                soon
              </Text>
            </Heading>
            <p>Expert nutrition insights at your fingertips</p>
          </Card>
          <Card>
            <Heading
              as="h3"
              className="flex items-start justify-between space-x-2"
            >
              <span className="whitespace-nowrap">
                Measurements{" "}
                <Icons.Ruler className="inline-block h-6 w-6 align-text-top" />
              </span>
              <Text className="absolute right-2 top-2 block rounded-sm bg-gray-100 p-1 text-xs text-gray-700 ">
                soon
              </Text>
            </Heading>
            <p>Measure progress, transform your body</p>
          </Card>
          <Card>
            <Heading
              as="h3"
              className="flex items-start justify-between space-x-2"
            >
              <span className="whitespace-nowrap">
                Training{" "}
                <Icons.Medal className="inline-block h-6 w-6 align-text-top" />
              </span>
              <Text className="absolute right-2 top-2 block rounded-sm bg-gray-100 p-1 text-xs text-gray-700 ">
                soon
              </Text>
            </Heading>
            <p>Customized workouts for your fitness goals</p>
          </Card>
        </ul>
      </section>
      <section className="relative z-[1] space-y-4">
        <Heading as="h2">How it works</Heading>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <li className="relative w-full list-none space-y-2 overflow-hidden overflow-hidden rounded-xl border border-stone-400 px-4 py-6 after:absolute after:-bottom-3.5 after:right-4 after:text-6xl after:text-white after:text-zinc-400/30 after:opacity-30 after:content-[counter(list-item)] after:[-webkit-text-stroke:1px_hsl(var(--secondary-foreground))]">
            <Text size={"3"} weight={"medium"}>
              Track your progress in real-time
            </Text>
          </li>
          <li className="relative w-full list-none space-y-2 overflow-hidden overflow-hidden rounded-xl border border-stone-400 px-4 py-6 after:absolute after:-bottom-3.5 after:right-4 after:text-6xl after:text-white after:text-zinc-400/30 after:opacity-30 after:content-[counter(list-item)] after:[-webkit-text-stroke:1px_hsl(var(--secondary-foreground))]">
            <Text size={"3"} weight={"medium"}>
              Unlock valuable insights and trends
            </Text>
          </li>
          <li className="relative w-full list-none space-y-2 overflow-hidden overflow-hidden rounded-xl border border-stone-400 px-4 py-6 after:absolute after:-bottom-3.5 after:right-4 after:text-6xl after:text-white after:text-zinc-400/30 after:opacity-30 after:content-[counter(list-item)] after:[-webkit-text-stroke:1px_hsl(var(--secondary-foreground))]">
            <Text size={"3"} weight={"medium"}>
              Achieve your wellness goals with confidence
            </Text>
          </li>
        </ol>
        <Text size={"4"} className="mb-12 mt-4 block">
          And that&apos;s all it takes, actually 😌
        </Text>

        {/* <Text as="p">
          Are you ready to transform your fitness journey like never before?
          Imagine a world where achieving your health and fitness goals is not
          only a breeze but also a data-driven adventure. Look no further
          because Physlane is here to revolutionize the way you approach your
          wellness and body metrics.
        </Text> */}
        <HighlightFeatures />
      </section>

      <section className="relative z-[1] space-y-4">
        <Heading as="h2">Start your fitness journey</Heading>
        <Link href="/signup" className="block">
          <Button size={"lg"} className="text-xl">
            Sign up and start
          </Button>
        </Link>
      </section>
    </main>
  );
}
const Card = ({ children }: { children: ReactNode }) => {
  return (
    <li className="relative list-none space-y-2 rounded-xl border  border-stone-400 bg-slate-300/10 px-4 py-6">
      {children}
    </li>
  );
};
