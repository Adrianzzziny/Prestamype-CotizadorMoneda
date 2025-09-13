import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export const CurrencyConverter = () => {
  // Estado inicial para los valores de compra y venta (placeholders)
  const [buyPrice, setBuyPrice] = useState('3.9240');
  const [sellPrice, setSellPrice] = useState('3.9450');

  // Estado para saber qué pestaña está activa
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  return (
    // Contenedor principal
    <div className="min-h-screen bg-[#4A28AF] flex items-center justify-center font-sans p-4">

        {/*Contenedor del titulo*/}
        <div className='text-white mr-20 font-sans'>
        <h1 className='text-5xl mb-2 font-semibold'>El mejor <br/> tipo de cambio</h1>
        <h3 className='text-2xl'>para cambiar dólares y soles<br/>online en Perú</h3>
        </div>
      
      {/* Tarjeta blanca del cotizador */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
        
        {/* Sección de tasas de cambio (Compra y Venta) */}
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('buy')}
            className={`flex-1 text-center py-2 text-lg font-sans font-semibold transition-colors duration-300
              ${activeTab === 'buy' ? 'text-[#2F00FF] border-b-2 border-[#2F00FF]' : 'text-gray-500'}`}
          >
            Dólar compra <span className="block font-bold">{buyPrice}</span>
          </button>
          <button 
            onClick={() => setActiveTab('sell')}
            className={`flex-1 text-center py-2 text-lg font-sans font-semibold transition-colors duration-300
              ${activeTab === 'sell' ? 'text-[#2F00FF] border-b-2 border-[#2F00FF]' : 'text-gray-500'}`}
          >
            Dólar venta <span className="block font-bold">{sellPrice}</span>
          </button>
        </div>

        {/* Formulario de conversión */}
        <div className="relative flex flex-col items-center">
          
          {/* Input para la cantidad que se envía */}
          <div className="w-full border rounded-lg p-3 flex justify-between items-center mb-1">
            <span className="text-gray-500">Dólares</span>
            <span className="text-2xl font-bold text-gray-800">$</span>
            <input 
              type="text"
              placeholder="0.00"
              className="text-right text-2xl font-bold text-gray-800 outline-none w-1/2"
              defaultValue="1000" // Valor de ejemplo
            />
          </div>
          
          {/* Botón central para intercambiar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button className="bg-[#6E46E6] text-white rounded-full p-3 shadow-lg hover:bg-[#4A28AF] transition-transform duration-200 active:scale-90">
                 <ArrowPathIcon className="h-6 w-6" />
              </button>
          </div>
          
          {/* Input/Display para la cantidad que recibes */}
          <div className="w-full border rounded-lg p-3 flex justify-between items-center mt-1">
            <span className="text-gray-500">Soles</span>
             <span className="text-2xl font-bold text-gray-800">S/</span>
            <span className="text-2xl font-bold text-gray-800">3924.00</span> {/* Valor de ejemplo */}
          </div>

        </div>

        {/* Botón para iniciar la operación */}
        <button className="w-full bg-[#4A28AF] text-white font-bold py-4 rounded-lg text-lg hover:bg-[#6E46E6] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Iniciar operación
        </button>

      </div>
    </div>
  );
};