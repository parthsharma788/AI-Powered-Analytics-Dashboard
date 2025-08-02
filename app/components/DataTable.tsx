export default function DataTable() {
  return (
    <section className="data-section">
      <h2>Snapshot Metrics</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Metric</th><th>Value</th><th>Δ 7 d</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Page Views</td><td>563,871</td><td className="positive">+7 %</td></tr>
            <tr><td>Sessions</td><td>201,442</td><td className="positive">+5 %</td></tr>
            <tr><td>Bounce Rate</td><td>34.2 %</td><td className="negative">-3 %</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
