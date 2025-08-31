<script lang="ts">
  import { formatDate } from '$lib/utils/index.js';
  
  // Mock analytics data
  let analyticsData = $state({
    overview: {
      totalUsers: 12847,
      totalContractors: 247,
      totalReviews: 5247,
      totalRevenue: 125000,
      growthRate: 12.4,
      conversionRate: 8.7,
      averageRating: 4.8,
      customerSatisfaction: 94.2
    },
    userGrowth: [
      { month: 'Jan', users: 8500, contractors: 180 },
      { month: 'Feb', users: 9200, contractors: 195 },
      { month: 'Mar', users: 9800, contractors: 210 },
      { month: 'Apr', users: 10500, contractors: 220 },
      { month: 'May', users: 11200, contractors: 235 },
      { month: 'Jun', users: 12000, contractors: 247 },
      { month: 'Jul', users: 12847, contractors: 247 }
    ],
    reviewStats: [
      { rating: 5, count: 2850, percentage: 54.3 },
      { rating: 4, count: 1574, percentage: 30.0 },
      { rating: 3, count: 524, percentage: 10.0 },
      { rating: 2, count: 210, percentage: 4.0 },
      { rating: 1, count: 89, percentage: 1.7 }
    ],
    topCategories: [
      { name: 'Plumbing', contractors: 45, reviews: 1250, avgRating: 4.8 },
      { name: 'Electrical', contractors: 38, reviews: 980, avgRating: 4.7 },
      { name: 'HVAC', contractors: 32, reviews: 850, avgRating: 4.9 },
      { name: 'Roofing', contractors: 28, reviews: 720, avgRating: 4.6 },
      { name: 'Painting', contractors: 52, reviews: 680, avgRating: 4.5 }
    ],
    recentActivity: [
      { date: '2024-01-20', newUsers: 45, newContractors: 2, newReviews: 23 },
      { date: '2024-01-19', newUsers: 38, newContractors: 1, newReviews: 31 },
      { date: '2024-01-18', newUsers: 52, newContractors: 3, newReviews: 28 },
      { date: '2024-01-17', newUsers: 41, newContractors: 1, newReviews: 19 },
      { date: '2024-01-16', newUsers: 47, newContractors: 2, newReviews: 25 }
    ],
    geographicData: [
      { city: 'Denver', users: 4200, contractors: 85 },
      { city: 'Aurora', users: 2100, contractors: 42 },
      { city: 'Lakewood', users: 1800, contractors: 35 },
      { city: 'Thornton', users: 1500, contractors: 28 },
      { city: 'Westminster', users: 1200, contractors: 22 },
      { city: 'Arvada', users: 1100, contractors: 20 },
      { city: 'Other', users: 947, contractors: 15 }
    ]
  });
  
  let selectedTimeRange = $state('7d');
  let selectedMetric = $state('users');
  
  function calculatePercentageChange(current: number, previous: number): string {
    const change = ((current - previous) / previous) * 100;
    return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  }
  
  function getChangeColor(current: number, previous: number): string {
    const change = current - previous;
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }
</script>

