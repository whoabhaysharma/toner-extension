import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react'
import ToneSelector from '../components/ToneSelector';
import Lottie from 'lottie-react';
import aiAnimation from '../animations/aiBall.json'

const Content = () => {

    const container = useRef();
    const selectorContainer = useRef();
    useGSAP(() => {
        let selectorContainerVisible = false;
        const handleMouseUp = (event) => {
            const selectedText = window.getSelection().toString();
            if (selectedText !== "") {
                let mouseX = event.clientX;
                let mouseY = event.clientY;
                const padding = 10;
                const containerWidth = 50;
                const containerHeight = 50;

                // Adjust position if too close to edges
                mouseX = Math.min(mouseX, window.innerWidth - containerWidth - padding);
                mouseY = Math.min(mouseY, window.innerHeight - containerHeight - padding);

                // Set the position and make the component visible
                gsap.set(container.current, {
                    left: mouseX,
                    top: mouseY,
                    scale: 0,
                    display: 'flex'
                });

                // Animate the component
                gsap.to(container.current, {
                    duration: 0.3,
                    scale: 1,
                    ease: "back.out(1.7)",
                    onComplete: () => {
                        // Start the continuous animation
                        gsap.to(container.current, {
                            duration: 1,
                            scale: 1.1,
                            repeat: -1,
                            yoyo: true,
                            ease: "power1.inOut"
                        });
                    }
                });
            }
        };

        const handleSelectionChange = () => {
            if (window.getSelection().toString() === "") {
                hideComponent(container.current);
            }
        };

        const hideComponent = (element) => {
            gsap.killTweensOf(element);
            gsap.to(element, {
                duration: 0.2,
                scale: 0,
                onComplete: () => {
                    selectorContainerVisible = false;
                    gsap.set(element, { display: 'none' });
                }
            });
        };

        const handleContainerClick = () => {
            // Show and center the selectorContainer
            gsap.set(selectorContainer.current, {
                display: 'flex',
                scale: 0,
                xPercent: -50,
                yPercent: -50,
                left: '50%',
                top: '50%'
            });

            gsap.to(selectorContainer.current, {
                duration: 0.3,
                scale: 1,
                ease: "back.out(1.7)",
                onComplete: () => {
                    selectorContainerVisible = true;
                }
            });


            // Log to check if this function is being called

            // Force a reflow to ensure the changes take effect
            selectorContainer.current.offsetHeight;

            // Double-check if the selectorContainer is visible
            const computedStyle = window.getComputedStyle(selectorContainer.current);
            console.log('selectorContainer display:', computedStyle.display);
            console.log('selectorContainer scale:', computedStyle.transform);
        };

        const handleOutsideClick = (e) => {
            if (!selectorContainer.current.contains(e.target) && selectorContainerVisible) {
                hideComponent(selectorContainer.current);
            }
        }

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('selectionchange', handleSelectionChange);
        container.current.addEventListener('mousedown', handleContainerClick);
        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('selectionchange', handleSelectionChange);
            container.current.removeEventListener('mousedown', handleContainerClick);
            document.removeEventListener('mousedown', handleOutsideClick)
            // Clean up any ongoing animations
            gsap.killTweensOf(container.current);
            gsap.killTweensOf(selectorContainer.current);
        };
    }, { scope: container });

    return (
        <>
            <div ref={container} className="cursor-pointer fixed scale-0 flex items-center justify-center h-[50px] w-[50px] bg-white p-1 shadow-md rounded-full">
                <Lottie
                    animationData={aiAnimation}
                    loop={true}  // Optional: Set to false if you don't want it to loop
                    style={{ height: "100%", width: "100%" }} // Optional: Adjust size
                />
            </div>
        <div
            ref={selectorContainer}
            className="fixed scale-0 h-[20vh] w-[60vw] rounded-md flex justify-center items-center text-white"
        >
                <ToneSelector/>
            </div>
        </>  
    );
};

export default Content;