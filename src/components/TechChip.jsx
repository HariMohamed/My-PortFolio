import { useState } from "react";
import { techLogos } from "../data/logos";

export default function TechChip({ tech }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const logo = techLogos[tech];

  return (
    <span className="chip gap-2">
      {logo && !logoFailed ? (
        <img
          src={logo}
          alt={tech}
          title={tech}
          className="w-4 h-4 object-contain"
          loading="lazy"
          decoding="async"
          onError={() => setLogoFailed(true)}
        />
      ) : (
        tech
      )}
    </span>
  );
}
