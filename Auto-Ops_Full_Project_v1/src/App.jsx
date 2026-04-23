import React, { useState } from 'react';
import { UploadCloud, BellRing, Users, ArrowLeft, FileSpreadsheet } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [file, setFile] = useState(null);

  return (
    <div style={{ fontFamily: 'Pretendard, sans-serif', color: '#292524', minHeight: '100vh' }}>
      <header style={{ padding: '20px 30px', borderBottom: '1px solid #e7e5e4', background: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', background: '#292524', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>A</div>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Auto-Ops</h1>
      </header>
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        {view === 'dashboard' ? (
          <div>
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>업무 자동화 대시보드</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#fff', border: '1px solid #e7e5e4', padding: '24px', borderRadius: '16px', cursor: 'pointer' }} onClick={() => setView('upload')}>
                <UploadCloud size={24} color="#2563eb" />
                <h3>인력 데이터 취합</h3>
                <p>AI가 엑셀 데이터를 표준화합니다.</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => setView('dashboard')}>뒤로가기</button>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <FileSpreadsheet size={48} />
              <h2>파일을 업로드하세요</h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}