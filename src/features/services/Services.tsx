import { useGetServicesQuery } from "./servicesApi"

const Services = () => {
  const { data: services, isLoading, isSuccess, error } = useGetServicesQuery()
  if (isLoading) {
    return <p>Loading</p>
  }
  if (error) {
    if ("status" in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data)
      return (
        <div className="page" data-testid="error-message-container">
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      // you can access all properties of `SerializedError` here
      return <div className="page">{error.message}</div>
    }
  }
  return (
    <div data-testid="services-container">
      <h1>Dog services</h1>
      {isSuccess &&
        Object.values(services).map((service) => (
          <div key={service.id}>
            <p>{service.description}</p>
          </div>
        ))}
    </div>
  )
}

export default Services
