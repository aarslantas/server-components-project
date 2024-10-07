import Link from "next/link";

function Header() {
  return (
    <header className="bg-red-300 py-4">
      <ul className="flex gap-4">
        <li className="p-2 bg-orange-500">
          <Link href="/">Anasayfa</Link>
        </li>
        <li className="p-2 bg-orange-500">
          <Link href="/about">Hakkımızda</Link>
        </li>
        <li className="p-2 bg-orange-500">
          <Link href="/persons">Persons</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
