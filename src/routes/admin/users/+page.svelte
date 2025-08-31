<script lang="ts">
  import { browser } from '$app/environment';
  import Badge from '$lib/components/Badge.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { formatDate, formatRelativeTime } from '$lib/utils/index.js';
  
  // Mock users data
  let users = $state([
    {
      id: '1',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      role: 'homeowner',
      status: 'active',
      emailVerified: true,
      phoneVerified: false,
      phone: '(303) 555-0201',
      location: 'Denver, CO',
      joinedAt: new Date('2023-08-15'),
      lastActive: new Date('2024-01-19'),
      reviewsCount: 3,
      contractorsContacted: 8,
      totalSpent: 2450,
      averageRating: 4.7
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@email.com',
      role: 'homeowner',
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
      phone: '(303) 555-0202',
      location: 'Lakewood, CO',
      joinedAt: new Date('2023-11-22'),
      lastActive: new Date('2024-01-18'),
      reviewsCount: 1,
      contractorsContacted: 3,
      totalSpent: 850,
      averageRating: 4.5
    },
    {
      id: '3',
      name: 'Jennifer Lopez',
      email: 'jennifer.lopez@email.com',
      role: 'homeowner',
      status: 'suspended',
      emailVerified: true,
      phoneVerified: false,
      phone: '(303) 555-0203',
      location: 'Aurora, CO',
      joinedAt: new Date('2024-01-10'),
      lastActive: new Date('2024-01-15'),
      reviewsCount: 0,
      contractorsContacted: 1,
      totalSpent: 0,
      averageRating: 0,
      suspensionReason: 'Fake reviews detected'
    },
    {
      id: '4',
      name: 'John Smith',
      email: 'john@denverproplumbing.com',
      role: 'contractor',
      status: 'active',
      emailVerified: true,
      phoneVerified: true,
      phone: '(303) 555-0101',
      location: 'Denver, CO',
      joinedAt: new Date('2023-06-15'),
      lastActive: new Date('2024-01-19'),
      reviewsCount: 127,
      contractorsContacted: 0,
      totalSpent: 0,
      averageRating: 4.8,
      businessName: 'Denver Pro Plumbing'
    }
  ]);
  
  let searchQuery = $state('');
  let roleFilter = $state('all');
  let statusFilter = $state('all');
  let sortBy = $state('joined_desc');
  let selectedUsers = $state<string[]>([]);
  let showUserModal = $state(false);
  let selectedUser = $state<any>(null);
  let loading = $state(false);
  
  const filteredUsers = $derived(() => {
    return users
      .filter(user => {
        // Search filter
        if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !user.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !(user.businessName && user.businessName.toLowerCase().includes(searchQuery.toLowerCase()))) {
          return false;
        }
        
        // Role filter
        if (roleFilter !== 'all' && user.role !== roleFilter) {
          return false;
        }
        
        // Status filter
        if (statusFilter !== 'all' && user.status !== statusFilter) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'joined_desc':
            return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
          case 'joined_asc':
            return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
          case 'name_asc':
            return a.name.localeCompare(b.name);
          case 'active_desc':
            return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
          default:
            return 0;
        }
      });
  });
  
  function toggleUserSelection(userId: string) {
    if (selectedUsers.includes(userId)) {
      selectedUsers = selectedUsers.filter(id => id !== userId);
    } else {
      selectedUsers = [...selectedUsers, userId];
    }
  }
  
  function selectAllUsers() {
    if (selectedUsers.length === filteredUsers.length) {
      selectedUsers = [];
    } else {
      selectedUsers = filteredUsers.map(u => u.id);
    }
  }
  
  function openUserModal(user: any) {
    selectedUser = user;
    showUserModal = true;
  }
  
  async function updateUserStatus(userId: string, newStatus: string, reason?: string) {
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = users.find(u => u.id === userId);
      if (user) {
        user.status = newStatus;
        if (newStatus === 'suspended' && reason) {
          user.suspensionReason = reason;
        } else if (newStatus === 'active') {
          user.suspensionReason = undefined;
        }
      }
      
      showUserModal = false;
      selectedUser = null;
    } catch (error) {
      console.error('Failed to update user status:', error);
    } finally {
      loading = false;
    }
  }
  
  async function bulkAction(action: string) {
    if (selectedUsers.length === 0) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      selectedUsers.forEach(userId => {
        const user = users.find(u => u.id === userId);
        if (user) {
          switch (action) {
            case 'activate':
              user.status = 'active';
              user.suspensionReason = undefined;
              break;
            case 'suspend':
              user.status = 'suspended';
              user.suspensionReason = 'Bulk suspension';
              break;
            case 'delete':
              users = users.filter(u => u.id !== userId);
              break;
          }
        }
      });
      
      selectedUsers = [];
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      loading = false;
    }
  }
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'success';
      case 'suspended': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  }
  
  function getRoleColor(role: string) {
    switch (role) {
      case 'contractor': return 'info';
      case 'homeowner': return 'default';
      case 'admin': return 'warning';
      default: return 'default';
    }
  }
