export function Card({image, onClick}){
return(
    <>
    <div className="card-item" onClick={onClick}><img src={image} alt=""/></div>
    </>
)
}