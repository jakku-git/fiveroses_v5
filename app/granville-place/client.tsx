"use client";

import Hero from "@/components/granville/Hero";
import ExecutiveSummary from "@/components/granville/ExecutiveSummary";
import KpiGrid from "@/components/granville/KpiGrid";
import BudgetTable from "@/components/granville/BudgetTable";
import PhasingChart from "@/components/granville/PhasingChart";
import ChannelAccordion from "@/components/granville/ChannelAccordion";
import AppendicesTabs from "@/components/granville/AppendicesTabs";
import ContactForm from "@/components/granville/ContactForm";

export default function GranvillePlaceClient() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <ExecutiveSummary />
      <KpiGrid />
      <BudgetTable />
      <PhasingChart />
      <ChannelAccordion />
      <AppendicesTabs />
      <ContactForm />
    </div>
  );
}

