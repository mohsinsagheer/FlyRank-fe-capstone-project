import React from 'react';
import { Sparkles, Search, X, Tag, DollarSign, Filter, RefreshCw } from 'lucide-react';
import type { AISearchRequirement } from '../../models/AI';

interface AISearchBarProps {
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: (customQuery?: string) => void;
  onClear: () => void;
  isSearching: boolean;
  requirements: AISearchRequirement | null;
  isActive: boolean;
  errorMsg: string | null;
}

const SAMPLE_PROMPTS = [
  'High performance laptop for gaming under $2200',
  '4K OLED Smart TV with high refresh rate',
  'Noise cancelling bluetooth headphones for travel',
  'Professional hair dryer styling machine'
];

export const AISearchBar: React.FC<AISearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  onClear,
  isSearching,
  requirements,
  isActive,
  errorMsg
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="ai-search-container" style={{
      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      border: '1px solid rgba(37, 99, 235, 0.2)',
      marginBottom: '1.5rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #2563eb, #ec4899)',
          padding: '0.35rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          color: '#ffffff'
        }}>
          <Sparkles size={18} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            AI Shopping Assistant
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Describe what you're looking for in plain English (e.g., specs, budget, use-case)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="e.g. I need a noise-canceling headset for long travel under $350..."
            aria-label="Natural Language AI Search Input"
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          {query && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search prompt"
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1.25rem',
            fontWeight: 600,
            cursor: isSearching || !query.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: isSearching || !query.trim() ? 0.7 : 1,
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {isSearching ? <RefreshCw size={16} className="spin-animation" /> : <Sparkles size={16} />}
          {isSearching ? 'Analyzing...' : 'Ask AI'}
        </button>
      </form>

      {/* Preset Suggestions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Try asking:</span>
        {SAMPLE_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              onQueryChange(prompt);
              onSearch(prompt);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid var(--border-color-light)',
              borderRadius: 'var(--radius-full)',
              padding: '0.25rem 0.65rem',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Error Message if any */}
      {errorMsg && (
        <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', fontSize: '0.85rem' }}>
          {errorMsg}
        </div>
      )}

      {/* Active AI Requirements Card */}
      {isActive && requirements && (
        <div style={{
          marginTop: '1rem',
          padding: '0.85rem 1rem',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-sm)',
          borderLeft: '4px solid var(--brand-primary)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={14} /> AI Extracted Search Intent
            </span>
            <button
              onClick={onClear}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}
            >
              Reset AI Filter
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            {requirements.suggestedCategory !== 'all' && (
              <span style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--brand-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                Category: {requirements.suggestedCategory}
              </span>
            )}
            {requirements.maxPrice !== undefined && (
              <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <DollarSign size={12} /> Max: ${requirements.maxPrice}
              </span>
            )}
            {requirements.extractedKeywords.map((kw, i) => (
              <span key={i} style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Tag size={10} /> {kw}
              </span>
            ))}
          </div>

          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            🤖 <strong>AI Reasoning:</strong> {requirements.reasoning}
          </p>
        </div>
      )}
    </div>
  );
};
