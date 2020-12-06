import React from 'react';

import { SearchPreview } from './core/Components/SearchPreview';
import { PreviewProvider } from './core/Context/PreviewContext/PreviewProvider';
import { PreviewList } from './core/Components/PreviewList/PreviewList';

import './App.scss';

function App() {
  return (
    <div className="App">
      <PreviewProvider>
          <SearchPreview/>
          <PreviewList />
      </PreviewProvider>
    </div>
  );
}

export default App;
