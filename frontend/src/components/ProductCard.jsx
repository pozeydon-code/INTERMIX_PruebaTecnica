const ProductCard = ({ product }) => {
  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col">
      <img
        src={product.imageUrl}
        alt={product.nombre}
        className="h-70 w-full object-cover"
      />
      <div className="p-3 flex-1 flex flex-col">
        <h4 className="font-semibold leading-tight line-clamp-2">
          {product.nombre}
        </h4>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.descripcion}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-bold">${product.price}</span>
          <div className="flex gap-2">
            <button className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50">
              Detalle
            </button>
            <button className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
