import { ToastContainer } from 'react-toastify';
import { Layout } from '@/components/templates/Layout/Layout';
import { Demo } from '@/pages/Demo/Demo';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Layout>
        <Demo />
      </Layout>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
