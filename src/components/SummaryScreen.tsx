import { useState } from 'react';
import { ConsultationHistoryList, ConsultationHistory } from './ConsultationHistoryList';
import { FeedbackCard, FeedbackItem } from './FeedbackCard';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Save, X, MessageSquarePlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './ui/sonner';

interface SavedNote {
  id: string;
  text: string;
  timestamp: Date;
}

interface SummaryScreenProps {
  feedbacks: FeedbackItem[];
  customerName: string;
  onNewConsultation: () => void;
}

// Mock data for past consultations
const mockHistories: ConsultationHistory[] = [
  {
    id: '1',
    customerName: '엄기태',
    phoneNumber: '010-****-3113',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    violationCount: 2,
    feedbacks: [
      {
        id: 'fb-1',
        messageId: 'msg-1',
        type: 'high',
        category: '단정적 표현',
        description: '수익률에 대한 확정적 표현이 감지되었습니다.',
        regulation: '금융소비자보호법 제17조 (부당권유행위 금지)',
        suggestion: '"이 상품은 최근 3개월 평균 수익률이 5%였으며, 향후 수익률은 시장 상황에 따라 변동될 수 있습니다."',
        timestamp: new Date(Date.now() - 1000 * 60 * 50),
        originalText: '이 상품은 매월 5% 수익이 보장됩니다.',
      },
      {
        id: 'fb-2',
        messageId: 'msg-2',
        type: 'medium',
        category: '위험 고지',
        description: '원금 손실 가능성에 대한 설명이 미흡합니다.',
        regulation: '금융투자업규정 제4-73조',
        suggestion: '"투자 원금의 손실이 발생할 수 있으며, 그 손실은 투자자에게 귀속됩니다."',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        originalText: '걱정 마세요, 큰 손실은 없을 거예요.',
      },
    ],
    savedNotes: [
      {
        id: 'note-1',
        text: '고객이 적극적인 투자 성향을 보였으나, 위험 상품에 대한 이해도가 낮아 추가 교육 필요',
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
      },
    ],
  },
  {
    id: '2',
    customerName: '김민지',
    phoneNumber: '010-****-5542',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    violationCount: 1,
    feedbacks: [
      {
        id: 'fb-3',
        messageId: 'msg-3',
        type: 'medium',
        category: '부당 권유',
        description: '고객의 투자 성향과 맞지 않는 상품을 권유했습니다.',
        regulation: '금융소비자보호법 제17조',
        suggestion: '"고객님의 안정적인 투자 성향을 고려할 때, 변동성이 낮은 채권형 상품을 추천드립니다."',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 - 1000 * 60 * 30),
      },
    ],
    savedNotes: [],
  },
  {
    id: '3',
    customerName: '박서준',
    phoneNumber: '010-****-7821',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    violationCount: 0,
    feedbacks: [],
    savedNotes: [
      {
        id: 'note-2',
        text: '모범적인 상담 사례. 고객 만족도 높음.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 - 1000 * 60 * 50),
      },
    ],
  },
  {
    id: '4',
    customerName: '이수현',
    phoneNumber: '010-****-2156',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    violationCount: 3,
    feedbacks: [
      {
        id: 'fb-4',
        messageId: 'msg-4',
        type: 'high',
        category: '허위·과장 정보',
        description: '상품의 수익률을 과장하여 안내했습니다.',
        regulation: '금융소비자보호법 제17조 제1항 제1호',
        suggestion: '"실제 과거 수익률 데이터를 기반으로 정확하게 안내하세요."',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      },
      {
        id: 'fb-5',
        messageId: 'msg-5',
        type: 'high',
        category: '시간적 압박',
        description: '고객의 의사결정에 부당한 압박을 가했습니다.',
        regulation: '금융소비자보호법 제17조 제3항',
        suggestion: '"충분한 시간을 드릴 테니 신중히 검토해 보시고 결정해 주세요."',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
      },
      {
        id: 'fb-6',
        messageId: 'msg-6',
        type: 'medium',
        category: '불완전 판매',
        description: '상품의 주요 내용을 충분히 설명하지 않았습니다.',
        regulation: '금융소비자보호법 제19조',
        suggestion: '"상품의 주요 내용과 위험 요소를 자세히 설명드리겠습니다."',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 21),
      },
    ],
    savedNotes: [],
  },
  {
    id: '5',
    customerName: '정다은',
    phoneNumber: '010-****-9334',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    violationCount: 1,
    feedbacks: [
      {
        id: 'fb-7',
        messageId: 'msg-7',
        type: 'low',
        category: '용어 설명',
        description: '전문 용어를 사용할 때 충분한 설명이 부족했습니다.',
        regulation: '금융소비자보호법 제19조',
        suggestion: '"기준가격이란 펀드의 순자산가치를 총 좌수로 나눈 가격을 의미합니다."',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 47),
      },
    ],
    savedNotes: [],
  },
  {
    id: '6',
    customerName: '최지훈',
    phoneNumber: '010-****-4478',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    violationCount: 0,
    feedbacks: [],
    savedNotes: [],
  },
];

