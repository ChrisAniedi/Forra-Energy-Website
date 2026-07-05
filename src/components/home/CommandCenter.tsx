"use client";

/** Live-system dashboard panel under the hero — the site's signature element. */
import { useState, useEffect } from "react";
import { BatteryIc, CpuIc, HomeIc, LeafIc, SunIc } from "@/components/ui/icons";
import { Spark } from "@/components/ui/Spark";

const CommandCenter = () => {
  const [gen, setGen] = useState(6.4);
  const [soc, setSoc] = useState(84);
  const [load, setLoad] = useState(3.1);
  useEffect(() => {
    const t = setInterval(() => {
      setGen((g) => +(Math.max(4.8, Math.min(7.6, g + (Math.random() - 0.5) * 0.5))).toFixed(1));
      setLoad((l) => +(Math.max(2.2, Math.min(4.4, l + (Math.random() - 0.5) * 0.35))).toFixed(1));
      setSoc((s) => Math.max(78, Math.min(96, s + (Math.random() > 0.5 ? 1 : -1))));
    }, 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="cmd">
      <div className="cmd-bar">
        <div className="cmd-live"><span className="live-dot" /> Live · Ikoyi Residence, Lagos</div>
        <div className="cmd-chips">
          <span className="flow-chip">Hybrid 10kW</span>
          <span className="flow-chip flow-chip--grid">Grid · standby</span>
        </div>
      </div>
      <div className="cmd-grid">
        <div className="cmd-flow">
          <svg className="flow-svg" viewBox="0 0 480 170" fill="none">
            <path d="M104 50 C 160 50, 168 85, 208 85" stroke="#0FA36B" strokeWidth="1.6" strokeDasharray="3 5" className="flow-path" />
            <path d="M272 85 C 320 85, 330 50, 376 50" stroke="#F2A91C" strokeWidth="1.6" strokeDasharray="3 5" className="flow-path flow-path--d1" />
            <path d="M272 85 C 320 85, 330 128, 376 128" stroke="#4C9EEB" strokeWidth="1.6" strokeDasharray="3 5" className="flow-path flow-path--d2" />
            <g transform="translate(40,28)">
              <rect width="64" height="44" rx="12" fill="#EAF6F0" />
              <g transform="translate(21,11)"><SunIc size={22} color="#0A7A50" /></g>
              <text x="32" y="58" textAnchor="middle" fontSize="9.5" fill="#5C6B62" fontWeight="700" letterSpacing="1">SOLAR</text>
            </g>
            <g transform="translate(208,63)">
              <rect width="64" height="44" rx="12" fill="#0B2B1F" />
              <g transform="translate(21,11)"><CpuIc size={22} color="#8FD8B8" /></g>
              <text x="32" y="58" textAnchor="middle" fontSize="9.5" fill="#5C6B62" fontWeight="700" letterSpacing="1">INVERTER</text>
            </g>
            <g transform="translate(376,28)">
              <rect width="64" height="44" rx="12" fill="#FDF3DC" />
              <g transform="translate(21,11)"><BatteryIc size={22} color="#B47B0B" /></g>
              <text x="32" y="58" textAnchor="middle" fontSize="9.5" fill="#5C6B62" fontWeight="700" letterSpacing="1">BATTERY</text>
            </g>
            <g transform="translate(376,106)">
              <rect width="64" height="44" rx="12" fill="#E9F2FB" />
              <g transform="translate(21,11)"><HomeIc size={22} color="#2F6FB0" /></g>
              <text x="32" y="58" textAnchor="middle" fontSize="9.5" fill="#5C6B62" fontWeight="700" letterSpacing="1">HOME</text>
            </g>
          </svg>
          <div className="flow-foot">
            <span><LeafIc size={15} color="#0A7A50" /> 14.2 kg CO₂ avoided today</span>
            <span className="flow-save">Saved today · ₦11,850</span>
          </div>
        </div>
        <div className="cmd-side">
          <div className="flow-stats">
            <div><label>Solar generation</label><strong>{gen.toFixed(1)} kW</strong><em className="up">▲ producing</em></div>
            <div><label>Battery</label><strong>{soc}%</strong><em>{soc > 90 ? "float" : "charging"}</em></div>
            <div><label>Home load</label><strong>{load.toFixed(1)} kW</strong><em>grid: 0.0 kW</em></div>
          </div>
          <div className="cmd-spark">
            <div className="cmd-spark-top"><label>Generation today</label><strong>41.8 kWh</strong></div>
            <Spark color="#0FA36B" pts={[8, 14, 12, 26, 34, 48, 62, 76, 84, 96, 90, 98, 88, 74, 60]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;
