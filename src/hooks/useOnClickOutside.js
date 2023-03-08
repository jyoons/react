import React, { useEffect } from 'react'

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) =>{
      console.log(ref.current.contains)
      if(!ref.current || ref.current.contains(event.target)){return}
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mosedown', listener);
      document.removeEventListener('touchstart', listener);
    }
  }, [ref, handler])
}