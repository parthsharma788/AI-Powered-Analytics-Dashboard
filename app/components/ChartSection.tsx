import Image from 'next/image';

export default function ChartSection() {
  return (
    <section className="charts-section">
      <div className="chart-container">
        <h2>Revenue</h2>
        <Image
          src="/admybrand_revenue_chart.png"
          alt="Revenue Chart"
          width={600}
          height={400}
          className="chart-image"
          priority
        />
      </div>

      <div className="chart-container">
        <h2>Campaign ROAS</h2>
        <Image
          src="/campaign_roas_chart.png"
          alt="Campaign ROAS"
          width={600}
          height={400}
          className="chart-image"
        />
      </div>

      <div className="chart-container">
        <h2>Traffic Sources</h2>
        <Image
          src="/traffic_sources_donut.png"
          alt="Traffic Sources Donut"
          width={400}
          height={400}
          className="chart-image"
        />
      </div>
    </section>
  );
}
