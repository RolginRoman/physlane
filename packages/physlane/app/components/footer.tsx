import { Link } from "@physlane/ui";

export const Footer = () => {
  return (
    <footer className="z-[1] bg-slate-50 px-4 py-8 pt-12 lg:px-0">
      <section className="mx-auto max-w-screen-lg space-y-2">
        <span>Footer</span>
        <Link href={"#"} className="block">
          Something useful
        </Link>
        <Link href={"#"} className="block">
          Something useful 2
        </Link>
        <Link href={"#"} className="block">
          Something useful 3
        </Link>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
          blanditiis hic optio at explicabo rem odio soluta ipsa aut impedit cum
          neque, distinctio porro nulla fuga placeat totam ipsum id!
        </div>
      </section>
    </footer>
  );
};
