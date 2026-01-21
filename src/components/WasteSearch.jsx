import { useState, useEffect } from 'react';
import { WASTE_DATA } from '../constants';
import { motion } from 'framer-motion';
import { FaSearch, FaRecycle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const LIGHT_BG_BY_COLOR = {
  'bg-blue-500': 'bg-blue-100',
  'bg-yellow-500': 'bg-yellow-100',
  'bg-green-500': 'bg-green-100',
  'bg-amber-600': 'bg-amber-100',
  'bg-gray-500': 'bg-gray-100',
  'bg-purple-500': 'bg-purple-100',
  'bg-pink-500': 'bg-pink-100',
  'bg-red-500': 'bg-red-100'
};

const WasteSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [bgColor, setBgColor] = useState('bg-white dark:bg-gray-900');
  const [activeTab, setActiveTab] = useState('tip');

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setBgColor('bg-white dark:bg-gray-900');
      return;
    }

    const filtered = WASTE_DATA.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.examples.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);

    if (filtered.length > 0) {
      const first = filtered[0];
      const lightBg = LIGHT_BG_BY_COLOR[first.color] ?? 'bg-white';
      setBgColor(`${lightBg} dark:bg-gray-900`);
    } else {
      setBgColor('bg-white dark:bg-gray-900');
    }
  }, [query]);

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-500 ${bgColor}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          <FaSearch className="inline mr-2" />
          Buscador de Residuos
        </h2>
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Escribe un objeto (ej. Bombilla)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        {results.length > 0 && (
          <motion.div
            className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Tab buttons */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setActiveTab('tip')}
                className={`px-4 py-2 rounded-l-lg flex items-center ${
                  activeTab === 'tip'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FaInfoCircle className="mr-2" />
                Consejo
              </button>
              <button
                onClick={() => setActiveTab('avoid')}
                className={`px-4 py-2 rounded-r-lg flex items-center ${
                  activeTab === 'avoid'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <FaExclamationTriangle className="mr-2" />
                Evitar
              </button>
            </div>
            {results.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`inline-block w-16 h-16 rounded-full ${item.color} mb-4 flex items-center justify-center`}>
                  <FaRecycle className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Contenedor: {item.container}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {activeTab === 'tip' ? item.tip : item.avoid}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WasteSearch;