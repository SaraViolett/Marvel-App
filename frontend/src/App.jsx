import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import Characters from './components/Characters';
import CharacterDetails from './components/CharacterDetails';
import CharacterForm from './components/CharacterForm';
import CharacterEditForm from './components/CharacterEditForm';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/character-form" element={<CharacterForm />} />
        <Route path="/character-edit/:id" element={<CharacterEditForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;