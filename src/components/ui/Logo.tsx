/**
 * Brand logo — geometric mark + "ForraEnergy" wordmark.
 * `light` renders the dark-background variant (footer). Default is the light-background variant (navbar).
 * To use exact brand image files instead, drop them in /public and swap the <svg> for an <img>.
 */
export const Logo = ({ light = false }: { light?: boolean }) => {
  const c = light ? "#4FE0A6" : "#0B2B1F";
  return (
    <>
      <span className="logo-mark" aria-hidden="true">
        <svg width="31" height="31" viewBox="0 0 44 44" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="4.5" fill={c} />
          <rect x="24" y="24" width="16" height="16" rx="4.5" fill={c} />
          <path d="M13.5 18.7 18.7 13.5 30.5 25.3 25.3 30.5Z" fill={c} />
        </svg>
      </span>
      <span className="logo-word">Forra<em>Energy</em></span>
    </>
  );
};
