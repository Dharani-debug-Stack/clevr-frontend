import React from 'react';

const NavLinks = ({ navItems, isMobile }) => {
  const listClasses = isMobile
    ? 'flex flex-col gap-4 text-purple-950'
    : 'flex items-center font-bold gap-8 lg:gap-14';
  const itemClasses = isMobile
    ? 'list-none font-bold text-lg'
    : 'list-none hover:text-black hover:font-normal text-purple-950 text-lg transition-all duration-200';

  return (
    <ul className={listClasses}>
      {navItems.map((item) => (
        <li key={item.name} className={itemClasses}>
          {item.type === "route" ? (
            <Link to={item.to}>{item.name}</Link>
          ) : (
            <a href={item.href}>{item.name}</a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;