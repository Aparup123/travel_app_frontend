
// eslint-disable-next-line react/prop-types
export default function Button({loading, children, type, onClick}){
    return (
        <button
            type={type}
            className="btn btn-neutral btn-sm py-1"
            disabled={loading}
            onClick={onClick}
          >
            {loading?<span> <span className="loading loading-bars loading-sm "></span></span>:<p>{children}</p>} 
        </button>
    )
}