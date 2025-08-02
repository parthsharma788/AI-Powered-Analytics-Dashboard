import Image from 'next/image'
import './dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">ADmyBRAND Analytics Dashboard</h1>
          <div className="header-stats">
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-value">$12,485</p>
            </div>
            <div className="stat-card">
              <h3>Active Users</h3>
              <p className="stat-value">1,247</p>
            </div>
            <div className="stat-card">
              <h3>Conversion Rate</h3>
              <p className="stat-value">3.4%</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {/* Charts Section */}
        <section className="charts-section">
          <div className="chart-container">
            <h2>Revenue Chart</h2>
            <Image 
              src="/admybrand_revenue_chart.png" 
              alt="Revenue Chart" 
              width={600} 
              height={400}
              className="chart-image"
            />
          </div>
          
          <div className="chart-container">
            <h2>Campaign ROAS</h2>
            <Image 
              src="/campaign_roas_chart.png" 
              alt="Campaign ROAS Chart" 
              width={600} 
              height={400}
              className="chart-image"
            />
          </div>
          
          <div className="chart-container">
            <h2>Traffic Sources</h2>
            <Image 
              src="/traffic_sources_donut.png" 
              alt="Traffic Sources Chart" 
              width={400} 
              height={400}
              className="chart-image"
            />
          </div>
        </section>

        {/* Data Table Section */}
        <section className="data-section">
          <h2>Analytics Data</h2>
          <DataTable />
        </section>
      </main>
    </div>
  )
}

// Data Table Component
function DataTable() {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Page Views</td>
            <td>45,231</td>
            <td className="positive">+12%</td>
          </tr>
          <tr>
            <td>Unique Visitors</td>
            <td>12,485</td>
            <td className="positive">+8%</td>
          </tr>
          <tr>
            <td>Bounce Rate</td>
            <td>34.2%</td>
            <td className="negative">-3%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
