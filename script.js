const filters = {
    brightness: {
        name: "brightness",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        name: "Contrast",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    exposure: {
        name: "Contrast",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    saturation: {
        name: "Saturatio",
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        name: "Hue Rotation",
        value: 0,
        min: 0,
        max: 200,
        unit: "deg"
    },
    blur:{
        name: "Blur",
        value: 0,
        min: 0,
        max: 200,
        unit: "px"
    }, 
    grayscale:{
        name: "grayscale",
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    },
    sepia:{
        name: "Sepia",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        name: "Opacity",
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        name: "Invert",
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}


const filterContain = document.querySelector(".filters")

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
    return div
}

Object.keys(filters).forEach(key =>{

    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    filterContain.appendChild(filterElement)
})