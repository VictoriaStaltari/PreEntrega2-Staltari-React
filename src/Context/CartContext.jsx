import { createContext, useState } from "react";

export  const CartContext = createContext({
    cart: []
})

export const CartProvider = ({children})=>{
    const [cart, setCart] = useState([])
    console.log(cart)

    const isInCart = (itemId)=>{
        return cart.some(prod => prod.item.id == itemId)
        }

    const addItem = (item, quantity)=> {
        
        if (!isInCart(item.id)){
            setCart(prev=> [...prev, {item, quantity}])
        } else {
            console.error("El producto ya ha sido agregado")
        }
    }

    const removeItem = (itemId)=>{
        const cartUpdated = cart.filter(prod=> prod.item.id !== itemId)
        setCart(cartUpdated)
    }

    const clearCart = ()=>{
        setCart([])
    }

    const totalQuantity = cart.reduce((sum,prod)=> {
            sum += prod.quantity
            return sum
        },0)
        
    const total = cart.reduce((sum, prod)=>{
            sum += (prod.quantity)*(prod.item.price)
            return sum
        },0)

    return (
        <CartContext.Provider value={{cart, addItem, removeItem, clearCart, totalQuantity, total}}>
            {children}
        </CartContext.Provider>
    )
}