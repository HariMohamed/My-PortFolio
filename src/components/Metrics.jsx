import CountUp from "react-countup";
import { profile } from "../data/profile";
import MotionWrapper from "./MotionWrapper";

export default function Metrics() {
  return (
    <section className="metrics-shell" aria-label="Portfolio metrics">
      {profile.metrics.map((metric, index) => (
        <MotionWrapper key={metric.label} delay={index * 0.04} className="metric-card">
          <strong>
            <CountUp end={metric.value} duration={1.7} enableScrollSpy scrollSpyOnce />
            {metric.suffix}
          </strong>
          <span>{metric.label}</span>
          <p>{metric.detail}</p>
        </MotionWrapper>
      ))}
    </section>
  );
}
