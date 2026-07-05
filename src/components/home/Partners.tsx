const Partners = () => (
  <section className="partners">
    <div className="container">
      <p className="partners-label">Financing, equipment & certification partners</p>
      <div className="partners-row">
        {["Sterling Bank", "Bank of Industry", "REA Nigeria", "Huawei FusionSolar", "Deye", "Jinko Solar", "Nexus", "Itel", "Felicity Solar", "Sumry", "Luxwat", "NEMSA Certified", "SON Approved"].map((p) => (
          <span key={p} className="partner-chip">{p}</span>
        ))}
      </div>
    </div>
  </section>
);

export default Partners;
