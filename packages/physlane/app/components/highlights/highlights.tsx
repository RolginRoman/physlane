import { Highlight } from "./highlight";
import {
  Accesibility,
  Analytics,
  DiscoverPower,
  Goals,
  HightlightsDescriptions,
  Privacy,
} from "./highlight-description";

const highlights = [
  {
    title: "🌟 Discover the Power of Data&nbsp;📈",
    card: DiscoverPower,
  },
  {
    title: "🏆 Achieve Your Goals Faster&nbsp;🚀 ",
    card: Goals,
  },
  {
    title: "📊 Smart Analytics, Simplified&nbsp;🤓",
    card: Analytics,
  },
  {
    title: "🔒 Privacy and Security First&nbsp;🛡️ ",
    card: Privacy,
  },
  { title: "🌐 Anytime, Anywhere Access&nbsp;📱", card: Accesibility },
];

export const HighlightFeatures = () => {
  return (
    <div className="w-full items-start gap-2 lg:flex lg:gap-12">
      <div className="w-full space-y-24 py-12 lg:py-[50vh]">
        {highlights.map((highlight) => (
          <Highlight key={highlight.title} title={highlight.title} />
        ))}
      </div>
      <div className="sticky bottom-2 flex w-full items-center lg:bottom-0 lg:top-0 lg:h-screen">
        <div className="relative aspect-square w-full rounded-3xl md:bottom-auto">
          <HightlightsDescriptions highlights={highlights} />
        </div>
      </div>
    </div>
  );
};
