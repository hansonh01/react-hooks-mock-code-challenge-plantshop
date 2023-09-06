import React, { useState } from "react";

function NewPlantForm({onAddPlant}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {name,image,price}

    fetch('http://localhost:6001/plants',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(r=>r.json())
      .then((data)=>{
        onAddPlant(data)
      })
    setName("");
    setImage("");
    setPrice(0);
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="name" 
        placeholder="Plant name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input 
        type="text" 
        name="image" 
        placeholder="Image URL" 
        value={image}
        onChange={(e)=>setImage(e.target.value)}
        />
        <input 
        type="number" 
        name="price" 
        step="0.01" 
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(parseInt(e.target.value,10))}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
