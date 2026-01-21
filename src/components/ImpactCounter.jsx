import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IMPACT_EQUIVALENTS } from '../constants';
import { FaLeaf, FaWater, FaBolt } from 'react-icons/fa';

const ImpactCounter = () => {
  const [recycled, setRecycled] = useState({});
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [totalWater, setTotalWater] = useState(0);

  const handleRecycle = (type) => {
    const newRecycled = { ...recycled };
    newRecycled[type] = (newRecycled[type] || 0) + 1;
    setRecycled(newRecycled);

    const impact = IMPACT_EQUIVALENTS[type];
    setTotalEnergy(prev => prev + impact.energia);
    setTotalWater(prev => prev + impact.agua);
  };

  const chartData = [
    { name: 'Ducha (5 min)', agua: 50 },
    { name: 'Baño', agua: 150 },
    { name: 'Tu Ahorro', agua: totalWater }
  ];

  return (
    <div className="bg-green-50 dark:bg-gray-800 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          <FaLeaf className="inline mr-2" />
          Calculadora de Impacto
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">¿Qué has reciclado hoy?</h3>
            <div className="space-y-2">
              {Object.keys(IMPACT_EQUIVALENTS).map(type => (
                <button
                  key={type}
                  onClick={() => handleRecycle(type)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} (+1)
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Tu Ahorro Ambiental</h3>
            <div className="space-y-4">
              <motion.div
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <FaBolt className="text-yellow-500 mr-2" />
                  <span className="text-gray-800 dark:text-white">Energía Ahorrada:</span>
                </div>
                <motion.p
                  className="text-2xl font-bold text-green-600"
                  key={totalEnergy}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {totalEnergy.toFixed(1)} kWh
                </motion.p>
              </motion.div>
              <motion.div
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center">
                  <FaWater className="text-blue-500 mr-2" />
                  <span className="text-gray-800 dark:text-white">Agua Ahorrada:</span>
                </div>
                <motion.p
                  className="text-2xl font-bold text-blue-600"
                  key={totalWater}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {totalWater.toFixed(1)} L
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
            Comparación de Consumo de Agua
          </h3>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="agua" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactCounter;