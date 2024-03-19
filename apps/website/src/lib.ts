let linkedScrolls: NodeListOf<Element>
let activeScroller: Element;
let activeScrollerTimeout;

export function changeScroll(event: Event) {
  // Prevents scrolling jitter from the other elements' scroll events being triggered
  //
  if (activeScroller && activeScroller !== event.target) {
    return;
  }
  activeScroller = event.target;
  clearTimeout(activeScrollerTimeout);
  activeScrollerTimeout = setTimeout(() => {
    activeScroller = undefined
  }, 250);

  const scroll = (event.target as HTMLElement).scrollLeft

  if (!linkedScrolls) {
    linkedScrolls = document.querySelectorAll('.linked-scroll')
  }

  for (const linkedScroll of linkedScrolls) {
    if (linkedScroll !== event.target) {
      linkedScroll.scrollLeft = scroll
    }
  }
}

