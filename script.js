const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    // exposure: {
    //     value: 100,
    //     min: 0,
    //     max: 200,
    //     unit: "%"
    // },
    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 200,
        unit: "deg"
    },
    blur:{
        value: 0,
        min: 0,
        max: 200,
        unit: "px"
    }, 
    grayscale:{
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    sepia:{
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const filterContain = document.querySelector(".filters")
const imageCanvas = document.getElementById("image-canvas");
const imageInput = document.getElementById("image-input");
const canvasContext = imageCanvas.getContext("2d");
const imagePlaceholder = document.querySelector(".placeholder-image");
let file = null;
let image = null;

function createFilterElement(name, unit, value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id= name

    const p = document.createElement("p");
    p.innerHTML= name;

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event)=>{
        filters[name].value = event.target.value;
        applyFilters();
    })
    return div
}

Object.keys(filters).forEach(key =>{

    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    filterContain.appendChild(filterElement)
})

imageInput.addEventListener("change", (event)=>{
    file = event.target.files[0];
    imageCanvas.style.display = "block";
    imagePlaceholder.style.display = "none";
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = ()=>{
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasContext.drawImage(img, 0, 0);
    }
})

function applyFilters(){
    canvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasContext.filter = `brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${Number(filters.opacity.value) / 100})
    invert(${filters.invert.value}${filters.invert.unit})
    `.trim();
    canvasContext.drawImage(image, 0, 0);
}