'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { TimePicker } from '@/components/ui/time-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5 text-cyan-400" />
          Basic Information
        </CardTitle>
        <CardDescription className="text-gray-400">
          Tell us about yourself and what system interests you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-white">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Your full name"
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="company" className="text-white">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateFormData('company', e.target.value)}
              placeholder="Your company name (optional)"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-white">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              placeholder="your.email@company.com"
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              placeholder="+66 xx xxx xxxx"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="system" className="text-white">System of Interest *</Label>
          <Select value={formData.interestedSystem} onValueChange={(value) => updateFormData('interestedSystem', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select the system you're interested in" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {INTERESTED_SYSTEMS.map((system) => (
                <SelectItem key={system.value} value={system.value} className="text-white">
                  {system.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-cyan-400" />
          Project Details
        </CardTitle>
        <CardDescription className="text-gray-400">
          Describe your project and requirements in detail
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description" className="text-white">Project Description *</Label>
          <Textarea
            id="description"
            value={formData.projectDescription}
            onChange={(e) => updateFormData('projectDescription', e.target.value)}
            placeholder="Please describe your project, current challenges, and what you hope to achieve..."
            className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="requirements" className="text-white">Technical Requirements</Label>
          <Textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => updateFormData('requirements', e.target.value)}
            placeholder="Any specific technical requirements, integrations, or constraints? (Optional)"
            className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
          />
        </div>

        <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-cyan-400 mt-0.5" />
            <div>
              <h4 className="text-cyan-400 font-medium">Have documents to share?</h4>
              <p className="text-gray-300 text-sm mt-1">
                You can share detailed requirements, wireframes, or project documents during our consultation call.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-cyan-400" />
          Schedule Your Consultation
        </CardTitle>
        <CardDescription className="text-gray-400">
          Choose your preferred date and time for the consultation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar and Time Picker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <Label className="text-white text-base font-medium mb-3 block">Select Date *</Label>
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

          {/* Time Picker */}
          <div>
            <Label className="text-white text-base font-medium mb-3 block">Select Time *</Label>
            <TimePicker
              selectedTime={formData.preferredTime}
              onTimeSelect={(time) => updateFormData('preferredTime', time)}
              selectedDate={formData.preferredDate}
            />
          </div>
        </div>

        {/* Timezone Selection */}
        <div>
          <Label htmlFor="timezone" className="text-white">Timezone</Label>
          <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value} className="text-white">
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* What to expect section */}
        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-medium">What to expect</h4>
              <ul className="text-gray-300 text-sm mt-2 space-y-1">
                <li>• 30-minute consultation call</li>
                <li>• Expert analysis of your requirements</li>
                <li>• Personalized technology recommendations</li>
                <li>• Next steps and project timeline discussion</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-300 ${
                currentStep >= step
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-16 h-1 mx-2 transition-colors duration-300 ${
                  currentStep > step ? 'bg-cyan-500' : 'bg-gray-700'
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
      <div className="flex justify-between pt-6">
        <Button
          onClick={prevStep}
          variant="outline"
          disabled={currentStep === 1}
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          Previous
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={nextStep}
            className="bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            Next Step
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Consultation Request
              </div>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}