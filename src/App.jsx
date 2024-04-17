import { useState } from "react"

import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {
  
    //State
    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    const MAX_QUANTITY = 5

    const removeItemCart = (id) => {
        setCart(prevCar => prevCar.filter(item => item.id !== id))
    }

    // Incrementar la cantidad de guitarras
    const increseQuantity = (id) => {
        const updatedCard = cart.map( item => {    // Primero creamos una copia del carrito
            if(item.id === id && item.quantity < MAX_QUANTITY ){                     // Si el id del item es igual al id que estamos buscando
                return {                            // retornamos un nuevo objeto con la cantidad incrementada
                    ...item,                        // copiamos el item
                    quantity: item.quantity + 1     // incrementamos la cantidad
                }
            }
            return item                             // si no es el item que estamos buscando retornamos el item tal cual
        })
        setCart(updatedCard)                        // actualizamos el carrito
    }

    console.log(cart)
    return (
        <>
            <Header cart={cart} removeItemCart={removeItemCart} increseQuantity={increseQuantity} />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar key={guitar.id} guitar={guitar} setCart={setCart} cart={cart}/>
                    ))}         
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
