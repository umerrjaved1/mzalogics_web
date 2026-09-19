/**
 * Constraints for the optional brief/RFP attachment on the enquiry form.
 *
 * Enforced on both sides: the browser gives fast feedback, the route handler
 * is what actually protects us, because a client-reported type or size is
 * untrusted. Deliberately conservative — this goes straight into an email,
 * and serverless request bodies are commonly capped around 4.5MB.
 */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4MB

/** Extension → the MIME types we will accept for it. */
const ALLOWED: Record<string, readonly string[]> = {
  pdf: ["application/pdf"],
  doc: ["application/msword"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  png: ["image/png"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  txt: ["text/plain"],
  md: ["text/markdown", "text/plain", ""],
};

/** For the file input's accept attribute. */
export const UPLOAD_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.md";

export const UPLOAD_HINT = "PDF, Word, image, or text — up to 4MB";

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export type UploadCheck = { ok: true } | { ok: false; error: string };

/**
 * Validate a file's name, size and reported type. The extension is the
 * primary gate; the reported MIME must not contradict it.
 */
export function checkUpload(name: string, size: number, type: string): UploadCheck {
  if (size <= 0) return { ok: false, error: "That file looks empty." };
  if (size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `That file is ${formatBytes(size)}. The limit is ${formatBytes(MAX_UPLOAD_BYTES)} — send a link instead.`,
    };
  }

  const extension = name.split(".").pop()?.toLowerCase() ?? "";
  const allowedTypes = ALLOWED[extension];
  if (!allowedTypes) {
    return { ok: false, error: `We cannot accept .${extension || "that"} files. ${UPLOAD_HINT}.` };
  }

  // An empty type happens on some platforms; only reject a contradiction.
  const reported = (type ?? "").toLowerCase();
  if (reported && !allowedTypes.includes(reported)) {
    return { ok: false, error: "That file's contents do not match its extension." };
  }

  return { ok: true };
}

/** Strip any path and anything awkward before the name reaches an email. */
export function safeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "attachment";
  const cleaned = base.replace(/[^\w.\- ]+/g, "_").trim();
  return cleaned.slice(0, 120) || "attachment";
}
