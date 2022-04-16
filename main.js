function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifycanvas);
    classifier = ml5.imageClassifier("DoodleNet");
    api = window.speechSynthesis;
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_draw();
}

function classifycanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        sketch = result[0].label;
        document.getElementById("label").innerHTML = "Label:" + " " + result[0].label;
        document.getElementById("accu").innerHTML = "Accuracy: " + Math.round(result[0].confidence * 100) + "%";
        utterthis = new SpeechSynthesisUtterance(result[0].label);
        api.speak(utterthis);
    }
}

function clearistic() {
    background("white");
}

quick_draw_data_set = ["aircraft carrier", "airplane", "alarm clock", "ambulance", "angel",
    "animal migration", "ant", "anvil", "apple", "arm", "asparagus", "axe", "backpack", "banana",
    "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach",
    "bear", "beard", "bed", "bee", "belt", "bench", "bicycle", "binoculars", "bird",
    "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie",
    "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus",
    "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera",
    "camouflage", "campfire", "candle", "cannon", "canoe", "car", "carrot", "castle",
    "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle",
    "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler",
    "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup",
    "diamond", "dishwasher", "diving board", "dog", "dolphin", "donut", "door", "dragon",
    "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant",
    "envelope", "eraser", "eye", "eyeglasses", "face", "fan", "feather", "fence",
    "finger", "fire hydrant", "fireplace", "firetruck", "fish", "flamingo",
    "flashlight", "flip flops", "floor lamp", "flower", "flying saucer",
    "foot", "fork", "frog", "frying pan", "garden", "garden hose", "giraffe",
    "goatee", "golf club", "grapes", "grass", "guitar", "hamburger", "hammer", "hand",
    "harp", "hat", "headphones", "hedgehog", "helicopter", "helmet", "hexagon",
    "hockey puck", "hockey stick", "horse", "hospital", "hot air balloon", "hot dog",
    "hot tub", "hourglass", "house", "house plant", "hurricane", "ice cream", "jacket",
    "jail", "kangaroo", "key", "keyboard", "knee", "knife", "ladder", "lantern",
    "laptop", "leaf", "leg", "light bulb", "lighter", "lighthouse", "lightning",
    "line", "lion", "lipstick", "lobster", "lollipop", "mailbox", "map", "marker",
    "matches", "megaphone", "mermaid", "microphone", "microwave", "monkey", "moon",
    "mosquito", "motorbike", "mountain", "mouse", "moustache", "mouth", "mug",
    "mushroom", "nail", "necklace", "nose", "ocean", "octagon", "octopus", "onion",
    "oven", "owl", "paintbrush", "paint can", "palm tree", "panda", "pants",
    "paper clip", "parachute", "parrot", "passport", "peanut", "pear", "peas",
    "pencil", "penguin", "piano", "pickup truck", "picture frame", "pig",
    "pillow", "pineapple", "pizza", "pliers", "police car", "pond", "pool",
    "popsicle", "postcard", "potato", "power outlet", "purse", "rabbit",
    "raccoon", "radio", "rain", "rainbow", "rake", "remote control", "rhinoceros",
    "rifle", "river", "roller coaster", "rollerskates", "sailboat", "sandwich",
    "saw", "saxophone", "school bus", "scissors", "scorpion", "screwdriver",
    "sea turtle", "see saw", "shark", "sheep", "shoe", "shorts", "shovel",
    "sink", "skateboard", "skull", "skyscraper", "sleeping bag", "smiley face",
    "snail", "snake", "snorkel", "snowflake", "snowman", "soccer ball", "sock",
    "speedboat", "spider", "spoon", "spreadsheet", "square", "squiggle", "squirrel",
    "stairs", "star", "steak", "stereo", "stethoscope", "stitches", "stop sign",
    "stove", "strawberry", "streetlight", "string bean", "submarine",
    "suitcase", "sun", "swan", "sweater", "swingset", "sword", "syringe",
    "table", "teapot", "teddy-bear", "telephone", "television", "tennis racquet",
    "tent", "The Eiffel Tower", "The Great Wall of China", "The Mona Lisa",
    "tiger", "toaster", "toe", "toilet", "tooth", "toothbrush",
    "toothpaste", "tornado", "tractor", "traffic light", "train", "tree",
    "triangle", "trombone", "truck", "trumpet", "tshirt",
    "umbrella", "underwear", "van", "vase", "violin", "washing machine",
    "watermelon", "waterslide", "whale", "wheel", "windmill", "wine bottle",
    "wine glass", "wristwatch", "yoga", "zebra", "zigzag"];

function update_canvas()
{background("white");
var random = Math.round(Math.random() * quick_draw_data_set.length);
console.log(random);
console.log(quick_draw_data_set[random]);
drawn_sketch = quick_draw_data_set[random];
document.getElementById("what").innerHTML = "Sketch to be Drawn: " + (quick_draw_data_set[random]).toUpperCase();}

var timer_counter = 0;
var timer_check = "";
var draw_sketch = "";
var answer_holder = "";
var score = 0;
var sketch = "";
var drawn_sketch = "";

if(sketch == drawn_sketch){
    answer_holder = "set";
    score++;
    document.getElementById("score").innerHTML = "Score: " + score;
}

function check_draw(){
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer: " + timer_counter;
    console.log(timer_counter);
    if(timer_counter==1000){
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check=="completed"){
        timer_check = "";
        answer_holder = "";
        update_canvas();
    }
}
