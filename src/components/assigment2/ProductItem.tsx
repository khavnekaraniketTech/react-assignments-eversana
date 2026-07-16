import React from 'react';
import type { Product } from '../../types';

interface Props {
  product: Product;
  onAction: (id: number) => void;
}

const ProductItem = React.memo(({ product, onAction }: Props) => {
  return (
    <div className="px-2 py-2">
      <div className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-blue-300 transition-all group">
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
            <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-md">
              {product.description}
            </p>
          </div>
        </div>

        {/* Right side: Price and Button */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-emerald-600 text-sm bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => onAction(product.id)} 
            className="px-3.5 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 text-xs font-semibold rounded-lg transition-colors border border-gray-200"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProductItem;