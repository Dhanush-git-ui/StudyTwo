import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import '../styles/flashcard.css';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardViewerProps {
  flashcards: Flashcard[];
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ flashcards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentCardIndex];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentCardIndex]);

  const toggleCard = () => {
    setIsFlipped(!isFlipped);
  };

  const goToNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const resetDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleCard();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentCardIndex, flashcards.length]);

  const formatContent = (content: string) => {
    const paragraphs = content.split(/\n\s*\n/g).filter(p => p.trim());
    return (
      <div className="text-left">
        {paragraphs.map((para, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {para}
          </p>
        ))}
      </div>
    );
  };

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No flashcards available
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with progress and controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Flashcards
          </h2>
          <span className="text-gray-500 dark:text-gray-400">
            {currentCardIndex + 1} of {flashcards.length}
          </span>
        </div>
        <button
          onClick={resetDeck}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      {/* Main flashcard */}
      <div className="flex justify-center mb-8">
        <div
          className="relative cursor-pointer group perspective-1000 card-hover-effect w-full max-w-2xl" // Increased max-width
          onClick={toggleCard}
        >
          <div
            className={`flashcard-single transition-transform preserve-3d transform-gpu duration-700 ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <div className="flashcard-front-single backface-hidden">
              <div className={`difficulty-badge difficulty-${currentCard.difficulty}`}>
                {currentCard.difficulty}
              </div>
              <div className="flashcard-content-single">
                {formatContent(currentCard.front)}
              </div>
              <div className="flashcard-label-single">
                Click to reveal answer
              </div>
            </div>

            {/* Back */}
            <div className="flashcard-back-single backface-hidden rotate-y-180">
              <div className="flashcard-content-single">
                {formatContent(currentCard.back)}
              </div>
              <div className="flashcard-label-single">
                Click to see question
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center space-x-6">
        <button
          onClick={goToPrevious}
          disabled={currentCardIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>
        
        <div className="flex space-x-2">
          {flashcards.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentCardIndex(index);
                setIsFlipped(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentCardIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentCardIndex === flashcards.length - 1}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardViewer;
