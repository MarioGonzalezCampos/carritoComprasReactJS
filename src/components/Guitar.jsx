import React from 'react'

const Guitar = ({guitar, cart, setCart}) => {
    
    const {id, name, image, price, description} = guitar

    const handleClick = (guitar) => {

        const itemExists = cart.findIndex(item => item.id === guitar.id)
        
        if(itemExists >= 0) {
            console.log('El item ya existe')
            if(cart[itemExists].quantity >= 5) return
            const updatedCart = [...cart]       // copiamos el carrito actual para no mutarlo
            updatedCart[itemExists].quantity++  // aumentamos la cantidad del item
            setCart(updatedCart)                // actualizamos el carrito
        } else{
            console.log('El item no existe!, agregando....')
            guitar.quantity = 1
            setCart([...cart, guitar])
        }
    }

    return (
        <>
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => handleClick(guitar)} // setCartr([...cart, guitar])  // setCart(prevCart => [...prevCart, guitar]) *de esta forma no pasamos cart como prop
                    >Agregar al Carrito</button>
                </div>
            </div>
        </>
    )
}

export default Guitar