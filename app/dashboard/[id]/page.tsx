import DashboardClient from "./DashboardClient";
import { getDashboard } from "@/lib/actions/actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log("THIS IS THE FUCKING ID", id)
  const data = id === 'new' ? null : await getDashboard(id);

  return <DashboardClient initialData={data} />;
}