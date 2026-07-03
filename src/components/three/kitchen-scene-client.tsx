"use client";

import dynamic from "next/dynamic";

const KitchenScene = dynamic(
  () => import("./kitchen-scene").then((m) => m.KitchenScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 animate-pulse rounded-full border border-border-strong" />
      </div>
    ),
  },
);

export function KitchenSceneClient() {
  return <KitchenScene />;
}
