import './App.css';
import Pdf from './Components/Pdf';
import pd from './test.pdf'


function App() {
  return (
    <div>
		<div style={{width: '50%', float: 'left'}}>
			<h1>Left</h1>
			<Pdf pdf />
		</div>
		<div style={{width: '50%', float: 'right'}}>
			<h1>Right</h1>
		</div>      
    </div>
  );
}

export default App;
