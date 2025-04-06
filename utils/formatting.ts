export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'new':
      return 'bg-blue-100 text-blue-700';
    case 'in_progress':
      return 'bg-yellow-100 text-yellow-700';
    case 'completed':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-gray-100 text-gray-700';
    case 'assigned':
      return 'bg-purple-100 text-purple-700';
    case 'pending':
      return 'bg-orange-100 text-orange-700';
    case 'failed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case 'urgent':
      return 'bg-red-100 text-red-700';
    case 'high':
      return 'bg-orange-100 text-orange-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'low':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

// This function is no longer used directly - use getTranslatedStatus instead
export function formatStatus(status: string) {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// New function to get translated status
export function getTranslatedStatus(status: string, dictionary: any) {
  switch(status.toLowerCase()) {
    case 'new':
      return dictionary.landlord.statusNew;
    case 'in_progress':
      return dictionary.landlord.statusInProgress;
    case 'completed':
      return dictionary.landlord.statusCompleted;
    case 'cancelled':
      return dictionary.landlord.statusCancelled;
    case 'assigned':
      return dictionary.landlord.statusAssigned;
    case 'pending':
      return dictionary.landlord.statusPending;
    case 'failed':
      return dictionary.landlord.statusFailed;
    case 'paid':
      return dictionary.tenant.paid;
    default:
      // Fall back to the old format function for unknown statuses
      return formatStatus(status);
  }
}

// New function to get translated priority
export function getTranslatedPriority(priority: string, dictionary: any) {
  switch(priority.toLowerCase()) {
    case 'urgent':
      return dictionary.landlord.priorityUrgent;
    case 'high':
      return dictionary.landlord.priorityHigh;
    case 'medium':
      return dictionary.landlord.priorityMedium;
    case 'low':
      return dictionary.landlord.priorityLow;
    default:
      // Capitalize the unknown priority
      return priority.charAt(0).toUpperCase() + priority.slice(1);
  }
} 