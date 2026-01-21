import { useState } from 'react';
import { motion } from 'framer-motion';
import { ECO_TIPS } from '../constants';
import { FaLightbulb } from 'react-icons/fa';

const EcoTips = () => {
  const [currentTip, setCurrentTip] = useState('');

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * ECO_TIPS.length);
    setCurrentTip(ECO_TIPS[randomIndex]);
  };

  return (
    <div className="bg-yellow-50 dark:bg-gray-800 min-h-screen py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          <FaLightbulb className="inline mr-2" />
          Eco-Tips Aleatorios
        </h2>
        <button
          onClick={getRandomTip}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-8"
        >
          ¡Dame un Tip!
        </button>
        {currentTip && (
          <motion.div
            className="max-w-md mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-800 dark:text-white">{currentTip}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EcoTips;