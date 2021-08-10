import React, {useEffect, useState} from "react";
import Card from "../Card";
import {Route} from "react-router-dom";
import axios from "axios";


const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const { data } = await axios.get('https://610a449252d56400176afc99.mockapi.io/orders');
                setOrders(data)
            })()
        } catch (err) {
            alert('Error')
        }

    }, [])
    console.log(orders)


    return (

            <div className="content p-40">
                <div className="d-flex justify-between mb-40 align-center">
                    <h1>Мои заказы</h1>
                </div>
                <div className="d-flex flex-wrap ">
                    {orders.map((item, index) => {
                        return <Card
                            favorited={true}
                            key={index}
                            // onCardClick={() => onAddToCart(item)}
                            // onAddFav={(obj) => onAddFavorites(obj)}
                            name={item.name}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            {...item}
                        />
                    })}

                </div>
            </div>
    )
}

export default Orders;