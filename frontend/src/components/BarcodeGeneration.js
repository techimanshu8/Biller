import { useBarcode } from '@createnextapp/react-barcode';
export default function Ap() {
  const { inputRef } = useBarcode({
    value: '12345 6789',
    options: {
      background: '#ccffff',
    }
  });
  return (
    <div className="App">
      <h1>react-barcodes</h1>
      <svg ref={inputRef} />;
    </div>
  );
}