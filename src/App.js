import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import Pistache from "./pistache.mp4";
import Indy from "./indy.mp4";

const UglyGridComponent = ({ isShown }) => {
  return isShown ? (
    <div className="grid-container">
      <div className="grid-item g1"></div>
      <div className="grid-item g2"></div>
      <div className="grid-item g3"></div>
      <div className="grid-item g4"></div>
      <div className="grid-item g5"></div>
      <div className="grid-item g6"></div>
      <div className="grid-item g7"></div>
      <div className="grid-item g8"></div>
      <div className="grid-item g9"></div>
      <div className="grid-item g10"></div>
    </div>
  ) : null;
};

export default function App() {
  const pistacheRef = useRef();
  const pistacheRef2 = useRef();
  const indyRef = useRef();
  const [isUglyGridShown, setIsUglyGridShown] = useState(false);

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log("entry");
        // isIntersecting will be true when it meets threshold
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    },
    /**
     * The callback will be invoked when the percentage of the
     * target's visibility is higher or lower than the threshold.
     * In our case we set 0.9, so if the element visibility crosses the 90% target
     * the callback will be triggered. This can be an array like [0.25, 0.5] (the callback will be invoked when
     * the visibility passes 25% and 50%).
     */
    {
      threshold: 0.9,
    }
  );

  function onScroll() {
    /**
     * This forces the browser to re-layout the entire page:
     * https://gist.github.com/paulirish/5d52fb081b3570c81e3a
     */
    const rect = indyRef.current.getBoundingClientRect();
    // I even don't know what I'm doing here 🤷🏻‍♀️
    // We want to consider when more than 90% of the element is visible
    const top = rect.top + rect.height * 0.1;
    const bottom = rect.bottom - rect.height * 0.1;
    const isVisible = top >= 0 && bottom < window.innerHeight;
    if (isVisible) {
      indyRef.current.play();
    } else {
      indyRef.current.pause();
    }
  }

  useEffect(() => {
    observer.observe(pistacheRef.current);
    observer.observe(pistacheRef2.current);
    window.addEventListener("scroll", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="container">
      <h1>Dogs are so cute 🐶</h1>
      <label>
        Show ugly grid{" "}
        <input
          type="checkbox"
          value={isUglyGridShown}
          onChange={() => setIsUglyGridShown(!isUglyGridShown)}
        />
      </label>

      <p></p>
      <div>
        <h2>Pistache (intersection observer)</h2>
        <div className="background pistache-color">
          <video
            id="1"
            autoPlay
            loop
            muted
            src={Pistache}
            width="400"
            ref={pistacheRef}
          />
          <UglyGridComponent isShown={isUglyGridShown} />
        </div>
      </div>

      <div>
        <h2>Indy (scroll events)</h2>
        <p></p>
        <div className="background indy-color">
          <video autoPlay loop muted src={Indy} width="400" ref={indyRef} />
          <UglyGridComponent isShown={isUglyGridShown} />
        </div>
      </div>
      <div>
        <h2>Pistache again</h2>
        <p>(just to add some height but this is also intersection observer)</p>
        <div className="background pistache-color">
          <video
            id="2"
            autoPlay
            loop
            muted
            src={Pistache}
            width="400"
            ref={pistacheRef2}
          />
          <UglyGridComponent isShown={isUglyGridShown} />
        </div>
      </div>

      <h3>Resources</h3>
      <ul>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">
            Intersection Observer API
          </a>
          <a href="https://web.dev/intersectionobserver/">
            IntersectionObserver's coming into view
          </a>
        </li>
      </ul>
    </div>
  );
}
