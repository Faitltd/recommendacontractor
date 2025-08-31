<script lang="ts">
  import { browser } from '$app/environment';
  import Badge from '$lib/components/Badge.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import { formatDate, formatRelativeTime } from '$lib/utils/index.js';
  
  // Mock disputes data
  let disputes = $state([
    {
      id: '1',
      title: 'Poor quality work - requesting refund',
      description: 'The contractor did not complete the work as agreed. The plumbing installation was faulty and caused water damage to my kitchen.',
      type: 'quality',
      status: 'open',
      priority: 'high',
      amount: 1200,
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-19'),
      customer: {
        name: 'Sarah Mitchell',
        email: 'sarah.mitchell@email.com',
        id: '1'
      },
      contractor: {
        businessName: 'Denver Pro Plumbing',
        ownerName: 'John Smith',
        email: 'john@denverproplumbing.com',
        id: '1'
      },
      review: {
        id: '1',
        rating: 1.0,
        title: 'Terrible work quality'
      },
      messages: [
        {
          id: '1',
          sender: 'customer',
          message: 'The work was completed but there are multiple leaks and the installation is not up to code.',
          timestamp: new Date('2024-01-18T10:00:00'),
          attachments: ['photo1.jpg', 'photo2.jpg']
        },
        {
          id: '2',
          sender: 'contractor',
          message: 'We stand by our work. The customer is being unreasonable and the work meets all standards.',
          timestamp: new Date('2024-01-18T14:30:00'),
          attachments: []
        }
      ],
      resolution: null,
      assignedTo: 'admin'
    },
    {
      id: '2',
      title: 'Contractor no-show after payment',
      description: 'Paid 50% upfront for electrical work. Contractor scheduled for Monday but never showed up and is not responding to calls.',
      type: 'no_show',
      status: 'investigating',
      priority: 'high',
      amount: 600,
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-18'),
      customer: {
        name: 'Mike Rodriguez',
        email: 'mike.rodriguez@email.com',
        id: '2'
      },
      contractor: {
        businessName: 'Mile High Electric',
        ownerName: 'Sarah Johnson',
        email: 'sarah@milehighelectric.com',
        id: '2'
      },
      review: null,
      messages: [
        {
          id: '1',
          sender: 'customer',
          message: 'Contractor was supposed to arrive Monday at 9 AM but never showed. Not answering phone calls.',
          timestamp: new Date('2024-01-17T16:00:00'),
          attachments: ['payment_receipt.pdf']
        }
      ],
      resolution: null,
      assignedTo: 'admin'
    },
    {
      id: '3',
      title: 'Billing dispute - overcharged',
      description: 'Original quote was $800 but contractor charged $1400 without prior approval for additional work.',
      type: 'billing',
      status: 'resolved',
      priority: 'medium',
      amount: 600,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-15'),
      customer: {
        name: 'Jennifer Lopez',
        email: 'jennifer.lopez@email.com',
        id: '3'
      },
      contractor: {
        businessName: 'Rocky Mountain HVAC',
        ownerName: 'Mike Davis',
        email: 'mike@rockymountainhvac.com',
        id: '3'
      },
      review: {
        id: '3',
        rating: 2.5,
        title: 'Overcharged for work'
      },
      messages: [
        {
          id: '1',
          sender: 'customer',
          message: 'I was quoted $800 but charged $1400. The additional work was not approved by me.',
          timestamp: new Date('2024-01-10T11:00:00'),
          attachments: ['original_quote.pdf', 'final_invoice.pdf']
        },
        {
          id: '2',
          sender: 'contractor',
          message: 'Additional work was necessary and customer was informed on-site.',
          timestamp: new Date('2024-01-11T09:00:00'),
          attachments: []
        },
        {
          id: '3',
          sender: 'admin',
          message: 'After review, contractor will refund $300 for unauthorized additional work.',
          timestamp: new Date('2024-01-15T14:00:00'),
          attachments: []
        }
      ],
      resolution: {
        type: 'partial_refund',
        amount: 300,
        description: 'Contractor to refund $300 for unauthorized additional work',
        resolvedAt: new Date('2024-01-15'),
        resolvedBy: 'admin'
      },
      assignedTo: 'admin'
    }
  ]);
  
  let searchQuery = $state('');
  let statusFilter = $state('all');
  let typeFilter = $state('all');
  let priorityFilter = $state('all');
  let sortBy = $state('created_desc');
  let selectedDispute = $state<any>(null);
  let showDisputeModal = $state(false);
  let newMessage = $state('');
  let resolutionType = $state('');
  let resolutionAmount = $state('');
  let resolutionDescription = $state('');
  let loading = $state(false);
  
  // Get URL parameters
  if (browser) {
    const urlParams = new URLSearchParams(window.location.search);
    statusFilter = urlParams.get('status') || 'all';
  }
  
  const filteredDisputes = $derived(() => {
    return disputes
      .filter(dispute => {
        // Search filter
        if (searchQuery && !dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !dispute.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !dispute.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !dispute.contractor.businessName.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        
        // Status filter
        if (statusFilter !== 'all' && dispute.status !== statusFilter) {
          return false;
        }
        
        // Type filter
        if (typeFilter !== 'all' && dispute.type !== typeFilter) {
          return false;
        }
        
        // Priority filter
        if (priorityFilter !== 'all' && dispute.priority !== priorityFilter) {
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
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          case 'amount_desc':
            return b.amount - a.amount;
          default:
            return 0;
        }
      });
  });
  
  function openDisputeModal(dispute: any) {
    selectedDispute = dispute;
    showDisputeModal = true;
    newMessage = '';
    resolutionType = '';
    resolutionAmount = '';
    resolutionDescription = '';
  }
  
  async function addMessage() {
    if (!newMessage.trim() || !selectedDispute) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const message = {
        id: Date.now().toString(),
        sender: 'admin',
        message: newMessage,
        timestamp: new Date(),
        attachments: []
      };
      
      selectedDispute.messages.push(message);
      selectedDispute.updatedAt = new Date();
      newMessage = '';
    } catch (error) {
      console.error('Failed to add message:', error);
    } finally {
      loading = false;
    }
  }
  
  async function resolveDispute() {
    if (!selectedDispute || !resolutionType || !resolutionDescription) return;
    
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const resolution = {
        type: resolutionType,
        amount: resolutionAmount ? parseFloat(resolutionAmount) : 0,
        description: resolutionDescription,
        resolvedAt: new Date(),
        resolvedBy: 'admin'
      };
      
      selectedDispute.resolution = resolution;
      selectedDispute.status = 'resolved';
      selectedDispute.updatedAt = new Date();
      
      showDisputeModal = false;
      selectedDispute = null;
    } catch (error) {
      console.error('Failed to resolve dispute:', error);
    } finally {
      loading = false;
    }
  }
  
  async function updateDisputeStatus(disputeId: string, newStatus: string) {
    loading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dispute = disputes.find(d => d.id === disputeId);
      if (dispute) {
        dispute.status = newStatus;
        dispute.updatedAt = new Date();
      }
    } catch (error) {
      console.error('Failed to update dispute status:', error);
    } finally {
      loading = false;
    }
  }
  
  function getStatusColor(status: string) {
    switch (status) {
      case 'open': return 'error';
      case 'investigating': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  }
  
  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'default';
    }
  }
  
  function getTypeLabel(type: string) {
    switch (type) {
      case 'quality': return 'Quality Issue';
      case 'no_show': return 'No Show';
      case 'billing': return 'Billing Dispute';
      case 'communication': return 'Communication';
      case 'other': return 'Other';
      default: return type;
    }
  }
