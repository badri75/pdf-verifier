import './App.css';
import Pdf from './Components/Pdf';
import pd from './test.pdf';
import NewPdf from './Components/NewPdf';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div>		
		<Container>
			<Row>
				<Col>
					<h2>PDF Selector</h2>
					{/* <NewPdf pdfFile={pd}/> */}
					<Pdf/>
				</Col>
				<Col>
					<h2>Form</h2>
				</Col>
			</Row>
		</Container>
    </div>
  );
}

export default App;
