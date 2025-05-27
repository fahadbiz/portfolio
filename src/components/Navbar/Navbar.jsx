import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo1 from '../../assets/1.png';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '/About', current: false },
  { name: 'Portfolio', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
  { name: 'Blog', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-gray-900 via-[#0f0f0f] to-gray-900 bg-opacity-80 backdrop-blur-md relative"
    >
      {({ open }) => (
        <>
          <div className="max-w-1xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col">
              <div className="flex h-16 items-center justify-between">
                {/* Left: Toggle Button */}
                <div className="flex items-center">
                  <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}

                  </DisclosureButton>
                </div>
                {/* Center: Logo */}

                <div className="flex items-center">
                </div>
              </div>
              {/* Navigation Links (Always Visible in Mobile Style) */}
              <DisclosurePanel className="pt-2 pb-3 space-y-1">
              <div className="flex-shrink-0 pb-4 flex items-center justify-center">
                  <img className="block h-8 w-auto" src={logo1} alt="Muhammad Fahad" />
                </div>
                {navigation.map((item) => (
                  <> <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium transition transform hover:scale-105'
                    )}
                  >
                    {item.name}

                  </DisclosureButton>

                  </>
                ))}
               
              </DisclosurePanel>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
