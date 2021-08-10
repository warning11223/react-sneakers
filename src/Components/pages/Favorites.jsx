import Card from "../Card";
import {Route} from "react-router-dom";
import {useContext} from "react";
import AppContext from "../../context";


function Favorites() {
    const {favorites, items, onAddFavorites, onAddToCart, } = useContext(AppContext);



    return (

            <div className="content p-40">
                <div className="d-flex justify-between mb-40 align-center">
                    <h1>Мои закладки</h1>
                </div>
                <div className="d-flex flex-wrap ">

                    {favorites.map((item, index) => {
                        return <Card
                            favorited={true}
                            key={index}
                            onCardClick={() => onAddToCart(item)}
                            onAddFav={(obj) => onAddFavorites(obj)}
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

export default Favorites;