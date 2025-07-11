import React from 'react'
import { GithubIcon, TwitterIcon, LinkedinIcon, MailIcon } from 'lucide-react'
const Footer = () => {
  return (
    <footer className="px-8 mx-auto bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and info */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                UPLIFT
              </span>
              <div className="h-3 w-3 rounded-full bg-cyan-400 ml-1 animate-pulse"></div>
            </div>
            <p className="mb-4">
              Engineered like infrastructure.
              <br />
              Designed like magic.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <GithubIcon size={18} />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <LinkedinIcon size={18} />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <MailIcon size={18} />
              </a>
            </div>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                'System Architecture',
                'Custom CMS',
                'Web Development',
                'DevOps',
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <p className="mb-2">info@uplift.dev</p>
            <p>+1 (555) 123-4567</p>
            {/* Terminal-inspired element */}
            <div className="mt-4 p-3 bg-gray-900 border border-gray-800 rounded text-sm font-mono">
              <div className="flex items-center">
                <span className="text-green-400">$</span>
                <span className="ml-2">connect --with=UPLIFT</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} UPLIFT. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
