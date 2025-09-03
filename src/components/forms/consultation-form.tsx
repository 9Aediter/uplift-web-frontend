'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare, FileText, Send } from 'lucide-react';
import { Button } from '@/components/button/button';
import { FloatingInput, FloatingTextarea, FloatingSelect } from '@/components/input/floating-input';
import { Calendar } from '@/components/ui/calendar';
import { TimePicker } from '@/components/ui/time-picker';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ConsultationFormData {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  company?: string;

  // System Interest
  interestedSystem: string;

  // Additional Details
  projectDescription: string;
  requirements?: string;

  // Scheduling
  preferredDate: string;
  preferredTime: string;
  timezone: string;
}

const INTERESTED_SYSTEMS = [
  { value: 'ai-analytics', label: 'AI Analytics Platform' },
  { value: 'cloud-infrastructure', label: 'Cloud Infrastructure Management' },
  { value: 'mobile-development', label: 'Mobile App Development' },
  { value: 'digital-marketing', label: 'Digital Marketing Suite' },
  { value: 'cybersecurity', label: 'Cybersecurity Solutions' },
  { value: 'custom-development', label: 'Custom Software Development' },
  { value: 'integration-services', label: 'System Integration Services' },
  { value: 'other', label: 'Other (Please specify)' },
];


const TIMEZONES = [
  { value: 'Asia/Bangkok', label: 'Bangkok (UTC+7)' },
  { value: 'Asia/Singapore', label: 'Singapore (UTC+8)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
  { value: 'America/New_York', label: 'New York (UTC-5)' },
  { value: 'Europe/London', label: 'London (UTC+0)' },
];

export function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    interestedSystem: '',
    projectDescription: '',
    requirements: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'Asia/Bangkok',
  });

  const updateFormData = (field: keyof ConsultationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.email || !formData.interestedSystem) {
          toast.error('Please fill in all required fields');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error('Please enter a valid email address');
          return false;
        }
        return true;
      case 2:
        if (!formData.projectDescription) {
          toast.error('Please describe your project requirements');
          return false;
        }
        return true;
      case 3:
        if (!formData.preferredDate || !formData.preferredTime) {
          toast.error('Please select your preferred date and time');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit consultation request');
      }

      toast.success('Consultation request sent successfully! We\'ll contact you soon.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        interestedSystem: '',
        projectDescription: '',
        requirements: '',
        preferredDate: '',
        preferredTime: '',
        timezone: 'Asia/Bangkok',
      });
      setCurrentStep(1);

    } catch (error) {
      console.error('Consultation submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send consultation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <Card className="border-gray-700/30 bg-gray-800/30 backdrop-blur-sm shadow-2xl">
      <CardHeader className="pb-8">
        <CardTitle className="text-white flex items-center gap-3 text-xl">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          Basic Information
        </CardTitle>
        <CardDescription className="text-gray-300 text-base">
          Tell us about yourself and what system interests you most
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput
            label="Full Name"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            required
            className="text-base"
          />
          <FloatingInput
            label="Company Name"
            value={formData.company || ''}
            onChange={(e) => updateFormData('company', e.target.value)}
            className="text-base"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FloatingInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            required
            className="text-base"
          />
          <FloatingInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="text-base"
          />
        </div>

        <div>
          <FloatingSelect
            label="System of Interest"
            value={formData.interestedSystem}
            onValueChange={(value) => updateFormData('interestedSystem', value)}
            required
            options={INTERESTED_SYSTEMS}
          >
            {INTERESTED_SYSTEMS.map((system) => (
              <div key={system.value} data-value={system.value}>
                {system.label}
              </div>
            ))}
          </FloatingSelect>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="border-gray-700/30 bg-gray-800/30 backdrop-blur-sm shadow-2xl">
      <CardHeader className="pb-8">
        <CardTitle className="text-white flex items-center gap-3 text-xl">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          Project Details
        </CardTitle>
        <CardDescription className="text-gray-300 text-base">
          Tell us about your project vision and technical requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        <div>
          <FloatingTextarea
            label="Project Description"
            value={formData.projectDescription}
            onChange={(e) => updateFormData('projectDescription', e.target.value)}
            required
            rows={6}
            className="text-base min-h-[140px]"
          />
          <p className="text-gray-400 text-sm mt-3">
            Describe your project goals, current challenges, and what you hope to achieve
          </p>
        </div>

        <div>
          <FloatingTextarea
            label="Technical Requirements"
            value={formData.requirements || ''}
            onChange={(e) => updateFormData('requirements', e.target.value)}
            rows={4}
            className="text-base min-h-[120px]"
          />
          <p className="text-gray-400 text-sm mt-3">
            Any specific technical requirements, integrations, or constraints? (Optional)
          </p>
        </div>

        <div className="p-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 rounded-xl backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="text-cyan-300 font-semibold text-base mb-2">Have documents to share?</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                You can share detailed requirements, wireframes, technical specifications, or project documents
                during our consultation call. We'll review them together and provide tailored recommendations.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="border-gray-700/30 bg-gray-800/30 backdrop-blur-sm shadow-2xl">
      <CardHeader className="pb-8">
        <CardTitle className="text-white flex items-center gap-3 text-xl">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <CalendarIcon className="h-5 w-5 text-white" />
          </div>
          Schedule Your Consultation
        </CardTitle>
        <CardDescription className="text-gray-300 text-base">
          Choose your preferred date and time for our 30-minute consultation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-8">
        {/* Calendar and Time Picker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <div className="text-white text-lg font-medium mb-4 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-cyan-400" />
              Select Date *
            </div>
            <div className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4">
              <Calendar
                selectedDate={formData.preferredDate}
                onDateSelect={(date) => {
                  updateFormData('preferredDate', date);
                  // Clear time selection when date changes
                  if (formData.preferredTime) {
                    updateFormData('preferredTime', '');
                  }
                }}
                minDate={new Date()}
              />
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <div className="text-white text-lg font-medium mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              Select Time *
            </div>
            <div className="bg-gray-700/30 backdrop-blur-sm border border-gray-600/30 rounded-xl p-4">
              <TimePicker
                selectedTime={formData.preferredTime}
                onTimeSelect={(time) => updateFormData('preferredTime', time)}
                selectedDate={formData.preferredDate}
              />
            </div>
          </div>
        </div>

        {/* Timezone Selection */}
        <div>
          <FloatingSelect
            label="Timezone"
            value={formData.timezone}
            onValueChange={(value) => updateFormData('timezone', value)}
            placeholder="Select your timezone"
            options={TIMEZONES}
          >
            {TIMEZONES.map((tz) => (
              <div key={tz.value} data-value={tz.value}>
                {tz.label}
              </div>
            ))}
          </FloatingSelect>
        </div>

        {/* What to expect section */}
        <div className="p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-xl backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="text-green-300 font-semibold text-base mb-3">What to expect during your consultation</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  30-minute consultation call with our senior experts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Comprehensive analysis of your project requirements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Personalized technology recommendations and solutions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Clear next steps, timeline, and investment estimates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div id="consultation-form" className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-300 ${currentStep >= step
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 text-gray-400'
                }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 mx-2 transition-colors duration-300 ${currentStep > step ? 'bg-cyan-500' : 'bg-gray-700'
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-8">
        <Button
          onClick={prevStep}
          variant="outline"
          disabled={currentStep === 1}
          className="border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 backdrop-blur-sm px-6 py-3 text-base disabled:opacity-30"
        >
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending Request...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5" />
                Send Consultation Request
              </div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}