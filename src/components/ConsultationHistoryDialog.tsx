import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';

interface ConsultationHistory {
  id: string;
  date: string;
  agent: string;
  topic: string;
  inquiry: string;
  result: string;
}

interface ConsultationHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  histories: ConsultationHistory[];
}

export function ConsultationHistoryDialog({ open, onOpenChange, histories }: ConsultationHistoryDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent 
        className="p-0 gap-0 max-w-[342px] bg-white rounded-[15px] border-[3px] border-[#242760]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="relative bg-[#242760] h-[41px] rounded-t-[12px] flex items-center justify-between px-4">
          <span className="text-white font-semibold text-[16px]">이전 상담 내역</span>
          <button
            onClick={() => onOpenChange(false)}
            className="text-white hover:bg-white/10 rounded p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[600px] overflow-y-auto">
          <h3 className="text-black text-[16px] font-semibold mb-4">상담 목록</h3>
          
          <div className="space-y-6">
            {histories.map((history) => (
              <div key={history.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="text-black text-[16px] font-semibold mb-2">
                  {history.date} / {history.agent} / {history.topic}
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-black text-[16px] font-medium">문의 내용:</span>
                    <p className="text-black text-[16px] ml-2">{history.inquiry}</p>
                  </div>
                  
                  <div>
                    <span className="text-black text-[16px] font-medium">처리 결과:</span>
                    <p className="text-black text-[16px] ml-2">{history.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
