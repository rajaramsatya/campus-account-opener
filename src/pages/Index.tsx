
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, GraduationCap, CreditCard, PiggyBank, CheckCircle, Users } from 'lucide-react';
import AccountOpeningForm from '@/components/AccountOpeningForm';

const Index = () => {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return <AccountOpeningForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">EduCredit Union</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                NCUA Insured
              </Badge>
              <Button variant="outline" size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Student Banking Made Simple
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Open Your Student Account in 
                  <span className="text-blue-600"> Minutes</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of college students who trust EduCredit Union for their banking needs. 
                  No monthly fees, no minimum balance, and exclusive student benefits.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  onClick={() => setShowForm(true)}
                >
                  Open Account Now
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>5-minute application</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No credit check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>FDIC insured</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Student Checking</h3>
                    <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Fee</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Balance</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ATM Fee Rebates</span>
                      <span className="font-semibold text-blue-600">Up to $20/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for College and Beyond
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand student life. That's why we've designed banking products specifically for your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow duration-300 border-none shadow-md">
              <div className="space-y-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Student Checking</h3>
                <p className="text-gray-600">
                  No fees, no minimum balance, and a debit card that works everywhere you need it.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free online & mobile banking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>ATM fee rebates</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow duration-300 border-none shadow-md">
              <div className="space-y-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <PiggyBank className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">High-Yield Savings</h3>
                <p className="text-gray-600">
                  Start building your financial future with competitive rates and no minimum balance.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>2.5% APY on all balances</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Automatic savings tools</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow duration-300 border-none shadow-md">
              <div className="space-y-4">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Student Credit Card</h3>
                <p className="text-gray-600">
                  Build credit responsibly with our student-friendly credit card and financial education.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No annual fee</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Cashback rewards</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">50,000+</div>
              <div className="text-gray-600">Student Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">4.8★</div>
              <div className="text-gray-600">App Store Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">500+</div>
              <div className="text-gray-600">Partner Universities</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="space-y-6 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-xl opacity-90">
              Join the thousands of students who have chosen EduCredit Union for their banking needs.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
              onClick={() => setShowForm(true)}
            >
              Open Your Account Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-semibold">EduCredit Union</span>
              </div>
              <p className="text-gray-400">
                Empowering students to build a strong financial future.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Student Checking</li>
                <li>High-Yield Savings</li>
                <li>Student Credit Card</li>
                <li>Student Loans</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Branch Locations</li>
                <li>Security</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclosures</li>
                <li>NCUA Equal Housing</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduCredit Union. All rights reserved. NCUA Insured.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