</script>

<!-- Users Management -->
<div class="space-y-6">
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input
          bind:value={searchQuery}
          type="text"
          placeholder="Search users..."
          class="input pl-10 w-64"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      
      <select bind:value={roleFilter} class="input w-auto">
        <option value="all">All Roles</option>
        <option value="homeowner">Homeowners</option>
        <option value="contractor">Contractors</option>
        <option value="admin">Admins</option>
      </select>
      
      <select bind:value={statusFilter} class="input w-auto">
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="pending">Pending</option>
      </select>
      
      <select bind:value={sortBy} class="input w-auto">
        <option value="joined_desc">Newest First</option>
        <option value="joined_asc">Oldest First</option>
        <option value="name_asc">Name A-Z</option>
        <option value="active_desc">Recently Active</option>
      </select>
    </div>
    
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">
        {filteredUsers.length} users
      </span>
    </div>
  </div>
  
  <!-- Bulk Actions -->
  {#if selectedUsers.length > 0}
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-blue-900">
          {selectedUsers.length} user{selectedUsers.length === 1 ? '' : 's'} selected
        </span>
        <div class="flex items-center space-x-2">
          <button
            onclick={() => bulkAction('activate')}
            disabled={loading}
            class="btn btn-primary btn-sm"
          >
            Activate
          </button>
          <button
            onclick={() => bulkAction('suspend')}
            disabled={loading}
            class="btn btn-secondary btn-sm"
          >
            Suspend
          </button>
          <button
            onclick={() => bulkAction('delete')}
            disabled={loading}
            class="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Users Table -->
  <div class="card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                onchange={selectAllUsers}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role & Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Activity
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stats
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredUsers as user}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onchange={() => toggleUserSelection(user.id)}
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <span class="text-sm font-medium text-gray-600">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    {#if user.businessName}
                      <div class="text-sm text-gray-500">
                        {user.businessName}
                      </div>
                    {/if}
                    <div class="text-xs text-gray-400">
                      {user.location}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{user.email}</div>
                <div class="text-sm text-gray-500">{user.phone}</div>
                <div class="flex items-center space-x-2 mt-1">
                  {#if user.emailVerified}
                    <Badge variant="success" size="sm">Email ✓</Badge>
                  {/if}
                  {#if user.phoneVerified}
                    <Badge variant="success" size="sm">Phone ✓</Badge>
                  {/if}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="space-y-1">
                  <Badge variant={getRoleColor(user.role)}>{user.role}</Badge>
                  <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                </div>
                {#if user.suspensionReason}
                  <div class="text-xs text-red-600 mt-1">
                    {user.suspensionReason}
                  </div>
                {/if}
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  Joined: {formatDate(user.joinedAt)}
                </div>
                <div class="text-xs text-gray-500">
                  Last active: {formatRelativeTime(user.lastActive)}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm space-y-1">
                  <div class="text-gray-900">
                    {user.reviewsCount} reviews
                  </div>
                  {#if user.role === 'homeowner'}
                    <div class="text-gray-500 text-xs">
                      {user.contractorsContacted} contractors contacted
                    </div>
                    {#if user.totalSpent > 0}
                      <div class="text-gray-500 text-xs">
                        ${user.totalSpent.toLocaleString()} spent
                      </div>
                    {/if}
                  {/if}
                  {#if user.averageRating > 0}
                    <div class="text-gray-500 text-xs">
                      {user.averageRating.toFixed(1)} ⭐ avg
                    </div>
                  {/if}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    onclick={() => openUserModal(user)}
                    class="text-blue-600 hover:text-blue-500 text-sm"
                  >
                    View
                  </button>
                  <button
                    onclick={() => updateUserStatus(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                    class="text-yellow-600 hover:text-yellow-500 text-sm"
                  >
                    {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                  </button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- User Details Modal -->
{#if showUserModal && selectedUser}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">
          User Details
        </h3>
        <button
          aria-label="Close dialog"
          onclick={() => {
            showUserModal = false;
            selectedUser = null;
          }}
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Info -->
        <div class="space-y-4">
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Name</span>
            <p class="text-sm text-gray-900">{selectedUser.name}</p>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Email</span>
            <p class="text-sm text-gray-900">{selectedUser.email}</p>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Phone</span>
            <p class="text-sm text-gray-900">{selectedUser.phone}</p>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Location</span>
            <p class="text-sm text-gray-900">{selectedUser.location}</p>
          </div>
          
          {#if selectedUser.businessName}
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Business</span>
              <p class="text-sm text-gray-900">{selectedUser.businessName}</p>
            </div>
          {/if}
        </div>
        
        <!-- Status & Activity -->
        <div class="space-y-4">
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Role</span>
            <Badge variant={getRoleColor(selectedUser.role)}>{selectedUser.role}</Badge>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Status</span>
            <Badge variant={getStatusColor(selectedUser.status)}>{selectedUser.status}</Badge>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Verification</span>
            <div class="flex space-x-2">
              {#if selectedUser.emailVerified}
                <Badge variant="success" size="sm">Email ✓</Badge>
              {:else}
                <Badge variant="error" size="sm">Email ✗</Badge>
              {/if}
              {#if selectedUser.phoneVerified}
                <Badge variant="success" size="sm">Phone ✓</Badge>
              {:else}
                <Badge variant="error" size="sm">Phone ✗</Badge>
              {/if}
            </div>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Joined</span>
            <p class="text-sm text-gray-900">{formatDate(selectedUser.joinedAt)}</p>
          </div>
          
          <div>
            <span class="block text-sm font-medium text-gray-700 mb-1">Last Active</span>
            <p class="text-sm text-gray-900">{formatRelativeTime(selectedUser.lastActive)}</p>
          </div>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <h4 class="text-sm font-medium text-gray-700 mb-4">Activity Stats</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-semibold text-gray-900">{selectedUser.reviewsCount}</div>
            <div class="text-xs text-gray-600">Reviews</div>
          </div>
          {#if selectedUser.role === 'homeowner'}
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-lg font-semibold text-gray-900">{selectedUser.contractorsContacted}</div>
              <div class="text-xs text-gray-600">Contractors</div>
            </div>
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-lg font-semibold text-gray-900">${selectedUser.totalSpent.toLocaleString()}</div>
              <div class="text-xs text-gray-600">Total Spent</div>
            </div>
          {/if}
          {#if selectedUser.averageRating > 0}
            <div class="text-center p-3 bg-gray-50 rounded-lg">
              <div class="text-lg font-semibold text-gray-900">{selectedUser.averageRating.toFixed(1)}</div>
              <div class="text-xs text-gray-600">Avg Rating</div>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Actions -->
      <div class="mt-6 pt-6 border-t border-gray-200 flex space-x-3">
        {#if selectedUser.status === 'suspended'}
          <button
            onclick={() => updateUserStatus(selectedUser.id, 'active')}
            disabled={loading}
            class="btn btn-primary flex-1"
          >
            {#if loading}
              <LoadingSpinner size="sm" color="white" />
              <span class="ml-2">Activating...</span>
            {:else}
              Activate User
            {/if}
          </button>
        {:else}
          <button
            onclick={() => updateUserStatus(selectedUser.id, 'suspended', 'Manual suspension')}
            disabled={loading}
            class="btn btn-error flex-1"
          >
            {#if loading}
              <LoadingSpinner size="sm" color="white" />
              <span class="ml-2">Suspending...</span>
            {:else}
              Suspend User
            {/if}
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}
