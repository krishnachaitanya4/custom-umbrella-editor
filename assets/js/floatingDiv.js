var floatingDiv = document.getElementById('floatingDiv');
var currentTriangle = null;
var triangleProperties = {};
// Add event listeners for triangle clicks
document.querySelectorAll('.triangle').forEach(function (triangle) {
    var childTriangle = triangle.querySelector('.tri-in');
    var logoDiv = childTriangle.querySelector('.logo-div');
    triangleProperties[triangle.dataset.triangleId] = {
        mainElement: triangle,
        childElement: childTriangle,
        logoElement: logoDiv,
        color: getComputedStyle(childTriangle).backgroundColor,
        logo: null,
        textElement: childTriangle.querySelector('.text-box'),
        text: "",
        subText: "",
        subImage: null,
        siblingElement: triangle.parentNode.className == "petal" ? triangle.nextElementSibling : null,
        isText: false
    };
    triangle.addEventListener('click', function (event) {
        event.stopPropagation();
        openfloatingDiv(triangle, event.clientX, event.clientY);
    });
    if (triangleProperties[triangle.dataset.triangleId].siblingElement) {
        triangleProperties[triangle.dataset.triangleId].siblingElement.addEventListener(
            'click', (event) => {
                event.stopPropagation();
                openfloatingDiv(triangle, event.clientX, event.clientY);
            }
        )
    }
});

document.addEventListener('click', function (event) {
    if (!floatingDiv.contains(event.target) && event.target !== currentTriangle) {
        closefloatingDiv();
    }
});

