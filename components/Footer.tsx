import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Strona Główna", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "O nas", href: "/o-nas" },
    { name: "Kontakt", href: "/kontakt" },
    { name: "Alergeny", href: "/alergeny" },
  ];

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <h3 className="text-2xl font-black tracking-tighter uppercase text-brand-red mb-4">Max Burger</h3>
            <p className="text-gray-400 max-w-sm mb-6">
              Prawdziwe rzemieślnicze burgery i chrupiąca pizza. Kładziemy nacisk na jakość, smak i świeżość wszystkich składników.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-yellow transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Zamówienia</h4>
            <p className="text-gray-400 mb-2">Darmowa dostawa do 50km!</p>
            <p className="text-gray-400 mb-4">Grybów, Gorlice, Stróże, Nowy Sącz</p>
            <a href="tel:+48123456789" className="text-2xl font-black text-brand-yellow hover:text-brand-red transition-colors">
              +48 123 456 789
            </a>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {currentYear} Max Burger. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link href="/regulamin" className="hover:text-white transition-colors">Regulamin</Link>
            <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka Prywatności</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
