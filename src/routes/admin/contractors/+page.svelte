<script lang="ts">
  import { browser } from '$app/environment';
  import Badge from '$lib/components/Badge.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { formatDate } from '$lib/utils/index.js';
  
  // Mock contractors data
  let contractors = $state([
    {
      id: '1',
      businessName: 'Denver Pro Plumbing',
      ownerName: 'John Smith',
      email: 'john@denverproplumbing.com',
      phone: '(303) 555-0101',
      status: 'verified',
      averageRating: 4.8,
      totalReviews: 127,
      yearsInBusiness: 15,
      categories: ['Plumbing', 'Emergency Repairs'],
      createdAt: new Date('2023-06-15'),
      lastActive: new Date('2024-01-19'),
      verificationDate: new Date('2023-06-20'),
      licenseNumber: 'PL-2024-001',
      insuranceExpiry: new Date('2024-12-31')
    },
    {
      id: '2',
      businessName: 'Mile High Electric',
      ownerName: 'Sarah Johnson',
      email: 'sarah@milehighelectric.com',
      phone: '(303) 555-0102',
      status: 'verified',
      averageRating: 4.6,
      totalReviews: 89,
      yearsInBusiness: 12,
      categories: ['Electrical'],
      createdAt: new Date('2023-08-10'),
      lastActive: new Date('2024-01-18'),
      verificationDate: new Date('2023-08-15'),
      licenseNumber: 'EL-2024-002',
      insuranceExpiry: new Date('2024-11-30')
    },
    {
      id: '3',
      businessName: 'Rocky Mountain HVAC',
      ownerName: 'Mike Davis',
      email: 'mike@rockymountainhvac.com',
      phone: '(303) 555-0103',
      status: 'pending',
      averageRating: 0,
      totalReviews: 0,
      yearsInBusiness: 8,
      categories: ['HVAC'],
      createdAt: new Date('2024-01-15'),
      lastActive: new Date('2024-01-15'),
      verificationDate: null,
      licenseNumber: 'HV-2024-003',
      insuranceExpiry: new Date('2024-10-15')
    }
  ]);
  
  let searchQuery = $state('');
  let statusFilter = $state('all');
  let sortBy = $state('created_desc');
  let selectedContractors = $state<string[]>([]);
  let showVerificationModal = $state(false);
  let verificationContractor = $state<any>(null);
  let loading = $state(false);
  
  // Get URL parameters
  if (browser) {
    const urlParams = new URLSearchParams(window.location.search);
    statusFilter = urlParams.get('status') || 'all';
  }
  
  const filteredContractors = $derived(() => {
    return contractors
      .filter(contractor => {
        // Search filter
        if (searchQuery && !contractor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !contractor.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !contractor.email.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Status filter
        if (statusFilter !== 'all' && contractor.status !== statusFilter) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'created_desc':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'created_asc':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'name_asc':
            return a.businessName.localeCompare(b.businessName);
          case 'rating_desc':
            return b.averageRating - a.averageRating;
          default:
            return 0;
        }
      });
  });
  
  function toggleContractorSelection(contractorId: string) {
    if (selectedContractors.includes(contractorId)) {
      selectedContractors = selectedContractors.filter(id => id !== contractorId);
    } else {
      selectedContractors = [...selectedContractors, contractorId];
    }
  }
  
  function selectAllContractors() {
    if (selectedContractors.length === filteredContractors.length) {
      selectedContractors = [];
    } else {
      selectedContractors = filteredContractors.map(c => c.id);
    }
  }
  
  function openVerificationModal(contractor: any) {
    verificationContractor = contractor;
    showVerificationModal = true;
  }
  
  async function updateContractorStatus(contractorId: string, newStatus: string) {
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const contractor = contractors.find(c => c.id === contractorId);
      if (contractor) {
        contractor.status = newStatus;
        if (newStatus === 'verified') {
          contractor.verificationDate = new Date();
        }
      }
      
      showVerificationModal = false;
      verificationContractor = null;
    } catch (error) {
      console.error('Failed to update contractor status:', error);
    } finally {
      loading = false;
    }
  }
  
  async function bulkAction(action: string) {
    if (selectedContractors.length === 0) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      selectedContractors.forEach(contractorId => {
        const contractor = contractors.find(c => c.id === contractorId);
        if (contractor) {
          switch (action) {
            case 'verify':
              contractor.status = 'verified';
              contractor.verificationDate = new Date();
              break;
            case 'suspend':
              contractor.status = 'suspended';
              break;
            case 'delete':
              contractors = contractors.filter(c => c.id !== contractorId);
              break;
          }
        }
      });
      
      selectedContractors = [];
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      loading = false;
    }
  }
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'suspended': return 'error';
      case 'rejected': return 'error';
      default: return 'default';
    }
  }
</script>

