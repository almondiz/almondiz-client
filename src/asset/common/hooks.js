import React, { useState, useEffect, useRef } from "react";


export const isFunctionComponent = component => ((typeof component === "function") && String(component).includes("return React.createElement"));
export const isClassComponent = component => ((typeof component === "function") && !!component.prototype.isReactComponent);
export const isElement = element => React.isValidElement(element);
export const isDOMTypeElement = element => (isElement(element) && typeof element.type === "string");

export const isEmptyElement = element => {
  if (element === null || element === undefined)
    return true;
  if (isElement(element) && element.type === React.Fragment)
    return true;
  return false;
};


// https://usehooks.com/useScript/
export function useScript(src) {
    // Keep track of script status ("idle", "loading", "ready", "error")
    const [status, setStatus] = useState(src ? "loading" : "idle");
    useEffect(
      () => {
        // Allow falsy src value if waiting on other data needed for
        // constructing the script URL passed to this hook.
        if (!src) {
          setStatus("idle");
          return;
        }
        // Fetch existing script element by src
        // It may have been added by another intance of this hook
        let script = document.querySelector(`script[src="${src}"]`);
        if (!script) {
          // Create script
          script = document.createElement("script");
          script.src = src;
          script.async = true;
          script.setAttribute("data-status", "loading");
          // Add script to document body
          document.body.appendChild(script);
          // Store status in attribute on script
          // This can be read by other instances of this hook
          const setAttributeFromEvent = (event) => {
            script.setAttribute(
              "data-status",
              event.type === "load" ? "ready" : "error"
            );
          };
          script.addEventListener("load", setAttributeFromEvent);
          script.addEventListener("error", setAttributeFromEvent);
        } else {
          // Grab existing script status from attribute and set to state.
          setStatus(script.getAttribute("data-status"));
        }
        // Script event handler to update status in state
        // Note: Even if the script already exists we still need to add
        // event handlers to update the state for *this* hook instance.
        const setStateFromEvent = (event) => {
          setStatus(event.type === "load" ? "ready" : "error");
        };
        // Add event listeners
        script.addEventListener("load", setStateFromEvent);
        script.addEventListener("error", setStateFromEvent);
        // Remove event listeners on cleanup
        return () => {
          if (script) {
            script.removeEventListener("load", setStateFromEvent);
            script.removeEventListener("error", setStateFromEvent);
          }
        };
      },
      [src] // Only re-run effect if script src changes
    );
    return status;
  };

  
  export const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => { savedCallback.current = callback; }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      const tick = () => savedCallback.current();
      if (delay !== null) {
        let timer = setInterval(tick, delay);
        return () => clearInterval(timer);
      }
    }, [delay]);
  };
  export const useTimeout = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => { savedCallback.current = callback; }, [callback]);
  
    // Set up the timeout.
    useEffect(() => {
      const tick = () => savedCallback.current();
      if (delay !== null) {
        let timer = setTimeout(tick, delay);
        return () => clearTimeout(timer);
      }
    }, [delay]);
  };


  export const useWindowDimensions = () => {
    const bodyDOM = document.body;
    const getDimensions = () => {
      const { scrollHeight: height, scrollWidth: width } = bodyDOM;
      return { height, width };
    };
  
    const [dimensions, setDimensions] = useState({});
    const poll = () => {
      const _dimensions = getDimensions();
      let dirty = false;
      for (let k in _dimensions) {
        if (_dimensions[k] !== dimensions[k]) {
          dirty = true;
          break;
        }
      }
      if (dirty)  setDimensions(_dimensions);
    };
  
    const INTERVAL = 300;
    useInterval(poll, INTERVAL);
    return dimensions;
  };