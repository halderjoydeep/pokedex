'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (text === 'Ready!') {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [text]);

  return (
    <div className="App">
      <header className="App-header flex flex-col gap-8">
        <Link href="/pokedex" hidden={!isReady}>
          <Image
            priority
            src="https://www.freeiconspng.com/uploads/file-pokeball-png-0.png"
            className="App-logo p-2.5"
            alt="logo"
            width={300}
            height={300}
          />
        </Link>
        <div>
          <p>Are you ready to be a pokemon master?</p>
          <p className="text-sm mt-2 text-white/50">
            ( All you need is just to type{' '}
            <span className="border-b border-white/50">&quot;Ready!&quot;</span>{' '}
            )
          </p>
        </div>

        <input
          type="text"
          name="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={`${
            isReady ? 'text-green-500' : 'text-gray-700'
          } rounded-lg px-3 py-1.5 shadow-md text-center`}
          autoComplete="off"
        />
        <span className="text-red-500" hidden={isReady}>
          I am not ready yet!
        </span>
      </header>
    </div>
  );
}
