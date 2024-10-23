import Link from "next/link";

function Header() {
  return (
    <header className="bg-blue-600 py-4">
      <ul className="flex gap-4">
        <li className="p-2 bg-blue-700 text-white hover:bg-blue-500 rounded-md">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 bg-blue-700 text-white hover:bg-blue-500 rounded-md">
          <Link href="/about">About</Link>
        </li>
        <li className="p-2 bg-blue-700 text-white hover:bg-blue-500 rounded-md">
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
