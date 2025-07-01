import React, { useState } from 'react';
import { X, User, Building, Mail, Phone, Calendar, Check } from 'lucide-react';
import { trackBookingStep, trackFormSubmission } from '../utils/analytics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  businessType: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  selectedDate: string;
  selectedTime: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessType: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    selectedDate: '',
    selectedTime: ''
  });

  const businessTypes = [
    { id: 'hotel', label: 'Hotel / Hospitality', icon: '🏨' },
    { id: 'industrial', label: 'Industrial / Factory', icon: '🏭' },
    { id: 'finance', label: 'Finance / Security', icon: '🏦' },
    { id: 'smart-home', label: 'Smart Home / Personal', icon: '🏠' },
    { id: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { id: 'retail', label: 'Retail', icon: '🛍️' },
    { id: 'consultant', label: 'Consultant', icon: '💼' },
    { id: 'other', label: 'Other', icon: '🔧' }
  ];

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      trackBookingStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Track successful submission
      trackFormSubmission('booking_modal');
      
      // For now, just go to step 4 (confirmation)
      setStep(4);
    } catch (error) {
      console.error('Booking submission failed:', error);
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      businessType: '',
      name: '',
      email: '',
      company: '',
      phone: '',
      selectedDate: '',
      selectedTime: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Get a Demo Tailored to Your Needs</h2>
            <div className="flex items-center mt-2 space-x-2">
              <img src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="Ali H." className="w-8 h-8 rounded-full object-cover" />
              <img src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="Team Member" className="w-8 h-8 rounded-full object-cover" />
              <img src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="Team Member" className="w-8 h-8 rounded-full object-cover" />
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i}
                </div>
                {i < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    i < step ? 'bg-blue-900' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Which best describes your business?</h3>
              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, businessType: type.id })}
                    className={`p-4 border rounded-lg text-left hover:border-blue-900 transition-colors ${
                      formData.businessType === type.id ? 'border-blue-900 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <span className="font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!formData.businessType}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Great! Let's get some details.</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Your company name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+49 123 456 7890"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || !formData.company}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Schedule Your 1-on-1 Strategy Call</h3>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-4">
                  <img src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" alt="Ali H." className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ali H.</h4>
                    <p className="text-sm text-gray-600">Founder & Lead AI Architect</p>
                    <p className="text-sm text-gray-700 mt-2">
                      I will personally walk you through a live demonstration tailored to your business goals 
                      and answer any questions you have about implementing a powerful AI strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date *</label>
                  <input
                    type="date"
                    value={formData.selectedDate}
                    onChange={(e) => setFormData({ ...formData, selectedDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time *</label>
                  <select
                    value={formData.selectedTime}
                    onChange={(e) => setFormData({ ...formData, selectedTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Choose a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.selectedDate || !formData.selectedTime || isSubmitting}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking...
                    </>
                  ) : (
                    'Book Call'
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your AI Strategy Call is Booked!</h3>
              <p className="text-gray-600 mb-6">
                You're all set. A calendar invitation and confirmation have been sent to your email. 
                We look forward to showing you the future of your business.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Next Steps:</h4>
                <ul className="text-left space-y-2">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Check Your Email for the Invite</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>In the meantime, explore our client success stories</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleClose}
                className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;