import { AppRoutes } from './routes';
import { TanstackQueryProvider } from './providers/TanstackQueryProvider';
import { Toaster } from 'sonner';

function App() {
  return (
    <TanstackQueryProvider>
      <AppRoutes />
      <Toaster />
    </TanstackQueryProvider>
  );
}
export default App;
