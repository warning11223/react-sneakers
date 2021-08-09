import {Route} from "react-router-dom";
import Card from "../Card";
import AppContext from "../../context";
import {useContext} from "react";

function Home({
                  onChangeInput,
                  items,
                  onAddFavorites,
                  onAddToCart,
                  searchValue,
                  setSearchValue,
                  cartItem,
                  isLoading
}) {

    const {isItemAdded} = useContext(AppContext);

    const renderItems = () => {
        return ( isLoading ? [...Array(8)] : items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))).map((item, index) => (
                 <Card
                    key={index}
                    onCardClick={() => onAddToCart(item)}
                    onAddFav={() => onAddFavorites(item)}
                    /*name={item.name}
                    price={item.price}*/
                    /*imageUrl={item.imageUrl}*/
                    added={isItemAdded( item && item.id)}
                    loading={isLoading}
                    {...item}
                />
            ))
    };




    return (
        <Route exact path="/">
            <div className="content p-40">
                <div className="d-flex justify-between mb-40 align-center">
                    <h1 className="">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                    <div className="search-block d-flex input">
                        <img src="/img/search.svg" alt="search"/>
                        {searchValue ? <img onClick={() => setSearchValue('')} className="removeBtn removeInput" src="/img/btn-remove.svg" alt="remove"/> : null}
                        <input onChange={onChangeInput} value={searchValue} type="text" placeholder="Поиск..."/>
                    </div>
                </div>



                <div className="d-flex flex-wrap ">

                    {
                        renderItems()
                    }

                </div>

            </div>
        </Route>
    )
}


export default Home;