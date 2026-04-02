import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
      nav('/admin');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;700;800&display=swap');
        :root{--bg:#050a0e;--bg2:#0a1018;--bg3:#0f1923;--accent:#00ffe7;--accent3:#ff3e6c;--text:#c8d8e8;--dim:#5a7a96;--border:rgba(0,255,231,0.12);--mono:'Share Tech Mono',monospace;--display:'Syne',sans-serif;}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:var(--bg);color:var(--text);font-family:var(--display);min-height:100vh;display:flex;align-items:center;justify-content:center;}
        body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,231,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,231,0.025) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0;}
        .card{background:var(--bg2);border:1px solid var(--border);padding:3rem;width:100%;max-width:420px;position:relative;z-index:1;clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%);}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),transparent);}
        .tag{font-family:var(--mono);font-size:0.65rem;color:var(--accent);letter-spacing:4px;text-transform:uppercase;margin-bottom:0.8rem;}
        .tag::before{content:'// ';}
        h1{font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:0.4rem;}
        .sub{font-family:var(--mono);font-size:0.72rem;color:var(--dim);margin-bottom:2rem;}
        .form{display:flex;flex-direction:column;gap:1.2rem;}
        .flabel{font-family:var(--mono);font-size:0.6rem;color:var(--accent);letter-spacing:2px;text-transform:uppercase;display:block;margin-bottom:0.3rem;}
        .finput{width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--mono);font-size:0.82rem;padding:0.85rem 1.1rem;outline:none;transition:border-color 0.3s;}
        .finput:focus{border-color:var(--accent);}
        .err{font-family:var(--mono);font-size:0.72rem;color:var(--accent3);padding:0.8rem;border:1px solid rgba(255,62,108,0.2);background:rgba(255,62,108,0.05);}
        .btn{padding:1rem;background:var(--accent);color:#000;font-family:var(--mono);font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;font-weight:700;border:none;cursor:pointer;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);transition:opacity 0.2s;}
        .btn:disabled{opacity:0.5;cursor:not-allowed;}
      `}</style>
      <div className="card">
        <div className="tag">Admin Access</div>
        <h1>Sign In</h1>
        <p className="sub">Portfolio Admin Dashboard</p>
        <form className="form" onSubmit={handleSubmit}>
          <div><label className="flabel">Email</label><input type="email" className="finput" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} required placeholder="admin@email.com"/></div>
          <div><label className="flabel">Password</label><input type="password" className="finput" value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} required placeholder="••••••••"/></div>
          {error && <div className="err">✗ {error}</div>}
          <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign In →'}</button>
        </form>
      </div>
    </>
  );
}
