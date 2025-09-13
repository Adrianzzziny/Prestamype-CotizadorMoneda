import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { store } from "../store/store";
import { setRates } from "../store/currencySlice";

// Tu configuración de Firebase
const firebaseConfig = {  
  apiKey: "AIzaSyAs4-CG_yVDa4keSwGONSRb1kpA6usPEww",  
  authDomain: "exchangeratecs-6eea8.firebaseapp.com",  
  projectId: "exchangeratecs-6eea8", 
  storageBucket: "exchangeratecs-6eea8.appspot.com",  
  messagingSenderId: "1028871012583",  
  appId: "1:1028871012583:web:64dd5566da88be0cc16242"
};  

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Función para escuchar los cambios de las tasas
export const listenToRates = () => {
  const docRef = doc(db, "rates", "TDmXIypgLKKfNggHHSnw");

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const purchasePrice = data.purchase_price;
      const salePrice = data.sale_price;

      console.log("Tasas actualizadas:", { purchasePrice, salePrice });

      // Despachamos la acción
      store.dispatch(setRates({ purchasePrice, salePrice }));
    } else {
      console.log("No se encontró el documento de tasas!");
    }
  });
};
