import './dashboard.css';
import Header from './components/Header';
import ChartSection from './components/ChartSection';
import DataTable from './components/DataTable';

export default function Dashboard() {
  return (
    <main className="dashboard-container">
      <Header />
      <ChartSection />
      <DataTable />
    </main>
  );
}
