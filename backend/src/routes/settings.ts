import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';
import { PomodoroSettings } from '../types/index.js';

const router = Router();

// Get user settings
router.get('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json(null);
    }

    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json(data || null);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update or create settings
router.put('/', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const settings: Omit<PomodoroSettings, 'id'> = {
      ...req.body,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from('settings')
      .upsert([settings], { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
