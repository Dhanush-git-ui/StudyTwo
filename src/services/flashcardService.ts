// Enhanced flashcard generation service

export async function generateEnhancedFlashcards(topic: string, geminiApiKey: string) {
  try {
    if (!geminiApiKey) {
      throw new Error('Gemini API key not found');
    }

    const prompt = `You are an expert educator. Generate exactly 8 flashcards that together give a comprehensive overview of ${topic}. Format your response as a JSON array of flashcards.

For each flashcard:
1. Front side: A clear question or key concept about ${topic}
2. Back side: Structure the answer as bullet points, with:
   - Main point or definition
   - 2-3 key supporting details or examples
   - Any important relationships or connections
3. Difficulty: Mark as "easy", "medium", or "hard"

Format as:
[
  {
    "front": "Clear question or concept",
    "back": "• Main point/definition\\n• Supporting detail 1\\n• Supporting detail 2\\n• Key relationship",
    "difficulty": "easy|medium|hard"
  }
]

Make sure:
- Cards progress from fundamentals to advanced concepts
- Content is concise but informative
- Each card builds upon previous knowledge
- Include practical applications where relevant`;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!raw) throw new Error('No flashcard data returned from Gemini');
    
    // Clean up and parse the JSON response
    const jsonStr = raw.replace(/```json|```/g, "").trim();
    const flashcards = JSON.parse(jsonStr);

    return flashcards.map((card: any, index: number) => ({
      id: `fc-${index + 1}`,
      front: card.front.trim(),
      back: card.back.trim(),
      difficulty: card.difficulty || 'medium'
    }));
  } catch (error) {
    console.error('Enhanced flashcard generation error:', error);
    throw error;
  }
}
