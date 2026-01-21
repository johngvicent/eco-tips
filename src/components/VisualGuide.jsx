import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';

const containers = [
  {
    color: 'bg-blue-500',
    name: 'Azul',
    items: ['Papel', 'Cartón', 'Revistas', 'Periódicos']
  },
  {
    color: 'bg-yellow-500',
    name: 'Amarillo',
    colorName: 'Amarillo',
    items: ['Plásticos', 'Metales', 'Latas', 'Bombillas', 'Baterías']
  },
  {
    color: 'bg-green-500',
    name: 'Verde',
    items: ['Vidrio', 'Botellas', 'Frascos']
  },
  {
    color: 'bg-amber-600',
    name: 'Marrón',
    items: ['Residuos orgánicos', 'Restos de comida', 'Jardín']
  },
  {
    color: 'bg-gray-500',
    name: 'Gris',
    items: ['Restos no reciclables', 'Cerámica', 'Pañales']
  }
];

const VisualGuide = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          <FaInfoCircle className="inline mr-2" />
          Guía Visual de Contenedores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {containers.map((container, index) => (
            <motion.div
              key={index}
              className={`cursor-pointer ${container.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow`}
              onClick={() => setSelected(selected === index ? null : index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold mb-2">{container.name}</h3>
              <p className="text-sm opacity-90">Haz clic para ver contenido</p>
            </motion.div>
          ))}
        </div>
        {selected !== null && (
          <motion.div
            className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Contenedor {containers[selected].name}
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {containers[selected].items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VisualGuide;