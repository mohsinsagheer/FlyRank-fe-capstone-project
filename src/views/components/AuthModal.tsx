import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import type { useAuthViewModel } from '../../viewmodels/useAuthViewModel';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  authVM: ReturnType<typeof useAuthViewModel>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, authVM }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password'>('login');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setLocalError(null);
    setSuccessMsg(null);
    authVM.clearError();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleModeChange = (newMode: 'login' | 'signup' | 'forgot-password') => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMsg(null);

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match');
        return;
      }
      const success = await authVM.signup(name, email, password);
      if (success) handleClose();
    } else if (mode === 'login') {
      const success = await authVM.login(email, password);
      if (success) handleClose();
    } else if (mode === 'forgot-password') {
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match');
        return;
      }
      const success = await authVM.forgotPassword(email, password);
      if (success) {
        setSuccessMsg('Password updated successfully. You can now log in.');
        setTimeout(() => handleModeChange('login'), 2000);
      }
    }
  };

  const title = mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password';
  const subtitle = mode === 'login' 
    ? 'Sign in to access your saved items and track orders.' 
    : mode === 'signup' 
    ? 'Join MOHSIN to experience next-generation e-commerce.' 
    : 'Enter your email and new password to reset.';

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="animate-fade-in" style={{
        background: 'var(--bg-primary)',
        width: '100%',
        maxWidth: '420px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1.5rem 2rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)',
          borderBottom: '1px solid var(--border-color)',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button 
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '50%'
            }}
          >
            <X size={18} />
          </button>
          
          <div className="animate-logo-badge" style={{
            width: '48px', height: '48px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 900, fontSize: '1.5rem',
            margin: '0 auto 1rem auto'
          }}>
            M
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            {title}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        </div>

        {/* Form Body */}
        <div style={{ padding: '2rem' }}>
          {(localError || authVM.errorMsg) && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem', textAlign: 'center', fontWeight: 600 }}>
              {localError || authVM.errorMsg}
            </div>
          )}
          
          {successMsg && (
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1.25rem', textAlign: 'center', fontWeight: 600 }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {mode === 'signup' && (
              <div className="form-group">
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                      background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', outline: 'none'
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={mode === 'forgot-password' ? "text" : "password"}
                  placeholder={mode === 'forgot-password' ? "New Password" : "Password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  style={{
                    width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', outline: 'none'
                  }}
                />
              </div>
            </div>

            {(mode === 'signup' || mode === 'forgot-password') && (
              <div className="form-group">
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    style={{
                      width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
                      background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => handleModeChange('forgot-password')}
                  style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={authVM.isLoading}
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem', opacity: authVM.isLoading ? 0.7 : 1 }}
            >
              <span>{authVM.isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}</span>
              {!authVM.isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Footer Toggle */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => handleModeChange('signup')} style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Sign up
                </button>
              </>
            ) : mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button onClick={() => handleModeChange('login')} style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: 700, cursor: 'pointer' }}>
                  Sign in
                </button>
              </>
            ) : (
              <button onClick={() => handleModeChange('login')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <ArrowLeft size={14} /> Back to Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
