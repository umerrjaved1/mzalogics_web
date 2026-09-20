/**
 * Backstop for scroll reveals when IntersectionObserver does not deliver.
 *
 * The observer is the primary trigger and handles the normal case efficiently.
 * But if it is missing, polyfilled badly, or suspended, an element that faded
 * out at hydration would never fade back in — content the viewer can't read.
 *
 * So every reveal that is still hidden registers here, and one shared passive
 * scroll listener re-checks their geometry. One listener for the whole page,
 * attached only while something is actually waiting, and detached as soon as
 * the last element has shown.
 */

type Pending = { el: () => HTMLElement | null; show: () => void };

const pending = new Set<Pending>();
let listening = false;
let scheduled = false;

function onScreen(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function sweep() {
  scheduled = false;
  for (const entry of [...pending]) {
    const el = entry.el();
    if (!el) {
      pending.delete(entry);
      continue;
    }
    if (onScreen(el)) {
      pending.delete(entry);
      entry.show();
    }
  }
  if (pending.size === 0) detach();
}

/**
 * Coalesced with a timer rather than requestAnimationFrame: rAF is suspended
 * entirely while a document is not being rendered, which is one of the very
 * situations this backstop exists for. Timers are merely throttled.
 */
function schedule() {
  if (scheduled) return;
  scheduled = true;
  window.setTimeout(sweep, 80);
}

function attach() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function detach() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

/** Returns an unregister function. */
export function registerPendingReveal(entry: Pending): () => void {
  pending.add(entry);
  attach();
  return () => {
    pending.delete(entry);
    if (pending.size === 0) detach();
  };
}
