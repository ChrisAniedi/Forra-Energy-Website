import { ArrowR, PinIc } from "@/components/ui/icons";
import { Btn } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PROJECTS = [
  { loc: "Lekki Phase 1, Lagos", ind: "Residential estate", cap: "120 kW", size: "38 homes", gen: "168 MWh/yr", out: "Diesel eliminated across the estate; service charge down 31%.", grade: "a" },
  { loc: "Ikeja, Lagos", ind: "Healthcare", cap: "65 kW + 120 kWh", size: "Medical centre", gen: "94 MWh/yr", out: "Zero outage minutes in theatres since commissioning.", grade: "b" },
  { loc: "Abeokuta, Ogun", ind: "Agro-processing", cap: "250 kW", size: "Rice mill", gen: "372 MWh/yr", out: "Processing costs down 44%; night-shift capacity added.", grade: "c" },
];
const Projects = () => (
  <section className="section" id="projects">
    <div className="container">
      <div className="section-head section-head--row">
        <div>
          <Eyebrow>Featured projects</Eyebrow>
          <h2>Proof, installed.</h2>
        </div>
        <Btn kind="outline" small>View all case studies</Btn>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <article className="proj-card" key={p.loc}>
            <div className={`proj-media proj-media--${p.grade}`}>
              <div className="proj-panels">{Array.from({ length: 6 }).map((_, i) => <span key={i} />)}</div>
              <span className="proj-cap">{p.cap}</span>
            </div>
            <div className="proj-body">
              <div className="proj-meta"><PinIc size={14} color="#5C6B62" />{p.loc}<i>·</i>{p.ind}</div>
              <h3>{p.out}</h3>
              <div className="proj-facts">
                <div><label>System</label><strong>{p.cap}</strong></div>
                <div><label>Scale</label><strong>{p.size}</strong></div>
                <div><label>Generation</label><strong>{p.gen}</strong></div>
              </div>
              <button className="eco-link">Read case study<ArrowR size={15} /></button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
