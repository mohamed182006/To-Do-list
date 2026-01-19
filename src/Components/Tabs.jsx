export default Tabs;

function Tabs({filter,setFilter,img5,DeleteAll}){


    return(
   
        <>
     <div className='tabs'>

 
 <button  className={filter==="all"? "activeTab" : ""} onClick={()=>setFilter("all")}>All</button>



 <button  className={filter==="active"? "activeTab" : ""} onClick={()=>setFilter("active")}>Active</button>



 <button  className={filter==="completed"? "activeTab" : ""} onClick={()=>setFilter("completed")}>Completed</button>

   
 <img className="DeleteAll" alt="DeleteAll" onClick={()=>DeleteAll()} src={img5}/>

 </div>

 
 </>

)
}