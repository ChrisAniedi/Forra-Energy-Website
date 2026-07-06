/**
 * Brand logo — uses the real brand image files in /public.
 * `light` = dark-background variant (footer / coloured sections) → the white logo.
 * default = light-background variant (top menu) → the coloured logo.
 * Height is fixed in CSS with width:auto, so the aspect ratio is always preserved.
 */
export const Logo = ({ light = false }: { light?: boolean }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className="logo-img"
    src={light ? "/forra-logo-bottom.png" : "/Forra-logo-top.png"}
    alt="Forra Energy"
    width={931}
    height={176}
  />
);
