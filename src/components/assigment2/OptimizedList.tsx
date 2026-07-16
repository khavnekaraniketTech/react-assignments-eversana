import { useState, useMemo, useCallback, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import axios from 'axios';
import ProductItem from './ProductItem';
import type { Product } from '../../types';

export default function OptimizedList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndGenerateData = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products?limit=100');
                const apiProducts: Product[] = response.data.products;
                const massiveDataset: Product[] = [];
                for (let i = 0; i < 50; i++) {
                    massiveDataset.push(
                        ...apiProducts.map((p) => ({
                            ...p,

                            id: p.id + (i * 10000),
                            title: `${p.title} (Batch ${i + 1})`
                        }))
                    );
                }

                setProducts(massiveDataset);
            } catch (error) {
                console.error("Failed to fetch from DummyJSON", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndGenerateData();
    }, []);


    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        const term = searchTerm.toLowerCase();
        return products.filter((p) => p.title.toLowerCase().includes(term));
    }, [searchTerm, products]);


    const handleAction = useCallback((id: number) => {
        console.log(`Optimized action executed for Product ID: ${id}`);
        alert(`Triggered action on item ${id} without lagging the list!`);
    }, []);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">API Data All</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                    Fetched 100 items from <strong>DummyJSON</strong> and expanded to 5,000 for React stress-testing.
                </p>
            </div>

            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Filter massive dataset instantly..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm transition-all"
                />
                <span className="absolute right-4 top-3 text-xs text-gray-400 font-semibold bg-white px-2 py-1 border rounded-md shadow-sm">
                    {loading ? 'Loading API...' : `${filteredProducts.length} items`}
                </span>
            </div>

            <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-2 h-[550px]">
                {loading ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                        Fetching from DummyJSON...
                    </div>
                ) : filteredProducts.length > 0 ? (

                    <Virtuoso
                        style={{ height: '100%', width: '100%' }}
                        data={filteredProducts}
                        itemContent={(_, product) => (
                            <ProductItem
                                product={product}
                                onAction={handleAction}
                            />
                        )}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium text-sm bg-white border border-dashed rounded-xl">
                        No products found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </div>
    );
}