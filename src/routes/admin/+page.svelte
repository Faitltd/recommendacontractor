<script lang="ts">
  import { formatDate } from '$lib/utils/index.js';
  
  // Mock dashboard data - in real app this would come from API
  let dashboardStats = $state({
    totalContractors: 247,
    activeContractors: 198,
    pendingVerification: 12,
    totalReviews: 5247,
    pendingReviews: 23,
    flaggedReviews: 8,
    totalUsers: 12847,
    newUsersThisMonth: 342,
    totalDisputes: 15,
    openDisputes: 3,
    averageRating: 4.8,
    conversionRate: 12.4
  });
  
  let recentActivity = $state([
    {
      id: '1',
      type: 'contractor_registered',
      message: 'New contractor "Mile High Roofing" registered',
      timestamp: new Date('2024-01-20T10:30:00'),
      status: 'pending'
    },
    {
      id: '2',
      type: 'review_flagged',
      message: 'Review for "Denver Pro Plumbing" flagged for moderation',
      timestamp: new Date('2024-01-20T09:15:00'),
      status: 'warning'
    },
    {
      id: '3',
      type: 'dispute_opened',
      message: 'New dispute opened for review #1247',
      timestamp: new Date('2024-01-20T08:45:00'),
      status: 'urgent'
    },
    {
      id: '4',
      type: 'contractor_verified',
      message: 'Contractor "Rocky Mountain HVAC" verified successfully',
      timestamp: new Date('2024-01-19T16:20:00'),
      status: 'success'
    },
    {
      id: '5',
      type: 'user_registered',
      message: '15 new users registered today',
      timestamp: new Date('2024-01-19T14:30:00'),
      status: 'info'
    }
  ]);
  
  let pendingActions = $state([
    {
      id: '1',
      title: 'Contractor Verifications',
      count: 12,
      description: 'Contractors waiting for verification',
      action: 'Review',
      href: '/admin/contractors?status=pending',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Review Moderation',
      count: 23,
      description: 'Reviews pending moderation',
      action: 'Moderate',
      href: '/admin/reviews?status=pending',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Open Disputes',
      count: 3,
      description: 'Disputes requiring attention',
      action: 'Resolve',
      href: '/admin/disputes?status=open',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Flagged Content',
      count: 8,
      description: 'Content flagged by users',
      action: 'Review',
      href: '/admin/reviews?flagged=true',
      priority: 'medium'
    }
  ]);
  
  function getActivityIcon(type: string) {
    switch (type) {
      case 'contractor_registered':
        return 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4';
      case 'review_flagged':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'dispute_opened':
        return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'contractor_verified':
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case 'user_registered':
        return 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
  
  function getActivityColor(status: string) {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }
  
  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-white';
    }
  }
</script>

<!-- Dashboard Overview -->
<div class="space-y-6">
  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Total Contractors -->
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Contractors</p>
          <p class="text-3xl font-bold text-gray-900">{dashboardStats.totalContractors}</p>
          <p class="text-sm text-green-600 mt-1">
            {dashboardStats.activeContractors} active
          </p>
        </div>
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Total Reviews -->
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Reviews</p>
          <p class="text-3xl font-bold text-gray-900">{dashboardStats.totalReviews.toLocaleString()}</p>
          <p class="text-sm text-blue-600 mt-1">
            Avg: {dashboardStats.averageRating} stars
          </p>
        </div>
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Total Users -->
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Total Users</p>
          <p class="text-3xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
          <p class="text-sm text-green-600 mt-1">
            +{dashboardStats.newUsersThisMonth} this month
          </p>
        </div>
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Conversion Rate -->
    <div class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">Conversion Rate</p>
          <p class="text-3xl font-bold text-gray-900">{dashboardStats.conversionRate}%</p>
          <p class="text-sm text-purple-600 mt-1">
            {dashboardStats.totalDisputes} disputes
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
  
  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Pending Actions -->
    <div class="lg:col-span-1">
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
        <div class="space-y-4">
          {#each pendingActions as action}
            <div class="border rounded-lg p-4 {getPriorityColor(action.priority)}">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-900">{action.title}</h4>
                <span class="text-2xl font-bold text-gray-900">{action.count}</span>
              </div>
              <p class="text-sm text-gray-600 mb-3">{action.description}</p>
              <a href={action.href} class="btn btn-primary btn-sm w-full">
                {action.action}
              </a>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="lg:col-span-2">
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <a href="/admin/activity" class="text-blue-600 hover:text-blue-500 text-sm font-medium">
            View All
          </a>
        </div>
        <div class="space-y-4">
          {#each recentActivity as activity}
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center {getActivityColor(activity.status)}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getActivityIcon(activity.type)}></path>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{activity.message}</p>
                <p class="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Verification Status</h4>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Verified</span>
          <span class="text-sm font-medium text-green-600">{dashboardStats.activeContractors}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Pending</span>
          <span class="text-sm font-medium text-yellow-600">{dashboardStats.pendingVerification}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Rejected</span>
          <span class="text-sm font-medium text-red-600">37</span>
        </div>
      </div>
    </div>
    
    <div class="card p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Review Status</h4>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Published</span>
          <span class="text-sm font-medium text-green-600">{dashboardStats.totalReviews - dashboardStats.pendingReviews - dashboardStats.flaggedReviews}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Pending</span>
          <span class="text-sm font-medium text-yellow-600">{dashboardStats.pendingReviews}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Flagged</span>
          <span class="text-sm font-medium text-red-600">{dashboardStats.flaggedReviews}</span>
        </div>
      </div>
    </div>
    
    <div class="card p-6">
      <h4 class="text-sm font-medium text-gray-600 mb-2">Dispute Status</h4>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Resolved</span>
          <span class="text-sm font-medium text-green-600">{dashboardStats.totalDisputes - dashboardStats.openDisputes}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">Open</span>
          <span class="text-sm font-medium text-red-600">{dashboardStats.openDisputes}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-700">In Progress</span>
          <span class="text-sm font-medium text-yellow-600">2</span>
        </div>
      </div>
    </div>
  </div>
</div>
