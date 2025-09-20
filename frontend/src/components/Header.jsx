const Header = () => {
  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      <h1 className="text-2xl font-bold">Carrito de Compras</h1>
      <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Ver Carrito 1
      </button>
    </header>
  );
};

export default Header;
