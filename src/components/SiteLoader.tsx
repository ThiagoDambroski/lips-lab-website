type SiteLoaderProps = {
  progress?: number;
  hasError?: boolean;
  onRetry?: () => void;
  variant?: "fullscreen" | "route";
  label?: string;
};

export default function SiteLoader({
  progress,
  hasError = false,
  onRetry,
  variant = "fullscreen",
  label,
}: SiteLoaderProps) {
  const safeProgress = Math.min(100, Math.max(0, progress ?? 0));
  const statusText = hasError
    ? "Não foi possível carregar todas as imagens."
    : label ?? (progress === undefined ? "A preparar a página..." : "A preparar a experiência...");

  return (
    <main
      className={`site-loader site-loader--${variant}`}
      role="status"
      aria-live="polite"
      aria-busy={!hasError}
    >
      <div className="site-loader__content">
        <div className="site-loader__wordmark" aria-label="Lips Lab">
          <span>lips</span>
          <span className="site-loader__heart" aria-hidden="true">♡</span>
          <span>lab</span>
        </div>

        {!hasError && (
          <div className="site-loader__progress" aria-hidden="true">
            <span style={{ width: progress === undefined ? "42%" : `${safeProgress}%` }} />
          </div>
        )}

        <p>{statusText}</p>

        {!hasError && progress !== undefined && (
          <span className="site-loader__percentage">{safeProgress}%</span>
        )}

        {hasError && onRetry && (
          <button type="button" className="site-loader__retry" onClick={onRetry}>
            Tentar novamente
          </button>
        )}
      </div>
    </main>
  );
}
