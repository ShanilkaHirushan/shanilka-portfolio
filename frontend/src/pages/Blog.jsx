import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api';

export default function Blog() {
  const [data, setData] = useState({ posts: [], total: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPosts({ page, limit: 9 })
      .then(setData)
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&display=swap');
        :root{--bg:#050a0e;--bg2:#0a1018;--bg3:#0f1923;--accent:#00ffe7;--accent2:#0087ff;--text:#c8d8e8;--dim:#5a7a96;--border:rgba(0,255,231,0.12);--mono:'Share Tech Mono',monospace;--display:'Syne',sans-serif;}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:var(--bg);color:var(--text);font-family:var(--display);}
        body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,231,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,231,0.025) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0;}
        nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:1.2rem 4rem;background:rgba(5,10,14,0.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
        .nav-logo{font-family:var(--mono);font-size:1rem;color:var(--accent);text-decoration:none;letter-spacing:2px;}
        .main{max-width:1100px;margin:0 auto;padding:8rem 4rem 4rem;position:relative;z-index:1;}
        .stag{font-family:var(--mono);font-size:0.68rem;color:var(--accent);letter-spacing:4px;text-transform:uppercase;margin-bottom:0.6rem;}
        .stag::before{content:'// ';}
        .stitle{font-size:clamp(2rem,4vw,2.8rem);font-weight:800;color:#fff;letter-spacing:-1px;margin-bottom:0.8rem;}
        .sub{font-family:var(--mono);font-size:0.8rem;color:var(--dim);margin-bottom:3rem;}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.6rem;}
        .card{background:var(--bg2);border:1px solid var(--border);padding:1.8rem;clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);transition:border-color 0.3s,transform 0.3s;text-decoration:none;display:block;color:inherit;}
        .card:hover{border-color:rgba(0,255,231,0.3);transform:translateY(-4px);}
        .card-date{font-family:var(--mono);font-size:0.62rem;color:var(--dim);margin-bottom:0.8rem;letter-spacing:1px;}
        .card-title{font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:0.7rem;line-height:1.3;}
        .card-excerpt{font-size:0.85rem;color:var(--dim);line-height:1.7;margin-bottom:1.2rem;}
        .card-tags{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1rem;}
        .ctag{font-family:var(--mono);font-size:0.6rem;padding:0.2rem 0.6rem;border:1px solid var(--border);color:var(--accent2);}
        .card-meta{display:flex;justify-content:space-between;font-family:var(--mono);font-size:0.65rem;color:var(--dim);}
        .read-more{color:var(--accent);}
        .empty{font-family:var(--mono);color:var(--dim);text-align:center;padding:4rem;border:1px dashed var(--border);}
        .pagination{display:flex;gap:1rem;justify-content:center;margin-top:3rem;}
        .pager{font-family:var(--mono);font-size:0.75rem;padding:0.6rem 1.4rem;background:transparent;border:1px solid var(--border);color:var(--dim);cursor:pointer;transition:all 0.2s;}
        .pager:hover,.pager.active{border-color:var(--accent);color:var(--accent);}
        .pager:disabled{opacity:0.3;cursor:not-allowed;}
        .loading{font-family:var(--mono);color:var(--dim);text-align:center;padding:4rem;}
        @media(max-width:768px){nav{padding:1rem 1.5rem;}.main{padding:6rem 1.5rem 3rem;}}
      `}</style>
      <nav>
        <Link to="/" className="nav-logo">&lt;Back/&gt;</Link>
        <div style={{fontFamily:'var(--mono)',fontSize:'0.72rem',color:'var(--dim)',letterSpacing:'2px'}}>BLOG</div>
      </nav>
      <div className="main">
        <div className="stag">Articles</div>
        <h1 className="stitle">Blog</h1>
        <div className="sub">{data.total} post{data.total !== 1 ? 's' : ''} published</div>
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : data.posts.length === 0 ? (
          <div className="empty">// No posts yet. Check back soon.</div>
        ) : (
          <div className="grid">
            {data.posts.map(post => (
              <Link key={post._id} to={`/blog/${post.slug}`} className="card">
                <div className="card-date">{new Date(post.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</div>
                <div className="card-title">{post.title}</div>
                <div className="card-excerpt">{post.excerpt}</div>
                <div className="card-tags">{(post.tags || []).map(t => <span key={t} className="ctag">{t}</span>)}</div>
                <div className="card-meta">
                  <span>👁 {post.views} views</span>
                  <span className="read-more">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {data.pages > 1 && (
          <div className="pagination">
            <button className="pager" onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Prev</button>
            {Array.from({ length: data.pages }, (_, i) => (
              <button key={i} className={`pager ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="pager" onClick={() => setPage(p => p + 1)} disabled={page === data.pages}>Next →</button>
          </div>
        )}
      </div>
    </>
  );
}
