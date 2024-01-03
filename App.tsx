import Layout from './src/layout/Layout';
import Home from './src/screens/home/Home';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Layout>
        <Home />
      </Layout>
    </GluestackUIProvider>
  );
}
