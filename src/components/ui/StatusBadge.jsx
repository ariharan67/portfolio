export default function StatusBadge({ status }) {
  const key = status.replace(/\s+/g, "-");
  return <span className={`badge badge--${key}`}>{status}</span>;
}
