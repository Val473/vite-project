import { useEffect, useState } from 'react'


function App() {

  const [tache, setTache] = useState<string>('')
  const savedListTaches = localStorage.getItem('ListTaches')
  const initialListTaches = savedListTaches ? JSON.parse(savedListTaches) : []
  const [listTaches, setListTaches] = useState< { id: number; text: string }[]>(initialListTaches)

  useEffect(() => {
    localStorage.setItem('ListTaches', JSON.stringify(listTaches))
  }, [listTaches])

  
  function ListTache() {
    if (tache.trim() === '') {
      alert('Veuillez entrer une tache')
      return
    } 

    const newTache = {      
      id: Date.now(),
      text: tache.trim(),
    }

    const newTaches = [ newTache, ...listTaches]

    setListTaches(newTaches)
    setTache('')
    console.log(newTaches)
      
    
  }

  return (
    <div className=" flex flex-col justify-center items-center ">
      <h1 className=" text-2xl font-bold mb-4 ">TODO_LIST</h1>

      <div className=" flex flex-col my-2 p-4 gap-4 justify-center items-center">
          <input 
          type="text" 
          placeholder="Enter une tache..." 
          className=" border-3 border-gray-300 rounded-lg p-3 w-full" 
          value={tache}
          onChange={(e) => setTache(e.target.value)} 
          />
          <button onClick = {ListTache} className=" btn btn-primary">
            Ajouter
          </button>

            Listes des taches
            <div className="">
              <div className=" border-2 border-gray-300 rounded-lg p-4 w-full">
                 <div className=''>
                  {listTaches.map((tache: any) => (
                    <div key={tache.id} className=" flex justify-between items-center border-b-2 border-gray-300 p-2">
                      <span>{tache.text}</span>
                      <button 
                      onClick={() => {
                        const newTaches = listTaches.filter((t) => t.id !== tache.id)
                        setListTaches(newTaches)
                      }} 
                      className=" btn btn-danger" >
                        Supprimer
                        </button>
                      <button 
                      onClick={() => {
                        const newText = prompt('Modifier la tâche:', tache.text)
                        if (newText !== null) {
                          const newTaches = listTaches.map((t) => t.id === tache.id ? { ...t, text: newText.trim() } : t)
                          setListTaches(newTaches)
                        }
                      }}
                      className=" btn btn-warning " >
                        Modifier
                      </button>
                    </div>
                  ))}
                 </div>
              </div>
            </div>
      </div>



    </div>

  )
}

export default App
