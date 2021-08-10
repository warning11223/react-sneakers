import Card from "./Components/Card/";
import Header from "./Components/Header";
import Index from "./Components/Drawer";
import {useEffect, useState} from "react";
import axios from "axios";
import {Route} from "react-router-dom";
import Home from "./Components/pages/Home";
import Favorites from "./Components/pages/Favorites";
import AppContext from "./context";
import Orders from "./Components/pages/Orders";



function App() {
    const [items, setItems] = useState([]);
    const [cartItem, setCartItem] = useState([]);
    const [cart, setCart] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const itemsResp = await axios.get('https://610a449252d56400176afc99.mockapi.io/items');
            const cartResp = await axios.get('https://610a449252d56400176afc99.mockapi.io/cart');
            const favoritesResp = await axios.get('https://610a449252d56400176afc99.mockapi.io/favorites');
            setIsLoading(false);

            setCartItem(cartResp.data);
            setFavorites(favoritesResp.data);
            setItems(itemsResp.data);

        }
        fetchData();
    }, [])


    const onAddToCart = (item) => {
        if (cartItem.find(fav => Number(fav.id) === Number(item.id))) {
            /*axios.delete(`https://610a449252d56400176afc99.mockapi.io/cart/${item.id}`);*/
            setCartItem(prev => prev.filter(obj => Number(obj.id) === Number(item.id)));
        } else {
            axios.post('https://610a449252d56400176afc99.mockapi.io/cart', item);
            setCartItem(prev => [...prev, item]);
        }

    }

    const onChangeInput = (event) => {
        setSearchValue(event.target.value);
        console.log(searchValue)
    }

    const onDeleteCart = (id) => {
        axios.delete(`https://610a449252d56400176afc99.mockapi.io/cart/${id}`);
        setCartItem(prev => prev.filter(item => item.id !== id));
    }

    const onAddFavorites = async (obj) => {
        if (favorites.find(fav => Number(fav.id) === Number(obj.id))) {
            axios.delete(`https://610a449252d56400176afc99.mockapi.io/favorites/${obj.id}`);
            setFavorites(prev => prev.filter(item => item.id !== obj.id))
        } else {
           const { data } = await axios.post('https://610a449252d56400176afc99.mockapi.io/favorites', obj);
            setFavorites(prev => [...prev, data]);
        }
    }

    const isItemAdded = (id) => {
        return cartItem.some((obj) => Number(obj.id) === Number(id));
    }

    const onCartClose = () => {
        setCart(!cart);
    }



  return (
      <AppContext.Provider value={{
          items,
          cartItem,
          favorites,
          onAddFavorites,
          onAddToCart,
          isItemAdded,
          onCartClose,
          setCartItem,
      }}>

          <div className="wrapper clear">
              <Index
                  setCartItem
                  cartItem={cartItem}
                  onCartClose={() => setCart(!cart)}
                  onDelete={onDeleteCart}
                  opened={cart}

              />

              <Header onCartClick={() => setCart(true)}/>

              <Route exact path={process.env.PUBLIC_URL + "/"}>
                  <Home
                      cartItem={cartItem}
                      searchValue={searchValue}
                      setSearchValue={setSearchValue}
                      onChangeInput={onChangeInput}
                      items={items}
                      onAddToCart={onAddToCart}
                      onAddFavorites={onAddFavorites}
                      isLoading={isLoading}

                  />
              </Route>

              <Route exact path={process.env.PUBLIC_URL + "favorites"}>
                <Favorites />
              </Route>

              <Route exact path={process.env.PUBLIC_URL + "orders"}>
                <Orders />
              </Route>


          </div>

      </AppContext.Provider>
  );
}

export default App;
