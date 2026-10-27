import { profile } from "../data/profile";
import MotionWrapper from "./MotionWrapper";

export default function Metrics() {
  return (
    <section className="metrics-shell" aria-label="Portfolio metrics">
      {profile.metrics.map((metric, index) => (
        <MotionWrapper key={metric.label} delay={index * 0.04} className="metric-card">
          <strong className="block font-display text-5xl leading-none text-text" style={{ letterSpacing: 0 }}>
            {metric.value}{metric.suffix}
          </strong>
          <span className="mt-2 block font-mono text-xs font-bold uppercase text-accent-text">
            {metric.label}
          </span>
          <p className="mt-3 text-sm text-muted">{metric.detail}</p>
        </MotionWrapper>
      ))}
    </section>
  );
}
