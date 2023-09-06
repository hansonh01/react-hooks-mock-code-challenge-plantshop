import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    fetch('http://localhost:6001/plants')
      .then(r=>r.json())
      .then(data=>setPlants(data))
  },[])

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  };

  const handleDeletePlant = (id) => {
    const updatePlants = plants.filter((plant)=> plant.id !== id)
    setPlants(updatePlants)
  };

  const displaySearch = plants.filter((plant)=>{
    return plant.name.toLowerCase().includes(search.toLowerCase())
  })

  const handleUpdatePlants = (updatePlant) => {
    const updatedPlant = plants.map((plant)=>{
      if(plant.id === updatePlant.id){
        return updatePlant;
      }else{
        return plant;
      }
    });
    setPlants(updatedPlant)
  }
  

  return (
    <main>
      <NewPlantForm 
      onAddPlant={handleAddPlant}
      />
      <Search search={search} onSearch={setSearch}/>
      <PlantList 
      plants={displaySearch}
      onDeletePlant={handleDeletePlant}
      onUpdatePlant={handleUpdatePlants}
      />
    </main>
  );
}

export default PlantPage;
