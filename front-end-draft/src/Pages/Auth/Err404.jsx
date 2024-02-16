import { NavLink } from 'react-router-dom'
import './err404.css'
const Err404 = () => {
  return (
    <div className="flex-container err404">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">4</span>
          <span className="fade-in" id="digit2">0</span>
          <span className="fade-in" id="digit3">4</span>
        </h1>
        <h3 className="fadeIn">PAGE NOT FOUND</h3>
        <NavLink to='/'>Return To Home</NavLink>
      </div>
    </div>
  )
}

export default Err404