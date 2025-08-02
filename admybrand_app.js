// ADmyBRAND Analytics Dashboard JavaScript

class AnalyticsDashboard {
    constructor() {
        this.data = null;
        this.charts = {};
        this.currentPage = 1;
        this.pageSize = 6;
        this.filteredCampaigns = [];
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.updateInterval = null;
        this.searchTerm = '';
        this.statusFilter = '';
        
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.initializeTheme();
            this.renderDashboard();
            this.startRealTimeUpdates();
            this.hideLoadingScreen();
        } catch (error) {
            console.error('Failed to initialize dashboard:', error);
            this.hideLoadingScreen();
        }
    }

    async loadData() {
        // Using the provided analytics data
        this.data = {
            "revenue_data": [
                {"date": "2025-07-03", "revenue": 26612, "currency": "USD"},
                {"date": "2025-07-04", "revenue": 24363, "currency": "USD"},
                {"date": "2025-07-05", "revenue": 26387, "currency": "USD"},
                {"date": "2025-07-06", "revenue": 27290, "currency": "USD"},
                {"date": "2025-07-07", "revenue": 25845, "currency": "USD"},
                {"date": "2025-07-08", "revenue": 28732, "currency": "USD"},
                {"date": "2025-07-09", "revenue": 26901, "currency": "USD"},
                {"date": "2025-07-10", "revenue": 29156, "currency": "USD"},
                {"date": "2025-07-11", "revenue": 27834, "currency": "USD"},
                {"date": "2025-07-12", "revenue": 26789, "currency": "USD"},
                {"date": "2025-07-13", "revenue": 28945, "currency": "USD"},
                {"date": "2025-07-14", "revenue": 30123, "currency": "USD"},
                {"date": "2025-07-15", "revenue": 29567, "currency": "USD"},
                {"date": "2025-07-16", "revenue": 31245, "currency": "USD"},
                {"date": "2025-07-17", "revenue": 28834, "currency": "USD"},
                {"date": "2025-07-18", "revenue": 30567, "currency": "USD"},
                {"date": "2025-07-19", "revenue": 32156, "currency": "USD"},
                {"date": "2025-07-20", "revenue": 29834, "currency": "USD"},
                {"date": "2025-07-21", "revenue": 31567, "currency": "USD"},
                {"date": "2025-07-22", "revenue": 33245, "currency": "USD"},
                {"date": "2025-07-23", "revenue": 30789, "currency": "USD"},
                {"date": "2025-07-24", "revenue": 32834, "currency": "USD"},
                {"date": "2025-07-25", "revenue": 34567, "currency": "USD"},
                {"date": "2025-07-26", "revenue": 31234, "currency": "USD"},
                {"date": "2025-07-27", "revenue": 33789, "currency": "USD"},
                {"date": "2025-07-28", "revenue": 35234, "currency": "USD"},
                {"date": "2025-07-29", "revenue": 32567, "currency": "USD"},
                {"date": "2025-07-30", "revenue": 34789, "currency": "USD"},
                {"date": "2025-07-31", "revenue": 36234, "currency": "USD"},
                {"date": "2025-08-01", "revenue": 33567, "currency": "USD"}
            ],
            "campaign_data": [
                {
                    "name": "Google Ads Q4",
                    "type": "PPC",
                    "status": "active",
                    "impressions": 54196,
                    "clicks": 7353,
                    "conversions": 195,
                    "cost": 6396,
                    "ctr": 2.71,
                    "cpc": 7.28,
                    "roas": 3.42
                },
                {
                    "name": "Facebook Brand Awareness",
                    "type": "Social",
                    "status": "active",
                    "impressions": 141219,
                    "clicks": 2587,
                    "conversions": 243,
                    "cost": 13160,
                    "ctr": 4.56,
                    "cpc": 1.41,
                    "roas": 2.59
                },
                {
                    "name": "Email Newsletter Dec",
                    "type": "Email",
                    "status": "active",
                    "impressions": 89234,
                    "clicks": 3456,
                    "conversions": 167,
                    "cost": 2850,
                    "ctr": 3.87,
                    "cpc": 0.82,
                    "roas": 4.23
                },
                {
                    "name": "LinkedIn B2B Campaign",
                    "type": "Social",
                    "status": "paused",
                    "impressions": 32150,
                    "clicks": 1240,
                    "conversions": 78,
                    "cost": 4560,
                    "ctr": 3.86,
                    "cpc": 3.68,
                    "roas": 1.95
                },
                {
                    "name": "Display Retargeting",
                    "type": "Display",
                    "status": "active",
                    "impressions": 247072,
                    "clicks": 4563,
                    "conversions": 201,
                    "cost": 5624,
                    "ctr": 1.85,
                    "cpc": 1.23,
                    "roas": 3.78
                },
                {
                    "name": "Instagram Influencer",
                    "type": "Social",
                    "status": "completed",
                    "impressions": 98765,
                    "clicks": 6789,
                    "conversions": 289,
                    "cost": 8950,
                    "ctr": 6.87,
                    "cpc": 1.32,
                    "roas": 5.67
                }
            ],
            "traffic_sources": [
                {"source": "Organic Search", "users": 14250, "percentage": 42.3},
                {"source": "Paid Search", "users": 8950, "percentage": 26.6},
                {"source": "Social Media", "users": 5680, "percentage": 16.9},
                {"source": "Direct", "users": 3120, "percentage": 9.3},
                {"source": "Email", "users": 1650, "percentage": 4.9}
            ],
            "current_metrics": {
                "total_revenue": 206244,
                "total_users": 15812,
                "avg_conversion_rate": 3.61,
                "growth_rate": 12.8,
                "active_campaigns": 4,
                "total_impressions": 563871,
                "avg_cpc": 6.2,
                "total_ad_spend": 28530
            }
        };
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Sidebar toggle
        document.getElementById('sidebar-toggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection(item.dataset.section);
            });
        });

        // Chart tabs
        document.querySelectorAll('.chart-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchChart(tab.dataset.chart);
            });
        });

        // Table controls
        document.getElementById('campaign-search').addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.applyFilters();
        });

        document.getElementById('status-filter').addEventListener('change', (e) => {
            this.statusFilter = e.target.value;
            this.applyFilters();
        });

        // Table sorting
        document.querySelectorAll('.sortable').forEach(header => {
            header.addEventListener('click', () => {
                this.sortTable(header.dataset.column);
            });
        });

        // Pagination
        document.getElementById('prev-page').addEventListener('click', () => {
            this.changePage(-1);
        });

        document.getElementById('next-page').addEventListener('click', () => {
            this.changePage(1);
        });

        // Refresh and export
        document.getElementById('refresh-data').addEventListener('click', () => {
            this.refreshData();
        });

        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('admybrand-theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('admybrand-theme', newTheme);
        
        // Animate theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);

        // Update charts for new theme
        setTimeout(() => {
            this.updateChartsForTheme();
        }, 100);
    }

    updateChartsForTheme() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const app = document.getElementById('app');
        sidebar.classList.toggle('open');
        
        // Add overlay for mobile
        if (window.innerWidth <= 1024) {
            if (sidebar.classList.contains('open')) {
                this.createOverlay();
            } else {
                this.removeOverlay();
            }
        }
    }

    createOverlay() {
        if (!document.querySelector('.sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 64px;
                left: 0;
                width: 100%;
                height: calc(100vh - 64px);
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(overlay);
            
            setTimeout(() => overlay.style.opacity = '1', 10);
            
            overlay.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }

    removeOverlay() {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }

    navigateToSection(section) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Show section
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            document.getElementById('sidebar').classList.remove('open');
            this.removeOverlay();
        }
    }

    renderDashboard() {
        this.renderMetrics();
        this.initializeCharts();
        this.renderCampaignTable();
    }

    renderMetrics() {
        const metrics = this.data.current_metrics;
        
        // Format numbers
        document.getElementById('total-revenue').textContent = 
            `$${(metrics.total_revenue / 1000).toFixed(0)}K`;
        document.getElementById('total-users').textContent = 
            metrics.total_users.toLocaleString();
        document.getElementById('conversion-rate').textContent = 
            `${metrics.avg_conversion_rate}%`;
        document.getElementById('growth-rate').textContent = 
            `${metrics.growth_rate}%`;

        // Animate metric cards
        document.querySelectorAll('.metric-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('slide-up');
        });
    }

    initializeCharts() {
        this.initRevenueChart();
        this.initCampaignChart();
        this.initTrafficChart();
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenue-chart').getContext('2d');
        const revenueData = this.data.revenue_data.slice(-14); // Last 14 days
        
        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: revenueData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
                datasets: [{
                    label: 'Daily Revenue',
                    data: revenueData.map(d => d.revenue),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#1FB8CD',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `Revenue: $${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    initCampaignChart() {
        const ctx = document.getElementById('campaign-chart').getContext('2d');
        const campaignData = this.data.campaign_data;
        
        this.charts.campaign = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: campaignData.map(c => c.name),
                datasets: [{
                    label: 'Conversions',
                    data: campaignData.map(c => c.conversions),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                    borderWidth: 1,
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#1FB8CD',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 50
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }

    initTrafficChart() {
        const ctx = document.getElementById('traffic-chart').getContext('2d');
        const trafficData = this.data.traffic_sources;
        
        this.charts.traffic = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: trafficData.map(t => t.source),
                datasets: [{
                    data: trafficData.map(t => t.users),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                    borderColor: '#fff',
                    borderWidth: 2,
                    hoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#1FB8CD',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    switchChart(chartType) {
        // Update active tab
        document.querySelectorAll('.chart-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-chart="${chartType}"]`).classList.add('active');

        // Show chart panel
        document.querySelectorAll('.chart-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${chartType}-chart-container`).classList.add('active');

        // Resize the active chart to ensure proper display
        setTimeout(() => {
            if (this.charts[chartType]) {
                this.charts[chartType].resize();
            }
        }, 100);
    }

    renderCampaignTable() {
        this.filteredCampaigns = [...this.data.campaign_data];
        this.renderTableRows();
        this.updatePagination();
    }

    applyFilters() {
        let filtered = [...this.data.campaign_data];
        
        // Apply search filter
        if (this.searchTerm) {
            filtered = filtered.filter(campaign =>
                campaign.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                campaign.type.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
        
        // Apply status filter
        if (this.statusFilter) {
            filtered = filtered.filter(campaign => campaign.status === this.statusFilter);
        }
        
        this.filteredCampaigns = filtered;
        this.currentPage = 1;
        this.renderTableRows();
        this.updatePagination();
    }

    renderTableRows() {
        const tbody = document.getElementById('campaigns-tbody');
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageData = this.filteredCampaigns.slice(start, end);
        
        tbody.innerHTML = pageData.map(campaign => `
            <tr>
                <td><strong>${campaign.name}</strong></td>
                <td>${campaign.type}</td>
                <td><span class="status ${campaign.status}">${campaign.status}</span></td>
                <td>${campaign.impressions.toLocaleString()}</td>
                <td>${campaign.clicks.toLocaleString()}</td>
                <td>${campaign.conversions}</td>
                <td>$${campaign.cost.toLocaleString()}</td>
                <td>${campaign.roas.toFixed(2)}x</td>
            </tr>
        `).join('');
    }

    sortTable(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }

        // Update header indicators
        document.querySelectorAll('.sortable').forEach(header => {
            header.classList.remove('asc', 'desc');
        });
        document.querySelector(`[data-column="${column}"]`).classList.add(this.sortDirection);

        // Sort data
        this.filteredCampaigns.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

        this.renderTableRows();
    }

    changePage(direction) {
        const totalPages = Math.ceil(this.filteredCampaigns.length / this.pageSize);
        const newPage = this.currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.renderTableRows();
            this.updatePagination();
        }
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredCampaigns.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(start + this.pageSize - 1, this.filteredCampaigns.length);
        
        document.getElementById('pagination-info').textContent = 
            `Showing ${start}-${end} of ${this.filteredCampaigns.length} campaigns`;
        
        document.getElementById('prev-page').disabled = this.currentPage === 1;
        document.getElementById('next-page').disabled = this.currentPage === totalPages || totalPages === 0;
    }

    startRealTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.simulateRealTimeUpdate();
        }, 30000); // Update every 30 seconds
    }

    simulateRealTimeUpdate() {
        // Show update indicator
        const indicator = document.getElementById('update-indicator');
        indicator.classList.remove('hidden');
        
        // Simulate small changes in metrics
        const revenueElement = document.getElementById('total-revenue');
        const currentRevenue = parseInt(revenueElement.textContent.replace('$', '').replace('K', '')) * 1000;
        const newRevenue = currentRevenue + Math.floor(Math.random() * 1000);
        revenueElement.textContent = `$${Math.floor(newRevenue / 1000)}K`;
        
        // Hide indicator after 3 seconds
        setTimeout(() => {
            indicator.classList.add('hidden');
        }, 3000);
    }

    refreshData() {
        const refreshBtn = document.getElementById('refresh-data');
        const refreshIcon = refreshBtn.querySelector('.refresh-icon');
        
        // Animate refresh button
        refreshIcon.style.animation = 'spin 1s linear infinite';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            refreshIcon.style.animation = '';
            refreshBtn.disabled = false;
            this.simulateRealTimeUpdate();
        }, 1000);
    }

    exportData() {
        // Simulate export functionality
        const exportBtn = document.getElementById('export-data');
        const originalText = exportBtn.innerHTML;
        
        exportBtn.innerHTML = '<span class="export-icon">⏳</span> Exporting...';
        exportBtn.disabled = true;
        
        setTimeout(() => {
            exportBtn.innerHTML = '<span class="export-icon">✓</span> Exported!';
            setTimeout(() => {
                exportBtn.innerHTML = originalText;
                exportBtn.disabled = false;
            }, 1000);
        }, 2000);
    }

    handleResize() {
        // Resize charts
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
        
        // Close sidebar on desktop
        if (window.innerWidth > 1024) {
            document.getElementById('sidebar').classList.remove('open');
            this.removeOverlay();
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                app.classList.remove('hidden');
                app.classList.add('fade-in');
            }, 300);
        }, 1500); // Show loading for 1.5 seconds
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnalyticsDashboard();
});

// Handle service worker registration for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, but app still works
        });
    });
}