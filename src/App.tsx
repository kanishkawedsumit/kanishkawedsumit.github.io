import { useState, useEffect } from 'react';
import './styles/tokens.css';
import config from './invite.config.json';
import type { InviteConfig } from './types';
import { initMusic } from './lib/audio';
import { asset } from './lib/assets';
import { initScroll, destroyScroll } from './lib/scroll';
import Cover from './scenes/Cover';
import Hero from './scenes/Hero';
import FamilyScroll from './scenes/FamilyScroll';
import SaveDate from './scenes/SaveDate';
import Gallery from './scenes/Gallery';
import Events from './scenes/Events';
import Contact from './scenes/Contact';
import Compliments from './scenes/Compliments';
import Notes from './scenes/Notes';
import Follow from './scenes/Follow';
import Finale from './scenes/Finale';

const typedConfig = config as InviteConfig;

function App() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    initMusic(asset(typedConfig.music));
  }, []);

  useEffect(() => {
    if (isOpened) {
      // Small delay so DOM settles before initializing scroll
      const timer = setTimeout(() => {
        initScroll();
      }, 100);
      return () => {
        clearTimeout(timer);
        destroyScroll();
      };
    }
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {!isOpened && <Cover onOpen={handleOpen} />}
      {isOpened && (
        <main>
          <Hero config={typedConfig} />
          <FamilyScroll config={typedConfig} />
          <SaveDate config={typedConfig} />
          <Gallery config={typedConfig} />
          <Events config={typedConfig} />
          <Contact config={typedConfig} />
          <Compliments config={typedConfig} />
          <Notes config={typedConfig} />
          <Follow config={typedConfig} />
          <Finale config={typedConfig} />
        </main>
      )}
    </div>
  );
}

export default App;
