/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import PCInvitation from './components/PCInvitation';
import MobileInvitation from './components/MobileInvitation';
import Background3D from './components/Background3D';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="min-h-screen relative">
      <Background3D />
      {isMobile ? <MobileInvitation /> : <PCInvitation />}
    </main>
  );
}



