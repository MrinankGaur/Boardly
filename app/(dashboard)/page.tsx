"use client";

import { BoardList } from "./_components/board-list";
import { EmptyOrg } from "./_components/empty-org";
import { useOrganization } from "@clerk/nextjs";
import { use } from "react";

interface DashBoardPageProps {
  searchParams: Promise<{
    search?: string;
    favorite?: string;
  }>;
}

const DashboardPage = ({ searchParams }: DashBoardPageProps) => {
  const { organization } = useOrganization();
  const params = use(searchParams);

  // ✅ Now accessing properties from unwrapped params
  const search = params.search ?? "";
  const favorites = params.favorite ?? "";

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={{ search, favorites }}
        />
      )}
    </div>
  );
};

export default DashboardPage;
