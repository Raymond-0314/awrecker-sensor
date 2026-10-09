export function initTableScroll() {
  document.querySelectorAll('.vp-doc table').forEach((table) => {
    if (table.closest('.table-scroll-container')) return

    // 建立固定箭頭的外層
    const wrapper = document.createElement('div')
    wrapper.className = 'table-scroll-container'

    // 建立真正的水平捲動區
    const scroller = document.createElement('div')
    scroller.className = 'table-scroll-content'

    // 將表格移到新捲動區內
    table.parentNode.insertBefore(wrapper, table)
    wrapper.appendChild(scroller)
    scroller.appendChild(table)

    // 左右箭頭
    const left = document.createElement('button')
    const right = document.createElement('button')

    left.type = 'button'
    right.type = 'button'

    left.className = 'table-scroll-btn left'
    right.className = 'table-scroll-btn right'

    left.innerHTML = '<span class="arrow-icon"></span>'
    right.innerHTML = '<span class="arrow-icon"></span>'

    left.setAttribute('aria-label', '向左滑動表格')
    right.setAttribute('aria-label', '向右滑動表格')

    wrapper.appendChild(left)
    wrapper.appendChild(right)

    const update = () => {
      const max = scroller.scrollWidth - scroller.clientWidth
      const x = scroller.scrollLeft

      left.classList.toggle('visible', max > 3 && x > 3)
      right.classList.toggle('visible', max > 3 && x < max - 3)
    }

    left.addEventListener('click', () => {
      scroller.scrollBy({
        left: -scroller.clientWidth * 0.7,
        behavior: 'smooth'
      })
    })

    right.addEventListener('click', () => {
      scroller.scrollBy({
        left: scroller.clientWidth * 0.7,
        behavior: 'smooth'
      })
    })

    scroller.addEventListener('scroll', update, { passive: true })

    const observer = new ResizeObserver(update)
    observer.observe(scroller)
    observer.observe(table)

    requestAnimationFrame(update)
  })
}