import React, { useState } from "react";

function PlantCard({plant, onDeletePlant, onUpdatePlant}) {
  const {id,name,image,price} = plant;
  const [inStock,setInStock] = useState(true);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`,{
      method:'DELETE',
    });
    
    onDeletePlant(id);
  };

  const handleUpdatePlant = (e) => {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({price:updatedPrice})
    })
      .then(r=>r.json())
      .then(updatedPlant=>{
        onUpdatePlant(updatedPlant);
      });
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button 
        className="primary" 
        onClick={()=>setInStock(!inStock)}
        >In Stock
        </button>
      ) : (
        <button
        onClick={()=>setInStock(!inStock)}
        >Out of Stock
        </button>
      )}
      <form onSubmit={handleUpdatePlant}>
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          placeholder="New price.."
          value={updatedPrice}
          onChange={(e)=>setUpdatedPrice(parseFloat(e.target.value,10))}
        />
        <button type="submit">Update Price</button>
      </form>
      <button
      onClick={handleDelete}
      >Delete</button>
    </li>
  );
}

export default PlantCard;
