import { Link } from "@physlane/ui";

export const Footer = () => {
  return (
    <footer className="z-[1] bg-slate-50 px-4 py-8 pt-12 lg:px-0">
      <section className="mx-auto max-w-screen-lg space-y-2">
        <Link href={"/analytics"} className="block text-blue-600">
          Analytics
        </Link>
        <Link href={"/"} className="block text-blue-600">
          X (aka Twitter)
        </Link>
        <div className="text-secondary-foreground">
          Explore a healthier you with Physlane – your trusted partner in
          fitness and wellness. Join us on this journey and experience the
          transformative power of personalized analytics and data-driven health
          insights.
        </div>
      </section>
    </footer>
  );
};
