import { Compass } from './Routes/Compass';
import { Header, Footer } from './components';
import { AuthProvider } from './context/AuthContext'
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Compass></Compass>
        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}

export default App;
