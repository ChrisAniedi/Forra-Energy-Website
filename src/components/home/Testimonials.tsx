import { StarIc } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/Eyebrow";

const TESTS = [
  { q: "We ran two generators for eleven years. Forra sized our system from an audit, financed 60% of it, and we haven't bought diesel since March. The app tells me exactly what we're saving.", n: "Adaeze Okonkwo", r: "MD, Bloomfield Schools · Enugu", init: "AO" },
  { q: "The financing made the difference. ₦280k monthly instead of ₦8.5M upfront — and our repayment is less than what we used to burn on fuel.", n: "Tunde Bakare", r: "Homeowner · Gwarinpa, Abuja", init: "TB" },
  { q: "As a hospital, downtime isn't an option. Their monitoring team flagged a battery issue before we even noticed. That's the kind of partner you keep.", n: "Dr. Fatima Yusuf", r: "Admin Director, Crestview Medical · Kano", init: "FY" },
];
const Testimonials = () => (
  <section className="section section--mist">
    <div className="container">
      <div className="section-head">
        <Eyebrow>Customer stories</Eyebrow>
        <h2>People keep the receipts.<br />So do we.</h2>
      </div>
      <div className="test-grid">
        {TESTS.map((t) => (
          <figure className="test-card" key={t.n}>
            <div className="test-stars">{Array.from({ length: 5 }).map((_, i) => <StarIc key={i} size={14} color="#F2A91C" />)}</div>
            <blockquote>"{t.q}"</blockquote>
            <figcaption>
              <span className="test-avatar">{t.init}</span>
              <div><strong>{t.n}</strong><em>{t.r}</em></div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
