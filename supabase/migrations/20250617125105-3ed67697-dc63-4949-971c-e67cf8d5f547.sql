
-- Drop existing storage policies that require authentication
DROP POLICY IF EXISTS "Users can upload their own documents" ON storage.objects;
DROP POLICY IF EXISTS "Users can view their own documents" ON storage.objects;

-- Create more permissive policies for anonymous users
CREATE POLICY "Allow anonymous uploads to student-documents" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'student-documents');

CREATE POLICY "Allow anonymous access to student-documents" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'student-documents');

CREATE POLICY "Allow anonymous updates to student-documents" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'student-documents');

CREATE POLICY "Allow anonymous deletes from student-documents" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'student-documents');
