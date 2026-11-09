'use client'

import { type RefObject, useEffect } from 'react'

// Slick is a jQuery plugin with no bundled types; this is the surface we use.
type SlickJQuery = JQuery & {
  slick: (options?: Record<string, unknown> | 'unslick') => SlickJQuery
}

type Setup = {
  /** jQuery, for options that take elements (appendArrows, appendDots) */
  $: JQueryStatic
  el: SlickJQuery
}

/**
 * Runs the original Slick carousel on a React-rendered element, so the design's
 * CSS (which styles Slick's own markup) works unchanged. jQuery + Slick are
 * loaded lazily, only on pages that have a carousel, and Slick is destroyed
 * when the component unmounts (client navigation).
 */
export function useSlick(
  ref: RefObject<HTMLElement | null>,
  getOptions: (setup: Setup) => Record<string, unknown>,
  onReady?: (setup: Setup) => (() => void) | void,
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    let cancelled = false
    let $el: SlickJQuery | null = null
    let cleanupExtra: (() => void) | void

    void (async () => {
      // Pinned to the versions the design was built with (jQuery 3.7.1, Slick 1.8.1);
      // Slick 1.8's CommonJS build registers itself on require('jquery').
      const $ = (await import('jquery')).default
      if (!('slick' in $.fn)) await import('slick-carousel')
      if (cancelled || !('slick' in $.fn)) return

      $el = $(node) as SlickJQuery
      const setup = { $, el: $el }
      cleanupExtra = onReady?.(setup)
      // rows: 0 stops Slick 1.8 wrapping each slide in extra divs; the design's CSS
      // expects the card itself to be the .slick-slide
      $el.slick({ rows: 0, ...getOptions(setup) })
    })()

    return () => {
      cancelled = true
      cleanupExtra?.()
      if ($el?.hasClass('slick-initialized')) $el.slick('unslick')
    }
    // Options are static per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
