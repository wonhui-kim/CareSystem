import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { ConsultationScreen } from './components/ConsultationScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { FeedbackItem } from './components/FeedbackCard';

type Screen = 'start' | 'consultation' | 'summary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  const handleStart = (name: string, phone: string) => {
    setCustomerName(name);
    setPhoneNumber(phone);
    setScreen('consultation');
  };

  const handleEndConsultation = (consultationFeedbacks: FeedbackItem[]) => {
    setFeedbacks(consultationFeedbacks);
    setScreen('summary');
  };

  const handleNewConsultation = () => {
    setCustomerName('');
    setPhoneNumber('');
    setFeedbacks([]);
    setScreen('start');
  };

  if (screen === 'start') {
    return <StartScreen onStart={handleStart} />;
  }

  if (screen === 'summary') {
    return (
      <SummaryScreen 
        feedbacks={feedbacks}
        customerName={customerName}
        onNewConsultation={handleNewConsultation}
      />
    );
  }

  return (
    <ConsultationScreen 
      customerName={customerName} 
      phoneNumber={phoneNumber}
      onEndConsultation={handleEndConsultation}
    />
  );
}
