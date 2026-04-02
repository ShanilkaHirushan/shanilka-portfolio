import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  fetchDashboard, fetchMessages, markRead,
  fetchAdminPosts, createPost, updatePost, deletePost,
  fetchResumeStats, uploadResume, fetchAllContent, updateContent
} from '../api';

/* ─── Shared styles ─────────────────────────────────────────── */
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&display=swap');
  :root{--bg:#050a0e;--bg2:#0a1018;--bg3:#0f1923;--accent:#00ffe7;--accent2:#0087ff;--accent3:#ff3e6c;--accent4:#ffd700;--text:#c8d8e8;--dim:#5a7a96;--border:rgba(0,255,231,0.12);--mono:'Share Tech Mono',monospace;--display:'Syne',sans-serif;}
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:var(--bg);color:var(--text);font-family:var(--display);min-height:100vh;}
  body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,231,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,231,0.02) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0;}
  .layout{display:flex;min-height:100vh;}
  /* Sidebar */
  .sidebar{width:240px;background:var(--bg2);border-right:1px solid var(--border);padding:2rem 0;position:fixed;top:0;left:0;bottom:0;z-index:200;display:flex;flex-direction:column;}
  .sb-logo{font-family:var(--mono);font-size:0.9rem;color:var(--accent);padding:0 1.5rem 2rem;border-bottom:1px solid var(--border);margin-bottom:1.5rem;letter-spacing:2px;}
  .sb-logo span{color:var(--dim);}
  .sb-nav{display:flex;flex-direction:column;gap:0.3rem;padding:0 0.8rem;flex:1;}
  .sb-link{display:flex;align-items:center;gap:0.8rem;font-family:var(--mono);font-size:0.72rem;color:var(--dim);text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;padding:0.7rem 0.8rem;border:1px solid transparent;transition:all 0.2s;border-radius:2px;}
  .sb-link:hover{color:var(--text);border-color:var(--border);}
  .sb-link.active{color:var(--accent);border-color:var(--border);background:rgba(0,255,231,0.04);}
  .sb-icon{font-size:0.9rem;width:18px;text-align:center;}
  .sb-badge{margin-left:auto;background:var(--accent3);color:#fff;font-size:0.55rem;padding:0.1rem 0.4rem;border-radius:2px;}
  .sb-logout{padding:1.5rem 1.6rem 0;border-top:1px solid var(--border);}
  .logout-btn{font-family:var(--mono);font-size:0.68rem;color:var(--dim);background:none;border:1px solid var(--border);padding:0.6rem 1rem;cursor:pointer;width:100%;text-align:left;letter-spacing:1px;transition:all 0.2s;}
  .logout-btn:hover{color:var(--accent3);border-color:rgba(255,62,108,0.3);}
  /* Main */
  .main{margin-left:240px;flex:1;padding:2.5rem 3rem;position:relative;z-index:1;}
  .page-tag{font-family:var(--mono);font-size:0.65rem;color:var(--accent);letter-spacing:4px;text-transform:uppercase;margin-bottom:0.5rem;}
  .page-tag::before{content:'// ';}
  .page-title{font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:2rem;letter-spacing:-0.5px;}
  /* Cards */
  .card{background:var(--bg2);border:1px solid var(--border);padding:1.5rem;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);}
  .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:2rem;}
  .stat-card{background:var(--bg2);border:1px solid var(--border);padding:1.5rem;position:relative;overflow:hidden;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%);}
  .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;}
  .stat-card.c1::before{background:linear-gradient(90deg,var(--accent),transparent);}
  .stat-card.c2::before{background:linear-gradient(90deg,var(--accent2),transparent);}
  .stat-card.c3::before{background:linear-gradient(90deg,var(--accent3),transparent);}
  .stat-card.c4::before{background:linear-gradient(90deg,var(--accent4),transparent);}
  .stat-val{font-family:var(--mono);font-size:2rem;color:#fff;display:block;margin-bottom:0.3rem;}
  .stat-lbl{font-family:var(--mono);font-size:0.62rem;color:var(--dim);letter-spacing:2px;text-transform:uppercase;}
  /* Table */
  .table-wrap{overflow-x:auto;}
  table{width:100%;border-collapse:collapse;font-family:var(--mono);font-size:0.75rem;}
  th{color:var(--accent);font-size:0.62rem;letter-spacing:2px;text-transform:uppercase;padding:0.8rem 1rem;text-align:left;border-bottom:1px solid var(--border);}
  td{padding:0.85rem 1rem;border-bottom:1px solid rgba(255,255,255,0.04);color:var(--text);vertical-align:top;}
  tr:hover td{background:rgba(255,255,255,0.02);}
  .badge{font-size:0.6rem;padding:0.2rem 0.6rem;border-radius:2px;letter-spacing:1px;text-transform:uppercase;}
  .badge-green{background:rgba(0,255,231,0.1);color:var(--accent);border:1px solid rgba(0,255,231,0.2);}
  .badge-red{background:rgba(255,62,108,0.1);color:var(--accent3);border:1px solid rgba(255,62,108,0.2);}
  .badge-blue{background:rgba(0,135,255,0.1);color:var(--accent2);border:1px solid rgba(0,135,255,0.2);}
  .badge-gray{background:rgba(255,255,255,0.05);color:var(--dim);border:1px solid var(--border);}
  /* Buttons */
  .btn{font-family:var(--mono);font-size:0.7rem;letter-spacing:1.5px;text-transform:uppercase;padding:0.6rem 1.2rem;cursor:pointer;border:none;transition:all 0.2s;}
  .btn-accent{background:var(--accent);color:#000;font-weight:700;clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%);}
  .btn-accent:hover{box-shadow:0 0 16px rgba(0,255,231,0.35);}
  .btn-ghost{background:transparent;color:var(--dim);border:1px solid var(--border);}
  .btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
  .btn-danger{background:transparent;color:var(--accent3);border:1px solid rgba(255,62,108,0.3);}
  .btn-danger:hover{background:rgba(255,62,108,0.08);}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .btns{display:flex;gap:0.6rem;flex-wrap:wrap;}
  /* Form */
  .form{display:flex;flex-direction:column;gap:1.2rem;}
  .frow{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
  .fg{display:flex;flex-direction:column;gap:0.4rem;}
  .flabel{font-family:var(--mono);font-size:0.6rem;color:var(--accent);letter-spacing:2px;text-transform:uppercase;}
  .finput,.ftarea,.fselect{background:var(--bg3);border:1px solid var(--border);color:var(--text);font-family:var(--mono);font-size:0.8rem;padding:0.8rem 1rem;outline:none;transition:border-color 0.3s;width:100%;}
  .finput:focus,.ftarea:focus,.fselect:focus{border-color:var(--accent);}
  .ftarea{resize:vertical;min-height:200px;}
  .fselect option{background:var(--bg2);}
  .msg-box{background:var(--bg3);border:1px solid var(--border);padding:1.2rem;font-size:0.85rem;line-height:1.7;color:var(--text);white-space:pre-wrap;max-height:200px;overflow-y:auto;}
  .success{font-family:var(--mono);font-size:0.75rem;color:var(--accent);padding:0.8rem;border:1px solid rgba(0,255,231,0.2);background:rgba(0,255,231,0.05);}
  .err{font-family:var(--mono);font-size:0.75rem;color:var(--accent3);padding:0.8rem;border:1px solid rgba(255,62,108,0.2);background:rgba(255,62,108,0.05);}
  .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:900;display:flex;align-items:center;justify-content:center;padding:2rem;}
  .modal{background:var(--bg2);border:1px solid var(--border);padding:2.5rem;width:100%;max-width:720px;max-height:90vh;overflow-y:auto;position:relative;clip-path:polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%);}
  .modal-title{font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:1.5rem;}
  .close-btn{position:absolute;top:1rem;right:1.2rem;font-family:var(--mono);font-size:0.75rem;color:var(--dim);background:none;border:none;cursor:pointer;letter-spacing:1px;}
  .close-btn:hover{color:var(--accent3);}
  .divider{height:1px;background:var(--border);margin:1.5rem 0;}
  .section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;}
  .empty{font-family:var(--mono);color:var(--dim);text-align:center;padding:3rem;border:1px dashed var(--border);font-size:0.8rem;}
  .chart-bar-row{display:flex;align-items:center;gap:0.8rem;margin-bottom:0.6rem;}
  .chart-date{font-family:var(--mono);font-size:0.62rem;color:var(--dim);width:90px;flex-shrink:0;}
  .chart-bar{height:14px;background:linear-gradient(90deg,var(--accent),var(--accent2));min-width:2px;transition:width 0.6s;}
  .chart-val{font-family:var(--mono);font-size:0.62rem;color:var(--accent);}
  .toggle-wrap{display:flex;align-items:center;gap:0.8rem;}
  .toggle{position:relative;width:40px;height:22px;}
  .toggle input{opacity:0;width:0;height:0;}
  .toggle-slider{position:absolute;inset:0;background:var(--bg3);border:1px solid var(--border);cursor:pointer;transition:0.3s;}
  .toggle-slider::before{content:'';position:absolute;width:14px;height:14px;left:3px;bottom:3px;background:var(--dim);transition:0.3s;}
  .toggle input:checked + .toggle-slider{background:rgba(0,255,231,0.15);border-color:var(--accent);}
  .toggle input:checked + .toggle-slider::before{background:var(--accent);transform:translateX(18px);}
  @media(max-width:900px){.sidebar{width:200px;}.main{margin-left:200px;padding:2rem 1.5rem;}.frow{grid-template-columns:1fr;}}
  @media(max-width:640px){.sidebar{display:none;}.main{margin-left:0;}}