export function SummaryScreen({ feedbacks, customerName, onNewConsultation }: SummaryScreenProps) {
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<ConsultationHistory | null>(null);

  // 현재 표시할 데이터 결정
  const displayData = selectedHistory || {
    customerName,
    feedbacks,
    savedNotes,
  };

  const handleSendNotes = () => {
    if (additionalNotes.trim()) {
      const newNote: SavedNote = {
        id: `note-${Date.now()}`,
        text: additionalNotes,
        timestamp: new Date(),
      };
      setSavedNotes([...savedNotes, newNote]);
      setAdditionalNotes('');
      toast.success('메모가 저장되었습니다');
    }
  };

  const handleDeleteNote = (id: string) => {
    setSavedNotes(savedNotes.filter(note => note.id !== id));
    toast.success('메모가 삭제되었습니다');
  };

  const handleSaveReport = () => {
    // 여기에 리포트 저장 로직 추가
    console.log('리포트 저장:', { feedbacks, savedNotes, customerName });
    toast.success('상담 리포트가 저장되었습니다');
  };

  const handleSelectHistory = (history: ConsultationHistory) => {
    setSelectedHistory(history);
    setSavedNotes(history.savedNotes || []);
    setAdditionalNotes('');
  };

  const handleNewConsultation = () => {
    setSelectedHistory(null);
    setSavedNotes([]);
    setAdditionalNotes('');
    onNewConsultation();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Toaster position="top-right" />
      
      {/* Top Header */}
      <div className="h-[92px] bg-white border-b-2 border-[#001e5a] flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <div className="text-[#001e5a] text-2xl font-bold">C.A.R.E</div>
            <div className="text-[#001e5a] text-sm">System</div>
          </div>
        </div>
        
        <div className="flex gap-3">
          {!selectedHistory && (
            <button
              onClick={handleSaveReport}
              className="px-6 py-3 bg-[#001e5a] text-white rounded-2xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              리포트 저장
            </button>
          )}
          <button
            onClick={handleNewConsultation}
            className="px-6 py-3 bg-gradient-to-r from-[#d50982] to-[#ff383c] text-white rounded-2xl hover:opacity-90 transition-opacity"
          >
            새 상담
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Consultation History */}
        <div className="w-[360px] bg-[#001e5a] p-5 flex items-start justify-center pt-8">
          <ConsultationHistoryList 
            histories={mockHistories} 
            onSelectHistory={handleSelectHistory}
          />
        </div>

        {/* Right Content - Summary Report */}
        <div className="flex-1 p-8 overflow-auto pb-32">
          <div className="max-w-[1000px] mx-auto">
            {/* Report Card */}
            <div className="bg-white border-2 border-[#242760] rounded-2xl overflow-hidden shadow-lg mb-6">
              {/* Header */}
              <div className="bg-[#242760] text-white py-5 px-8">
                <h1 className="text-3xl text-center">C.A.R.E REPORT</h1>
              </div>

              {/* Content */}
              <ScrollArea className="h-[calc(100vh-450px)]">
                <div className="p-8">
                  {displayData.feedbacks.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-xl text-gray-700 mb-2">완벽한 상담!</h3>
                      <p className="text-gray-500">
                        {displayData.customerName} 고객님과의 상담에서 개선 포인트가 발견되지 않았습니다.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Summary Stats */}
                      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-lg mb-4">상담 요약</h3>
                        <div className="flex gap-8">
                          <div>
                            <div className="text-sm text-gray-600">고객명</div>
                            <div className="text-xl text-gray-900">{displayData.customerName}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">총 피드백</div>
                            <div className="text-xl text-blue-600 font-bold">{displayData.feedbacks.length}건</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">중요</div>
                            <div className="text-xl text-red-600 font-bold">
                              {displayData.feedbacks.filter(v => v.type === 'high').length}건
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">참고</div>
                            <div className="text-xl text-orange-500 font-bold">
                              {displayData.feedbacks.filter(v => v.type === 'medium').length}건
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Feedbacks List */}
                      <div className="space-y-6">
                        <h3 className="text-lg text-gray-900 mb-4">상담 피드백</h3>
                        {displayData.feedbacks.map((feedback) => (
                          <FeedbackCard key={feedback.id} feedback={feedback} variant="summary" />
                        ))}
                      </div>

                      {/* Recommendations */}
                      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg text-blue-900 mb-3">💡 개선 권장 사항</h3>
                        <ul className="space-y-2 text-sm text-blue-900">
                          <li>• 상품 정보 안내 시 정확한 수치를 재확인하세요</li>
                          <li>• 단정적 표현을 피하고 변동 가능성을 명시하세요</li>
                          <li>• 고객의 의사결정에 시간적 압박을 주지 마세요</li>
                          <li>• 불이익 사항은 반드시 먼저 고지하세요</li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Saved Notes Display */}
            {savedNotes.length > 0 && (
              <div className="max-w-[1000px] mx-auto mb-4">
                <div className="space-y-3">
                  <h3 className="text-sm text-gray-600 mb-2">저장된 메모</h3>
                  {savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start justify-between gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-gray-900 whitespace-pre-wrap">{note.text}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {note.timestamp.toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      {!selectedHistory && (
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1 hover:bg-blue-100 rounded transition-colors"
                          title="메모 삭제"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes Input - 현재 상담에서만 표시 */}
            {!selectedHistory && (
              <div className="max-w-[1000px] mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-4">
                    <Textarea
                      placeholder="추가 상담 메모를 작성하세요..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="flex-1 min-h-[56px] max-h-[200px] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendNotes();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendNotes}
                      className="p-3 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      disabled={!additionalNotes.trim()}
                      title="메모 저장"
                    >
                      <MessageSquarePlus className="w-6 h-6 text-[#242760]" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-5 bg-[#d50982]" />
    </div>
  );
}
