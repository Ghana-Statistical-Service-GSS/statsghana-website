import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { listObjects } from "@/app/lib/minio";

type AgriEnvRow = {
  id?: string;
  program: string;
  category: string;
  type?: string;
  month?: string;
  quarter?: string;
  year?: string;
  sheet?: string;
  downloadKey?: string;
  downloadUrl?: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

export async function GET() {
  try {
    const dataPath = join(
      process.cwd(),
      "public/data/data_statistics/economics/Economic_Statistics_Agriculture_Environment.json",
    );
    const raw = await readFile(dataPath, "utf-8");
    const rows: AgriEnvRow[] = JSON.parse(raw);

    let keys: string[] = [];
    try {
      const [agri, env] = await Promise.all([
        listObjects("data_statistics/economic/Agriculture"),
        listObjects("data_statistics/economic/Environment"),
      ]);
      keys = [...agri, ...env].map((item) => item.key);
    } catch {
      keys = [];
    }

    const normalizedKeys = keys.map((key) => ({
      key,
      normalized: normalize(key),
    }));

    const withDownloads = rows.map((row) => {
      if (!row.program) return row;
      const target = normalize(row.program);
      const match = normalizedKeys.find((item) =>
        item.normalized.includes(target),
      );
      return {
        ...row,
        downloadKey: match?.key,
        downloadUrl: "#",
      };
    });

    return NextResponse.json({ ok: true, rows: withDownloads });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Failed to load data",
      },
      { status: 500 },
    );
  }
}
