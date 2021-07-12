import React, { useRef, useState } from "react";
import styles from '../styles/Home.module.css';

const Design = (props) => {
    const canvasElementHeight = 200, canvasElementWidth = 200;
    const canvasHeight = 500, canvasWidth = 500;
    const [isDraggable, setIsDraggable] = useState(false);
    const [canvasElements, setCanvasElements] = useState();
    const fileInputRef = useRef();
    const mainCanvasRef = useRef();
    const dropzoneRef = useRef();

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = (e) => drawObjects(e);
            dropzoneRef.current.style.display = "none";
            mainCanvasRef.current.style.display = "block";
            mainCanvasRef.current.parentElement.style.display = "block";
            reader.readAsDataURL(files[i]);
        }
    }

    const drawObjects = (e) => {
        const imgImg = new Image();
        imgImg.src = e.target.result;
        imgImg.onload = () => {
            mainCanvasRef.current.getContext('2d').drawImage(imgImg, 0, 0, canvasElementWidth, canvasElementHeight);
        }
        drawBackgroundObject();
        setCanvasElements(imgImg);        
    }

    const drawBackgroundObject = () => {
        const ctx = mainCanvasRef.current.getContext('2d');

        // All canvas rectangle
        // ctx.moveTo(0,0);
        // ctx.lineTo(0,150);
        // ctx.lineTo(300,150);
        // ctx.lineTo(300,0);
        // ctx.lineTo(0,0);
        // ctx.stroke();

        // Top left rectangle
        ctx.moveTo(20,20);
        ctx.lineTo(115,20);
        ctx.lineTo(115,45);
        ctx.lineTo(20,45);
        ctx.lineTo(20,20);
        ctx.stroke();

        // Top right rectangle
        ctx.moveTo(165,20);
        ctx.lineTo(270,20);
        ctx.lineTo(270,45);
        ctx.lineTo(165,45);
        ctx.lineTo(165,20);
        ctx.stroke();

        // Collar
        ctx.moveTo(68,55);
        ctx.lineTo(230,55);
        ctx.lineTo(230,80);
        ctx.lineTo(68,80);
        ctx.lineTo(68,55);
        ctx.stroke();

        // Bottom left rectangle
        ctx.moveTo(20,90);
        ctx.lineTo(115,90);
        ctx.lineTo(115,115);
        ctx.lineTo(20,115);
        ctx.lineTo(20,90);
        ctx.stroke();

        // Bottom right rectangle
        ctx.moveTo(165,90);
        ctx.lineTo(270,90);
        ctx.lineTo(270,115);
        ctx.lineTo(165,115);
        ctx.lineTo(165,90);
        ctx.stroke();

        ctx.clip();
    }

    const canvasHandleMouseDown = () => {
        setIsDraggable(true);
    }

    const canvasHandleMouseUp = () => {
        setIsDraggable(false);
    }

    const canvasHandleMouseMove = (e) => {
        if (isDraggable && canvasElements) {
            mainCanvasRef.current.getContext('2d').clearRect(0, 0, canvasWidth, canvasHeight);
            moveSelectedElement(canvasElements, e.clientX, e.clientY);
        }
    }

    const moveSelectedElement = (selectedElement, x, y) => {
        const canvasBoundingRect = mainCanvasRef.current.getBoundingClientRect();
        const xCoOrdinates = x - canvasBoundingRect.left - canvasElementWidth;
        const yCoOrdinates = y - canvasBoundingRect.top - canvasElementHeight;
        mainCanvasRef.current.getContext('2d').drawImage(selectedElement, xCoOrdinates, yCoOrdinates, canvasElementWidth, canvasElementHeight);
    }

    return (
        <div className={`${props.showDesign.designTabClass}`}>
            <div id="dropzone" ref={dropzoneRef} className={styles.dropcontainer}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
            >
                <input
                    multiple
                    name="file[]"
                    ref={fileInputRef}
                    type="file"
                    className={`${styles.hide} ${styles.dropcontainer}`}
                    accept="image/gif, image/jpeg, image/png"
                    onClick={filesSelected}
                />                
            </div>
            <div className={`${styles.dropcontainer} ${styles.hide} ${styles.absoluteWrapper}`} style={{ top: "10px" }}>
                <canvas
                    id="main-canvas"
                    ref={mainCanvasRef}
                    className={`${styles.canvas} ${styles.absoluteWrapper}`}
                    onMouseMove={canvasHandleMouseMove}
                    onMouseDown={canvasHandleMouseDown}
                    onMouseUp={canvasHandleMouseUp}
                    style={{ top: "0px" }}
                ></canvas>
            </div>
        </div>
    );
}

export default Design;
