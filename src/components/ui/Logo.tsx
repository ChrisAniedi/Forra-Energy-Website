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
        <svg width="30" height="30" viewBox="0 0 44 44" fill="none">
          <rect x="6" y="6" width="17" height="17" rx="5" fill={c} />
          <rect x="21" y="21" width="17" height="17" rx="5" fill={c} />
          <rect x="24.5" y="6" width="9" height="9" rx="3" fill={c} opacity=".42" />
          <rect x="10.5" y="24.5" width="9" height="9" rx="3" fill={c} opacity=".42" />
        </svg>
      </span>
      <span className="logo-word">Forra<em>Energy</em></span>
    </>
  );
};
