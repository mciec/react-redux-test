import './App.css'
import Transformer from '../features/transformer/Transformer'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/login/Login'
import { ProtectedLayout } from '../features/protectedLayout/ProtectedLayout'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/protected" element={<ProtectedLayout />}>
        <Route path="transformer" element={<Transformer />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default App
