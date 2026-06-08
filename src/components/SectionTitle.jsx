import MotionWrapper from "./MotionWrapper";

export default function SectionTitle({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  recruiterMode = false,
}) {
  const centered = align === "center";

  return (
    <MotionWrapper
      disabled={recruiterMode}
      className={`section-title ${centered ? "section-title-center" : ""}`}
    >
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id={id}>{title}</h2>
      </div>
      {description ? <p className="section-description">{description}</p> : null}
    </MotionWrapper>
  );
}
