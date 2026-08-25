type PreloadProgress = {
  loaded: number;
  total: number;
  percentage: number;
};

type ProgressListener = (progress: PreloadProgress) => void;

const imageModules = import.meta.glob(
  "../assets/**/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const imageUrls = Array.from(new Set(Object.values(imageModules))).filter(Boolean);
const loadedUrls = new Set<string>();
const inFlightImages = new Map<string, Promise<void>>();
const MAX_CONCURRENT_IMAGES = 8;
const MAX_LOAD_ATTEMPTS = 2;

function loadImageOnce(url: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    let settled = false;

    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      image.onload = null;
      image.onerror = null;
      callback();
    };

    image.onload = () => finish(resolve);
    image.onerror = () => finish(() => reject(new Error(`Failed to preload image: ${url}`)));
    image.decoding = "async";
    image.src = url;

    if (image.complete && image.naturalWidth > 0) {
      finish(resolve);
    }
  });
}

async function loadImageWithRetry(url: string) {
  if (loadedUrls.has(url)) return;

  const inFlight = inFlightImages.get(url);
  if (inFlight) return inFlight;

  const request = (async () => {
    let lastError: unknown;

    for (let attempt = 0; attempt < MAX_LOAD_ATTEMPTS; attempt += 1) {
      try {
        await loadImageOnce(url);
        loadedUrls.add(url);
        return;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError instanceof Error ? lastError : new Error(`Failed to preload image: ${url}`);
  })().finally(() => {
    inFlightImages.delete(url);
  });

  inFlightImages.set(url, request);
  return request;
}

function emitProgress(listener: ProgressListener | undefined, loaded: number) {
  const total = imageUrls.length;
  const percentage = total === 0 ? 100 : Math.round((loaded / total) * 100);
  listener?.({ loaded, total, percentage });
}

export async function preloadSiteImages(onProgress?: ProgressListener) {
  const pendingUrls = imageUrls.filter((url) => !loadedUrls.has(url));
  const failures: string[] = [];
  let completed = imageUrls.length - pendingUrls.length;
  let nextIndex = 0;

  emitProgress(onProgress, completed);

  const worker = async () => {
    while (nextIndex < pendingUrls.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      const url = pendingUrls[currentIndex];

      try {
        await loadImageWithRetry(url);
      } catch {
        failures.push(url);
      } finally {
        completed += 1;
        emitProgress(onProgress, completed);
      }
    }
  };

  const workerCount = Math.min(MAX_CONCURRENT_IMAGES, pendingUrls.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  if (failures.length > 0) {
    throw new Error(`${failures.length} site images could not be loaded.`);
  }
}
