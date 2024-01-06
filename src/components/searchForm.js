import React, { useState } from 'react';
import axios from 'axios';
import { Table } from 'flowbite-react';

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
    <form onSubmit={(e) => e.preventDefault()}>
      <label
        htmlFor='default-search'
        className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
      >
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='default-search'
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search for Materials...'
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type='submit'
          className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className='overflow-x-auto mt-4'>
        {searchResults.length > 0 && (
          <Table>
            <Table.Head>
              <Table.HeadCell>Material ID</Table.HeadCell>
              <Table.HeadCell>Material FullName</Table.HeadCell>
              <Table.HeadCell>Brand Title</Table.HeadCell>
              <Table.HeadCell>Manufacturer Title</Table.HeadCell>
              <Table.HeadCell>CAS</Table.HeadCell>
              <Table.HeadCell>GHG</Table.HeadCell>
              <Table.HeadCell>Energy Input</Table.HeadCell>
              <Table.HeadCell>EU Regulation</Table.HeadCell>
              <Table.HeadCell>Supply Risk</Table.HeadCell>
              <Table.HeadCell>Critical Value</Table.HeadCell>
            </Table.Head>

            <Table.Body className='divide-y'>
              {searchResults.map((product) => (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                    {materialId}
                  </Table.Cell>
                  <Table.Cell>{materialFullName}</Table.Cell>
                  <Table.Cell>{product.brandTitle}</Table.Cell>
                  <Table.Cell>{product.manufacturerTitle}</Table.Cell>
                  <Table.Cell>{product.cas}</Table.Cell>
                  <Table.Cell>{product.ghg}</Table.Cell>
                  <Table.Cell>{product.energyInput}</Table.Cell>
                  <Table.Cell>{product.euRegulation}</Table.Cell>
                  <Table.Cell>{product.supplyRisk}</Table.Cell>
                  <Table.Cell>{product.criticalValue}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </form>
  );
}

export default SearchForm;
