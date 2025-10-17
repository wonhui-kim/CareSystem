import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';

interface CustomerInfo {
  name: string;
  phoneNumber: string;
  age: number;
  investmentExperience: 'none' | 'beginner' | 'intermediate' | 'expert';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  financialStatus: string;
  investmentPurpose: string;
  customerGrade?: string;
}

interface CustomerDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerInfo: CustomerInfo;
}

export function CustomerDetailDialog({ open, onOpenChange, customerInfo }: CustomerDetailDialogProps) {
  const getRiskLabel = () => {
    switch (customerInfo.riskTolerance) {
      case 'conservative':
        return '안전 추구형';
      case 'moderate':
        return '위험 중립형';
      case 'aggressive':
        return '적극 투자형';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-[342px] bg-white rounded-[15px] border-[3px] border-[#242760]">
        {/* Header */}
        <div className="relative bg-[#242760] h-[41px] rounded-t-[12px] flex items-center justify-between px-4">
          <span className="text-white font-semibold text-[16px]">고객 상세 정보</span>
          <button
            onClick={() => onOpenChange(false)}
            className="text-white hover:bg-white/10 rounded p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[600px] overflow-y-auto">
          {/* Basic Info */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <p className="text-black text-[16px]">이름 : {customerInfo.name}</p>
              <p className="text-black text-[16px]">나이 : {customerInfo.age}</p>
            </div>
            <p className="text-black text-[16px] mb-2">연락처 : {customerInfo.phoneNumber}</p>
            <p className="text-black text-[16px] mb-2">직업 : IT개발자 소득 : 월 700만원</p>
            <p className="text-black text-[16px]">자산규모: 5억 이상</p>
          </div>

          {/* Investment Profile */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-black text-[16px] mb-1">투자성향 : {getRiskLabel()}</p>
            <p className="text-black text-[16px] mb-1">분석일자 : 2025.08.01</p>
            <p className="text-black text-[16px]">
              주요 특징 : 원금 손실 최소화 선호, 예적금 위주 투자 경험
            </p>
          </div>

          {/* Holdings */}
          <div className="mb-6">
            <p className="text-black text-[16px] font-semibold mb-2">보유상품</p>
            <div className="space-y-1">
              <p className="text-black text-[16px]">
                예적금 : 주택청약종합저축(월 10만원), 자유적금(월 50만원, 만기 3개월전)
              </p>
              <p className="text-black text-[16px]">대출: -</p>
              <p className="text-black text-[16px]">카드 : 00카드</p>
              <p className="text-black text-[16px]">펀드/주식 : -</p>
            </div>
          </div>

          {/* Financial Goals */}
          <div>
            <p className="text-black text-[16px] font-semibold mb-2">고객 금융 목표</p>
            <p className="text-black text-[16px]">{customerInfo.investmentPurpose}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
