class Utilities {
    // Private members =========================================================

    static _getRandomFloat(min, max) {
        return (Math.random() * (max - min) + min);
    }
    
    static _generateCubicBezier() {
        return {
            x1: parseFloat(this._getRandomFloat(0, 1).toFixed(2)),
            y1: parseFloat(this._getRandomFloat(-2, 2).toFixed(2)),
            x2: parseFloat(this._getRandomFloat(0, 1).toFixed(2)),
            y2: parseFloat(this._getRandomFloat(-2, 2).toFixed(2))
        };
    }

    // Public members ==========================================================
    
    static applyBackgroundAnimation() {
        const totalLights = 25;
        const size = 180;
        const softness = 180;
        const animationDurationS = 35;
        const colors = ["#420e4e", "#9c1b37", "#d72227", "#fd751f"];
        const container = document.querySelector(".bg-container");
        const fragment = document.createDocumentFragment();
        let sheetContent = "";
    
        const sheet = document.createElement("STYLE");
        sheet.setAttribute("id", "#bgAnimation");
    
        sheetContent += `.bg-light::after{content:"";display:block;}`;
    
        for (let i = 0; i < totalLights; i++) {
            const div = document.createElement("DIV");
            div.classList.add("bg-light");
    
            fragment.appendChild(div);
    
            const xAxis = this._generateCubicBezier();
            const startX = Math.floor(this._getRandomFloat(10, 90));
            const startY = Math.floor(this._getRandomFloat(10, 90));
            sheetContent += `.bg-container>:nth-child(${i + 1}){transform:translate(${startX}vw,${startY}vh);animation:xAxis${i + 1} ${animationDurationS}s infinite cubic-bezier(${xAxis.x1},${xAxis.y1},${xAxis.x2},${xAxis.y2});}`;
            
            const yAxis = this._generateCubicBezier();
            const color = colors[Math.floor(this._getRandomFloat(0, colors.length))];
            sheetContent += `.bg-container>:nth-child(${i + 1})::after{width:30px;box-shadow:0 0 ${softness}px ${size}px ${color};animation:yAxis${i + 1} ${animationDurationS}s infinite cubic-bezier(${yAxis.x1},${yAxis.y1},${yAxis.x2},${yAxis.y2});}`;
    
            const moveToX = Math.floor(this._getRandomFloat(10, 90));
            const moveToY = Math.floor(this._getRandomFloat(10, 90));
            sheetContent += `@keyframes xAxis${i + 1} {50%{transform:translateX(${moveToX}vw);100%{transform:translateX(${startX}vw)}}}`;
            sheetContent += `@keyframes yAxis${i + 1} {50%{transform:translateY(${moveToY}vh);100%{transform:translateX(${startY}vh)}}}`;
        }
    
        sheet.appendChild(document.createTextNode(sheetContent));
        
        document.head.appendChild(sheet);
        container.appendChild(fragment);
    
        container.ontransitionend = null;
        container.classList.remove("inactive");
    }
    
    static removeBackgroundAnimation() {
        const container = document.querySelector(".bg-container");
    
        container.ontransitionend = () => {
            container.innerHTML = "";
            [...document.head.childNodes].forEach(node => {
                if (node.id === "#bgAnimation") document.head.removeChild(node);
            });
        };
        
        container.classList.add("inactive");
    }
};
