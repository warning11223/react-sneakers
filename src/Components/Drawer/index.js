import Info from "../Info";
import {useState} from "react";
import axios from "axios";
import {useCart} from "../hooks/useCart";
import styles from './Drawer.module.scss'


function Index({onCartClose, onDelete, opened}) {
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const {cartItem, totalPrice, setCartItem} = useCart();

    const onClickOrder = async () => {
        try {
            const {data} = await axios.post('https://610a449252d56400176afc99.mockapi.io/orders', cartItem);
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItem([]);
        } catch (error) {
            alert('Не удалось создать заказ :(')
        }
    }


    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}` }>
            <div className={styles.drawer}>
                <h2 className="mb-30 d-flex justify-between">
                    Корзина
                    <img onClick={onCartClose} className="removeBtn" src="img/btn-remove.svg" alt="remove"/>
                </h2>

                {
                    cartItem.length > 0 ?
                        <>
                            <div className="items">
                                {cartItem.map(item => {
                                    return <div className="cartItem d-flex justify-between align-center mb-20">
                                        <img className="cartItemImg" width={140}  src={item.imageUrl} alt="sneakers"/>
                                        <div className="mr-20">
                                            <p className="mb-5">{item.name}</p>
                                            <b>{item.price} грн.</b>
                                        </div>
                                        <img onClick={() => onDelete(item.id)} className="removeBtn" src="img/btn-remove.svg" alt="remove"/>
                                    </div>
                                })}
                            </div>
                            <ul className="cartTotalBlock">
                                <li>
                                    <span>Итого: </span>
                                    <div></div>
                                    <b>{totalPrice} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{(totalPrice /100) * 5} руб. </b>
                                </li>
                            </ul>
                            <button onClick={onClickOrder} className="greenBtn">
                                Оформить заказ
                                <img  src="img/arrow.svg" alt="arrow"/>
                            </button>
                        </>
                        :
                        <Info
                            description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : "Добавьте сюда свой заказ."}
                            image={isOrderComplete ? "img/complete-order.jpg" : "img/cart-empty.jpg"}
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        />
                }



            </div>
        </div>
    )
}

export default Index;