<!-- Analytics Dashboard -->
<div class="space-y-6">
  <!-- Time Range Selector -->
  <div class="flex items-center justify-between">
    <h2 class="text-2xl font-bold text-gray-900">Analytics Overview</h2>
    <div class="flex items-center space-x-2">
      <select bind:value={selectedTimeRange} class="input w-auto">
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
        <option value="1y">Last year</option>
      </select>
    </div>
  </div>
  
  <!-- Key Metrics -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Users</p>
          <p class="text-3xl font-bold text-gray-900">{analyticsData.overview.totalUsers.toLocaleString()}</p>
          <p class="text-sm text-green-600 mt-1">
            +{analyticsData.overview.growthRate}% this month
          </p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Contractors</p>
          <p class="text-3xl font-bold text-gray-900">{analyticsData.overview.totalContractors}</p>
          <p class="text-sm text-green-600 mt-1">
            +8.2% this month
          </p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Reviews</p>
          <p class="text-3xl font-bold text-gray-900">{analyticsData.overview.totalReviews.toLocaleString()}</p>
          <p class="text-sm text-blue-600 mt-1">
            Avg: {analyticsData.overview.averageRating} stars
          </p>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Conversion Rate</p>
          <p class="text-3xl font-bold text-gray-900">{analyticsData.overview.conversionRate}%</p>
          <p class="text-sm text-purple-600 mt-1">
            {analyticsData.overview.customerSatisfaction}% satisfaction
          </p>
        </div>
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Charts Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- User Growth Chart -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">Growth Trends</h3>
        <select bind:value={selectedMetric} class="input w-auto text-sm">
          <option value="users">Users</option>
          <option value="contractors">Contractors</option>
        </select>
      </div>
      
      <div class="space-y-4">
        {#each analyticsData.userGrowth as data}
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 w-12">{data.month}</span>
            <div class="flex-1 mx-4">
              <div class="bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style="width: {selectedMetric === 'users' ? (data.users / 15000) * 100 : (data.contractors / 300) * 100}%"
                ></div>
              </div>
            </div>
            <span class="text-sm font-medium text-gray-900 w-16 text-right">
              {selectedMetric === 'users' ? data.users.toLocaleString() : data.contractors}
            </span>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Review Distribution -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Review Distribution</h3>
      
      <div class="space-y-4">
        {#each analyticsData.reviewStats as stat}
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">{stat.rating} stars</span>
              <div class="flex space-x-1">
                {#each Array(stat.rating) as _}
                  <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                {/each}
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style="width: {stat.percentage}%"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-16 text-right">
                {stat.count.toLocaleString()}
              </span>
              <span class="text-sm text-gray-500 w-12 text-right">
                {stat.percentage}%
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Top Categories -->
  <div class="card p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-6">Top Service Categories</h3>
    
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="text-left py-3 text-sm font-medium text-gray-600">Category</th>
            <th class="text-left py-3 text-sm font-medium text-gray-600">Contractors</th>
            <th class="text-left py-3 text-sm font-medium text-gray-600">Reviews</th>
            <th class="text-left py-3 text-sm font-medium text-gray-600">Avg Rating</th>
            <th class="text-left py-3 text-sm font-medium text-gray-600">Performance</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {#each analyticsData.topCategories as category}
            <tr>
              <td class="py-4">
                <span class="font-medium text-gray-900">{category.name}</span>
              </td>
              <td class="py-4">
                <span class="text-gray-700">{category.contractors}</span>
              </td>
              <td class="py-4">
                <span class="text-gray-700">{category.reviews.toLocaleString()}</span>
              </td>
              <td class="py-4">
                <div class="flex items-center space-x-1">
                  <span class="text-gray-700">{category.avgRating.toFixed(1)}</span>
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </div>
              </td>
              <td class="py-4">
                <div class="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style="width: {(category.avgRating / 5) * 100}%"
                  ></div>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  
  <!-- Geographic Distribution & Recent Activity -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Geographic Distribution -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Geographic Distribution</h3>
      
      <div class="space-y-4">
        {#each analyticsData.geographicData as location}
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900">{location.city}</span>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm text-gray-700">{location.users.toLocaleString()} users</div>
                <div class="text-xs text-gray-500">{location.contractors} contractors</div>
              </div>
              <div class="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style="width: {(location.users / 5000) * 100}%"
                ></div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div class="space-y-4">
        {#each analyticsData.recentActivity as activity}
          <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <span class="text-sm text-gray-600">{formatDate(new Date(activity.date))}</span>
            <div class="flex items-center space-x-6 text-sm">
              <div class="text-center">
                <div class="font-medium text-blue-600">{activity.newUsers}</div>
                <div class="text-xs text-gray-500">Users</div>
              </div>
              <div class="text-center">
                <div class="font-medium text-green-600">{activity.newContractors}</div>
                <div class="text-xs text-gray-500">Contractors</div>
              </div>
              <div class="text-center">
                <div class="font-medium text-yellow-600">{activity.newReviews}</div>
                <div class="text-xs text-gray-500">Reviews</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
