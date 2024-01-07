import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'flowbite-react';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [materialId, setMaterialId] = useState(null);
  const [materialFullName, setMaterialFullName] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5174/api/materials/${searchTerm}`,
      );
      setSearchResults(response.data.products);
      setMaterialId(response.data.id);
      setMaterialFullName(response.data.fullName);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  return (
    <div className='bg-sky-950 w-full h-screen m-0 p-0 bg-repeat'>
      <div className='flex justify-center items-center font-normal text-white  text-md  w-full py-6 text-lg'>
        Search for Materials
      </div>
      <div className='flex justify-center'>
        <div className='relative w-2/4 content-center '>
          <h1 className='flex justify-center items-center text-3xl font-bold tracking-tight text-white mt-[50px]'>
            Which Material detail are you looking for?
          </h1>
          <div className='flex items-center mt-8'>
            <input
              type='search'
              id='default-search'
              className='block w-full p-5 ps-10 text-lg text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-sky-500 focus:border-sky-500 backdrop-blur-md'
              placeholder='Search for Materials...'
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type='submit'
              className='text-white absolute end-2.5 bottom-2.5 bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-full text-md px-7 py-3  '
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-4'>
        {searchResults.map((product) => (
          <div className='grid grid-cols-3 grid-flow-dense gap-3 mt-4 w-2/4 justify-items-center '>
            <Card className='w-full col-span-3  flex flex-col justify-center '>
              <div className='bg-gradient-to-r from-sky-500 to-sky-800 w-full text-center py-4 rounded-md'>
                <h5 className='text-xl font-bold tracking-tight text-white'>
                  Material ID
                </h5>
              </div>
              <p className='font-bold text-gray-700 flex justify-center items-center'>
                {materialId}
              </p>
            </Card>
            <Card className='w-full  flex flex-col justify-center'>
              <div className='bg-gradient-to-r from-sky-500 to-sky-800 w-full text-center py-4 rounded-md'>
                <h5 className='text-xl font-bold tracking-tight text-white'>
                  Material
                </h5>
              </div>
              <p className='font-bold text-gray-700 flex justify-center items-center '>
                {materialFullName}
              </p>
            </Card>
            <Card className='w-full  flex flex-col justify-center'>
              <div className='bg-gradient-to-r from-sky-500 to-sky-800 w-full text-center py-4 rounded-md'>
                <h5 className='text-xl font-bold tracking-tight text-white'>
                  Brand
                </h5>
              </div>
              <p className='font-bold text-gray-700 flex justify-center items-center'>
                {product.brandTitle}
              </p>
            </Card>
            <Card className='w-full  flex flex-col justify-center'>
              <div className='bg-gradient-to-r from-sky-500 to-sky-800 w-full text-center py-4 rounded-md'>
                <h5 className='text-xl font-bold tracking-tight text-white'>
                  Manufacturer
                </h5>
              </div>
              <p className='font-bold text-gray-700 flex justify-center items-center'>
                {product.manufacturerTitle}
              </p>
            </Card>
            <Card className='w-full  flex flex-col justify-center'>
              <div className='bg-gradient-to-r from-sky-500 to-sky-800 w-full text-center py-4 rounded-md'>
                <h5 className='text-xl font-bold tracking-tight text-white'>
                  CAS
                </h5>
              </div>
              <p className='font-bold text-gray-700 flex justify-center items-center'>
                {product.cas}
              </p>
            </Card>
            <Card className='w-full  flex flex-col justify-center'>
              <div className='bg-gradient-to-r from-sky-500 to-sky-800 w-full text-center py-4 rounded-md'>
                <h5 className='text-xl font-bold tracking-tight text-white'>
                  GHG
                </h5>
              </div>
              <p className='font-bold text-gray-700 flex justify-center items-center'>
                {product.ghg}
              </p>
            </Card>
            <Card className='w-full  flex flex-col justify-center'>
              <div className='bg-gradient-to-r from-sky-500 to-sky-800 w-full text-center py-4 rounded-md'>
                <h5 className='text-xl font-bold tracking-tight text-white'>
                  Energy Input
                </h5>
              </div>
              <p className='font-bold text-gray-700 flex justify-center items-center'>
                {product.energyInput}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchForm;
