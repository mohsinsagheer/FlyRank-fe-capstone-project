import { useState, useMemo } from 'react';
import { MOCK_POLICIES } from '../models/mockData';
import type { PolicySection } from '../models/Policy';

export function usePolicyViewModel() {
  const [policies] = useState<PolicySection[]>(MOCK_POLICIES);
  const [activeTabId, setActiveTabId] = useState<string>('privacy');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const activePolicy = useMemo(() => {
    return policies.find(p => p.id === activeTabId) || policies[0];
  }, [policies, activeTabId]);

  const filteredPolicies = useMemo(() => {
    if (!searchTerm.trim()) return policies;
    const term = searchTerm.toLowerCase();
    return policies.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.summary.toLowerCase().includes(term) ||
      p.content.some(c => c.toLowerCase().includes(term))
    );
  }, [policies, searchTerm]);

  return {
    policies,
    filteredPolicies,
    activeTabId,
    setActiveTabId,
    activePolicy,
    searchTerm,
    setSearchTerm
  };
}
