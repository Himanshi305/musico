import React from 'react'

const navbar = () => {
  return (
    <div>
      <nav className="absolute top-0 left-0 right-0 p-4">
        <div className="flex justify-between">
          <div className="text-white font-bold">Neko</div>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-black">Home</a></li>
            <li><a href="#" className="text-black">Profile</a></li>
            <li><a href="#" className="text-black">Settings</a></li>
        </ul>
        </div>
      </nav>
    </div>
  )
}

export default navbar
