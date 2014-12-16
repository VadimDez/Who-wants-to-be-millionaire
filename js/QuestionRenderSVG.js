var renderQuestion = function (containerID, xPos, yPos, width, height, textContent) {
    var svgNS = 'http://www.w3.org/2000/svg',
        svgContainer = document.getElementById(containerID),
        textFontSize = 1,
        textMaxFontSize = 32,
        animationSpeedMiliseconds = 4,
        textWidthInPixels = 1;

    var themeColors = {
        textColor: 'white',
        background: '#2D8CF0'
    };

    var svgParameters = {
        width: width,
        height: height
    };

    function filterText(text) {
        if (text.lenght >= 52) {

        }
    }

    function getRect(svgNS, svgContainderId, xPos, yPos, width, height, fillColor) {
        var rect = document.createElementNS(svgNS, 'rect');
        rect.setAttribute('x', xPos);
        rect.setAttribute('y', yPos);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', fillColor);
        svgContainderId.appendChild(rect);

        return {
            x: xPos,
            y: yPos,
            width: width,
            height: height
        };
    }

    function attachText(svgNS, svgContainderId, text, fontSize, rectContainer) {
        var fontSze = fontSize | 16,
            txtElem = document.createElementNS(svgNS, 'text'),
            xPos = rectContainer.x,
            yPos = rectContainer.y + rectContainer.height / 2 + textMaxFontSize / 2;

        txtElem.textContent = text;
        txtElem.setAttribute('fill', themeColors.textColor);
        txtElem.setAttribute("x", xPos.toString());
        txtElem.setAttribute("y", yPos.toString());

        txtElem.setAttribute("font-size", fontSze);
        svgContainderId.appendChild(txtElem);

        return txtElem;
    }

    function changeTextSize(txtElement) {
        var nextSize = Number(txtElement.getAttribute('font-size'));
        txtElement.setAttribute('font-size', (nextSize + 1).toString());
        textWidthInPixels = txtElement.getComputedTextLength();
        if (nextSize > textMaxFontSize) {
            clearInterval(animate);
        }
        if (textWidthInPixels >= svgParameters.width) {
            clearInterval(animate);
        }
    }

    function animateTextResize() {
        changeTextSize(txt);
    }

    var container = getRect(svgNS, svgContainer, xPos, yPos, width, height, themeColors.background);
    var txt = attachText(svgNS, svgContainer, textContent, textFontSize, container);

    var animate = setInterval(animateTextResize, animationSpeedMiliseconds);
};

// Just for testing
renderQuestion('svg-container', 130, 110, 400, 200, 'Text Content Text');