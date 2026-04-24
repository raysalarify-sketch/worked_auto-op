import React, { useState } from 'react';
import { Bot, CalendarDays, Settings, FileSpreadsheet, Briefcase, AlertCircle, CheckCircle2, UploadCloud, Users, Clock, Zap, ChevronRight, LayoutDashboard, Loader2, PlayCircle, Send, Mail, PenTool, ClipboardList, TerminalSquare, FileText, ArrowRight, Save } from 'lucide-react';
import * as XLSX from 'xlsx';

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
  const [activeTab, setActiveTab] = useState('ai'); 
  
  const [file, setFile] = useState(null);
  const [pasteData, setPasteData] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [sendType, setSendType] = useState(null); 

  // AI 엑셀 파서용 상태
  const [excelHeaders, setExcelHeaders] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [aiPrompt, setAiPrompt] = useState('');
  
  // 매크로 실행 결과 상태
  const [macroDone, setMacroDone] = useState(false);
  const [modifiedHeaders, setModifiedHeaders] = useState([]);
  const [modifiedData, setModifiedData] = useState([]);
  
  // 문서 병합(Mail Merge) 상태
  const [selectedTemplate, setSelectedTemplate] = useState('연봉계약서');
  const [showDocPreview, setShowDocPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

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

  // 엑셀 파일 업로드
  const handleExcelUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setMacroDone(false);
    setShowDocPreview(false);

    try {
      const buffer = await uploadedFile.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (json.length > 0) {
        setExcelHeaders(json[0]); 
        setExcelData(json.slice(1, 10)); 
      }
    } catch (err) {
      setExcelHeaders(['사번', '이름', '부서', '근속연수', '기본급', '성과급']);
      setExcelData([
        ['A001', '김철수', '영업팀', 5, '3,000,000', '500,000'],
        ['A002', '이영희', '개발팀', 3, '3,500,000', '0'],
        ['A003', '박지훈', '마케팅팀', 1, '2,800,000', '200,000']
      ]);
    }
  };

  // 매크로 실행
  const executeMacro = () => {
    if(!aiPrompt) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      
      // 모의 데이터 변환 (가짜 연산)
      const newHeaders = [...excelHeaders, '총지급액(자동계산)'];
      const newData = excelData.map(row => {
        let newRow = [...row];
        newRow.push('자동 계산됨'); // G열
        return newRow;
      });
      
      setModifiedHeaders(newHeaders);
      setModifiedData(newData);
      setMacroDone(true);
    }, 2000);
  };

  // 템플릿에 데이터 병합
  const generateDocumentContent = (row) => {
    if(!row) return '';
    if(selectedTemplate === '연봉계약서') {
      return `[2026년도 연봉계약서]\n\n성명: ${row[1]}\n소속: ${row[2]}\n사번: ${row[0]}\n\n주식회사 워크솔브(이하 "회사")와 ${row[1]}(이하 "직원")은 아래와 같이 연봉계약을 체결한다.\n\n제 1조 (임금의 구성)\n기본급: 월 ${row[4]}원\n성과급: 월 ${row[5]}원\n\n위 계약을 증명하기 위해 본 문서를 작성하고 양측이 전자서명을 진행한다.`;
    } else if(selectedTemplate === '인사발령장') {
      return `[인사 발령 통지서]\n\n수신: ${row[1]}\n소속: ${row[2]}\n\n귀하의 노고에 깊이 감사드립니다.\n회사의 인사 규정에 의거하여 귀하의 발령 사항을 아래와 같이 통지합니다.\n\n근속연수: ${row[3]}년 반영\n발령일자: 2026년 5월 1일\n\n주식회사 워크솔브 대표이사`;
    }
    return '기본 템플릿입니다. 변수가 들어갑니다.';
  };

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
        .textarea-input { width: 100%; padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; font-family: inherit; font-size: 14px; resize: vertical; outline: none; transition: border-color 0.2s; }
        .textarea-input:focus { border-color: #2563eb; }
        
        /* 엑셀 테이블 스타일 */
        .excel-table { width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 13px; background: #fff; }
        .excel-table th, .excel-table td { border: 1px solid #cbd5e1; padding: 8px 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }
        .excel-table th { background: #f1f5f9; color: #475569; font-weight: 600; text-align: center; border-bottom: 2px solid #cbd5e1; }
        .excel-table .row-num { background: #f1f5f9; color: #64748b; font-weight: 600; text-align: center; width: 40px; border-right: 2px solid #cbd5e1; }
        .excel-table .header-row td { background: #f8fafc; font-weight: 700; color: #0f172a; }
        
        /* 수정 가능한 셀 UI */
        .editable-cell { cursor: text; outline: none; transition: background 0.2s; }
        .editable-cell:focus { background: #eff6ff; box-shadow: inset 0 0 0 2px #2563eb; color: #0f172a; }
        .editable-cell:hover { background: #f8fafc; }
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
            { id: 'ai', icon: <UploadCloud size={18}/>, label: 'AI 엑셀 파서 & 문서생성' },
            { id: 'send', icon: <Send size={18}/>, label: '수동문서 일괄발송' }, 
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
          
          {/* AI 엑셀 파서 & 매크로 & 문서생성 탭 */}
          {activeTab === 'ai' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>AI 엑셀 파서 & 자동 문서 생성</h2>
              <p style={{ color: S.muted, marginBottom: 24 }}>엑셀 데이터를 조건에 맞게 수정한 후, 각 대상자별 맞춤형 문서(계약서, 안내장 등)에 자동 병합합니다.</p>
              
              {!file ? (
                <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                  <div style={{ border: `2px dashed ${S.accent}`, background: '#eff6ff', padding: '64px 32px', borderRadius: 24, transition: 'all 0.3s' }}>
                    <UploadCloud size={64} color={S.accent} style={{ margin: '0 auto 24px' }} />
                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>기준이 될 엑셀 데이터를 업로드하세요</h3>
                    <p style={{ color: S.muted, marginBottom: 24 }}>이름, 부서, 급여 등 문서의 변수가 될 정보가 담긴 엑셀.</p>
                    <label style={{ background: S.ink, color: '#fff', padding: '14px 28px', borderRadius: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-block' }}>
                      엑셀 파일 찾아보기
                      <input type="file" accept=".xlsx, .xls, .csv" style={{ display: 'none' }} onChange={handleExcelUpload} />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="fade-in">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <FileSpreadsheet size={24} color={macroDone ? S.success : S.accent} /> 
                      <b style={{ fontSize: 18 }}>{file.name} {macroDone ? '(매크로 처리 완료 - 클릭하여 내용 수정 가능)' : '(원본 미리보기)'}</b>
                    </div>
                    <button onClick={() => { setFile(null); setMacroDone(false); setAiPrompt(''); setShowDocPreview(false); }} style={{ background: 'none', border: 'none', color: S.danger, cursor: 'pointer', fontWeight: 600 }}>초기화 및 파일 교체</button>
                  </div>

                  {/* 엑셀 그리드 (매크로 전/후) */}
                  <div className="card" style={{ overflowX: 'auto', marginBottom: 24, borderRadius: 12, border: macroDone ? `2px solid ${S.success}` : S.border }}>
                    <table className="excel-table">
                      <thead>
                        <tr>
                          <th className="row-num"></th>
                          {(macroDone ? modifiedHeaders : excelHeaders).map((_, i) => (
                            <th key={i}>{String.fromCharCode(65 + i)}</th> 
                          ))}
                        </tr>
                        <tr className="header-row">
                          <td className="row-num">1</td>
                          {(macroDone ? modifiedHeaders : excelHeaders).map((header, i) => (
                            <td key={i}>{header}</td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {(macroDone ? modifiedData : excelData).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            <td className="row-num">{rowIndex + 2}</td>
                            {(macroDone ? modifiedHeaders : excelHeaders).map((_, colIndex) => (
                              <td key={colIndex} className={macroDone ? "editable-cell" : ""} contentEditable={macroDone} suppressContentEditableWarning={true}>
                                {row[colIndex] !== undefined ? row[colIndex] : ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {macroDone && (
                      <div style={{ padding: '8px', background: '#f0fdf4', color: '#166534', textAlign: 'center', fontSize: 13, fontWeight: 600 }}>
                        💡 칸을 클릭하면 AI가 만들어준 결과물을 사용자가 직접 수정할 수 있습니다.
                      </div>
                    )}
                  </div>

                  {!macroDone ? (
                    /* 1단계: 매크로 실행 */
                    <div className="card" style={{ padding: 32, border: `2px solid ${S.accent}`, background: '#eff6ff' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <TerminalSquare size={24} color={S.accent} />
                        <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: S.ink }}>1단계: 엑셀 데이터 매크로 가공</h3>
                      </div>
                      <p style={{ color: S.muted, marginBottom: 16, fontSize: 14 }}>필요한 연산이나 텍스트 조합이 있다면 자연어로 지시하세요.</p>
                      <textarea 
                        className="textarea-input" 
                        placeholder="예시: E열(기본급)과 F열(성과급)을 더한 값을 G열(총지급액)에 계산해서 넣어주고, C열(부서)이 '영업팀'인 사람만 따로 추출해줘."
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        style={{ minHeight: '80px', marginBottom: 20, background: '#fff' }}
                      />
                      <button onClick={executeMacro} disabled={processing || !aiPrompt.trim()} style={{ width: '100%', background: aiPrompt.trim() ? S.accent : '#94a3b8', color: '#fff', border: 'none', padding: '16px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: (processing || !aiPrompt.trim()) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        {processing ? <><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> 매크로 처리 중...</> : <><Zap size={20} /> 데이터 가공하기 (매크로 적용)</>}
                      </button>
                    </div>
                  ) : (
                    /* 2단계: 문서 템플릿 생성 */
                    <div className="fade-in card" style={{ padding: 32, border: `2px solid ${S.success}` }}>
                      {!showDocPreview ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <FileText size={24} color={S.success} />
                            <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>2단계: 자동화 문서 생성</h3>
                          </div>
                          <p style={{ color: S.muted, marginBottom: 24, fontSize: 14 }}>가공된 데이터를 넣을 사내 문서 템플릿을 선택하세요.</p>
                          
                          <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: 12, border: S.border, fontSize: 16, marginBottom: 24, outline: 'none' }}>
                            <option value="연봉계약서">2026년도 연봉계약서 템플릿</option>
                            <option value="인사발령장">부서/승진 인사 발령 통지서</option>
                            <option value="보안동의서">정보보호 서약서 (신규 입사자)</option>
                          </select>

                          <button onClick={() => setShowDocPreview(true)} style={{ width: '100%', background: S.success, color: '#fff', border: 'none', padding: '16px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                            문서에 데이터 자동 삽입하기 <ArrowRight size={20} />
                          </button>
                        </>
                      ) : (
                        /* 최종 문서 미리보기 화면 */
                        <div className="fade-in">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>문서 자동 생성 미리보기</h3>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <button onClick={() => setPreviewIndex(Math.max(0, previewIndex - 1))} disabled={previewIndex === 0} style={{ padding: '6px 12px', borderRadius: 6, border: S.border, cursor: 'pointer', background: '#fff' }}>이전</button>
                              <span style={{ fontSize: 14, fontWeight: 600 }}>{previewIndex + 1} / {modifiedData.length}명</span>
                              <button onClick={() => setPreviewIndex(Math.min(modifiedData.length - 1, previewIndex + 1))} disabled={previewIndex === modifiedData.length - 1} style={{ padding: '6px 12px', borderRadius: 6, border: S.border, cursor: 'pointer', background: '#fff' }}>다음</button>
                            </div>
                          </div>

                          {/* 문서 종이 UI */}
                          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '40px', borderRadius: 8, minHeight: '400px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', marginBottom: 24 }}>
                            <div style={{ whiteSpace: 'pre-line', fontSize: 15, lineHeight: 1.8, color: '#1e293b' }}>
                              {generateDocumentContent(modifiedData[previewIndex])}
                            </div>
                            <div style={{ marginTop: 60, textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                              전자서명 (미서명) ✍️
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: 16 }}>
                            <button onClick={() => setShowDocPreview(false)} style={{ flex: 1, background: '#f1f5f9', color: S.ink, border: 'none', padding: '16px', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>템플릿 변경</button>
                            <button style={{ flex: 2, background: S.ink, color: '#fff', border: 'none', padding: '16px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                              <Send size={20} /> 총 {modifiedData.length}명에게 전자서명 일괄 발송
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 대시보드 탭 */}
          {activeTab === 'dashboard' && (
            <div className="fade-in">
              <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>{userType === 'corp' ? '법인' : userType === 'proprietor' ? '개인사업자' : '개인'} 맞춤형 대시보드</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
                {[
                  { title: '이번달 발송 건수', value: currentCalendar[new Date().getMonth()].events.length * 10 + '건', icon: <AlertCircle color={S.danger}/> },
                  { title: '절감된 업무 시간', value: '42시간', icon: <Clock color={S.success}/> },
                  { title: '자동화 생성 문서', value: '1,204건', icon: <Zap color={S.warning}/> },
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

        </div>
      </div>
    </div>
  );
}
