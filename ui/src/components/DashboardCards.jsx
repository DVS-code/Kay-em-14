import SystemOverview from "./cards/SystemOverview";
import RealTimeMetrics from "./cards/RealTimeMetrics";
import NetworkStatus from "./cards/NetworkStatus";
import SecurityStatus from "./cards/SecurityStatus";
import DailyBriefing from "./cards/DailyBriefing";
import Incidents from "./cards/Incidents";
import QuickActions from "./cards/QuickActions";

export default function DashboardCards() {
  return (
    <>
      <SystemOverview />
      <RealTimeMetrics />
      <NetworkStatus />
      <SecurityStatus />
      <DailyBriefing />
      <Incidents />
      <QuickActions className="col-span-2" />
    </>
  );
}

