import React from 'react';
import type { OrderTrackingDetails } from '../../models/Order';
import { Search, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface TrackOrderPageProps {
  searchOrderId: string;
  onSearchOrderIdChange: (val: string) => void;
  emailInput: string;
  onEmailInputChange: (val: string) => void;
  activeOrder: OrderTrackingDetails | null;
  errorMsg: string | null;
  isLoading: boolean;
  onSearch: (e?: React.FormEvent) => void;
  onLoadDemoOrder: (id: string) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({
  searchOrderId,
  onSearchOrderIdChange,
  emailInput,
  onEmailInputChange,
  activeOrder,
  errorMsg,
  isLoading,
  onSearch,
  onLoadDemoOrder
}) => {
  return (
    <div className="track-order-container animate-fade-in">
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        
        {/* Banner Header */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            marginBottom: '2.5rem',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)'
          }}
        >
          <div style={{ display: 'inline-flex', padding: '0.85rem', borderRadius: '50%', background: 'var(--bg-tertiary)', marginBottom: '1rem' }}>
            <Truck size={36} color="var(--brand-secondary)" />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>Real-Time Order Tracking</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            Enter your Order ID (e.g. <code>ZEN-98421</code>) and billing email below to view live shipment GPS status, carrier updates, and estimated delivery dates.
          </p>

          {/* Quick Demo Order Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>Test Demo Orders:</span>
            <button
              onClick={() => onLoadDemoOrder('ZEN-98421')}
              className="btn btn-secondary"
              style={{ fontSize: '0.775rem', padding: '0.3rem 0.75rem' }}
            >
              ZEN-98421 (Out for Delivery)
            </button>
            <button
              onClick={() => onLoadDemoOrder('ZEN-55102')}
              className="btn btn-secondary"
              style={{ fontSize: '0.775rem', padding: '0.3rem 0.75rem' }}
            >
              ZEN-55102 (Delivered)
            </button>
          </div>
        </div>

        {/* Search Input Form */}
        <div
          className="glass-panel"
          style={{ maxWidth: '650px', margin: '0 auto 3rem auto', padding: '1.75rem', borderRadius: 'var(--radius-md)' }}
        >
          <form onSubmit={onSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Order ID *
                </label>
                <input
                  type="text"
                  placeholder="e.g. ZEN-98421"
                  value={searchOrderId}
                  onChange={e => onSearchOrderIdChange(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'white',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Billing Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="alexander@example.com"
                  value={emailInput}
                  onChange={e => onEmailInputChange(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: 'white',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {errorMsg && (
              <div style={{ color: 'var(--error)', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.75rem', fontSize: '0.95rem', width: '100%' }}
              disabled={isLoading}
            >
              <Search size={18} />
              <span>{isLoading ? 'Fetching Tracking Logs...' : 'Track Package Now'}</span>
            </button>
          </form>
        </div>

        {/* Tracking Details Display */}
        {activeOrder && (
          <div className="animate-fade-in" style={{ display: 'grid', gap: '2rem' }}>
            
            {/* Order Overview Header Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ORDER REFERENCE</span>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--brand-primary)' }}>#{activeOrder.orderId}</h2>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-exclusive" style={{ fontSize: '0.8rem' }}>
                    {activeOrder.status.toUpperCase().replace('_', ' ')}
                  </span>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    Placed on {activeOrder.orderDate}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Recipient:</div>
                  <div style={{ fontWeight: 700 }}>{activeOrder.customerName}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Carrier & Tracking Number:</div>
                  <div style={{ fontWeight: 700, color: 'var(--brand-secondary)' }}>{activeOrder.carrier}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Estimated Arrival:</div>
                  <div style={{ fontWeight: 800, color: 'var(--success)' }}>{activeOrder.estimatedDelivery}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Destination:</div>
                  <div style={{ fontWeight: 600 }}>{activeOrder.shippingAddress}</div>
                </div>
              </div>
            </div>

            {/* Visual Tracking Progress Timeline */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem' }}>Shipment Progress Timeline</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
                {activeOrder.timeline.map((event, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '1.25rem',
                      alignItems: 'flex-start',
                      position: 'relative'
                    }}
                  >
                    {/* Vertical Line Connector */}
                    {idx < activeOrder.timeline.length - 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          left: '17px',
                          top: '36px',
                          bottom: '-24px',
                          width: '2px',
                          background: event.completed ? 'var(--brand-primary)' : 'var(--border-color)'
                        }}
                      />
                    )}

                    {/* Step Icon Indicator */}
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: event.completed ? 'var(--brand-primary)' : event.current ? 'var(--brand-secondary)' : 'var(--bg-tertiary)',
                        border: '2px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        zIndex: 2,
                        boxShadow: event.current ? 'var(--shadow-glow)' : 'none'
                      }}
                    >
                      {event.completed ? <CheckCircle2 size={20} /> : <Clock size={18} />}
                    </div>

                    {/* Step Details */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'baseline' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: event.current || event.completed ? 800 : 500, color: event.current ? 'var(--brand-secondary)' : 'var(--text-primary)' }}>
                          {event.title}
                        </h4>
                        <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{event.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {event.description}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Order Items Breakdown */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>Package Items ({activeOrder.items.length})</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <img src={item.image} alt={item.productName} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.productName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category: {item.category} • Quantity: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--brand-primary)' }}>
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
