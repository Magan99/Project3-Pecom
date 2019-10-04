// import { render } from 'react-dom'
import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
// import ReactDOM from "react-dom";
import './styles.css'
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);

const cards = [
  'https://lmtrain.github.io/lm-images/assets/images/ls_field-wf2.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_Mono-Lake.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/marble_whitegray.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/marble_pinkmarble.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/marble_gold.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/marble_browncircle.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/marble_bluecledonia.png?',
  'https://lmtrain.github.io/lm-images/assets/images/marble_blackwhite.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/marble_blackgold.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_wf2.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_wf1.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_hale-azarya.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_field2.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_field.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_field-wf5.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_field-cnn.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_dayrbow.jpg?',
  'https://lmtrain.github.io/lm-images/assets/images/ls_daylight.jpg?',
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?',
  'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?'
]


// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export default function Themes() {
  const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
  
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    console.log("THESE IS THEME", cards[index])
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    set(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })
    if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || set(i => to(i)), 600)
    
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div key={i} style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans), backgroundImage: `url(${cards[i]})` }} />
      
    </animated.div>
  ))
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Themes />, rootElement);
// render(<Themes />, document.getElementById('root'))

