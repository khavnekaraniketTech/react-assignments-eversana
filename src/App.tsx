import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Assignment1Page from './pages/Assignment1Page'; 
import OptimizedList from './components/assigment2/OptimizedList'; // <-- Uncomment this import

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/assignment-1" replace />} />
          <Route path="assignment-1" element={<Assignment1Page />} />
          
          {/* Assignment 2 Route - Fully Hooked Up! */}
          <Route path="assignment-2" element={
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900">Assignment 2</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Demonstrates optimization frameworks avoiding computational bottlenecks inside list calculations.
                </p>
              </div>
              <OptimizedList /> {/* <-- Swapped out the old placeholder comment */}
            </div>
          } />
          
          <Route path="*" element={<Navigate to="/assignment-1" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}