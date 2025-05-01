import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Supabase client setup
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// API Routes

// Get all members
app.get('/api/members', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Get a single member by ID
app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Member not found' });
      }
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(`Error fetching member with ID ${id}:`, error);
    res.status(500).json({ error: 'Failed to fetch member details' });
  }
});

// Add a new member
app.post('/api/members', upload.single('profile_image'), async (req, res) => {
  try {
    const { full_name, role, email, contact_number } = req.body;
    const file = req.file;
    
    // Validate required fields
    if (!full_name || !role || !email || !contact_number) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    let profile_image_url = null;

    // Upload image to Supabase Storage if provided
    if (file) {
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('team-members')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded image
      const { data: urlData } = await supabase
        .storage
        .from('team-members')
        .getPublicUrl(filePath);

      profile_image_url = urlData.publicUrl;
    }

    // Insert member data into the database
    const { data, error } = await supabase
      .from('members')
      .insert([
        {
          full_name,
          role,
          email,
          contact_number,
          profile_image_url
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error adding new member:', error);
    res.status(500).json({ 
      error: 'Failed to add new member',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});