type DeltaType = "pp" | "percent" | "raw";
type DeltaSign = "up" | "down" | "flat";

export function computeDelta(
  currentValue: number | null,
  prevValue: number | null,
  deltaType: DeltaType
) {
  if (!Number.isFinite(currentValue ?? NaN) || !Number.isFinite(prevValue ?? NaN)) {
    return { delta: null, sign: "flat" as DeltaSign, formatted: "" };
  }

  const delta = (currentValue as number) - (prevValue as number);
  const sign: DeltaSign = delta === 0 ? "flat" : delta > 0 ? "up" : "down";
  const abs = Math.abs(delta);
  let formatted = "";

  if (deltaType === "pp") {
    formatted = `${delta > 0 ? "+" : delta < 0 ? "−" : ""}${abs.toFixed(1)} pp`;
  } else if (deltaType === "percent") {
    formatted = `${delta > 0 ? "+" : delta < 0 ? "−" : ""}${abs.toFixed(1)}%`;
  } else {
    formatted = `${delta > 0 ? "+" : delta < 0 ? "−" : ""}${abs.toFixed(1)}`;
  }

  return { delta, sign, formatted };
}
