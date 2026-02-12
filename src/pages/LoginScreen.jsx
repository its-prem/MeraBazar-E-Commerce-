import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShoppingBag, Check, Loader2, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // FIXED

export default function LoginScreen({ role = 'buyer', onLogin }) {
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate(); // FIXED

  // Focus management
  useEffect(() => {
    if (step === 'otp') {
      document.getElementById('otp-0')?.focus();
    }
  }, [step]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length === 6) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);

        // Redirect AFTER OTP success
        setTimeout(() => {
          navigate("/home"); // FIXED → GO TO HOMEPAGE
        }, 800);

      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-purple-200">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
              {step === 'phone' ? 'Welcome Back' : 'Verify Account'}
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              {step === 'phone'
                ? `Enter your mobile number to login as ${role}`
                : `We've sent a code to +91 ${phoneNumber}`
              }
            </p>
          </div>

          {/* FORM */}
          <div className="px-8 pb-8">
            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">

                {/* Phone Input */}
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">+91</div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:bg-white focus:border-purple-500 outline-none transition-all font-semibold text-lg"
                      placeholder="98765 43210"
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  disabled={phoneNumber.length !== 10 || isLoading}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

              </form>
            ) : (

              /* OTP SCREEN */
              <div className="space-y-8">

                {/* OTP Boxes */}
                <div className="flex justify-between gap-2 md:gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className={`w-10 h-12 md:w-12 md:h-14 text-center text-xl font-bold bg-slate-50 border-2 rounded-xl`}
                    />
                  ))}
                </div>

                {/* Back + Resend */}
                <div className="flex justify-between text-sm">
                  <button onClick={() => setStep('phone')} className="text-slate-500">
                    <ChevronLeft className="w-4 h-4 inline" /> Edit Number
                  </button>
                  <button className="text-purple-600 font-bold">Resend Code</button>
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleOtpSubmit}
                  disabled={otp.some(d => d === '') || isLoading}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl hover:bg-purple-600 flex items-center justify-center gap-2 text-lg font-bold"
                >
                  {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> :
                    isSuccess ? <>Verified <Check className="w-6 h-6" /></> :
                    'Verify Login'}
                </button>

              </div>
            )}

            {/* Security Badge */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Secure 256-bit Encrypted</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <button className="hover:text-purple-600 mx-2">Terms of Service</button>
          <button className="hover:text-purple-600 mx-2">Privacy Policy</button>
        </div>

      </div>
    </div>
  );
}
