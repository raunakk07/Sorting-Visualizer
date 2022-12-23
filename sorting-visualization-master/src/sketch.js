let arr = [];
let minElement;
let maxElement;
let elementCount;
let allArr;
let k;
let drawingStatus;
let loopStatus;
let cnv;
let currAlg;
let algorithmNames;
let validKeys;
let lastOperationTime;

function setup() {
    const navBar = document.getElementById('nav-bar');
    const h = window.innerHeight - 2 * navBar.offsetHeight;
    const w = 2 * h;
    cnv = createCanvas(w, h);
    cnv.parent('container');
    allArr = [];

    algorithmNames = {
        'Bubble Sort': 'bubbleSort',
        'Quick Sort': 'quickSort',
        'Merge Sort': 'mergeSort',
        'Insertion Sort': 'insertionSort',
        'Selection Sort': 'selectionSort',
        'Heap Sort': 'heapSort',
        'Tim Sort': 'timSort',
        'Radix Sort': 'radixSort',
        'Shell Sort': 'shellSort',
        'Cycle Sort': 'cycleSort',
        'Odd Even Sort': 'oddEvenSort',
        'Cocktail Sort': 'cocktailSort'
    };

    validKeys = {
        'b': 'bubbleSort',
        'q': 'quickSort',
        'm': 'mergeSort'
    };

    initDOM();
    elementCount = 8;
    lastOperationTime = 0;

    arr = randomArray(elementCount, 1, 50);
    calculateArray(arrayExt(arr));
    k = 0;
    frameRate(120);
    drawingStatus = false;
    loopStatus = "noLoop";
}

function reset() {
    drawingStatus = false;
    loopStatus = 'noLoop';
    k = 0;
}

function draw() {
    clear();
    background(37, 109, 133,0.5);

    if (drawingStatus) {
        if (lastOperationTime === 0) {
            loopStatus = 'noLoop';
            drawingStatus = false;
        } else {
            if (loopStatus === "loop") {
                drawArray(allArr[k++], minElement, maxElement);
                if (k >= allArr.length) {
                    k = 0;
                    loopStatus = "noLoop";
                }
            } else {
                drawArray(allArr[allArr.length -1], minElement, maxElement);
            }
        }
    } else {
        drawArray(arr, minElement, maxElement);
    }


    if (lastOperationTime !== 0) {
        textSize(24);
        fill(255);
        text('Real sorting time: ' + (lastOperationTime / 1000).toFixed(6) + ' seconds', 20, 20);
    }
}

function drawArray(a, min, max) {
    let r = width / a.length;
    for (let i = 0; i < a.length; i++) {
        fill(195, 247, 247);
        let yy = map(a[i], min, max, r / 4, height);
        rect(i * r, height - yy, r, yy);
    }
}

function keyPressed() {
    for (let v of Object.keys(validKeys)) {
        if (key === v) {
            allArr = [];
            drawingStatus = true;
            loopStatus = "loop";
            lastOperationTime = callSortFunction(validKeys[v]);
        }
    }
}
