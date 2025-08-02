interface Props {
  label: string;
  value: string;
  positive?: boolean;
}
export default function KPICard({ label, value, positive }: Props) {
  return (
    <div className="stat-card">
      <h3>{label}</h3>
      <p className={positive ? 'stat-value positive' : 'stat-value'}>
        {value}
      </p>
    </div>
  );
}
