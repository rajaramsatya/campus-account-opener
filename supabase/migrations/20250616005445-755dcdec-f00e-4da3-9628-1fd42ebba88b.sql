
-- Create enum for account types
CREATE TYPE public.account_type AS ENUM ('checking', 'savings', 'both');

-- Create enum for employment status
CREATE TYPE public.employment_status AS ENUM ('unemployed', 'part-time', 'full-time', 'internship');

-- Create table for student account applications
CREATE TABLE public.student_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  
  -- Account type selection
  account_type account_type,
  
  -- Personal information
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  ssn_encrypted TEXT, -- Store encrypted SSN for security
  
  -- Document verification
  student_id_photo_url TEXT,
  drivers_license_photo_url TEXT,
  
  -- Address information
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  
  -- Student information
  university TEXT,
  student_id TEXT,
  graduation_year TEXT,
  employment_status employment_status,
  annual_income TEXT,
  
  -- Terms and agreements
  agree_to_terms BOOLEAN DEFAULT FALSE,
  agree_to_privacy BOOLEAN DEFAULT FALSE,
  agree_to_credit BOOLEAN DEFAULT FALSE,
  
  -- Application status
  status TEXT DEFAULT 'draft', -- draft, submitted, approved, rejected
  current_step INTEGER DEFAULT 1,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for student applications
CREATE POLICY "Users can view their own applications" 
  ON public.student_applications 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create their own applications" 
  ON public.student_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own applications" 
  ON public.student_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Create storage bucket for document uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('student-documents', 'student-documents', false);

-- Create storage policies for document uploads
CREATE POLICY "Users can upload their own documents" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'student-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'student-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER handle_student_applications_updated_at
  BEFORE UPDATE ON public.student_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
