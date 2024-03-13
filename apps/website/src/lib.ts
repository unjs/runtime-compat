let linkedScrolls: NodeListOf<Element>

export function changeScroll(event: Event) {
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

