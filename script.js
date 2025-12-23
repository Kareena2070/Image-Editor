let filters = {
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
const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");
const presetsContainer = document.querySelector(".presets");
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

function createFilter(){
    Object.keys(filters).forEach(key =>{
        const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
        filterContain.appendChild(filterElement)
    })
}
createFilter();


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

resetBtn.addEventListener("click", ()=>{
    filters = {
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
    applyFilters();

    filterContain.querySelectorAll('.filter').forEach(el => el.remove());
    createFilter();
})

downloadBtn.addEventListener("click", ()=>{
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
});


const presents = {
    dramaPreset : {
        brightness: 90,
        contrast: 150,
        saturation: 80,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    vintagePreset : {
        brightness: 105,
        contrast: 90,
        saturation: 70,
        hueRotation: 10,
        blur: 0,
        grayscale: 10,
        sepia: 40,
        opacity: 100,
        invert: 0
    },
    blackAndWhitePreset : {
        brightness: 100,
        contrast: 130,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    warmPreset : {
        brightness: 105,
        contrast: 110,
        saturation: 120,
        hueRotation: 5,
        blur: 0,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    },
    coolPreset : {
        brightness: 95,
        contrast: 120,
        saturation: 90,
        hueRotation: 180,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    softPreset : {
        brightness: 110,
        contrast: 80,
        saturation: 90,
        hueRotation: 0,
        blur: 1,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },
    invertedPreset : {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 100
    },
    cinematicPreset :{
        brightness: 90,
        contrast: 140,
        saturation: 85,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },
    retroPreset : {
        brightness: 110,
        contrast: 95,
        saturation: 75,
        hueRotation: 25,
        blur: 0,
        grayscale: 15,
        sepia: 50,
        opacity: 100,
        invert: 0
    },
    grittyPreset : {
        brightness: 95,
        contrast: 170,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 20,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    dreamyPreset : {
        brightness: 115,
        contrast: 85,
        saturation: 110,
        hueRotation: 5,
        blur: 2,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    }

}

Object.keys(presents).forEach(presetName => {
    const presetbtn = document.createElement("button");
    presetbtn.classList.add("btn");  
    presetbtn.innerText = presetName;
    presetsContainer.appendChild(presetbtn);
   
    presetbtn.addEventListener("click", ()=>{
    
        const preset = presents[presetName];
        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName];
        });
        applyFilters();
        filterContain.querySelectorAll('.filter').forEach(el => el.remove());
        createFilter();
    });
});