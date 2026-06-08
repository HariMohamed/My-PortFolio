import { motion, useReducedMotion } from "framer-motion";

export default function MotionWrapper({
  as = "div",
  children,
  className = "",
  delay = 0,
  disabled = false,
  hover = false,
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (prefersReducedMotion || disabled) {
    const StaticComponent = as;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </Component>
  );
}
