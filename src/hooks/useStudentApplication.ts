
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface StudentApplicationData {
  id?: string;
  accountType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  studentIdPhoto: File | null;
  driversLicensePhoto: File | null;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  university: string;
  studentId: string;
  graduationYear: string;
  employmentStatus: string;
  annualIncome: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
  agreeToCredit: boolean;
  currentStep: number;
  status: string;
}

export const useStudentApplication = () => {
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('student-documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      return filePath;
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  };

  const saveApplication = async (data: Partial<StudentApplicationData>): Promise<string | null> => {
    setIsLoading(true);
    try {
      // Handle file uploads
      let studentIdPhotoUrl = null;
      let driversLicensePhotoUrl = null;

      if (data.studentIdPhoto instanceof File) {
        studentIdPhotoUrl = await uploadFile(data.studentIdPhoto, 'student-ids');
        if (!studentIdPhotoUrl) {
          toast({
            title: "Upload failed",
            description: "Failed to upload student ID photo",
            variant: "destructive"
          });
          return null;
        }
      }

      if (data.driversLicensePhoto instanceof File) {
        driversLicensePhotoUrl = await uploadFile(data.driversLicensePhoto, 'drivers-licenses');
        if (!driversLicensePhotoUrl) {
          toast({
            title: "Upload failed",
            description: "Failed to upload driver's license photo",
            variant: "destructive"
          });
          return null;
        }
      }

      // Prepare data for database
      const dbData = {
        account_type: data.accountType || null,
        first_name: data.firstName || null,
        last_name: data.lastName || null,
        email: data.email || null,
        phone: data.phone || null,
        date_of_birth: data.dateOfBirth || null,
        ssn_encrypted: data.ssn || null, // In production, this should be encrypted
        student_id_photo_url: studentIdPhotoUrl,
        drivers_license_photo_url: driversLicensePhotoUrl,
        address: data.address || null,
        city: data.city || null,
        state: data.state || null,
        zip_code: data.zipCode || null,
        university: data.university || null,
        student_id: data.studentId || null,
        graduation_year: data.graduationYear || null,
        employment_status: data.employmentStatus || null,
        annual_income: data.annualIncome || null,
        agree_to_terms: data.agreeToTerms || false,
        agree_to_privacy: data.agreeToPrivacy || false,
        agree_to_credit: data.agreeToCredit || false,
        current_step: data.currentStep || 1,
        status: data.status || 'draft',
      };

      let result;
      if (applicationId) {
        // Update existing application
        result = await supabase
          .from('student_applications')
          .update(dbData)
          .eq('id', applicationId)
          .select()
          .single();
      } else {
        // Create new application
        result = await supabase
          .from('student_applications')
          .insert(dbData)
          .select()
          .single();
      }

      if (result.error) {
        console.error('Database error:', result.error);
        toast({
          title: "Save failed",
          description: "Failed to save application data",
          variant: "destructive"
        });
        return null;
      }

      if (result.data?.id && !applicationId) {
        setApplicationId(result.data.id);
      }

      return result.data?.id || applicationId;
    } catch (error) {
      console.error('Save application error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (data: StudentApplicationData): Promise<boolean> => {
    const finalData = { ...data, status: 'submitted' };
    const result = await saveApplication(finalData);
    
    if (result) {
      toast({
        title: "Application Submitted!",
        description: "Your application has been submitted successfully. We'll review it within 24 hours.",
      });
      return true;
    }
    return false;
  };

  return {
    applicationId,
    isLoading,
    saveApplication,
    submitApplication,
  };
};
