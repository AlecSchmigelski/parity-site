import { Hero } from "@/components/Hero";
import {
  Anatomy,
  CostOfDelay,
  Coverage,
  DivisionOfLabor,
  FinalCta,
  Footer,
  Header,
  HistoricalAudit,
  Security,
  Stats,
  WhoUsesIt,
} from "@/components/sections";
import { config } from "@/lib/config";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {config.showStats && <Stats />}
        <CostOfDelay />
        <Anatomy />
        <Coverage />
        <DivisionOfLabor />
        <HistoricalAudit />
        <WhoUsesIt />
        <Security />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