//  Function to handle opening the floating div with a given triangle
function openfloatingDiv(mainTriangle, mouseX, mouseY) {
    // Set the currently selected triangle and its properties
    currentTriangle = mainTriangle;
    var triangleId = mainTriangle.dataset.triangleId;
    var triangleInfo = triangleProperties[triangleId];
    var cf_btn = document.getElementById("cf-btn");
    var cf_btn_2 = document.getElementById("cf-btn-2");
    var fileForm = document.getElementById("fileInput");
    var fileForm_2 = document.getElementById('fileInput-2');
    var upload_1 = document.getElementById("upload-1")
    var upload_2 = document.getElementById("upload-2")
    /* var text_input = document.getElementById("text-input-1") */
    var hexInput = document.getElementById('color-inbox');

    fileForm.value = "";
    fileForm_2.value = "";
    document.getElementById("text-input-1").value = triangleInfo.text;
    document.getElementById('textToggle').checked = triangleInfo.isText;
    if (triangleInfo.siblingElement) {
        document.getElementById("text-input-2").value = triangleInfo.subText;
        upload_2.style.display = "block";
    } else {
        upload_2.style.display = "none";
    }

    // Set the width of the color picker based on the screen width
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    var pickerWidth = Math.min(screenWidth - 20, 300); // Maximum width of 300px
    floatingDiv.style.width = pickerWidth + 'px';

    document.getElementById('color-inbox').addEventListener('input', function () {
        if (validateAndChangeColor(this.value)) {
            colorPicker.value = this.value;
            changeTriangleColor(this);
        }
    })
    function validateAndChangeColor(hexValue) {
        var validHex = /^#([0-9A-Fa-f]{3}){1,2}$/g.test(hexValue);
        if (validHex) {
            return (true)
        } return (false)

    }

    // Set the color and logo in the color picker
    var colorPicker = document.getElementById('color');

    //colorPicker.value = triangleInfo.color;
    colorPicker.value = rgbToHex(triangleInfo.color);
    hexInput.value = colorPicker.value;

    //Remove image function
    cf_btn.addEventListener('click', (e) => {
        e.preventDefault();
        //triangleInfo.logoElement.style.display = 'none';
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];
        triangleInfo.logoElement.innerHTML = null;
        triangleInfo.logo = null;
        cf_btn.style.display = "none";
        fileForm.style.display = "inherit";
        fileForm.value = ""
        //fileForm.click();
    })

    cf_btn_2.addEventListener('click', (e) => {
        e.preventDefault();
        //triangleInfo.logoElement.style.display = 'none';
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];
        triangleInfo.siblingElement.innerHTML = null;
        triangleInfo.subImage = null;
        cf_btn_2.style.display = "none";
        fileForm_2.style.display = "inherit";
        fileForm_2.value = ""
        //fileForm.click();
    })

    if (triangleInfo.isText) {
        upload_1.style.display = 'none'
        if (triangleInfo.siblingElement) {
            upload_2.style.display = 'none'
            document.getElementById('sub-text-body').style.display = 'block'
        }else{
            document.getElementById('sub-text-body').style.display = 'none'
        }
        document.getElementById('text-body').style.display = 'block'
        
    } else {
        upload_1.style.display = 'block'
        if (triangleInfo.siblingElement) {
            upload_2.style.display = 'block'
        }
        document.getElementById('text-body').style.display = 'none'
        document.getElementById('sub-text-body').style.display = 'none'
    }

    //fileForm.value = triangleInfo.logo;
    // Show or hide the logo div based on the existence of a valid logo file
    if (!triangleInfo.isText) {
        if (triangleInfo.logo !== null && triangleInfo.logo !== '') {
            /* triangleInfo.logoElement.innerHTML = '<img src="' + triangleInfo.logo + '" alt="Logo">';
            triangleInfo.logoElement.style.display = 'flex'; */
            cf_btn.style.display = "block";
            fileForm.style.display = "none";
        } else {
            /* triangleInfo.logoElement.style.display = 'none'; */
            cf_btn.style.display = "none";
            fileForm.style.display = "block";
        }

        // Show or hide the logo div based on the existence of a valid logo file(form2)
        if (triangleInfo.siblingElement) {
            if (triangleInfo.subImage !== null && triangleInfo.subImage !== '') {
                /* triangleInfo.siblingElement.innerHTML = '<img src="' + triangleInfo.subImage + '" alt="img">'; */
                cf_btn_2.style.display = "block";
                fileForm_2.style.display = "none";
            } else {
                /* triangleInfo.siblingElement.innerHTML = null; */
                cf_btn_2.style.display = "none";
                fileForm_2.style.display = "block";
            }
        }
    }

    document.getElementById('textToggle').addEventListener('change', function () {
        if (this.checked) {
            upload_1.style.display = 'none'
            if (triangleInfo.siblingElement) {
                upload_2.style.display = 'none'
                document.getElementById('sub-text-body').style.display = 'block'
            }else{
                document.getElementById('sub-text-body').style.display = 'none'
            }
            document.getElementById('text-body').style.display = 'block'
        } else {
            upload_1.style.display = 'block'
            
            if (triangleInfo.siblingElement) {
                upload_2.style.display = 'block'
                document.getElementById('sub-text-body').style.display = 'none'
            }else{
                upload_2.style.display = 'none'
                document.getElementById('sub-text-body').style.display = 'none'
            }
            document.getElementById('text-body').style.display = 'none'
            document.getElementById('sub-text-body').style.display = 'none'
            
        }
        changeMode(this)
    })
    document.getElementById('text-input-1').addEventListener('input', function () {
        changeText(this);
    })
    document.getElementById('text-input-2').addEventListener('input', function () {
        changeSubText(this);
    })
    document.getElementById('color').addEventListener('input', function () {
        changeTriangleColor(this);
    });

    document.getElementById('fileInput').addEventListener('change', function () {
        changeLogo(this);
    });
    document.getElementById('fileInput-2').addEventListener('change', function () {
        changeSubImage(this);
    });

    // Calculate the left position to ensure it stays within the viewport
    var leftPos = mouseX - pickerWidth / 2;
    leftPos = Math.max(leftPos, 10); // Minimum left position

    if (leftPos + pickerWidth > screenWidth - 10) {
        leftPos = screenWidth - pickerWidth - 10;
    }

    floatingDiv.style.top = (mouseY + 10) + 'px';
    floatingDiv.style.left = leftPos + 'px';
    floatingDiv.style.display = 'block';
}
/*********************** OpenDiv function end ***************************************/