</script>

<!-- Disputes Management -->
<div class="space-y-6">
  <!-- Header Actions -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex items-center space-x-4">
      <div class="relative">
        <input
          bind:value={searchQuery}
          type="text"
          placeholder="Search disputes..."
          class="input pl-10 w-64"
        />
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      
      <select bind:value={statusFilter} class="input w-auto">
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="investigating">Investigating</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>
      
      <select bind:value={typeFilter} class="input w-auto">
        <option value="all">All Types</option>
        <option value="quality">Quality Issue</option>
        <option value="no_show">No Show</option>
        <option value="billing">Billing</option>
        <option value="communication">Communication</option>
        <option value="other">Other</option>
      </select>
      
      <select bind:value={priorityFilter} class="input w-auto">
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      
      <select bind:value={sortBy} class="input w-auto">
        <option value="created_desc">Newest First</option>
        <option value="created_asc">Oldest First</option>
        <option value="priority">Priority</option>
        <option value="amount_desc">Highest Amount</option>
      </select>
    </div>
    
    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">
        {filteredDisputes.length} disputes
      </span>
    </div>
  </div>
  
  <!-- Disputes List -->
  <div class="space-y-4">
    {#each filteredDisputes as dispute}
      <div class="card p-6 {dispute.priority === 'high' ? 'border-red-200 bg-red-50' : ''}">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{dispute.title}</h3>
              <Badge variant={getStatusColor(dispute.status)}>{dispute.status}</Badge>
              <Badge variant={getPriorityColor(dispute.priority)}>{dispute.priority}</Badge>
              <Badge variant="default">{getTypeLabel(dispute.type)}</Badge>
            </div>
            
            <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <span>Customer: {dispute.customer.name}</span>
              <span>•</span>
              <span>Contractor: {dispute.contractor.businessName}</span>
              <span>•</span>
              <span>Amount: ${dispute.amount.toLocaleString()}</span>
              <span>•</span>
              <span>{formatRelativeTime(dispute.createdAt)}</span>
            </div>
            
            <p class="text-gray-700 mb-4">{dispute.description}</p>
            
            {#if dispute.resolution}
              <div class="bg-green-100 border border-green-200 rounded-lg p-3 mb-4">
                <div class="flex items-start space-x-2">
                  <svg class="w-4 h-4 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <span class="text-sm font-medium text-green-800">Resolution:</span>
                    <p class="text-sm text-green-700 mt-1">{dispute.resolution.description}</p>
                    {#if dispute.resolution.amount > 0}
                      <p class="text-sm text-green-700">Refund amount: ${dispute.resolution.amount.toLocaleString()}</p>
                    {/if}
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <span>{dispute.messages.length} messages</span>
            <span>Updated: {formatRelativeTime(dispute.updatedAt)}</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              onclick={() => openDisputeModal(dispute)}
              class="btn btn-primary btn-sm"
            >
              View Details
            </button>
            
            {#if dispute.status === 'open'}
              <button
                onclick={() => updateDisputeStatus(dispute.id, 'investigating')}
                class="btn btn-secondary btn-sm"
              >
                Start Investigation
              </button>
            {:else if dispute.status === 'investigating'}
              <button
                onclick={() => updateDisputeStatus(dispute.id, 'resolved')}
                class="btn btn-primary btn-sm"
              >
                Mark Resolved
              </button>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- Dispute Details Modal -->
{#if showDisputeModal && selectedDispute}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900">
          Dispute Details
        </h3>
        <button
          aria-label="Close dialog"
          onclick={() => {
            showDisputeModal = false;
            selectedDispute = null;
          }}
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Dispute Info -->
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900 mb-2">{selectedDispute.title}</h4>
            <p class="text-sm text-gray-700">{selectedDispute.description}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Status</span>
              <Badge variant={getStatusColor(selectedDispute.status)}>{selectedDispute.status}</Badge>
            </div>
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Priority</span>
              <Badge variant={getPriorityColor(selectedDispute.priority)}>{selectedDispute.priority}</Badge>
            </div>
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Type</span>
              <Badge variant="default">{getTypeLabel(selectedDispute.type)}</Badge>
            </div>
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Amount</span>
              <p class="text-sm text-gray-900">${selectedDispute.amount.toLocaleString()}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Customer</span>
              <p class="text-sm text-gray-900">{selectedDispute.customer.name}</p>
              <p class="text-xs text-gray-500">{selectedDispute.customer.email}</p>
            </div>
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-1">Contractor</span>
              <p class="text-sm text-gray-900">{selectedDispute.contractor.businessName}</p>
              <p class="text-xs text-gray-500">{selectedDispute.contractor.ownerName} - {selectedDispute.contractor.email}</p>
            </div>
          </div>
        </div>
        
        <!-- Messages -->
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900">Messages</h4>
          <div class="max-h-64 overflow-y-auto space-y-3 border rounded-lg p-4">
            {#each selectedDispute.messages as message}
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-xs font-medium text-gray-600">
                    {message.sender === 'admin' ? 'A' : message.sender === 'customer' ? 'C' : 'P'}
                  </span>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="text-sm font-medium text-gray-900 capitalize">{message.sender}</span>
                    <span class="text-xs text-gray-500">{formatRelativeTime(message.timestamp)}</span>
                  </div>
                  <p class="text-sm text-gray-700">{message.message}</p>
                  {#if message.attachments.length > 0}
                    <div class="mt-2">
                      {#each message.attachments as attachment}
                        <span class="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-1">{attachment}</span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
          
          <!-- Add Message -->
          <div class="space-y-3">
            <textarea
              bind:value={newMessage}
              rows="3"
              class="input"
              placeholder="Add a message to this dispute..."
            ></textarea>
            <button
              onclick={addMessage}
              disabled={loading || !newMessage.trim()}
              class="btn btn-primary btn-sm"
            >
              {#if loading}
                <LoadingSpinner size="sm" color="white" />
                <span class="ml-2">Adding...</span>
              {:else}
                Add Message
              {/if}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Resolution Section -->
      {#if selectedDispute.status !== 'resolved' && selectedDispute.status !== 'closed'}
        <div class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="font-medium text-gray-900 mb-4">Resolve Dispute</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2" for="resolution-type">Resolution Type</label>
              <select id="resolution-type" bind:value={resolutionType} class="input">
                <option value="">Select type...</option>
                <option value="full_refund">Full Refund</option>
                <option value="partial_refund">Partial Refund</option>
                <option value="redo_work">Redo Work</option>
                <option value="no_action">No Action Required</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {#if resolutionType === 'partial_refund' || resolutionType === 'full_refund'}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2" for="refund-amount">Refund Amount</label>
                <input id="refund-amount"
                  bind:value={resolutionAmount}
                  type="number"
                  class="input"
                  placeholder="0.00"
                  min="0"
                  max={selectedDispute.amount}
                />
              </div>
            {/if}
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2" for="resolution-description">Resolution Description</label>
              <textarea id="resolution-description"
                bind:value={resolutionDescription}
                rows="2"
                class="input"
                placeholder="Describe the resolution..."
              ></textarea>
            </div>
          </div>
          
          <div class="mt-4">
            <button
              onclick={resolveDispute}
              disabled={loading || !resolutionType || !resolutionDescription}
              class="btn btn-primary"
            >
              {#if loading}
                <LoadingSpinner size="sm" color="white" />
                <span class="ml-2">Resolving...</span>
              {:else}
                Resolve Dispute
              {/if}
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
