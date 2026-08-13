import React, { useEffect } from 'react';
import { Sparkles, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import type { Product } from '../../models/Product';
import type { AIReviewSummary as SummaryType } from '../../models/AI';

interface AIReviewSummaryProps {
  product: Product;
  summary: SummaryType | null;
  isLoading: boolean;
  onFetch: (p: Product) => void;
}

export const AIReviewSummary: React.FC<AIReviewSummaryProps> = ({
  product,
  summary,
  isLoading,
  onFetch
}) => {
  useEffect(() => {
    if (product && !summary && !isLoading) {
      onFetch(product);
    }
  }, [product, summary, isLoading, onFetch]);

  return (
    <div style={{
      background: 'var(--bg-tertiary)',
      borderRadius: 'var(--radius-md)',
      padding: '1.25rem',
      border: '1px solid var(--border-color)',
      marginTop: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'var(--brand-primary)' }} />
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            AI Customer Sentiment Summary
          </h3>
        </div>
        {isLoading && <RefreshCw size={16} className="spin-animation" style={{ color: 'var(--brand-primary)' }} />}
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          Analyzing customer reviews with Claude AI...
        </div>
      ) : summary ? (
        <div>
          {/* Sentiment Meter Bar */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Positive Sentiment Score</span>
              <span style={{ fontWeight: 700, color: 'var(--success)' }}>{summary.sentimentScore}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color-light)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${summary.sentimentScore}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease-out'
                }}
              />
            </div>
          </div>

          {/* Verdict Box */}
          <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
            "{summary.summaryVerdict}"
          </p>

          {/* Pros & Cons List */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                <ThumbsUp size={14} /> Top Strengths
              </div>
              <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {summary.keyPros.map((pro, i) => <li key={i}>{pro}</li>)}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--error)', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                <ThumbsDown size={14} /> Minor Drawbacks
              </div>
              <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {summary.keyCons.map((con, i) => <li key={i}>{con}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => onFetch(product)}
          style={{ background: 'var(--brand-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Generate AI Review Breakdown
        </button>
      )}
    </div>
  );
};
