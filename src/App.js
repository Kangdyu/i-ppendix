import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await chrome.runtime.sendMessage({
        data: 'hi from react',
      });

      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>i-ppendix</h1>
      {data && <div>{data}</div>}
    </div>
  );
}

export default App;
