import "server-only";

import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Lazily initialised — validated at request time, not at module load.
// This prevents next build from failing when MinIO env vars aren't present
// during the static analysis / page-data collection phase.
let _s3: S3Client | null = null;
let _bucket: string | null = null;

function getClient(): { s3: S3Client; bucket: string } {
  if (_s3 && _bucket) return { s3: _s3, bucket: _bucket };

  const requiredEnv = [
    "MINIO_ENDPOINT",
    "MINIO_REGION",
    "MINIO_ACCESS_KEY",
    "MINIO_SECRET_KEY",
    "MINIO_BUCKET",
    "MINIO_FORCE_PATH_STYLE",
  ];

  const missingEnv = requiredEnv.filter((key) => !process.env[key]);
  if (missingEnv.length) {
    throw new Error(
      `Missing MinIO env vars: ${missingEnv.join(", ")}. Check .env.local.`,
    );
  }

  _bucket = process.env.MINIO_BUCKET as string;
  _s3 = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT as string,
    region: process.env.MINIO_REGION as string,
    credentials: {
      accessKeyId: process.env.MINIO_ACCESS_KEY as string,
      secretAccessKey: process.env.MINIO_SECRET_KEY as string,
    },
    forcePathStyle: process.env.MINIO_FORCE_PATH_STYLE === "true",
  });

  return { s3: _s3, bucket: _bucket };
}

export async function presignGetUrl(
  key: string,
  expiresInSeconds = 600,
): Promise<string> {
  const { s3, bucket } = getClient();
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}

export async function listObjects(prefix = ""): Promise<
  Array<{ key: string; size?: number; lastModified?: string }>
> {
  const { s3, bucket } = getClient();
  const command = new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix });
  const result = await s3.send(command);
  const contents = result.Contents ?? [];

  return contents.map((item) => ({
    key: item.Key ?? "",
    size: item.Size,
    lastModified: item.LastModified?.toISOString(),
  }));
}
