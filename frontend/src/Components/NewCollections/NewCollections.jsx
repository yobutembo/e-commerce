import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Items/Item'



const NewCollections = () => {
  const [new_collections, setNewCollections] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/newcollection")
    .then(response => response.json())
    .then((data) => {setNewCollections(data)})
  },[])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collections.map((item) => {
                return <Item 
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                />
            })}
        </div>
    </div>
  )
}

export default NewCollections