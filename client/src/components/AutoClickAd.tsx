
import { useEffect, useRef } from 'react';

interface AutoClickAdProps {
  pageType: 'details' | 'player' | 'moreinfo';
}

const AutoClickAd: React.FC<AutoClickAdProps> = ({ pageType }) => {
  const hasInitialClickedRef = useRef(false);
  const has25MinClickedRef = useRef(false);
  const timersRef = useRef<{ initial?: NodeJS.Timeout; delayed?: NodeJS.Timeout }>({});

  useEffect(() => {
    // Reset state when pageType changes
    hasInitialClickedRef.current = false;
    has25MinClickedRef.current = false;

    const getAdContainers = () => {
      if (pageType === 'details') {
        return ['details-ads-section-1', 'details-ads-section-2', 'details-ads-section-3'];
      } else if (pageType === 'player') {
        return ['player-ads-section-2', 'player-ads-section-3', 'player-ads-section-4', 'player-special-ad-section'];
      } else if (pageType === 'moreinfo') {
        return ['moreinfo-special-ad-section', 'moreinfo-ads-section-2', 'moreinfo-ads-section-3', 'moreinfo-ads-section-4'];
      }
      return [];
    };

    const findClickableElementsInArea = (container: Element): Element[] => {
      const clickableElements: Element[] = [];
      
      // Find all potentially clickable elements within the container
      const selectors = [
        'iframe[src*="highperformanceformat.com"]',
        'iframe[src*="invoke.js"]',
        'a[href]:not([href="#"]):not([href*="javascript:"])',
        'button:not([class*="Button"]):not([class*="btn"])',
        'iframe',
        'div[id*="container-"]:not(:empty)',
        'div[style*="width"][style*="height"]:not(:empty)',
        '[onclick]',
        '[data-ad]',
        '.ad-banner',
        '.ad-container',
        '[class*="ad-"]',
        '[id*="ad-"]',
        'ins.adsbygoogle',
        'div[style*="cursor: pointer"]',
        'div[style*="cursor:pointer"]',
        'script[src*="highperformanceformat.com"] + div',
        'script[src*="invoke.js"] + div'
      ];

      for (const selector of selectors) {
        try {
          const elements = container.querySelectorAll(selector);
          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(el);
            
            // Check if element is visible and has reasonable size
            if (rect.width > 20 && rect.height > 20 && 
                computedStyle.visibility !== 'hidden' && 
                computedStyle.display !== 'none' &&
                computedStyle.opacity !== '0') {
              clickableElements.push(el);
            }
          });
        } catch (e) {
          console.log(`Selector failed: ${selector}`, e.message);
        }
      }

      // If no specific clickable elements found, look for any div with reasonable size
      if (clickableElements.length === 0) {
        const divs = container.querySelectorAll('div');
        divs.forEach(div => {
          const rect = div.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(div);
          
          if (rect.width > 100 && rect.height > 50 && 
              computedStyle.visibility !== 'hidden' && 
              computedStyle.display !== 'none') {
            clickableElements.push(div);
          }
        });
      }

      return clickableElements;
    };

    const performRealClick = async (element: Element): Promise<boolean> => {
      try {
        console.log(`Attempting real click on element:`, {
          tagName: element.tagName,
          id: element.id,
          className: element.className
        });

        // Scroll element into view smoothly
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });

        // Wait for scroll to complete
        await new Promise(resolve => setTimeout(resolve, 1000));

        const rect = element.getBoundingClientRect();
        
        // Calculate click position in the specified area (10-20% from left, 10-40% from top)
        const relativeX = 0.10 + (Math.random() * 0.10); // 10% to 20% from left
        const relativeY = 0.10 + (Math.random() * 0.30); // 10% to 40% from top
        
        const clickX = rect.left + (rect.width * relativeX);
        const clickY = rect.top + (rect.height * relativeY);

        console.log(`Clicking at calculated position:`, {
          element: {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
          },
          click: {
            x: Math.round(clickX),
            y: Math.round(clickY),
            relativeX: Math.round(relativeX * 100) + '%',
            relativeY: Math.round(relativeY * 100) + '%'
          }
        });

        // Focus the element first
        if (element instanceof HTMLElement) {
          try {
            element.focus();
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (e) {
            console.log('Focus failed:', e.message);
          }
        }

        // Create mouse events with calculated coordinates
        const mouseEventOptions = {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: clickX,
          clientY: clickY,
          screenX: clickX,
          screenY: clickY,
          button: 0,
          buttons: 1,
          detail: 1
        };

        // Sequence of mouse events
        const events = [
          new MouseEvent('mouseenter', mouseEventOptions),
          new MouseEvent('mouseover', mouseEventOptions),
          new MouseEvent('mousedown', { ...mouseEventOptions, buttons: 1 }),
          new MouseEvent('mouseup', { ...mouseEventOptions, buttons: 0 }),
          new MouseEvent('click', { ...mouseEventOptions, buttons: 0 })
        ];

        // Dispatch events in sequence with small delays
        for (let i = 0; i < events.length; i++) {
          element.dispatchEvent(events[i]);
          console.log(`Dispatched ${events[i].type} event`);
          
          if (i < events.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
          }
        }

        // Additional native click attempts
        await new Promise(resolve => setTimeout(resolve, 100));

        // Try native click method
        if (element instanceof HTMLElement) {
          try {
            element.click();
            console.log('Native click executed');
          } catch (e) {
            console.log('Native click failed:', e.message);
          }
        }

        // Handle specific element types
        if (element.tagName === 'A' && element instanceof HTMLAnchorElement) {
          const href = element.href;
          if (href && href !== '#' && !href.includes('javascript:')) {
            console.log('Found link:', href);
            
            // Simulate link click behavior
            await new Promise(resolve => setTimeout(resolve, 200));
            
            if (element.target === '_blank') {
              try {
                const newWindow = window.open(href, '_blank', 'noopener,noreferrer');
                if (newWindow) {
                  console.log('Opened link in new tab');
                  // Close after 3 seconds to simulate quick interaction
                  setTimeout(() => {
                    try {
                      newWindow.close();
                    } catch (e) {
                      // Silent fail
                    }
                  }, 3000);
                }
              } catch (e) {
                console.log('Failed to open in new tab:', e.message);
              }
            }
          }
        }

        // For iframes, try to trigger interaction events
        if (element.tagName === 'IFRAME') {
          try {
            const focusEvent = new FocusEvent('focus');
            element.dispatchEvent(focusEvent);
            
            const loadEvent = new Event('load');
            element.dispatchEvent(loadEvent);
            
            console.log('Iframe events dispatched');
          } catch (e) {
            console.log('Iframe interaction failed:', e.message);
          }
        }

        // Dispatch additional interaction events
        try {
          const pointerEvents = [
            new PointerEvent('pointerdown', { ...mouseEventOptions, pointerId: 1 }),
            new PointerEvent('pointerup', { ...mouseEventOptions, pointerId: 1 })
          ];

          pointerEvents.forEach(event => {
            element.dispatchEvent(event);
          });

          console.log('Pointer events dispatched');
        } catch (e) {
          console.log('Pointer events failed:', e.message);
        }

        console.log('Real click sequence completed successfully');
        return true;

      } catch (error) {
        console.log('Real click execution failed:', error.message);
        return false;
      }
    };

    const findValidAdSections = async (): Promise<Element[]> => {
      const adContainerIds = getAdContainers();
      const validSections: Element[] = [];

      for (const containerId of adContainerIds) {
        const container = document.getElementById(containerId);
        if (!container) {
          console.log(`Container not found: ${containerId}`);
          continue;
        }

        console.log(`Checking container: ${containerId}`);

        // Check if container is visible and has reasonable size
        const rect = container.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(container);

        const isVisible = rect.width > 0 && 
                         rect.height > 0 && 
                         computedStyle.visibility !== 'hidden' && 
                         computedStyle.display !== 'none' &&
                         computedStyle.opacity !== '0';

        if (isVisible && rect.width >= 100 && rect.height >= 50) {
          // Check if container has any clickable content
          const clickableElements = findClickableElementsInArea(container);
          
          if (clickableElements.length > 0) {
            validSections.push(container);
            console.log(`Valid ad section found: ${containerId}`, {
              width: rect.width,
              height: rect.height,
              clickableElements: clickableElements.length
            });
          } else {
            console.log(`No clickable elements in: ${containerId}`);
          }
        } else {
          console.log(`Invalid ad section: ${containerId}`, {
            width: rect.width,
            height: rect.height,
            visible: isVisible
          });
        }
      }

      return validSections;
    };

    const executeAutoClick = async (): Promise<boolean> => {
      console.log(`Starting enhanced auto-click for ${pageType} page`);

      try {
        const validSections = await findValidAdSections();

        if (validSections.length === 0) {
          console.log('No valid ad sections found');
          return false;
        }

        // Select a random section to click
        const randomSectionIndex = Math.floor(Math.random() * validSections.length);
        const selectedSection = validSections[randomSectionIndex];

        console.log(`Selected section ${randomSectionIndex + 1} of ${validSections.length}:`, selectedSection.id);

        // Find clickable elements in the selected section
        const clickableElements = findClickableElementsInArea(selectedSection);

        if (clickableElements.length === 0) {
          console.log('No clickable elements found in selected section');
          return false;
        }

        // Select a random clickable element
        const randomElementIndex = Math.floor(Math.random() * clickableElements.length);
        const selectedElement = clickableElements[randomElementIndex];

        console.log(`Selected element ${randomElementIndex + 1} of ${clickableElements.length} for clicking:`, {
          tagName: selectedElement.tagName,
          id: selectedElement.id,
          className: selectedElement.className
        });

        const success = await performRealClick(selectedElement);

        if (success) {
          console.log('Enhanced auto-click executed successfully');
        } else {
          console.log('Enhanced auto-click failed');
        }

        return success;
      } catch (error) {
        console.log('Enhanced auto-click error:', error.message);
        return false;
      }
    };

    const startAutoClickSystem = () => {
      console.log(`Initializing enhanced auto-click system for ${pageType} page`);

      // Initial click timing based on page type
      if (!hasInitialClickedRef.current) {
        const initialDelay = pageType === 'details' ? 3000 : 5000; // 3 seconds for details, 5 for others
        timersRef.current.initial = setTimeout(async () => {
          console.log(`Executing initial enhanced auto-click (${initialDelay/1000} seconds after page load)`);
          try {
            const success = await executeAutoClick();
            hasInitialClickedRef.current = true;

            if (success) {
              console.log('Initial enhanced auto-click completed successfully');
            } else {
              console.log('Initial enhanced auto-click failed - will retry in 2 seconds');
              // Retry once if failed
              setTimeout(async () => {
                await executeAutoClick();
              }, 2000);
            }
          } catch (e) {
            console.log('Initial enhanced auto-click error:', e.message);
          }
        }, initialDelay);
      }

      // Delayed click after 25 minutes (1500000 ms) if user stays on page
      if (!has25MinClickedRef.current) {
        timersRef.current.delayed = setTimeout(async () => {
          console.log('Executing delayed enhanced auto-click (25 minutes after page load)');
          try {
            const success = await executeAutoClick();
            has25MinClickedRef.current = true;

            if (success) {
              console.log('Delayed enhanced auto-click completed successfully');
            }
          } catch (e) {
            console.log('Delayed enhanced auto-click error:', e.message);
          }
        }, 1500000); // 25 minutes
      }
    };

    // Start the system after component mounts
    const mountTimer = setTimeout(startAutoClickSystem, 1000);

    return () => {
      // Cleanup all timers
      clearTimeout(mountTimer);
      if (timersRef.current.initial) {
        clearTimeout(timersRef.current.initial);
      }
      if (timersRef.current.delayed) {
        clearTimeout(timersRef.current.delayed);
      }
    };
  }, [pageType]);

  return null;
};

export default AutoClickAd;
