import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark/80 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold gradient-text mb-4">NEXUHUB</h3>
            <p className="text-gray-400 max-w-xs">
              The next generation 3D marketplace for premium game accounts. Secure, fast, and immersive.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-accent">Marketplace</a></li>
              <li><a href="#" className="hover:text-accent">Game Categories</a></li>
              <li><a href="#" className="hover:text-accent">Seller Program</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NexuHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
