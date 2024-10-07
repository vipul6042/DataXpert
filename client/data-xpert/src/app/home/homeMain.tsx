import React from 'react';
import { Top } from './top';
import SearchBar from '@/components/searchbar';

interface TopProps {
  prop: string;
}


const HomeMain: React.FC = () => {
  return (
    <div className="p-6">
      <div className="text-[3.5rem] font-bold text-center">All things finance,</div>
      <div className="text-[3.5rem] font-bold text-center">right here.</div>

      <SearchBar/>

      <div className="mt-6">
        <div className="text-xl font-semibold">Top market cap</div>
        <Top prop="market_cap" />
      </div>

      <div className="mt-4">
        <div className="text-xl font-semibold">Top diversity</div>
        <Top prop="diversity" />
      </div>

      <div className="mt-4">
        <div className="text-xl font-semibold">Top Stocks </div>
        <Top prop="stock_price_2024" />
      </div>

      <div className="mt-4">
        <div className="text-xl font-semibold">Top Revenue</div>
        <Top prop="revenue_2024" />
      </div>
    </div>
  );
};

export default HomeMain;