<!-- Contractors Management -->
<div class="space-y-6">
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input
          bind:value={searchQuery}
          type="text"
          placeholder="Search contractors..."
          class="input pl-10 w-64"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      
      <select bind:value={statusFilter} class="input w-auto">
        <option value="all">All Status</option>
        <option value="verified">Verified</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
        <option value="rejected">Rejected</option>
      </select>
      
      <select bind:value={sortBy} class="input w-auto">
        <option value="created_desc">Newest First</option>
        <option value="created_asc">Oldest First</option>
        <option value="name_asc">Name A-Z</option>
        <option value="rating_desc">Highest Rated</option>
      </select>
    </div>
    
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">
        {filteredContractors.length} contractors
      </span>
    </div>
  </div>
  
  <!-- Bulk Actions -->
  {#if selectedContractors.length > 0}
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-blue-900">
          {selectedContractors.length} contractor{selectedContractors.length === 1 ? '' : 's'} selected
        </span>
        <div class="flex items-center space-x-2">
          <button
            onclick={() => bulkAction('verify')}
            disabled={loading}
            class="btn btn-primary btn-sm"
          >
            Verify
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
  
  <!-- Contractors Table -->
  <div class="card overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedContractors.length === filteredContractors.length && filteredContractors.length > 0}
                onchange={selectAllContractors}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contractor
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredContractors as contractor}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedContractors.includes(contractor.id)}
                  onchange={() => toggleContractorSelection(contractor.id)}
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span class="text-sm font-medium text-blue-600">
                      {contractor.businessName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {contractor.businessName}
                    </div>
                    <div class="text-sm text-gray-500">
                      Owner: {contractor.ownerName}
                    </div>
                    <div class="flex flex-wrap gap-1 mt-1">
                      {#each contractor.categories as category}
                        <Badge variant="default" size="sm">{category}</Badge>
                      {/each}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{contractor.email}</div>
                <div class="text-sm text-gray-500">{contractor.phone}</div>
                <div class="text-xs text-gray-400 mt-1">
                  License: {contractor.licenseNumber}
                </div>
              </td>
              <td class="px-6 py-4">
                <Badge variant={getStatusColor(contractor.status)}>
                  {contractor.status}
                </Badge>
                {#if contractor.verificationDate}
                  <div class="text-xs text-gray-500 mt-1">
                    Verified: {formatDate(contractor.verificationDate)}
                  </div>
                {/if}
              </td>
              <td class="px-6 py-4">
                {#if contractor.totalReviews > 0}
                  <div class="text-sm font-medium text-gray-900">
                    {contractor.averageRating.toFixed(1)} ⭐
                  </div>
                  <div class="text-xs text-gray-500">
                    {contractor.totalReviews} reviews
                  </div>
                {:else}
                  <span class="text-sm text-gray-400">No reviews</span>
                {/if}
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {formatDate(contractor.createdAt)}
                </div>
                <div class="text-xs text-gray-500">
                  Last active: {formatDate(contractor.lastActive)}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <a
                    href="/contractors/{contractor.id}"
                    target="_blank"
                    class="text-blue-600 hover:text-blue-500 text-sm"
                  >
                    View
                  </a>
                  {#if contractor.status === 'pending'}
                    <button
                      onclick={() => openVerificationModal(contractor)}
                      class="text-green-600 hover:text-green-500 text-sm"
                    >
                      Verify
                    </button>
                  {/if}
                  <button
                    onclick={() => updateContractorStatus(contractor.id, contractor.status === 'suspended' ? 'verified' : 'suspended')}
                    class="text-yellow-600 hover:text-yellow-500 text-sm"
                  >
                    {contractor.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
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

<!-- Verification Modal -->
{#if showVerificationModal && verificationContractor}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Verify Contractor
      </h3>
      
      <div class="space-y-4 mb-6">
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </span>
          <p class="text-sm text-gray-900">{verificationContractor.businessName}</p>
        </div>
        
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">
            Owner
          </span>
          <p class="text-sm text-gray-900">{verificationContractor.ownerName}</p>
        </div>
        
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">
            License Number
          </span>
          <p class="text-sm text-gray-900">{verificationContractor.licenseNumber}</p>
        </div>
        
        <div>
          <span class="block text-sm font-medium text-gray-700 mb-1">
            Insurance Expiry
          </span>
          <p class="text-sm text-gray-900">{formatDate(verificationContractor.insuranceExpiry)}</p>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <button
          onclick={() => updateContractorStatus(verificationContractor.id, 'verified')}
          disabled={loading}
          class="btn btn-primary flex-1"
        >
          {#if loading}
            <LoadingSpinner size="sm" color="white" />
            <span class="ml-2">Verifying...</span>
          {:else}
            Approve
          {/if}
        </button>
        <button
          onclick={() => updateContractorStatus(verificationContractor.id, 'rejected')}
          disabled={loading}
          class="btn btn-error flex-1"
        >
          Reject
        </button>
        <button
          onclick={() => {
            showVerificationModal = false;
            verificationContractor = null;
          }}
          disabled={loading}
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
