
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, CheckCircle, GraduationCap, CreditCard, PiggyBank } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccountOpeningFormProps {
  onBack: () => void;
}

const AccountOpeningForm = ({ onBack }: AccountOpeningFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    accountType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ssn: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    university: '',
    studentId: '',
    graduationYear: '',
    employmentStatus: '',
    annualIncome: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToCredit: false
  });
  
  const { toast } = useToast();
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted Successfully!",
      description: "We'll review your application and get back to you within 24 hours.",
    });
    // In a real app, this would submit to an API
    console.log('Form submitted:', formData);
  };

  const accountTypes = [
    {
      id: 'checking',
      title: 'Student Checking',
      description: 'No fees, no minimums, perfect for daily banking',
      icon: CreditCard,
      features: ['No monthly fees', 'Free debit card', 'ATM fee rebates', 'Mobile banking']
    },
    {
      id: 'savings',
      title: 'High-Yield Savings',
      description: 'Build your savings with 2.5% APY',
      icon: PiggyBank,
      features: ['2.5% APY', 'No minimum balance', 'Automatic savings', 'Goal tracking']
    },
    {
      id: 'both',
      title: 'Checking + Savings Bundle',
      description: 'Get both accounts and save more',
      icon: GraduationCap,
      features: ['All checking benefits', 'High-yield savings', 'Linked accounts', 'Financial planning']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold">EduCredit Union</span>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              Secure Application
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Open Your Student Account</h1>
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Account Type</span>
              <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Personal Info</span>
              <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Address</span>
              <span className={currentStep >= 4 ? 'text-blue-600 font-medium' : ''}>Student Info</span>
              <span className={currentStep >= 5 ? 'text-blue-600 font-medium' : ''}>Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 shadow-lg border-none">
          {/* Step 1: Account Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Account Type</h2>
                <p className="text-gray-600">Select the account that best fits your needs as a student</p>
              </div>

              <div className="grid gap-6">
                {accountTypes.map((account) => (
                  <Card 
                    key={account.id}
                    className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      formData.accountType === account.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('accountType', account.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <account.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{account.title}</h3>
                          {formData.accountType === account.id && (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{account.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {account.features.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={nextStep} 
                  disabled={!formData.accountType}
                  className="px-8"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                <p className="text-gray-600">Help us verify your identity to protect your account</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@university.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssn">Social Security Number *</Label>
                  <Input
                    id="ssn"
                    type="password"
                    value={formData.ssn}
                    onChange={(e) => handleInputChange('ssn', e.target.value)}
                    placeholder="XXX-XX-XXXX"
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.dateOfBirth || !formData.ssn}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Address Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Address Information</h2>
                <p className="text-gray-600">We need your current address for account verification</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        {/* Add more states as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="12345"
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={!formData.address || !formData.city || !formData.state || !formData.zipCode}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Student Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Student Information</h2>
                <p className="text-gray-600">Verify your student status to unlock special benefits</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="university">University/College *</Label>
                  <Select value={formData.university} onValueChange={(value) => handleInputChange('university', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your school" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stanford">Stanford University</SelectItem>
                      <SelectItem value="ucla">UCLA</SelectItem>
                      <SelectItem value="berkeley">UC Berkeley</SelectItem>
                      <SelectItem value="usc">USC</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    placeholder="Your student ID number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Expected Graduation Year *</Label>
                  <Select value={formData.graduationYear} onValueChange={(value) => handleInputChange('graduationYear', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange('employmentStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (optional)</Label>
                  <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange('annualIncome', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">$0</SelectItem>
                      <SelectItem value="1-5000">$1 - $5,000</SelectItem>
                      <SelectItem value="5001-15000">$5,001 - $15,000</SelectItem>
                      <SelectItem value="15001-30000">$15,001 - $30,000</SelectItem>
                      <SelectItem value="30000+">$30,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={!formData.university || !formData.studentId || !formData.graduationYear}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Review and Submit */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Review Your Application</h2>
                <p className="text-gray-600">Please review all information before submitting your application</p>
              </div>

              <div className="space-y-6">
                {/* Account Type Summary */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Selected Account</h3>
                  <p className="text-blue-800">
                    {accountTypes.find(type => type.id === formData.accountType)?.title}
                  </p>
                </Card>

                {/* Personal Information Summary */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                    <div className="space-y-1 text-gray-600">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.email}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.dateOfBirth}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                    <div className="space-y-1 text-gray-600">
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Student Information</h4>
                    <div className="space-y-1 text-gray-600">
                      <p>University: {formData.university}</p>
                      <p>Student ID: {formData.studentId}</p>
                      <p>Graduation: {formData.graduationYear}</p>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 border-t pt-6">
                  <h4 className="font-semibold text-gray-900">Terms and Agreements</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                        I agree to the <span className="text-blue-600 underline">Terms and Conditions</span> and 
                        acknowledge that I have read and understand the account disclosures.
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="privacy"
                        checked={formData.agreeToPrivacy}
                        onCheckedChange={(checked) => handleInputChange('agreeToPrivacy', checked as boolean)}
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-700 leading-relaxed">
                        I agree to the <span className="text-blue-600 underline">Privacy Policy</span> and consent 
                        to the collection and use of my personal information as described.
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="credit"
                        checked={formData.agreeToCredit}
                        onCheckedChange={(checked) => handleInputChange('agreeToCredit', checked as boolean)}
                      />
                      <label htmlFor="credit" className="text-sm text-gray-700 leading-relaxed">
                        I authorize EduCredit Union to verify my credit and banking history for account opening purposes.
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!formData.agreeToTerms || !formData.agreeToPrivacy || !formData.agreeToCredit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AccountOpeningForm;
