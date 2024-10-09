import Link from "next/link";

function Header() {
  return (
    <header className="bg-red-300 py-4">
      <ul className="flex gap-4">
        <li className="p-2 bg-orange-500">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 bg-orange-500">
          <Link href="/about">About</Link>
        </li>
        <li className="p-2 bg-orange-500">
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
