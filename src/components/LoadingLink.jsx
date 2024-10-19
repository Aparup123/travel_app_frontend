// eslint-disable-next-line react/prop-types
export default function LoadingLink({loading, children, type, onClick, className}){
    return (
        <button
            type={type}
            className={`link ${className}`}
            disabled={loading}
            onClick={onClick}
          >
            {loading?<span> <span className="loading loading-bars loading-sm "></span></span>:<p>{children}</p>} 
        </button>
    )
}