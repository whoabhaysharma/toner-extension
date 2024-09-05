import React, { useEffect, useState } from 'react'

const Content = () => {
    const [pos, setPos] = useState(null)

    useEffect(() => {
        document.addEventListener('mouseup', (e) => {
            if (window.getSelection().toString() !== "") {
                const { clientX = 0, clientY = 0 } = e
                setPos({ x: clientX, y: clientY })
            } else {
                setPos(null)
            }
        })
    
      return () => {
        
      }
    }, [])
    
    return (
        <div
            style={{
                left: pos ? pos.x : 0,
                top: pos ? pos.y : 0,
                transition : pos ? "1s transform ease-in-out" : "",
                transform : pos === null ? `scale(0)` : `scale(1)` 
            }}
            className="fixed h-[300px] w-[300px] bg-red-600 rounded-md flex justify-center items-center text-white"
        >
            hello world
        </div>
    )
}

export default Content