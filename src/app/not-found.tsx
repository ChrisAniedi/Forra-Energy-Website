import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>404</Eyebrow>
          <h1>This page is off-grid<span className="gold">.</span></h1>
          <p>The page you're looking for doesn't exist or has moved.</p>
          <p style={{ marginTop: 20 }}>
            <Link href="/" className="eco-link">Back to the homepage →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
