import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface StartScreenProps {
  onStart: (customerName: string, phoneNumber: string) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [customerName, setCustomerName] = useState('장원영');
  const [phoneNumber, setPhoneNumber] = useState('010-8327-3113');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim() && phoneNumber.trim()) {
      onStart(customerName, phoneNumber);
    }
  };

  const handleClearName = () => {
    setCustomerName('');
  };

  const handleClearPhone = () => {
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen bg-[#001e5a] relative flex items-center justify-center">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <div className="text-white text-3xl font-bold">C.A.R.E</div>
      </div>

      {/* System Header */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="text-white font-semibold text-xl">C.A.R.E System</div>
          <div className="text-xs text-white/70">Compliance Assistant & Real-time Enhancer</div>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg mx-4">
        <div className="bg-white rounded-t-[160px] pt-20 pb-12 px-12 shadow-2xl">
          <h1 className="text-[#001e5a] text-3xl text-center mb-12" style={{ fontWeight: 600 }}>
            고객 정보 입력
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div>
              <Label htmlFor="customerName" className="text-[#363636] text-sm mb-2 block">
                고객명
              </Label>
              <div className="relative">
                <Input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="고객명을 입력하세요"
                  className="bg-[#e0e2e1] border-0 h-11 pr-10"
                  required
                />
                {customerName && (
                  <button
                    type="button"
                    onClick={handleClearName}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-[#363636] text-sm mb-2 block">
                전화번호
              </Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="전화번호를 입력하세요"
                  className="bg-[#e0e2e1] border-0 h-11 pr-10"
                  required
                />
                {phoneNumber && (
                  <button
                    type="button"
                    onClick={handleClearPhone}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-11 rounded-[25px] text-white transition-all hover:opacity-90 flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(90deg, rgb(227, 5, 128) 0%, rgb(227, 5, 128) 100%)',
                fontWeight: 600
              }}
            >
              상담 시작
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
