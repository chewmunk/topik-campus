"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createTableHook,
  tableFeatures,
} from "@tanstack/react-table";
import { TOPIK_LEVEL_ROWS, type TopikLevelRow } from "@/lib/catalog";

const { createAppColumnHelper, useAppTable } = createTableHook({
  features: tableFeatures({}),
  getRowId: (row: TopikLevelRow) => row.id,
});

const helper = createAppColumnHelper<TopikLevelRow>();
const columns = helper.columns([
  helper.accessor("exam", { header: "Exam" }),
  helper.accessor("levels", { header: "Levels" }),
  helper.accessor("skills", { header: "Skills" }),
  helper.accessor("format", { header: "Format" }),
]);

async function fetchLevels(): Promise<TopikLevelRow[]> {
  const response = await fetch("/api/catalog/levels");
  if (!response.ok) {
    throw new Error("Failed to load levels");
  }
  return response.json();
}

export function LevelTable() {
  const { data = TOPIK_LEVEL_ROWS } = useQuery({
    queryKey: ["topik-levels"],
    queryFn: fetchLevels,
    initialData: TOPIK_LEVEL_ROWS,
  });

  const tableData = useMemo(() => data, [data]);
  const table = useAppTable({
    columns,
    data: tableData,
  });

  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-navy text-paper">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 font-medium">
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-line bg-paper">
              {row.getAllCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-ink-soft">
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
