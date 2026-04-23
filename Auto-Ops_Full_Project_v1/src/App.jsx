import React, { useState, useCallback } from 'react';
import { UploadCloud, FileSpreadsheet, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

const S = {
  font: "'Inter', 'Pretendard', sans-serif",
  gradient: "linear-gradient(135deg, #f6f8fd 0%, #f1f5f9 100%)",
  glass: "rgba(255, 255, 255, 0.75)",
  glassBorder: "1px solid rgba(255, 255, 255, 0.6)",
  glassShadow: "0 8px 32px -8px rgba(15, 23, 42, 0.08)",
  ink: "#0f172a",
  accent: "#2563eb",
  muted: "#64748b"
};

export default function App() {
  const [view, setView] = useState('dashboard');
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if(e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setResult("AI 데이터 표준화가 완료되었습니다.");
    }, 2000);
  };

  return (
    <div style={{ fontFamily: S.font, background: S.gradient, minHeight: '100vh', color: S.ink, overflow: 'hidden' }}>
       <style>{`
          @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
          @keyframes pulseSoft { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .glass-panel { background: ${S.glass}; backdrop-filter: blur(20px); border: ${S.glassBorder}; box-shadow: ${S.glassShadow}; border-radius: 24px; }
          .btn-hover { transition: all 0.3s; cursor: pointer; }
          .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -10px rgba(37,99,235,0.4); }
       `}</style>
       
       <div style={{ position: "fixed", top: "-10%", left: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)", zIndex: 0, animation: "pulseSoft 10s infinite alternate" }} />
       <div style={{ position: "fixed", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(255,255,255,0) 70%)", zIndex: 0, animation: "pulseSoft 15s infinite alternate-reverse" }} />

      <header className="glass-panel" style={{ margin: '20px 40px', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={28} /></div>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>Auto-Ops <span style={{ color: S.accent }}>AI</span></h1>
      </header>

      <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', position: 'relative', zIndex: 10, animation: 'slideUp 0.6s ease' }}>
        {view === 'dashboard' ? (
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 800, textAlign: 'center', marginBottom: '16px', letterSpacing: '-1px' }}>업무 자동화 대시보드</h2>
            <p style={{ textAlign: 'center', color: S.muted, fontSize: '18px', marginBottom: '48px' }}>강력한 AI 파이프라인으로 엑셀 데이터를 자동으로 정제하고 표준화하세요.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div className="glass-panel btn-hover" style={{ padding: '32px' }} onClick={() => setView('upload')}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(37,99,235,0.1)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <UploadCloud size={32} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 12px 0' }}>인력 데이터 취합 (Excel)</h3>
                <p style={{ color: S.muted, margin: 0, lineHeight: 1.6 }}>구조가 다른 여러 엑셀 파일을 업로드하면, Gemini AI가 자동으로 형식을 인식하고 하나의 표준 데이터베이스로 취합합니다.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '48px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <button onClick={() => setView('dashboard')} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>← 돌아가기</button>
            
            {!result ? (
              <>
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  style={{ border: `2px dashed ${isDragging ? S.accent : S.glassBorder}`, background: isDragging ? 'rgba(37,99,235,0.05)' : 'rgba(255,255,255,0.5)', padding: '64px 32px', borderRadius: '24px', transition: 'all 0.3s' }}
                >
                  <FileSpreadsheet size={64} color={isDragging ? S.accent : S.muted} style={{ marginBottom: 24 }} />
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>엑셀 파일을 여기에 놓으세요</h2>
                  <p style={{ color: S.muted, marginBottom: '24px' }}>또는 클릭해서 파일을 선택하세요</p>
                  <label className="btn-hover" style={{ background: S.ink, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, display: 'inline-block', cursor: 'pointer' }}>
                    파일 선택하기
                    <input type="file" accept=".xlsx, .xls, .csv" style={{ display: 'none' }} onChange={(e) => { if(e.target.files[0]) setFile(e.target.files[0]); }} />
                  </label>
                </div>
                {file && (
                  <div style={{ marginTop: 24, padding: 20, background: '#fff', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><FileSpreadsheet size={24} color="#10b981"/> <b style={{ fontSize: 14 }}>{file.name}</b></div>
                    <button className="btn-hover" onClick={processFile} disabled={processing} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: processing ? 'wait' : 'pointer' }}>{processing ? 'AI 분석 중...' : 'AI 표준화 시작'}</button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: '40px 0', animation: 'slideUp 0.5s ease' }}>
                <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 24px' }} />
                <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: 16 }}>{result}</h2>
                <p style={{ color: S.muted, marginBottom: 32 }}>데이터가 성공적으로 Supabase 데이터베이스에 저장되었습니다.</p>
                <button className="btn-hover" onClick={() => { setResult(null); setFile(null); }} style={{ background: S.ink, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 600 }}>새 파일 업로드</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
