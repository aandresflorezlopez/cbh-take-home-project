import crypto from "crypto";

const getCandidateEncryptForEvent = (event) => {
  let candidate;
  if (event) {
    if (event.partitionKey) {
      return event.partitionKey;
    }

    const data = JSON.stringify(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  return candidate;
};

export const deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  candidate = getCandidateEncryptForEvent(event)
    ? getCandidateEncryptForEvent(event)
    : TRIVIAL_PARTITION_KEY;

  if (
    typeof candidate === "object" &&
    candidate.length > MAX_PARTITION_KEY_LENGTH
  ) {
    const data = JSON.stringify(candidate);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (typeof candidate !== "string") {
    return JSON.stringify(candidate);
  }

  return candidate;
};
