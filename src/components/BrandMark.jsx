// MR monogram (M and R share one stem). Uses currentColor so it follows the theme accent.
const MARK_PATH =
  "M40 208V48H64L86 112L108 48H132V208H108V116L90 168H82L64 116V208Z M131 48H168A43 43 0 0 1 168 134H131Z M132 72V110H168A19 19 0 0 0 168 72Z M150 126H180L218 208H188Z";

export default function BrandMark({ height = 22 }) {
  return (
    <svg height={height} viewBox="32 40 194 176" fill="currentColor" aria-hidden="true" focusable="false" style={{ display: "block" }}>
      <path d={MARK_PATH} />
    </svg>
  );
}
