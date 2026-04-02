import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPost } from '../api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPost(slug).then(setPost).catch(() => setError(true));
  }, [slug]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@400;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        :root{--bg:#050a0e;--bg2:#0a1018;--accent:#00ffe7;--accent2:#0087ff;--text:#c8d8e8;--dim:#5a7a96;--border:rgba(0,255,231,0.12);--mono:'Share Tech Mono',monospace;--display:'Syne',sans-serif;--prose:'Lora',serif;}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:var(--bg);color:var(--text);font-family:var(--display);}
        body::after{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,231,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,231,0.02) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0;}
        nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:1.2rem 4rem;background:rgba(5,10,14,0.9);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);}
        .nav-logo{font-family:var(--mono);font-size:1rem;color:var(--accent);text-decoration:none;letter-spacing:2px;}
        .main{max-width:780px;margin:0 auto;padding:8rem 2rem 6rem;position:relative;z-index:1;}
        .back{font-family:var(--mono);font-size:0.72rem;color:var(--dim);text-decoration:none;letter-spacing:2px;transition:color 0.2s;display:inline-block;margin-bottom:2rem;}
        .back:hover{color:var(--accent);}
        .back::before{content:'← ';}
        .tags{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1.2rem;}
        .ctag{font-family:var(--mono);font-size:0.6rem;padding:0.2rem 0.6rem;border:1px solid var(--border);color:var(--accent2);}
        .post-title{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:#fff;line-height:1.15;letter-spacing:-1px;margin-bottom:1rem;}
        .meta{font-family:var(--mono);font-size:0.68rem;color:var(--dim);margin-bottom:3rem;display:flex;gap:1.5rem;}
        .divider{height:1px;background:linear-gradient(90deg,var(--accent),transparent);margin-bottom:3rem;}
        .content{font-family:var(--prose);font-size:1.05rem;line-height:1.85;color:var(--text);}
        .content p{margin-bottom:1.5rem;}
        .content h1,.content h2,.content h3{font-family:var(--display);color:#fff;margin:2rem 0 1rem;font-weight:700;}
        .content h2{font-size:1.4rem;}
        .content h3{font-size:1.1rem;}
        .content code{font-family:var(--mono);background:var(--bg2);border:1px solid var(--border);padding:0.15rem 0.5rem;font-size:0.85em;color:var(--accent);}
        .content pre{background:var(--bg2);border:1px solid var(--border);padding:1.5rem;overflow-x:auto;margin:1.5rem 0;}
        .content pre code{background:none;border:none;padding:0;color:var(--text);}
        .content blockquote{border-left:3px solid var(--accent);padding:0.5rem 1.5rem;margin:1.5rem 0;color:var(--dim);font-style:italic;}
        .content a{color:var(--accent2);text-decoration:none;}
        .content ul,.content ol{padding-left:1.5rem;margin-bottom:1.5rem;}
        .content li{margin-bottom:0.5rem;}
        .error{font-family:var(--mono);color:var(--dim);text-align:center;padding:4rem;}
        .loading{font-family:var(--mono);color:var(--dim);text-align:center;padding:4rem;}
        @media(max-width:768px){nav{padding:1rem 1.5rem;}.main{padding:6rem 1.2rem 4rem;}}
      `}</style>
      <nav>
        <Link to="/" className="nav-logo">&lt;Home/&gt;</Link>
        <Link to="/blog" style={{fontFamily:'var(--mono)',fontSize:'0.72rem',color:'var(--dim)',textDecoration:'none',letterSpacing:'2px'}}>BLOG</Link>
      </nav>
      <div className="main">
        <Link to="/blog" className="back">Back to Blog</Link>
        {error ? (
          <div className="error">// Post not found.</div>
        ) : !post ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="tags">{(post.tags || []).map(t => <span key={t} className="ctag">{t}</span>)}</div>
            <h1 className="post-title">{post.title}</h1>
            <div className="meta">
              <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</span>
              <span>👁 {post.views} views</span>
            </div>
            <div className="divider" />
            <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </>
        )}
      </div>
    </>
  );
}
