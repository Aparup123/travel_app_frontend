import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error=useRouteError()
    console.log(error)
  return (
    
    <div className="flex justify-center">
        <div className="mt-12 text-center">
            <h1 className="text-5xl font-bold">OOOPS!</h1>
            <h2 className="text-2xl">Error {error.status} occured</h2>
            <p className="text-xl">{error.data.message}</p>
        </div>
    </div>
  )
}
