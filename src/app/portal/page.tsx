import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Manage your Forra Energy installation, financing and support in one workspace.",
};

/** Placeholder route. Replace with the authenticated portal when it ships. */
export default function PortalPage() {
  return (
    <main className="page">
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Eyebrow>Client Portal</Eyebrow>
          <h1>Your energy workspace is on its way<span className="gold">.</span></h1>
          <p>
            Installation progress, financing, payments, warranties, reports and support — all in
            one place. The portal is in active development; existing customers can reach the
            support team by email in the meantime.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link href="/contact" className="eco-link">Contact support instead →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
