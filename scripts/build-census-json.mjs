import fs from "node:fs";
import path from "node:path";
import xlsx from "xlsx";

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

const workbook = xlsx.readFile(EXCEL_PATH);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
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
