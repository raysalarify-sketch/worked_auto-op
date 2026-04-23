import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, Bot, Sparkles, CheckCircle2, MessageSquare, Building, ArrowLeft } from 'lucide-react';

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

  const processData = (taskName) => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setResult(`${taskName} 처리가 완료되었습니다.`);
    }, 2500);
  };

  const renderDashboard = () => (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px' }}>WorkSolve BPO Automation</h2>
        <p style={{ color: S.muted, fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>사내 대출부터 급여 처리까지, 운영자가 직접 만든 가장 현실적인 자동화 솔루션</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* 1. 사내 대출 운영 자동화 */}
        <div className="glass-panel btn-hover" style={{ padding: '32px' }} onClick={() => setView('loan')}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(37,99,235,0.1)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <FileSpreadsheet size={32} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 12px 0' }}>① 사내 대출 운영 자동화</h3>
          <p style={{ color: S.muted, margin: 0, lineHeight: 1.6, fontSize: '15px' }}>복잡한 대출 규정 검토, 한도 계산, 상환 스케줄 생성을 AI가 자동으로 처리하여 문서화합니다.</p>
        </div>

        {/* 2. 맞춤형 HR/연차 알림 */}
        <div className="glass-panel btn-hover" style={{ padding: '32px' }} onClick={() => setView('hr')}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <MessageSquare size={32} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 12px 0' }}>② 맞춤형 HR/연차 알림</h3>
          <p style={{ color: S.muted, margin: 0, lineHeight: 1.6, fontSize: '15px' }}>근로자 엑셀 업로드 시 AI가 잔여 연차를 계산해 카카오톡/SMS로 개인화된 안내를 자동 발송합니다.</p>
        </div>

        {/* 3. AI 엑셀 매크로 & 데이터 수직화 */}
        <div className="glass-panel btn-hover" style={{ padding: '32px' }} onClick={() => setView('excel')}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(139,92,246,0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <UploadCloud size={32} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 12px 0' }}>③ AI 엑셀 파싱 & 데이터 정제</h3>
          <p style={{ color: S.muted, margin: 0, lineHeight: 1.6, fontSize: '15px' }}>제각각인 양식의 문서를 AI(Gemini)가 분석하여 표준 데이터베이스로 변환하고 가공합니다.</p>
        </div>

        {/* 4. 월급여 및 연말정산 자동화 */}
        <div className="glass-panel btn-hover" style={{ padding: '32px' }} onClick={() => setView('payroll')}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <Building size={32} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 12px 0' }}>④ 월급여 및 연말정산 자동화</h3>
          <p style={{ color: S.muted, margin: 0, lineHeight: 1.6, fontSize: '15px' }}>4대 보험, 원천세 계산 로직을 내재화하여 월말 처리 비용을 절감하는 Payroll 시스템.</p>
        </div>

      </div>
    </div>
  );

  const renderUploadTool = (title, description, taskName, iconColor) => (
    <div className="glass-panel" style={{ padding: '48px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <button onClick={() => {setView('dashboard'); setResult(null); setFile(null);}} style={{ background: 'none', border: 'none', color: S.muted, cursor: 'pointer', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}><ArrowLeft size={18}/> 대시보드로 돌아가기</button>
      
      {!result ? (
        <>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '16px 0 8px' }}>{title}</h2>
            <p style={{ color: S.muted }}>{description}</p>
          </div>

          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{ border: `2px dashed ${isDragging ? S.accent : S.glassBorder}`, background: isDragging ? 'rgba(37,99,235,0.05)' : 'rgba(255,255,255,0.5)', padding: '64px 32px', borderRadius: '24px', transition: 'all 0.3s' }}
          >
            <UploadCloud size={64} color={isDragging ? S.accent : S.muted} style={{ marginBottom: 24 }} />
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>작업할 문서를 여기에 놓으세요</h3>
            <p style={{ color: S.muted, marginBottom: '24px', fontSize: '14px' }}>AI 엔진(Gemini 1.5)이 데이터를 분석하고 파싱합니다.</p>
            <label className="btn-hover" style={{ background: S.ink, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, display: 'inline-block', cursor: 'pointer' }}>
              파일 선택하기
              <input type="file" accept=".xlsx, .xls, .csv, .pdf" style={{ display: 'none' }} onChange={(e) => { if(e.target.files[0]) setFile(e.target.files[0]); }} />
            </label>
          </div>
          {file && (
            <div style={{ marginTop: 24, padding: 20, background: '#fff', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}><FileSpreadsheet size={24} color="#10b981" /> <b style={{ fontSize: 14 }}>{file.name}</b></div>
              <button className="btn-hover" onClick={() => processData(taskName)} disabled={processing} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: processing ? 'wait' : 'pointer', minWidth: '120px' }}>
                {processing ? <Sparkles size={18} style={{ animation: 'pulseSoft 1s infinite' }} /> : 'AI 실행하기'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{ padding: '40px 0', animation: 'slideUp 0.5s ease' }}>
          <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: 16 }}>{result}</h2>
          <p style={{ color: S.muted, marginBottom: 32 }}>백그라운드에서 AI 엔진이 작업을 성공적으로 마쳤습니다.</p>
          <button className="btn-hover" onClick={() => { setResult(null); setFile(null); }} style={{ background: S.ink, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 600 }}>추가 작업하기</button>
        </div>
      )}
    </div>
  );

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
       
       <div style={{ position: "fixed", top: "-10%", left: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)", zIndex: 0, animation: "pulseSoft 10s infinite alternate", pointerEvents: 'none' }} />
       <div style={{ position: "fixed", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(255,255,255,0) 70%)", zIndex: 0, animation: "pulseSoft 15s infinite alternate-reverse", pointerEvents: 'none' }} />

      <header className="glass-panel" style={{ margin: '20px 40px', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={24} /></div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, letterSpacing: '-0.5px' }}>WorkSolve</h1>
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600, color: S.muted, background: 'rgba(255,255,255,0.5)', padding: '8px 16px', borderRadius: '20px' }}>
          BPO Automation Platform
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', position: 'relative', zIndex: 10, animation: 'slideUp 0.6s ease' }}>
        {view === 'dashboard' && renderDashboard()}
        {view === 'loan' && renderUploadTool('① 사내 대출 운영 자동화', '복잡한 대출 규정을 담은 엑셀을 업로드하면 AI가 한도를 계산하고 상환 스케줄을 자동 생성합니다.', '대출 문서 생성')}
        {view === 'hr' && renderUploadTool('② 맞춤형 HR/연차 알림', '근로자 정보 엑셀을 업로드하면 AI가 잔여 연차를 계산해 카카오톡/SMS 발송 프로세스를 진행합니다.', '알림톡 발송 예약')}
        {view === 'excel' && renderUploadTool('③ AI 엑셀 매크로 & 데이터 정제', '양식이 다른 문서를 업로드하면, Gemini AI가 분석하여 표준 데이터베이스 양식으로 변환합니다.', 'AI 데이터 파싱')}
        {view === 'payroll' && renderUploadTool('④ 월급여 및 연말정산 자동화', '근무 기록 및 4대 보험 내역을 기반으로 자동화된 월말 정산 데이터를 추출합니다.', '급여 정산 실행')}
      </main>
    </div>
  );
}
