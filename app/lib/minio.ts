import "server-only";

import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

const endpoint = process.env.MINIO_ENDPOINT as string;
const region = process.env.MINIO_REGION as string;
const accessKeyId = process.env.MINIO_ACCESS_KEY as string;
const secretAccessKey = process.env.MINIO_SECRET_KEY as string;
const forcePathStyle = process.env.MINIO_FORCE_PATH_STYLE === "true";

export const bucketName = process.env.MINIO_BUCKET as string;

export const s3 = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle,
});

export async function presignGetUrl(
  key: string,
  expiresInSeconds = 600,
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}

export async function listObjects(prefix = ""): Promise<
  Array<{ key: string; size?: number; lastModified?: string }>
> {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    Prefix: prefix,
  });

  const result = await s3.send(command);
  const contents = result.Contents ?? [];

  return contents.map((item) => ({
    key: item.Key ?? "",
    size: item.Size,
    lastModified: item.LastModified?.toISOString(),
  }));
}
