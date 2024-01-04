import { Highlight } from "./highlight";
import {
  Accessibility,
  Analytics,
  DiscoverPower,
  Goals,
  HighlightsDescriptions,
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
  { title: "🌐 Anytime, Anywhere Access&nbsp;📱", card: Accessibility },
];

export const HighlightFeatures = () => {
  return (
    <div className="w-full items-start gap-2 lg:flex lg:gap-12">
      <div className="w-full space-y-24 py-12 lg:py-[50vh]">
        {highlights.map((highlight, index) => (
          <Highlight
            key={highlight.title}
            index={index}
            title={highlight.title}
          />
        ))}
      </div>
      <div className="sticky bottom-2 flex w-full items-center justify-start lg:bottom-0 lg:top-0 lg:h-screen">
        <div className="relative aspect-square max-h-96 max-w-prose rounded-3xl md:bottom-auto lg:max-h-none lg:w-full">
          <HighlightsDescriptions highlights={highlights} />
        </div>
      </div>
    </div>
  );
};
