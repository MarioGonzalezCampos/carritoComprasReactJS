import { useEffect, useState } from "react"
import { db } from "../data/db"

export const useCart = () => {

    // Initial State
    const initialCart = () => {
        const localData = localStorage.getItem('cart')
        return localData ? JSON.parse(localData) : []
    }
  
    //State
    const [data, setData] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_QUANTITY = 5
    const MIN_QUANTITY = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

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
    // Decrementar la cantidad de guitarras
    const decreaseQuantity = (id) => {
        //console.log('Decrementando cantidad')
        const updatedCard = cart.map( item => {    // Primero creamos una copia del carrito
            if(item.id === id && item.quantity > MIN_QUANTITY ){                     // Si el id del item es igual al id que estamos buscando
                return {                            // retornamos un nuevo objeto con la cantidad incrementada
                    ...item,                        // copiamos el item
                    quantity: item.quantity - 1     // incrementamos la cantidad
                }
            }
            return item                             // si no es el item que estamos buscando retornamos el item tal cual
        })
        setCart(updatedCard)                        // actualizamos el carrito 
    }

    const clearCart = () => {
        setCart([])
    }

    // STATE DERIVADO
    const isEmptyh = () => cart.length === 0

    // TOTAL A PAGAR
    const cartTotal = () => cart.reduce( ( total, item ) => total + (item.quantity * item.price), 0)

    return { 
        data, 
        cart, 
        setCart, 
        removeItemCart, 
        increseQuantity, 
        decreaseQuantity, 
        clearCart,
        isEmptyh,
        cartTotal
    }

}
