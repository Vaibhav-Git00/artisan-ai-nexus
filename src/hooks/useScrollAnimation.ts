import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const elementInView = (el: Element, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const elementOutofView = (el: Element) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
      );
    };

    const displayScrollElement = (element: Element) => {
      element.classList.add('visible');
    };

    const hideScrollElement = (element: Element) => {
      element.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else if (elementOutofView(el)) {
          hideScrollElement(el);
        }
      });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    // Initial check on load
    handleScrollAnimation();

    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);
};

export default useScrollAnimation;
