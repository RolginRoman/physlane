import Landing from "./components/landing";

export const metadata = {
  description: "One of the kind",
  title: "Welcome to Physlane. Fitness Analytics Hub",
};

export default async function Index() {
  return <Landing />;
}
