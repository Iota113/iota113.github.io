/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SeasonProvider } from './context/SeasonContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Archive } from './pages/Archive';
import { Projects } from './pages/Projects';
import { Travel } from './pages/Travel';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {

  return (
    <SeasonProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/travel" element={<Travel />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </SeasonProvider>
  );
}