`;

/* ─── Overview ──────────────────────────────────────────────── */
function Overview() {
  const [stats, setStats] = useState(null);
  useEffect(() => { fetchDashboard().then(setStats).catch(() => {}); }, []);
  return (
    <div>
      <div className="page-tag">Dashboard</div>
      <div className="page-title">Overview</div>
      {stats && (
        <div className="stat-grid">
          <div className="stat-card c1"><span className="stat-val">{stats.publishedCount}</span><span className="stat-lbl">Published Posts</span></div>
          <div className="stat-card c2"><span className="stat-val">{stats.blogCount}</span><span className="stat-lbl">Total Posts</span></div>
          <div className="stat-card c3"><span className="stat-val">{stats.unreadCount}</span><span className="stat-lbl">Unread Messages</span></div>
          <div className="stat-card c4"><span className="stat-val">{stats.resumeTotal}</span><span className="stat-lbl">CV Downloads</span></div>
          <div className="stat-card c1"><span className="stat-val">{stats.contactCount}</span><span className="stat-lbl">Total Messages</span></div>
        </div>
      )}
      <div className="card" style={{fontFamily:'var(--mono)',fontSize:'0.75rem',color:'var(--dim)',lineHeight:2}}>
        <div style={{color:'var(--accent)',marginBottom:'0.5rem'}}>// Quick links</div>
        <div>→ Use the sidebar to manage Blog, Messages, Resume, and Content</div>
        <div>→ All portfolio content is editable from the Content section</div>
        <div>→ CV downloads are tracked automatically when visitors download your resume</div>
        <div>→ Contact messages trigger email notifications to your inbox</div>
      </div>
    </div>
  );
}

/* ─── Messages ──────────────────────────────────────────────── */
function Messages() {
  const [msgs, setMsgs] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchMessages().then(setMsgs).catch(() => {}); }, []);

  async function handleRead(id) {
    await markRead(id);
    setMsgs(m => m.map(x => x._id === id ? { ...x, read: true } : x));
    if (selected?._id === id) setSelected(s => ({ ...s, read: true }));
  }

  return (
    <div>
      <div className="page-tag">Inbox</div>
      <div className="page-title">Contact Messages</div>
      {msgs.length === 0 ? (
        <div className="empty">// No messages yet.</div>
      ) : (
        <div className="table-wrap card">
          <table>
            <thead><tr><th>Status</th><th>From</th><th>Email</th><th>Message</th><th>Date</th><th>Action</th></tr></thead>
            <tbody>
              {msgs.map(m => (
                <tr key={m._id}>
                  <td><span className={`badge ${m.read ? 'badge-gray' : 'badge-green'}`}>{m.read ? 'Read' : 'New'}</span></td>
                  <td style={{fontWeight: m.read ? 400 : 700, color: m.read ? 'var(--dim)' : '#fff'}}>{m.name}</td>
                  <td style={{color:'var(--dim)'}}>{m.email}</td>
                  <td style={{color:'var(--dim)',maxWidth:'220px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.message}</td>
                  <td style={{color:'var(--dim)',whiteSpace:'nowrap'}}>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="btns">
                      <button className="btn btn-ghost" onClick={() => { setSelected(m); if(!m.read) handleRead(m._id); }}>View</button>
                      {!m.read && <button className="btn btn-ghost" onClick={() => handleRead(m._id)}>Mark Read</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selected && (
        <div className="modal-bg" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelected(null)}>[close]</button>
            <div className="modal-title">Message from {selected.name}</div>
            <div style={{fontFamily:'var(--mono)',fontSize:'0.75rem',color:'var(--dim)',marginBottom:'1rem',display:'flex',gap:'2rem'}}>
              <span>✉ {selected.email}</span>
              <span>📅 {new Date(selected.createdAt).toLocaleString()}</span>
            </div>
            <div className="divider"/>
            <div className="msg-box">{selected.message}</div>
            <div style={{marginTop:'1.5rem'}} className="btns">
              <a href={`mailto:${selected.email}`} className="btn btn-accent" style={{textDecoration:'none'}}>Reply via Email</a>
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Blog Manager ──────────────────────────────────────────── */
function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | post object
  const [form, setForm] = useState({ title:'', excerpt:'', content:'', tags:'', published:false, coverImage:'' });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const load = useCallback(() => { fetchAdminPosts().then(setPosts).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  function openNew() { setForm({ title:'', excerpt:'', content:'', tags:'', published:false, coverImage:'' }); setEditing('new'); setStatus(''); }
  function openEdit(p) { setForm({ title:p.title, excerpt:p.excerpt, content:p.content, tags:(p.tags||[]).join(', '), published:p.published, coverImage:p.coverImage||'' }); setEditing(p); setStatus(''); }

  async function handleSave() {
    setSaving(true); setStatus('');
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing === 'new') await createPost(payload);
      else await updatePost(editing._id, payload);
      setStatus('saved');
      setEditing(null);
      load();
    } catch { setStatus('error'); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this post?')) return;
    await deletePost(id);
    load();
  }

  async function togglePublish(p) {
    await updatePost(p._id, { published: !p.published });
    load();
  }

  return (
    <div>
      <div className="section-head">
        <div><div className="page-tag">Content</div><div className="page-title" style={{marginBottom:0}}>Blog Posts</div></div>
        <button className="btn btn-accent" onClick={openNew}>+ New Post</button>
      </div>

      {posts.length === 0 ? (
        <div className="empty">// No posts yet. Create your first post.</div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead><tr><th>Status</th><th>Title</th><th>Tags</th><th>Views</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p._id}>
                  <td><span className={`badge ${p.published ? 'badge-green' : 'badge-gray'}`}>{p.published ? 'Live' : 'Draft'}</span></td>
                  <td style={{color:'#fff',maxWidth:'200px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{p.title}</td>
                  <td style={{color:'var(--dim)'}}>{(p.tags||[]).join(', ')}</td>
                  <td style={{color:'var(--accent)'}}>{p.views}</td>
                  <td style={{color:'var(--dim)',whiteSpace:'nowrap'}}>{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="btns">
                      <button className="btn btn-ghost" onClick={() => openEdit(p)}>Edit</button>
                      <button className="btn btn-ghost" onClick={() => togglePublish(p)}>{p.published ? 'Unpublish' : 'Publish'}</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="modal-bg" onClick={() => setEditing(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setEditing(null)}>[close]</button>
            <div className="modal-title">{editing === 'new' ? 'New Post' : `Edit: ${editing.title}`}</div>
            <div className="form">
              <div className="frow">
                <div className="fg"><label className="flabel">Title *</label><input className="finput" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} placeholder="Post title"/></div>
                <div className="fg"><label className="flabel">Tags (comma separated)</label><input className="finput" value={form.tags} onChange={e => setForm(f=>({...f,tags:e.target.value}))} placeholder="React, Node.js, Tips"/></div>
              </div>
              <div className="fg"><label className="flabel">Excerpt *</label><input className="finput" value={form.excerpt} onChange={e => setForm(f=>({...f,excerpt:e.target.value}))} placeholder="Short description shown in the blog listing"/></div>
              <div className="fg"><label className="flabel">Content * (HTML supported)</label><textarea className="ftarea" style={{minHeight:'280px'}} value={form.content} onChange={e => setForm(f=>({...f,content:e.target.value}))} placeholder="<p>Write your post here...</p>"/></div>
              <div className="frow">
                <div className="fg"><label className="flabel">Cover Image URL</label><input className="finput" value={form.coverImage} onChange={e => setForm(f=>({...f,coverImage:e.target.value}))} placeholder="https://..."/></div>
                <div className="fg"><label className="flabel">Status</label>
                  <div className="toggle-wrap" style={{marginTop:'0.6rem'}}>
                    <label className="toggle"><input type="checkbox" checked={form.published} onChange={e => setForm(f=>({...f,published:e.target.checked}))}/><span className="toggle-slider"/></label>
                    <span style={{fontFamily:'var(--mono)',fontSize:'0.72rem',color:form.published?'var(--accent)':'var(--dim)'}}>{form.published ? 'Published' : 'Draft'}</span>
                  </div>
                </div>
              </div>
              {status === 'saved' && <div className="success">✓ Post saved successfully.</div>}
              {status === 'error' && <div className="err">✗ Failed to save. Check required fields.</div>}
              <div className="btns">
                <button className="btn btn-accent" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
                <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Resume Tracker ────────────────────────────────────────── */
function ResumeTracker() {
  const [stats, setStats] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => { fetchResumeStats().then(setStats).catch(() => {}); }, []);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setUploadStatus('');
    const form = new FormData();
    form.append('resume', file);
    try {
      await uploadResume(form);
      setUploadStatus('success');
    } catch { setUploadStatus('error'); }
    finally { setUploading(false); }
  }

  const maxCount = stats?.byDay?.reduce((a, b) => Math.max(a, b.count), 1) || 1;

  return (
    <div>
      <div className="page-tag">Analytics</div>
      <div className="page-title">Resume Downloads</div>

      {stats && (
        <>
          <div className="stat-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
            <div className="stat-card c1"><span className="stat-val">{stats.total}</span><span className="stat-lbl">Total Downloads</span></div>
            <div className="stat-card c2"><span className="stat-val">{stats.last30}</span><span className="stat-lbl">Last 30 Days</span></div>
          </div>

          {stats.byDay?.length > 0 && (
            <div className="card" style={{marginBottom:'1.5rem'}}>
              <div style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'3px',marginBottom:'1.2rem'}}>// DOWNLOADS BY DAY</div>
              {stats.byDay.map(d => (
                <div key={d._id} className="chart-bar-row">
                  <span className="chart-date">{d._id}</span>
                  <div className="chart-bar" style={{width:`${(d.count/maxCount)*300}px`}}/>
                  <span className="chart-val">{d.count}</span>
                </div>
              ))}
            </div>
          )}

          {stats.recent?.length > 0 && (
            <div className="card table-wrap" style={{marginBottom:'1.5rem'}}>
              <div style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'3px',marginBottom:'1rem'}}>// RECENT DOWNLOADS</div>
              <table>
                <thead><tr><th>Date</th><th>IP</th><th>Referer</th></tr></thead>
                <tbody>
                  {stats.recent.map((r,i) => (
                    <tr key={i}>
                      <td>{new Date(r.createdAt).toLocaleString()}</td>
                      <td style={{color:'var(--dim)'}}>{r.ip}</td>
                      <td style={{color:'var(--dim)'}}>{r.referer || 'direct'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <div className="card">
        <div style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'3px',marginBottom:'1rem'}}>// UPLOAD NEW RESUME (PDF)</div>
        <label style={{display:'inline-block',cursor:'pointer'}}>
          <input type="file" accept=".pdf" onChange={handleUpload} style={{display:'none'}}/>
          <span className={`btn ${uploading ? 'btn-ghost' : 'btn-accent'}`} style={{display:'inline-block'}}>
            {uploading ? 'Uploading...' : '↑ Upload Resume PDF'}
          </span>
        </label>
        {uploadStatus === 'success' && <div className="success" style={{marginTop:'1rem'}}>✓ Resume uploaded. Visitors can now download it.</div>}
        {uploadStatus === 'error' && <div className="err" style={{marginTop:'1rem'}}>✗ Upload failed. Only PDF files are accepted.</div>}
      </div>
    </div>
  );
}

/* ─── Content Editor ────────────────────────────────────────── */
function ContentEditor() {
  const [content, setContent] = useState(null);
  const [saving, setSaving] = useState({});
  const [status, setStatus] = useState({});

  useEffect(() => { fetchAllContent().then(setContent).catch(() => {}); }, []);

  async function saveSection(key) {
    setSaving(s => ({...s,[key]:true}));
    try {
      await updateContent(key, content[key]);
      setStatus(s => ({...s,[key]:'saved'}));
      setTimeout(() => setStatus(s => ({...s,[key]:''})), 3000);
    } catch {
      setStatus(s => ({...s,[key]:'error'}));
    } finally {
      setSaving(s => ({...s,[key]:false}));
    }
  }

  function update(section, path, val) {
    setContent(c => {
      const clone = JSON.parse(JSON.stringify(c));
      let obj = clone[section];
      const parts = path.split('.');
      parts.slice(0,-1).forEach(p => { obj = obj[p]; });
      obj[parts[parts.length-1]] = val;
      return clone;
    });
  }

  if (!content) return <div style={{fontFamily:'var(--mono)',color:'var(--dim)',padding:'3rem'}}>Loading content...</div>;

  return (
    <div>
      <div className="page-tag">Editor</div>
      <div className="page-title">Edit Portfolio Content</div>

      {/* Hero */}
      <div className="card" style={{marginBottom:'1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.2rem'}}>
          <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'3px'}}>// HERO SECTION</span>
          <div className="btns">
            {status.hero === 'saved' && <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)'}}>✓ Saved</span>}
            {status.hero === 'error' && <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent3)'}}>✗ Error</span>}
            <button className="btn btn-accent" onClick={() => saveSection('hero')} disabled={saving.hero}>{saving.hero ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
        <div className="form">
          <div className="frow">
            <div className="fg"><label className="flabel">Your Name</label><input className="finput" value={content.hero.name||''} onChange={e => update('hero','name',e.target.value)}/></div>
            <div className="fg"><label className="flabel">Title / Role</label><input className="finput" value={content.hero.title||''} onChange={e => update('hero','title',e.target.value)}/></div>
          </div>
          <div className="fg"><label className="flabel">Bio</label><input className="finput" value={content.hero.bio||''} onChange={e => update('hero','bio',e.target.value)}/></div>
          <div className="frow">
            <div className="fg"><label className="flabel">Years Experience</label><input type="number" className="finput" value={content.hero.stats?.years||0} onChange={e => update('hero','stats.years',+e.target.value)}/></div>
            <div className="fg"><label className="flabel">Projects Count</label><input type="number" className="finput" value={content.hero.stats?.projects||0} onChange={e => update('hero','stats.projects',+e.target.value)}/></div>
            <div className="fg"><label className="flabel">Clients Count</label><input type="number" className="finput" value={content.hero.stats?.clients||0} onChange={e => update('hero','stats.clients',+e.target.value)}/></div>
          </div>
          <div className="toggle-wrap">
            <label className="toggle"><input type="checkbox" checked={!!content.hero.available} onChange={e => update('hero','available',e.target.checked)}/><span className="toggle-slider"/></label>
            <span style={{fontFamily:'var(--mono)',fontSize:'0.72rem',color:'var(--dim)'}}>Available for work</span>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="card" style={{marginBottom:'1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.2rem'}}>
          <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'3px'}}>// CONTACT INFO</span>
          <div className="btns">
            {status.contact === 'saved' && <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)'}}>✓ Saved</span>}
            <button className="btn btn-accent" onClick={() => saveSection('contact')} disabled={saving.contact}>{saving.contact ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
        <div className="form">
          <div className="frow">
            <div className="fg"><label className="flabel">Email</label><input className="finput" value={content.contact?.email||''} onChange={e => update('contact','email',e.target.value)}/></div>
            <div className="fg"><label className="flabel">GitHub URL</label><input className="finput" value={content.contact?.github||''} onChange={e => update('contact','github',e.target.value)}/></div>
            <div className="fg"><label className="flabel">LinkedIn URL</label><input className="finput" value={content.contact?.linkedin||''} onChange={e => update('contact','linkedin',e.target.value)}/></div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="card" style={{marginBottom:'1.5rem'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.2rem'}}>
          <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'3px'}}>// SKILLS</span>
          <div className="btns">
            {status.skills === 'saved' && <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)'}}>✓ Saved</span>}
            <button className="btn btn-ghost" onClick={() => setContent(c => ({...c, skills:[...c.skills,{name:'New Skill',desc:'',level:70,icon:'💡'}]}))}>+ Add</button>
            <button className="btn btn-accent" onClick={() => saveSection('skills')} disabled={saving.skills}>{saving.skills ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
        {(content.skills||[]).map((s,i) => (
          <div key={i} style={{display:'grid',gridTemplateColumns:'40px 1fr 1fr 80px 40px',gap:'0.8rem',alignItems:'center',marginBottom:'0.8rem'}}>
            <input className="finput" value={s.icon} onChange={e => { const sk=[...content.skills]; sk[i]={...sk[i],icon:e.target.value}; setContent(c=>({...c,skills:sk})); }} style={{textAlign:'center',padding:'0.5rem'}}/>
            <input className="finput" value={s.name} onChange={e => { const sk=[...content.skills]; sk[i]={...sk[i],name:e.target.value}; setContent(c=>({...c,skills:sk})); }} placeholder="Skill name"/>
            <input className="finput" value={s.desc} onChange={e => { const sk=[...content.skills]; sk[i]={...sk[i],desc:e.target.value}; setContent(c=>({...c,skills:sk})); }} placeholder="Tech stack"/>
            <input type="number" className="finput" min="0" max="100" value={s.level} onChange={e => { const sk=[...content.skills]; sk[i]={...sk[i],level:+e.target.value}; setContent(c=>({...c,skills:sk})); }} placeholder="%"/>
            <button className="btn btn-danger" style={{padding:'0.5rem'}} onClick={() => setContent(c=>({...c,skills:c.skills.filter((_,j)=>j!==i)}))}>✕</button>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="card">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.2rem'}}>
          <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)',letterSpacing:'3px'}}>// PROJECTS</span>
          <div className="btns">
            {status.projects === 'saved' && <span style={{fontFamily:'var(--mono)',fontSize:'0.65rem',color:'var(--accent)'}}>✓ Saved</span>}
            <button className="btn btn-ghost" onClick={() => setContent(c=>({...c,projects:[...c.projects,{num:String(c.projects.length+1).padStart(2,'0'),title:'New Project',desc:'',tags:[],demo:'#',github:'#'}]}))}>+ Add</button>
            <button className="btn btn-accent" onClick={() => saveSection('projects')} disabled={saving.projects}>{saving.projects?'Saving...':'Save'}</button>
          </div>
        </div>
        {(content.projects||[]).map((p,i) => (
          <div key={i} className="card" style={{marginBottom:'1rem',background:'var(--bg3)'}}>
            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'0.8rem'}}>
              <button className="btn btn-danger" style={{padding:'0.3rem 0.6rem',fontSize:'0.6rem'}} onClick={() => setContent(c=>({...c,projects:c.projects.filter((_,j)=>j!==i)}))}>Remove</button>
            </div>
            <div className="frow" style={{gap:'0.8rem'}}>
              <div className="fg"><label className="flabel">Title</label><input className="finput" value={p.title} onChange={e => { const pr=[...content.projects]; pr[i]={...pr[i],title:e.target.value}; setContent(c=>({...c,projects:pr})); }}/></div>
              <div className="fg"><label className="flabel">Tags (comma)</label><input className="finput" value={(p.tags||[]).join(', ')} onChange={e => { const pr=[...content.projects]; pr[i]={...pr[i],tags:e.target.value.split(',').map(t=>t.trim())}; setContent(c=>({...c,projects:pr})); }}/></div>
            </div>
            <div className="fg" style={{marginTop:'0.8rem'}}><label className="flabel">Description</label><input className="finput" value={p.desc} onChange={e => { const pr=[...content.projects]; pr[i]={...pr[i],desc:e.target.value}; setContent(c=>({...c,projects:pr})); }}/></div>
            <div className="frow" style={{gap:'0.8rem',marginTop:'0.8rem'}}>
              <div className="fg"><label className="flabel">Demo URL</label><input className="finput" value={p.demo} onChange={e => { const pr=[...content.projects]; pr[i]={...pr[i],demo:e.target.value}; setContent(c=>({...c,projects:pr})); }}/></div>
              <div className="fg"><label className="flabel">GitHub URL</label><input className="finput" value={p.github} onChange={e => { const pr=[...content.projects]; pr[i]={...pr[i],github:e.target.value}; setContent(c=>({...c,projects:pr})); }}/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Root Dashboard ────────────────────────────────────────── */
export default function AdminDashboard() {
  const { logout } = useAuth();
  const nav = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetchDashboard().then(d => setUnread(d.unreadCount)).catch(() => {});
  }, []);

  function handleLogout() { logout(); nav('/admin/login'); }

  return (
    <>
      <style>{G}</style>
      <div className="layout">
        <aside className="sidebar">
          <div className="sb-logo">&lt;<span>Admin</span>/&gt;</div>
          <nav className="sb-nav">
            <NavLink to="/admin" end className={({isActive}) => `sb-link ${isActive?'active':''}`}>
              <span className="sb-icon">⊞</span> Overview
            </NavLink>
            <NavLink to="/admin/messages" className={({isActive}) => `sb-link ${isActive?'active':''}`}>
              <span className="sb-icon">✉</span> Messages
              {unread > 0 && <span className="sb-badge">{unread}</span>}
            </NavLink>
            <NavLink to="/admin/blog" className={({isActive}) => `sb-link ${isActive?'active':''}`}>
              <span className="sb-icon">✎</span> Blog
            </NavLink>
            <NavLink to="/admin/resume" className={({isActive}) => `sb-link ${isActive?'active':''}`}>
              <span className="sb-icon">↓</span> Resume
            </NavLink>
            <NavLink to="/admin/content" className={({isActive}) => `sb-link ${isActive?'active':''}`}>
              <span className="sb-icon">◈</span> Content
            </NavLink>
            <a href="/" className="sb-link" target="_blank" rel="noreferrer">
              <span className="sb-icon">↗</span> View Site
            </a>
          </nav>
          <div className="sb-logout">
            <button className="logout-btn" onClick={handleLogout}>⏻ Sign Out</button>
          </div>
        </aside>

        <main className="main">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="messages" element={<Messages />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="resume" element={<ResumeTracker />} />
            <Route path="content" element={<ContentEditor />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
