import React, { useState } from 'react';
import type { PolicySection } from '../../models/Policy';
import { Shield, RotateCcw, FileText, Truck, Search, HelpCircle, ChevronDown, Calculator } from 'lucide-react';

interface PolicyPageProps {
  policies: PolicySection[];
  filteredPolicies: PolicySection[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activePolicy: PolicySection;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({
  policies,
  activeTabId,
  onSelectTab,
  searchTerm,
  onSearchChange,
  activePolicy
}) => {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [purchaseDaysAgo, setPurchaseDaysAgo] = useState<number>(14);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield': return <Shield size={20} color="var(--success)" />;
      case 'RotateCcw': return <RotateCcw size={20} color="var(--brand-primary)" />;
      case 'FileText': return <FileText size={20} color="var(--brand-secondary)" />;
      case 'Truck': return <Truck size={20} color="var(--warning)" />;
      default: return <Shield size={20} />;
    }
  };

  const isReturnEligible = purchaseDaysAgo <= 30;

  return (
    <div className="policy-page-container animate-fade-in">
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        
        {/* Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.15) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--success)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            <Shield size={16} />
            <span>TRANSPARENT GOVERNANCE & CUSTOMER RIGHTS</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            Privacy Center & Return Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', fontSize: '0.95rem' }}>
            Everything you need to know regarding data protection, SSL security, 30-day money-back return policies, warranty guarantees, and international shipping guidelines.
          </p>

          {/* Policy Search */}
          <div style={{ marginTop: '1.5rem', maxWidth: '480px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search policy terms (e.g. refund, cookies, warranty)..."
              value={searchTerm}
              onChange={e => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'white',
                padding: '0.6rem 2.5rem 0.6rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem'
              }}
            />
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Left Navigation Tabs */}
          <aside className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem', padding: '0 0.5rem' }}>
              Policy Directory
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {policies.map(section => (
                <button
                  key={section.id}
                  onClick={() => onSelectTab(section.id)}
                  className={`btn ${activeTabId === section.id ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    justifyContent: 'flex-start',
                    padding: '0.65rem 0.85rem',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {getIcon(section.iconName)}
                  <span>{section.title}</span>
                </button>
              ))}
            </div>

            {/* Interactive Return Estimator Tool */}
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.8rem', color: 'var(--brand-primary)', marginBottom: '0.5rem' }}>
                <Calculator size={16} />
                <span>30-Day Return Estimator</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                How many days ago was your item delivered?
              </p>
              <input
                type="range"
                min={1}
                max={45}
                value={purchaseDaysAgo}
                onChange={e => setPurchaseDaysAgo(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 700 }}>
                <span>{purchaseDaysAgo} Days Ago</span>
                <span style={{ color: isReturnEligible ? 'var(--success)' : 'var(--error)' }}>
                  {isReturnEligible ? 'ELIGIBLE FOR RETURN' : 'EXPIRED'}
                </span>
              </div>
            </div>
          </aside>

          {/* Right Policy Content Panel */}
          <main className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'var(--bg-tertiary)', padding: '0.6rem', borderRadius: '10px' }}>
                  {getIcon(activePolicy.iconName)}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{activePolicy.title}</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{activePolicy.summary}</p>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                Updated: {activePolicy.lastUpdated}
              </div>
            </div>

            {/* Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.925rem', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '2.5rem' }}>
              {activePolicy.content.map((paragraph, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brand-primary)', marginTop: '0.6rem', flexShrink: 0 }} />
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>

            {/* FAQ Accordion Section */}
            {activePolicy.faqs && activePolicy.faqs.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HelpCircle size={20} color="var(--brand-secondary)" />
                  <span>Frequently Asked Questions</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {activePolicy.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-primary)',
                          textAlign: 'left',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          size={18}
                          style={{
                            transform: expandedFaqIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s'
                          }}
                        />
                      </button>

                      {expandedFaqIndex === idx && (
                        <div style={{ padding: '0 1.25rem 1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', borderTop: '1px dashed var(--border-color)' }}>
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};
