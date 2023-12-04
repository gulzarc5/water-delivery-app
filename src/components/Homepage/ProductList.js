
 import React from 'react';
 import { FlatList } from 'react-native';

const ProductComponent = () => {

  return (
    <FlatList 
      data={myData}
      numColumns={3}      
      renderItem={({ item }) => <MyCellComponent cellData={item} />}
    />
  );
};

 
 export default ProductComponent;