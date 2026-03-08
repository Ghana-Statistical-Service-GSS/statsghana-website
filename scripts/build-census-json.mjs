import fs from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const EXCEL_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "publications",
  "Census.xlsx"
);
const OUTPUT_PATH = path.join(process.cwd(), "app", "lib", "census.json");

if (!fs.existsSync(EXCEL_PATH)) {
  console.error(`Missing Excel file at ${EXCEL_PATH}`);
  process.exit(1);
}

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(EXCEL_PATH);
const worksheet = workbook.worksheets[0];

// Collect rows as flat arrays, resolving formula cells and normalising nulls.
// row.values is 1-indexed (index 0 is undefined), so we slice from 1.
const rows = [];
worksheet.eachRow({ includeEmpty: false }, (row) => {
  const values = row.values.slice(1).map((v) => {
    // Formula cells have shape { formula, result }
    const raw = v && typeof v === "object" && "result" in v ? v.result : v;
    return raw ?? "";
  });
  rows.push(values);
});

const header = (rows[0] || []).map((h) => String(h).trim());

const findIdx = (name) =>
  header.findIndex((h) => h.toLowerCase() === name.toLowerCase());

const hasNewHeaders =
  findIdx("Title") !== -1 &&
  findIdx("Description") !== -1 &&
  findIdx("Year") !== -1 &&
  findIdx("ReportType") !== -1;

const idx = {
  id: findIdx("ID"),
  title: hasNewHeaders ? findIdx("Title") : findIdx("Name"),
  description: hasNewHeaders ? findIdx("Description") : -1,
  year: findIdx("Year"),
  reportType: hasNewHeaders ? findIdx("ReportType") : findIdx("Type(Quarterly/Annual)"),
};

if (idx.id === -1 || idx.title === -1 || idx.year === -1 || idx.reportType === -1) {
  console.error("Expected headers not found in Census.xlsx:", header);
  process.exit(1);
}

const data = rows
  .slice(1)
  .filter((row) => row.some((value) => String(value).trim() !== ""))
  .map((row) => {
    const rawYear = row[idx.year];
    const yearNum = Number(rawYear);
    const year = Number.isFinite(yearNum) ? yearNum : "";
    return {
      id: String(row[idx.id] ?? "").trim(),
      title: String(row[idx.title] ?? "").trim(),
      description: String(idx.description !== -1 ? row[idx.description] ?? "" : "").trim(),
      year,
      reportType: String(row[idx.reportType] ?? "").trim(),
    };
  })
  .sort((a, b) => {
    const yearDiff = Number(b.year || 0) - Number(a.year || 0);
    if (yearDiff !== 0) return yearDiff;
    return a.title.localeCompare(b.title);
  });

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
console.log(
  `Wrote ${data.length} census reports to ${path.relative(process.cwd(), OUTPUT_PATH)}`
);
