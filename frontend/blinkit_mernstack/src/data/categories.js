import React from 'react'

function categories() {
  return (
    <footer className="bg-gray-100 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-700">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold text-blinkitGreen mb-2">
              blinkit
            </h3>
            <p className="text-gray-600">
              Grocery delivery in minutes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Security</li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-semibold mb-2">We Deliver To</h4>
            <ul className="space-y-1">
              <li>Kolkata</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Bangalore</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">

          <p>© {new Date().getFullYear()} Blinkit Clone. All rights reserved.</p>

          <div className="flex gap-3">
            <button className="border px-3 py-1 rounded">
              Google Play
            </button>
            <button className="border px-3 py-1 rounded">
              App Store
            </button>
          </div>

        </div>

      </div>
    </footer>
  )
}

export default categories
