export type Position = [number, number];
export type PolygonCoordinates = Position[][];
export type MultiPolygonCoordinates = Position[][][];

export type Geometry =
  | { type: "Polygon"; coordinates: PolygonCoordinates }
  | { type: "MultiPolygon"; coordinates: MultiPolygonCoordinates };

export type Feature = {
  type: "Feature";
  geometry: Geometry | null;
  properties?: Record<string, unknown> | null;
};

export type FeatureCollection = {
  type: "FeatureCollection";
  features: Feature[];
};

const NAME_KEYS = [
  "name",
  "NAME",
  "Name",
  "region",
  "Region",
  "district",
  "District",
  "label",
  "LABEL",
];

export function isValidGeometry(geometry: unknown): geometry is Geometry {
  if (!geometry || typeof geometry !== "object") return false;
  const geom = geometry as Geometry;
  if (geom.type === "Polygon" && Array.isArray(geom.coordinates)) return true;
  if (geom.type === "MultiPolygon" && Array.isArray(geom.coordinates)) return true;
  return false;
}

export function getFeatureName(properties?: Record<string, unknown> | null): string {
  if (!properties) return "Unknown";
  for (const key of NAME_KEYS) {
    const value = properties[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }
  return "Unknown";
}

export function extractPositions(geometry: Geometry): Position[] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.flat();
  }
  return geometry.coordinates.flat(2);
}

export function computeBounds(features: Feature[]) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  let found = false;

  features.forEach((feature) => {
    if (!isValidGeometry(feature.geometry)) return;
    const points = extractPositions(feature.geometry);
    points.forEach(([lon, lat]) => {
      found = true;
      minLon = Math.min(minLon, lon);
      maxLon = Math.max(maxLon, lon);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    });
  });

  if (!found) {
    return { minLon: 0, maxLon: 1, minLat: 0, maxLat: 1 };
  }

  return { minLon, maxLon, minLat, maxLat };
}

export function createProjector(
  bounds: ReturnType<typeof computeBounds>,
  width: number,
  height: number,
  padding = 16
) {
  const lonSpan = bounds.maxLon - bounds.minLon || 1;
  const latSpan = bounds.maxLat - bounds.minLat || 1;
  const scale = Math.min(
    (width - padding * 2) / lonSpan,
    (height - padding * 2) / latSpan
  );
  const offsetX = (width - lonSpan * scale) / 2 - bounds.minLon * scale;
  const offsetY = (height - latSpan * scale) / 2 + bounds.maxLat * scale;

  return ([lon, lat]: Position) => {
    const x = lon * scale + offsetX;
    const y = -lat * scale + offsetY;
    return { x, y };
  };
}

export function buildPathD(
  geometry: Geometry,
  project: (pos: Position) => { x: number; y: number }
) {
  const buildPolygon = (coords: PolygonCoordinates) => {
    return coords
      .map((ring) => {
        return ring
          .map((point, index) => {
            const { x, y } = project(point);
            return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
          })
          .join(" ")
          .concat(" Z");
      })
      .join(" ");
  };

  if (geometry.type === "Polygon") {
    return buildPolygon(geometry.coordinates);
  }

  return geometry.coordinates.map((poly) => buildPolygon(poly)).join(" ");
}
