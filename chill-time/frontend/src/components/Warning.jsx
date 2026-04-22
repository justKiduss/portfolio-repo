export default function Warning({onConfirm,onCancel}){
    return(
        <>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"80px",height:"70px",margin:"0px 0px 0px 20px"}}>
                <div>
                <p>are you sure?</p>
                <div style={{display:"flex",gap:"10px"}}>
                    <button onClick={onConfirm}>yes</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
                </div>
            </div>
        </>
    )
}