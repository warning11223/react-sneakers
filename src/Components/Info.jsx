import React, {useContext, useState} from "react";
import AppContext from "../context";



const Info = ({title, description, image}) => {
    const {onCartClose} = useContext(AppContext);


    return (
        <div className="cartEmpty d-flex justify-center flex-column flex">
            <img width={120} className="mb-20 cartImage" src={image} alt=""/>
            <h2 className="mb-15" style={{color: 'green'}}>{title}</h2>
            <p className="opacity-6 text-center paragraph mb-45">{description}</p>
            <button onClick={onCartClose} className="greenButton">
                <img src="img/arrow.svg" alt=""/> Вернуться назад
            </button>
        </div>
    )

}

export default Info;