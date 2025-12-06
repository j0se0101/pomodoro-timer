import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';
import { PomodoroSession } from '../types/index.js';

const router = Router();

// Get all sessions for a user
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    
    console.log('📊 Fetching sessions, userId:', userId || 'anonymous');
    
    let query = supabase.from('sessions').select('*').order('completed_at', { ascending: false });
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.is('user_id', null);
    }

    const { data, error } = await query;

    if (error) {
      console.error('❌ Error fetching sessions:', error);
      throw error;
    }

    console.log('✅ Sessions fetched:', data?.length || 0);
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Create a new session
router.post('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const session: Omit<PomodoroSession, 'id'> = {
      ...req.body,
      user_id: req.userId || null,
    };

    const { data, error } = await supabase
      .from('sessions')
      .insert([session])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating session:', error);
      throw error;
    }

    console.log('✅ Session created:', data);
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Get sessions by date range
router.get('/range', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const { start, end } = req.query;
    const userId = req.userId;

    let query = supabase
      .from('sessions')
      .select('*')
      .gte('completed_at', start as string)
      .lte('completed_at', end as string);

    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.is('user_id', null);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching sessions by range:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// DESARROLLO: Seed data
router.post('/seed', async (req, res) => {
  try {
    const sampleSessions = [
      {
        type: 'work',
        duration: 1500,
        completed_at: new Date().toISOString(),
        user_id: null,
      },
      {
        type: 'shortBreak',
        duration: 300,
        completed_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        user_id: null,
      },
    ];

    const { data, error } = await supabase
      .from('sessions')
      .insert(sampleSessions)
      .select();

    if (error) throw error;

    res.json({ message: 'Sample data created', data });
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ error: 'Failed to seed data' });
  }
});

export default router;
