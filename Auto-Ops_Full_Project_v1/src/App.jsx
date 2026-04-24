import React, { useState } from 'react';
import { Bot, CalendarDays, Settings, FileSpreadsheet, Briefcase, AlertCircle, CheckCircle2, UploadCloud, Users, Clock, Zap, ChevronRight, LayoutDashboard, Loader2, PlayCircle, Send, Mail, PenTool } from 'lucide-react';

const S = {
  font: "'Inter', 'Pretendard', sans-serif",
  bg: "#f8fafc",
  card: "rgba(255, 255, 255, 0.8)",
  border: "1px solid rgba(226, 232, 240, 0.8)",
  ink: "#0f172a",
  accent: "#2563eb",
  danger: "#ef4444",
  warning: "#f59e0b",
  success: "#10b981",
  muted: "#64748b"
};

export default function App() {
  const [userType, setUserType] = useState('corp'); 
  const [activeTab, setActiveTab] = useState('send'); // 접속 시 일괄 발송 탭부터 보이도록 설정
  
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  // 일괄 발송용 상태
  const [sendType, setSendType] = useState(null); // 'message' | 'signature'

  const calendarData = {
    corp: [
      { month: 1, events: ['연말정산 시작', '2기 확정 부가세 신고'], danger: true },
      { month: 2, events: ['연말정산 지급명세서 제출'] },
      { month: 3, events: ['법인세 신고/납부', '4대보험 보수총액 신고'], danger: true },
      { month: 4, events: ['1기 예정 부가세 신고'] },
      { month: 5, events: ['종합소득세 신고 (해당자)'], danger: false },
      { month: 6, events: ['성실신고확인서 제출'] },
      { month: 7, events: ['1기 확정 부가세 신고', '재산세(건축물)'], danger: true },
      { month: 8, events: ['법인세 중간예납', '주민세 납부'] },
      { month: 9, events: ['재산세(토지)'] },
      { month: 10, events: ['2기 예정 부가세 신고'] },
      { month: 11, events: ['종합소득세 중간예납'] },
      { month: 12, events: ['결산 준비 및 법정 의무교육 마감'] }
    ],
    proprietor: [
      { month: 1, events: ['2기 확정 부가세 신고', '면세사업자 현황신고'], danger: true },
      { month: 2, events: ['사업장현황신고 (면세)'] },
      { month: 3, events: ['지급명세서 제출'] },
      { month: 4, events: ['1기 예정 부가세 고지/납부'] },
      { month: 5, events: ['종합소득세 신고/납부'], danger: true },
      { month: 6, events: ['성실신고확인서 제출'] },
      { month: 7, events: ['1기 확정 부가세 신고'], danger: true },
      { month: 8, events: ['주민세 납부'] },
      { month: 9, events: ['-'] },
      { month: 10, events: ['2기 예정 부가세 고지/납부'] },
      { month: 11, events: ['종합소득세 중간예납'] },
      { month: 12, events: ['연말 정산 및 증빙 자료 점검'] }
    ],
    personal: [
      { month: 1, events: ['연말정산 간소화 서비스 오픈'], danger: true },
      { month: 2, events: ['연말정산 서류 제출'] },
      { month: 3, events: ['-'] },
      { month: 4, events: ['-'] },
      { month: 5, events: ['종합소득세 신고 (투잡/프리랜서)'], danger: true },
      { month: 6, events: ['-'] },
      { month: 7, events: ['재산세 (건축물/주택1기)'] },
      { month: 8, events: ['주민세 납부'] },
      { month: 9, events: ['재산세 (토지/주택2기)'] },
      { month: 10, events: ['-'] },
      { month: 11, events: ['-'] },
      { month: 12, events: ['자동차세 납부'] }
    ]
  };

  const currentCalendar = calendarData[userType];

  const handleFileProcess = () => {
    if (!file) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setResult("AI 데이터 정제 및 처리가 완료되었습니다.");
    }, 2000);
  };

  const handleSendProcess = (type) => {
    setSendType(type);
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      if(type === 'message') setResult("총 45명에게 맞춤형 알림톡 및 메일 발송이 완료되었습니다.");
      if(type === 'signature') setResult("문서(매크로) 자동 작성 및 45명 대상 전자서명 요청이 완료되었습니다.");
    }, 2500);
  };

  const AutoCard = ({ title, desc, active }) => (
    <div className="card" style={{ padding: 24, borderLeft: active ? `4px solid ${S.accent}` : '' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</h3>
        <div style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: active ? '#eff6ff' : '#f1f5f9', color: active ? S.accent : S.muted }}>
          {active ? 'ON' : 'OFF'}
        </div>
      </div>
      <p style={{ color: S.muted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>{desc}</p>
    </div>
  );

  return (
    <div className="layout" style={{ fontFamily: S.font }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        body { margin: 0; background: #f8fafc; color: #0f172a; }
        .layout { display: flex; height: 100vh; overflow: hidden; }
        .sidebar { width: 260px; background: #fff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; z-index: 10; }
        .main-content { flex: 1; padding: 40px; overflow-y: auto; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); position: relative; }
        .card { background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); transition: all 0.2s; }
        .card:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .nav-item { padding: 12px 20px; margin: 4px 16px; border-radius: 10px; cursor: pointer; display: flex; gap: 12px; align-items: center; font-weight: 600; color: #64748b; transition: all 0.2s; }
        .nav-item:hover { background: #f1f5f9; color: #0f172a; }
        .nav-item.active { background: #eff6ff; color: #2563eb; }
        .segment-container { display: flex; background: #f1f5f9; margin: 20px 16px; border-radius: 12px; padding: 4px; }
        .segment-btn { flex: 1; padding: 8px 0; text-align: center; font-size: 13px; font-weight: 700; cursor: pointer; border-radius: 8px; color: #64748b; transition: all 0.2s; }
        .segment-btn.active { background: #fff; color: #2563eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .table th, .table td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .table th { color: #64748b; font-weight: 600; background: #f8fafc; }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={20} /></div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px' }}>Auto-Ops</h1>
        </div>

        <div className="segment-container">
          <div className={`segment-btn ${userType === 'personal' ? 'active' : ''}`} onClick={() => setUserType('personal')}>개인용</div>
          <div className={`segment-btn ${userType === 'proprietor' ? 'active' : ''}`} onClick={() => setUserType('proprietor')}>사업자</div>
          <div className={`segment-btn ${userType === 'corp' ? 'active' : ''}`} onClick={() => setUserType('corp')}>법인</div>
        </div>

        <div style={{ flex: 1, marginTop: 10 }}>
          {[
            { id: 'dashboard', icon: <LayoutDashboard size={18}/>, label: '통합 대시보드' },
            { id: 'calendar', icon: <CalendarDays size={18}/>, label: '연간 세무 캘린더' },
            { id: 'automation', icon: <Settings size={18}/>, label: '업무 자동화 설정' },
            { id: 'ai', icon: <UploadCloud size={18}/>, label: 'AI 엑셀 파서' },
            { id: 'send', icon: <Send size={18}/>, label: '일괄 발송 및 전자서명' }, // 신규 기능 추가됨
            { id: 'bpo', icon: <Briefcase size={18}/>, label: '전문가 대행 (BPO)' },
          ].map(nav => (
            <div key={nav.id} className={`nav-item ${activeTab === nav.id ? 'active' : ''}`} onClick={() => setActiveTab(nav.id)}>
              {nav.icon} {nav.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(255,255,255,0) 70%)", zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1000, margin: '0 auto' }}>
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>{userType === 'corp' ? '법인' : userType === 'proprietor' ? '개인사업자' : '개인'} 맞춤형 대시보드</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
                {[
                  { title: '이번달 신고/이벤트', value: currentCalendar[new Date().getMonth()].events.length + '건', icon: <AlertCircle color={S.danger}/> },
                  { title: '절감된 업무 시간', value: '42시간', icon: <Clock color={S.success}/> },
                  { title: '실행된 자동화', value: '1,204건', icon: <Zap color={S.warning}/> },
                  { title: '관리 대상', value: userType === 'corp' ? '직원 45명' : (userType === 'proprietor' ? '거래처 12곳' : '수입원 3개'), icon: <Users color={S.accent}/> }
                ].map((stat, i) => (
                  <div key={i} className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ padding: 12, background: `#f1f5f9`, borderRadius: 12 }}>{stat.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, color: S.muted, marginBottom: 4 }}>{stat.title}</div>
                      <div style={{ fontSize: 22, fontWeight: 800 }}>{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><CalendarDays size={20} color={S.accent}/> 다가오는 주요 세무 일정</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {currentCalendar.filter(m => m.danger).slice(0, 3).map((m, i) => (
                  <div key={i} className="card" style={{ padding: 24, borderTop: `4px solid ${S.danger}` }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: S.danger, marginBottom: 12 }}>{m.month}월 가산세 주의!</div>
                    <ul style={{ paddingLeft: 20, margin: 0, color: S.ink, lineHeight: 1.6 }}>
                      {m.events.map((ev, j) => <li key={j}>{ev}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 일괄 발송 및 전자서명 (새롭게 추가된 탭) */}
          {activeTab === 'send' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>일괄 발송 및 문서/전자서명 자동화</h2>
              <p style={{ color: S.muted, marginBottom: 32 }}>엑셀을 업로드하면 매크로가 문서를 자동 생성하고, 대상자들에게 알림톡 발송 및 전자서명 요청을 일괄 처리합니다.</p>
              
              {!result ? (
                <div className="card" style={{ padding: 32 }}>
                  {!file ? (
                    <div style={{ border: `2px dashed ${S.accent}`, background: '#eff6ff', padding: '64px 32px', borderRadius: 24, textAlign: 'center' }}>
                      <FileSpreadsheet size={64} color={S.accent} style={{ margin: '0 auto 24px' }} />
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>발송 대상자 엑셀 업로드</h3>
                      <p style={{ color: S.muted, marginBottom: 24 }}>이름, 연락처, 이메일, 근로조건 등이 포함된 명부를 업로드해주세요.</p>
                      <label style={{ background: S.ink, color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-block' }}>
                        엑셀 파일 선택
                        <input type="file" accept=".xlsx, .xls, .csv" style={{ display: 'none' }} onChange={(e) => { if(e.target.files[0]) setFile(e.target.files[0]); }} />
                      </label>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: S.border }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><FileSpreadsheet size={24} color={S.success} /> <b style={{ fontSize: 18 }}>{file.name} (총 45명 인식됨)</b></div>
                        <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: S.danger, cursor: 'pointer', fontWeight: 600 }}>파일 다시 선택</button>
                      </div>

                      <div style={{ marginBottom: 32 }}>
                        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>자동화 액션 선택</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                          
                          {/* 1. 문자/메일 발송 */}
                          <div className="card" style={{ padding: 24, border: `2px solid ${sendType === 'message' ? S.accent : 'transparent'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(37,99,235,0.1)', color: S.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={20} /></div>
                              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>알림톡/메일 일괄 발송</h3>
                            </div>
                            <p style={{ color: S.muted, fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>연차 촉진 안내, 복지 공지 등 맞춤형 텍스트를 대상자별로 일괄 발송합니다.</p>
                            <button onClick={() => handleSendProcess('message')} disabled={processing} style={{ width: '100%', background: S.bg, color: S.ink, border: S.border, padding: '12px', borderRadius: 8, fontWeight: 600, cursor: processing ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                              {processing && sendType === 'message' ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> 발송 중...</> : <><Send size={18} /> 일괄 발송하기</>}
                            </button>
                          </div>

                          {/* 2. 전자서명 발송 */}
                          <div className="card" style={{ padding: 24, border: `2px solid ${sendType === 'signature' ? S.success : 'transparent'}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(16,185,129,0.1)', color: S.success, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PenTool size={20} /></div>
                              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>문서 자동생성 및 전자서명</h3>
                            </div>
                            <p style={{ color: S.muted, fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>데이터를 기반으로 사내 대출/계약 문서를 자동 작성하고 전자서명을 요청합니다.</p>
                            <button onClick={() => handleSendProcess('signature')} disabled={processing} style={{ width: '100%', background: S.success, color: '#fff', border: 'none', padding: '12px', borderRadius: 8, fontWeight: 600, cursor: processing ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                              {processing && sendType === 'signature' ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> 생성 및 발송 중...</> : <><PenTool size={18} /> 문서 생성 및 전자서명 요청</>}
                            </button>
                          </div>

                        </div>
                      </div>

                      {/* 미리보기 테이블 */}
                      <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>발송 대상자 미리보기 (상위 3명)</h4>
                      <table className="table">
                        <thead><tr><th>이름</th><th>연락처</th><th>이메일</th><th>처리 상태</th></tr></thead>
                        <tbody>
                          <tr><td>김철수</td><td>010-1234-5678</td><td>chulsoo@example.com</td><td><span style={{ color: S.muted }}>대기 중</span></td></tr>
                          <tr><td>이영희</td><td>010-9876-5432</td><td>younghee@example.com</td><td><span style={{ color: S.muted }}>대기 중</span></td></tr>
                          <tr><td>박지훈</td><td>010-5555-4444</td><td>jihoon@example.com</td><td><span style={{ color: S.muted }}>대기 중</span></td></tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card fade-in" style={{ padding: '64px 32px', textAlign: 'center' }}>
                  <CheckCircle2 size={80} color={S.success} style={{ margin: '0 auto 24px' }} />
                  <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{result}</h2>
                  <p style={{ color: S.muted, marginBottom: 32 }}>관리자 대시보드에서 각 인원의 확인/서명 여부를 실시간으로 추적할 수 있습니다.</p>
                  <button onClick={() => { setResult(null); setFile(null); setSendType(null); }} style={{ background: S.ink, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>새로운 작업 시작하기</button>
                </div>
              )}
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px 0' }}>연간 세무·신고 캘린더</h2>
                  <p style={{ color: S.muted, margin: 0 }}>빨간색으로 표시된 월은 가산세 위험이 있는 필수 신고의 달입니다.</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {currentCalendar.map((m, i) => (
                  <div key={i} className="card" style={{ padding: 24, border: m.danger ? `2px solid rgba(239, 68, 68, 0.4)` : S.border, background: m.month === new Date().getMonth() + 1 ? '#eff6ff' : '#fff' }}>
                    <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: m.danger ? S.danger : S.ink }}>{m.month}월</div>
                    <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, color: S.muted, minHeight: 80, lineHeight: 1.6 }}>
                      {m.events.map((ev, j) => <li key={j} style={{ color: m.danger ? S.ink : S.muted, fontWeight: m.danger ? 600 : 400 }}>{ev}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Automation Tab */}
          {activeTab === 'automation' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>한 번 등록, 평생 자동화</h2>
              <p style={{ color: S.muted, marginBottom: 32, fontSize: 16 }}>운영이 귀찮았던 사소한 업무들, 시스템에 조건 한 번만 등록해두면 알아서 처리합니다.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {userType === 'corp' && (
                  <>
                    <AutoCard title="사내 대출 자동 운영" desc="대출 규정과 한도 계산 로직을 등록하면, 직원 신청 시 AI가 승인 여부와 상환 스케줄을 자동 문서화하여 안내합니다." active={true} />
                    <AutoCard title="연차 및 의무교육 알림톡" desc="근로자 명부를 기반으로 잔여 연차와 미수료 교육을 파악해 카카오톡 알림톡으로 자동 발송합니다." active={true} />
                    <AutoCard title="월 급여 명세서 자동 분배" desc="급여 엑셀에서 개별 데이터를 추출하여 각 직원의 카톡으로 암호화된 명세서를 자동 전송합니다." active={false} />
                    <AutoCard title="신규 입사 자동 온보딩" desc="입사 시 필요한 서류 요청(등본, 통장사본 등), 사내 규정 안내 등을 트리거하여 메일을 발송합니다." active={false} />
                  </>
                )}
                {userType === 'proprietor' && (
                  <>
                    <AutoCard title="부가가치세 자료 취합" desc="세금계산서, 현금영수증, 카드 매출 내역을 매월 지정된 날짜에 자동 크롤링 및 엑셀로 정리합니다." active={true} />
                    <AutoCard title="프리랜서 원천징수 안내" desc="지급 내역을 바탕으로 3.3% 공제액을 자동 계산하고 영수증을 프리랜서에게 발송합니다." active={true} />
                    <AutoCard title="매입/매출 장부 AI 기장" desc="영수증 사진만 올리면 AI가 지출 결의서 형태로 변환하여 장부에 자동 기록합니다." active={false} />
                  </>
                )}
                {userType === 'personal' && (
                  <>
                    <AutoCard title="카드 지출 내역 AI 분류" desc="카드사 사용 내역을 올리면 AI가 식비, 교통비, 고정비 등 카테고리별로 자동 분류합니다." active={true} />
                    <AutoCard title="종합소득세 환급 조회 알림" desc="5월 종소세 기간에 맞춰 누락된 공제 항목(통신비, 월세 등)이 없는지 점검하고 알림을 줍니다." active={false} />
                  </>
                )}
              </div>
            </div>
          )}

          {/* AI Parser Tab */}
          {activeTab === 'ai' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI 엑셀 파서 & 데이터 수직화</h2>
              <p style={{ color: S.muted, marginBottom: 32 }}>양식이 제각각인 문서나 복잡한 데이터를 업로드하면 AI가 분석하여 표준 데이터로 정제합니다.</p>
              
              <div className="card" style={{ padding: 48, textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
                {!result ? (
                  <>
                    <div style={{ border: `2px dashed ${file ? S.success : S.accent}`, background: file ? '#f0fdf4' : '#eff6ff', padding: '64px 32px', borderRadius: 24, transition: 'all 0.3s' }}>
                      <UploadCloud size={64} color={file ? S.success : S.accent} style={{ margin: '0 auto 24px' }} />
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>작업할 문서를 선택하세요</h3>
                      <p style={{ color: S.muted, marginBottom: 24 }}>연차 내역, 급여 대장, 카드 사용 내역 등 아무 엑셀이나 상관없습니다.</p>
                      <label style={{ background: S.ink, color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-block' }}>
                        파일 찾아보기
                        <input type="file" accept=".xlsx, .xls, .csv" style={{ display: 'none' }} onChange={(e) => { if(e.target.files[0]) setFile(e.target.files[0]); }} />
                      </label>
                    </div>
                    {file && (
                      <div style={{ marginTop: 24, padding: 20, background: '#f8fafc', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: S.border }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><FileSpreadsheet size={24} color={S.success} /> <b>{file.name}</b></div>
                        <button onClick={handleFileProcess} disabled={processing} style={{ background: S.accent, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 8, fontWeight: 600, cursor: processing ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                          {processing ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> 분석 중...</> : <><PlayCircle size={18} /> AI 파싱 시작</>}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ padding: '40px 0' }}>
                    <CheckCircle2 size={80} color={S.success} style={{ margin: '0 auto 24px' }} />
                    <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>{result}</h2>
                    <button onClick={() => { setResult(null); setFile(null); }} style={{ background: S.ink, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>새로운 파일 작업하기</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BPO Tab */}
          {activeTab === 'bpo' && (
            <div className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px 0' }}>전문가 대행 (BPO) 의뢰</h2>
                  <p style={{ color: S.muted, margin: 0 }}>자동화가 어려운 예외 사항이 많거나 시간이 부족할 때 전문가에게 전적으로 맡기세요.</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {[
                  { title: '월급여 처리 및 세금 신고', price: '월 15만원~', desc: '급여 대장 작성, 4대보험 취득/상실, 원천세 신고까지 모두 알아서 처리합니다.' },
                  { title: '지출 증빙 및 영수증 기장', price: '월 10만원~', 대행: '흩어진 법인카드 내역과 종이 영수증을 모아 재무제표 수준으로 기장합니다.' },
                  { title: '사내 대출 및 복지 기금 관리', price: '별도 문의', desc: '임직원 대출 신청서 검토부터 이자 계산, 원천징수까지 완벽하게 대행합니다.' }
                ].map((bpo, i) => (
                  <div key={i} className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{bpo.title}</h3>
                    <div style={{ color: S.accent, fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{bpo.price}</div>
                    <p style={{ color: S.muted, lineHeight: 1.6, flex: 1 }}>{bpo.desc || bpo.대행}</p>
                    <button style={{ width: '100%', background: S.bg, border: S.border, padding: '12px', borderRadius: 8, fontWeight: 600, color: S.ink, marginTop: 24, cursor: 'pointer' }}>상담 신청하기</button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
