import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'
import ToneSelector from '../components/ToneSelector';

const Content = () => {

    const container = useRef();

    useGSAP(
    
        () => {
            document.addEventListener('mouseup', (event) => {
                if(window.getSelection().toString() !== "") {
                    let mouseX = event.clientX;
                    let mouseY = event.clientY;
                    const padding = 10;
                    const containerWidth = 300; // Assuming width from the className
                    const containerHeight = 300; // Assuming height from the className

                    // Adjust position if too close to edges
                    if (mouseX < padding) mouseX = padding;
                    if (mouseY < padding) mouseY = padding;
                    if (mouseX > window.innerWidth - containerWidth - padding) {
                        mouseX = window.innerWidth - containerWidth - padding;
                    }
                    if (mouseY > window.innerHeight - containerHeight - padding) {
                        mouseY = window.innerHeight - containerHeight - padding;
                    }

                    gsap.fromTo(container.current, 
                        { scale: 0, left: mouseX, top: mouseY },
                        { scale: 1, left: mouseX, top: mouseY, ease: "elastic.out(1,0.3)", duration: 1 }
                    );
                }
            });

            document.addEventListener('mousemove', () => {
                if(window.getSelection().toString() === "") {
                    gsap.to(container.current, { scale: 0, duration: 0.3, ease: "power1.out" });
                }
            });
            // gsap code here...
        },
        { scope: container }
    ); // <-- scope is for selector text (optional)
    
    return (
        <div
            ref={container}
            className="fixed scale-0 h-[300px] w-[300px] rounded-md flex justify-center items-center text-white"
        >
            <ToneSelector/>
        </div>
    );
};

export default Content;