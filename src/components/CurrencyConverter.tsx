import { useEffect, useMemo } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/config';

// Hooks y acciones de Redux
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setRates, setAmount, swapDirection, setDirection } from '../store/currencySlice';
import { type RootState } from '../store/store';



export const CurrencyConverter = () => {
  // Obtenemos la función dispatch para poder ejecutar acciones
  const dispatch = useAppDispatch();

  // Leemos los datos del estado de Redux con useSelector
  const { purchasePrice, salePrice, amount, conversionDirection } = useAppSelector((state: RootState) => state.currency);

  {/* Estado para controlar el tab activo 1.0
    const [activeTab, setActiveTab] = useState<"compra" | "venta">("compra");
  */}

    {/* Función para establecer el tab activo 2.0 */}
    const activeTab = conversionDirection === "usdToPen" ? "compra" : "venta";

  // useEffect se ejecuta una vez para establecer la conexión con Firebase
  useEffect(() => {
    const docRef = doc(db, "rates", "TDmXIypgLKKfNggHHSnw");
    
    // onSnapshot escucha los cambios en tiempo real
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const { purchase_price, sale_price } = docSnap.data();
        // Cuando hay datos nuevos, despachamos la acción para actualizar el estado
        dispatch(setRates({ purchasePrice: purchase_price, salePrice: sale_price }));
      }
    });

    // Limpiamos la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, [dispatch]);


  // El cálculo de la conversión no cambia
  const calculatedResult = useMemo(() => {
    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    if (isNaN(numericAmount) || numericAmount <= 0 || salePrice === 0) return '0.00';

    if (conversionDirection === 'usdToPen') {
      return (numericAmount * purchasePrice).toFixed(2);
    } else {
      return (numericAmount / salePrice).toFixed(2);
    }
  }, [amount, purchasePrice, salePrice, conversionDirection]);

  // Lógica para el formato del input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const limitedValue = value.slice(0, 6);
    dispatch(setAmount(limitedValue));
  };
  
  // Definimos las etiquetas y símbolos según la dirección del cambio
  const sendCurrency = conversionDirection === 'usdToPen' ? { label: 'Dólares', symbol: '$' } : { label: 'Soles', symbol: 'S/' };
  const receiveCurrency = conversionDirection === 'usdToPen' ? { label: 'Soles', symbol: 'S/' } : { label: 'Dólares', symbol: '$' };


  return (
    <div className="min-h-screen bg-[#4A28AF] flex flex-col md:flex-row items-center justify-center font-sans p-4 space-y-6 md:space-y-0 md:space-x-10">

         {/*Contenedor del titulo*/}
        <div className='text-white text-center md:text-left font-sans'>
        <h1 className='text-5xl mb-2 font-semibold'>El mejor <br/> tipo de cambio</h1>
        <h3 className='text-2xl'>para cambiar dólares y soles<br/>online en Perú</h3>
        </div>

        {/* Tarjeta blanca del cotizador */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">

        {/* Sección de tasas de cambio (Compra y Venta) 
        <div className="flex border-b border-[#2F00FF]">
          <div className="flex-1 text-center py-2 text-lg font-semibold text-[#2F00FF]">
            Dólar compra <span className="block font-bold">{purchasePrice.toFixed(4)}</span>
          </div>
          <div className="flex-1 text-center py-2 text-lg font-semibold text-gray-500">
            Dólar venta <span className="block font-bold">{salePrice.toFixed(4)}</span>
          </div>
        </div>
        */}

             {/* Tabs Compra / Venta */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={
              () => dispatch(setDirection("usdToPen"))
              }
            className={`flex-1 py-2 text-center text-lg font-semibold ${
              activeTab === "compra"
                ? "text-[#2F00FF] border-b-2 border-[#2F00FF]"
                : "text-gray-500 hover:text-[#2F00FF]"
            }`}
          >
            Dólar compra<span className="block font-bold">{purchasePrice.toFixed(4)}</span>
          </button>
          <button
            onClick={
              () => dispatch(setDirection("penToUsd"))
              }
            className={`flex-1 py-2 text-center text-lg font-semibold ${
              activeTab === "venta"
                ? "text-[#2F00FF] border-b-2 border-[#2F00FF]"
                : "text-gray-500 hover:text-[#2F00FF]"
            }`}
          >
            Dólar venta <span className="block font-bold">{salePrice.toFixed(4)}</span>
          </button>
        </div>



         {/* Formulario de conversión */}
        <div className="relative flex flex-col items-center">

          {/* Input para la cantidad que se envía */}  
          <div className="w-full bg-gray-100 rounded-lg p-3 flex justify-between items-center mb-3 border border-[#6E46E6]">
            <span className="flex-1 bg-[#E7E7ED] text-[#6E46E6] font-semibold 
                   flex items-center justify-center h-full w-full">{sendCurrency.label}</span>
            <div className='flex-[3] flex items-center justify-end bg-gray-100 px-3 h-full w-full'>
              <span className="text-2xl font-bold text-gray-800 mr-6 bg-transparent">{sendCurrency.symbol}</span>
              <input 
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="text-right text-2xl font-bold text-gray-800 outline-none w-22 bg-transparent"
              />
            </div>
          </div>
          
           {/* Botón central para intercambiar */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={() => dispatch(swapDirection())}
                className="bg-[#6E46E6] text-white rounded-full p-3 shadow-lg hover:bg-[#4A28AF] transition-transform duration-200 active:scale-90">
                 <ArrowPathIcon className="h-6 w-6" />
              </button>
          </div>
          
          {/* Input/Display para la cantidad que recibes */}
          <div className="w-full bg-gray-100 rounded-lg p-3 flex justify-between items-center mt-3 border border-[#6E46E6]">
            <span className="flex-1 bg-[#E7E7ED] text-[#6E46E6] font-semibold">{receiveCurrency.label}</span>
            <div className='flex-[3] flex items-center justify-end bg-gray-100 px-3 h-full w-full'>
               <span className="text-2xl font-bold text-gray-800 mr-4">{receiveCurrency.symbol}</span>
               <span className="text-2xl font-bold text-gray-800">{calculatedResult}</span>
            </div>
          </div>
        </div>

         {/* Botón para iniciar la operación */}
        <button className="w-full bg-[#4A28AF] text-white font-bold py-4 rounded-lg text-lg hover:bg-[#6E46E6] transition-colors duration-300">
          Iniciar operación
        </button>
      </div>
    </div>
  );
};