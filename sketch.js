let video;
let scalefactor;

let SceneNum = 2;

let line_x;

// font
let IBMFont;
let IBMFontthin;

let input;
let suggestions = [];


function preload() {
  let getting_ip_adress = "https://api.ipify.org?format=json";
  loadJSON(getting_ip_adress, gotData_one);
  data = loadJSON("2023_data.json");
  slider = loadImage('slider_V2.png');
}

function gotData_one(data) {
  ipadress = data.ip;
}

function gotData_two(data) {
  all_information = data;
  country = data.country_name;
}

function setup() {

  //font
  IBMFont = loadFont('IBMPlexSans-Medium.ttf');
  IBMFontthin = loadFont('IBMPlexSans-Light.ttf');

  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // getting the user's coordinates by passing in the IP Adress into the Query String of another API Adress
  let url = "https://json.geoiplookup.io/";
  let getting_coordinates = url.concat(ipadress);
  loadJSON(getting_coordinates, gotData_two);

  // create input field
  input = createInput();
  input.position(windowWidth - 280, 20);
  input.size(250, 20);
  input.hide();

  // creating an option in the menu for each country
  for (let i = 0; i < 180; i++) {
    append(suggestions, str(data[i].Country_EN));
  }

  line_x = windowWidth / 2;
  // print(suggestions)
}

function draw() {
  pixelate_video();
  popup();
}

// making window resizable during experience
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  line_x = windowWidth / 2;
}