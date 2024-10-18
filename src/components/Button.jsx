
// eslint-disable-next-line react/prop-types
export default function Button({loading, children, type, onClick, className}){
    return (
        <button
            type={type}
            className={`btn btn-neutral py-1 ${className}`}
            disabled={loading}
            onClick={onClick}
          >
            {loading?<span> <span className="loading loading-bars loading-sm "></span></span>:<p>{children}</p>} 
        </button>
    )
}