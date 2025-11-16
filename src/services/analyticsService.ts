const BASE_URL = (import.meta.env.VITE_ANALYTICS_URL as string) || 'http://localhost:5050';

type ActivityPayload = {
  type: string;
  detail?: string;
  metadata?: Record<string, unknown>;
};

type SearchPayload = {
  query: string;
  resultsCount: number;
  source: 'youtube' | 'articles' | 'papers' | string;
};

type LearningPayload = {
  title: string;
  content: string;
  tags?: string[];
};

export const AnalyticsService = {
  async logActivity(payload: ActivityPayload): Promise<void> {
    try {
      await fetch(`${BASE_URL}/api/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Failed to log activity', err);
    }
  },

  async logSearch(payload: SearchPayload): Promise<void> {
    try {
      await fetch(`${BASE_URL}/api/searches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Failed to log search', err);
    }
  },

  async logLearning(payload: LearningPayload): Promise<void> {
    try {
      await fetch(`${BASE_URL}/api/learnings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Failed to log learning', err);
    }
  },

  async getActivity() {
    const res = await fetch(`${BASE_URL}/api/activity`);
    return res.json();
  },

  async getSearches() {
    const res = await fetch(`${BASE_URL}/api/searches`);
    return res.json();
  },

  async getLearnings() {
    const res = await fetch(`${BASE_URL}/api/learnings`);
    return res.json();
  }
};