// Functin to handle closing of floating div with a given triangle
function closefloatingDiv() {
    floatingDiv.style.display = 'none';
}
function changeText(textInput) {
    if (currentTriangle) {
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];
        // Update the color property of the triangle
        triangleInfo.text = textInput.value;
        /* console.log(triangleInfo) */
        document.getElementById('text-input-1').value = textInput.value;
        triangleInfo.textElement.innerHTML = document.getElementById('text-input-1').value.replace(/\n/g, "<br>");
    }
}

function changeSubText(textInput) {
    if (currentTriangle) {
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];
        // Update the color property of the triangle
        triangleInfo.subText = textInput.value;
        /* console.log(triangleInfo) */
        document.getElementById('text-input-2').value = textInput.value;
        triangleInfo.siblingElement.querySelector('.sub-text-box').innerHTML = document.getElementById('text-input-2').value.replace(/\n/g, "<br>");
    }
}

function changeHeading(textInput) {
    if (currentTriangle) {
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];
        // Update the color property of the triangle
        triangleInfo.heading = textInput.value;
        /* console.log(triangleInfo) */
        document.getElementById('text-input-2').value = textInput.value;
        triangleInfo.headingElement.innerHTML = document.getElementById('text-input-2').value;
    }
}
function changeTriangleColor(colorInput) {
    if (currentTriangle) {
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];

        // Update the color property of the triangle
        triangleInfo.color = colorInput.value;
        document.getElementById('color-inbox').value = colorInput.value

        // Update the triangle's visual style
        triangleInfo.childElement.style.backgroundColor = colorInput.value;
        if (triangleInfo.siblingElement) {
            triangleInfo.siblingElement.style.backgroundColor = colorInput.value;
        }
    }
}

function changeLogo(fileInput) {
    if (currentTriangle && fileInput.files.length > 0) {
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];

        // Assuming you want to update the logo path
        triangleInfo.logo = URL.createObjectURL(fileInput.files[0]);

        // Update the logo element in the triangle
        triangleInfo.logoElement.innerHTML = '<img src="' + triangleInfo.logo + '" alt="Logo">';
        triangleInfo.logoElement.style.display = 'flex';
    }
}

function changeSubImage(fileInput) {
    if (currentTriangle && fileInput.files.length > 0) {
        var triangleId = currentTriangle.dataset.triangleId;
        var triangleInfo = triangleProperties[triangleId];

        // Assuming you want to update the logo path
        triangleInfo.subImage = URL.createObjectURL(fileInput.files[0]);
        // Update the logo element in the triangle
        triangleInfo.siblingElement.querySelector('.sub-logo-div').innerHTML = '<img src="' + triangleInfo.subImage + '" alt="img">';
    }
}
function changeMode(toggle) {
    var triangleId = currentTriangle.dataset.triangleId;
    var triangleInfo = triangleProperties[triangleId];
    triangleInfo.isText = toggle.checked;
    if (toggle.checked) {
        triangleInfo.textElement.style.display = 'block';
        triangleInfo.logoElement.style.display = 'none';
        if(triangleInfo.siblingElement){
            triangleInfo.siblingElement.querySelector('.sub-logo-div').style.display = 'none'
            triangleInfo.siblingElement.querySelector('.sub-text-box').style.display = 'flex'
        }
    } else {
        triangleInfo.textElement.style.display = 'none';
        triangleInfo.logoElement.style.display = 'block';
        if(triangleInfo.siblingElement){
            triangleInfo.siblingElement.querySelector('.sub-logo-div').style.display = 'flex'
            triangleInfo.siblingElement.querySelector('.sub-text-box').style.display = 'none'
        }

    }
}

// Function to convert RGB format to Hex format
function rgbToHex(rgb) {
    if (rgb.startsWith('#')) {
        return rgb;
    }
    // Extract the individual RGB components
    var rgbArray = rgb.match(/\d+/g);
    // Convert each component to a hexadecimal value and concatenate
    var hexValue = '#' + rgbArray.map(function (value) {
        var hex = parseInt(value).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
    return hexValue;
}

