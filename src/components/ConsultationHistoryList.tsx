import { Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { FeedbackItem } from './FeedbackCard';

interface SavedNote {
  id: string;
  text: string;
  timestamp: Date;
}

export interface ConsultationHistory {
  id: string;
  customerName: string;
  phoneNumber: string;
  timestamp: Date;
  violationCount: number;
  feedbacks: FeedbackItem[];
  savedNotes?: SavedNote[];
}

interface ConsultationHistoryListProps {
  histories: ConsultationHistory[];
  onSelectHistory?: (history: ConsultationHistory) => void;
}

export function ConsultationHistoryList({ histories, onSelectHistory }: ConsultationHistoryListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistories = histories.filter(h => 
    h.customerName.includes(searchQuery) || h.phoneNumber.includes(searchQuery)
  );

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' });
    }
  };

  return (
    <div className="w-[340px] h-full bg-white border-2 border-[#242760] rounded-2xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl text-[#242760] mb-4">상담 내역</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#f7f6f4] border-none rounded-full"
          />
        </div>
      </div>

      {/* History List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {filteredHistories.map((history) => (
            <div
              key={history.id}
              onClick={() => onSelectHistory?.(history)}
              className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900">{history.customerName}</span>
                  <span className="text-sm text-gray-500">{history.phoneNumber}</span>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{getTimeAgo(history.timestamp)}</span>
              </div>
              {history.violationCount > 0 && (
                <div className="text-xs text-blue-600 mt-1">
                  피드백 {history.violationCount}건
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
