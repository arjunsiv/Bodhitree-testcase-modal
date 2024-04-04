import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ProductService } from './service/ProductService';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

export default function RowSelectEventsDemo({ setData }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const studentOutput = [
    `2 3 00    
3
00

  557`,
    `2   3355  0 5555555 66666666 7777777 5666777 2 22222222222222222
    5555555555555555555555555555555555555555555555555555555555555555555555555
    555`,
  ];
  useEffect(() => {
    setProducts(ProductService);
    setSelectedProduct(ProductService[0]);
    setData(studentOutput[ProductService[0].id - 1000]);
  }, []);

  const onRowClick = (e) => {
    // Check if the clicked row is already selected
    if (selectedProduct && selectedProduct.id === e.data.id) {
      // If it is, do nothing
      return;
    }
    // If it's not, update the state to select the new row
    setSelectedProduct(e.data);
    setData(studentOutput[e.data.id - 1000]);
  };

  return (
    <div>
      <DataTable
        value={products}
        selectionMode="single"
        selection={selectedProduct}
        dataKey="id"
        onRowClick={onRowClick}
        metaKeySelection={false}
        size={'large'}
        tableStyle={{ minWidth: '30rem' }}
      >
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}

/* Assuming .p-highlight is the class for the selected row */
const customStyle = `
.p-datatable .p-datatable-tbody > tr.p-highlight {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Adjust the color and blur as needed */
   }
`;
