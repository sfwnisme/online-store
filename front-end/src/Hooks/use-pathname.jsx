const usePathname = () => {
  const id = window.location.pathname.split('/').pop()
  const pathname = window.location.pathname
  console.log(pathname)
  console.log(id)
  return { id, pathname }
}

export default usePathname

/** NOTES
 * this hook handle the endpoint id and the pathname instead of react-router-hooks
 * @returns {id:string, pathname:string}
 * @returns id - you can use it instead of useParams()
 * @returns pathname - instead of pathname destructured from useLoaction()
 */