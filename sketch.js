let video;
let scalefactor;

let SceneNum = 2;

let line_x;

// font
let IBMFont;
let IBMFontthin;

let input;
let suggestions = [];

let info_window = false;

// resizing of image;
let scale_img;
let x_img;
let y_img;
let current_pix_img;

function preload() {
  let getting_ip_adress = "https://api.ipify.org?format=json";
  loadJSON(getting_ip_adress, gotData_one);
  data = loadJSON("2023_data.json");
  slider = loadImage('slider_V2.png');
  i_icon = loadImage('i.png');
  single_arrow = loadImage('single-arrow.png');

  img_0 = loadImage('title/0.png');
  img_5 = loadImage('title/5.png');
  img_10 = loadImage('title/10.png');
  img_15 = loadImage('title/15.png');
  img_20 = loadImage('title/20.png');
  img_25 = loadImage('title/25.png');
  img_30 = loadImage('title/30.png');
  img_35 = loadImage('title/35.png');
  img_40 = loadImage('title/40.png');
  img_45 = loadImage('title/45.png');
  img_50 = loadImage('title/50.png');
  img_55 = loadImage('title/55.png');
  img_60 = loadImage('title/60.png');
  img_70 = loadImage('title/70.png');
  img_80 = loadImage('title/80.png');
  img_90 = loadImage('title/90.png');
  img_120 = loadImage('title/120.png');
}

function gotData_one(data) {
  ipadress = data.ip;
}

function gotData_two(data) {
  all_information = data;
  country = data.country_name;
}

let link;
let source_link;

function setup() {

  current_pix_img = img_70;

  //font
  IBMFont = loadFont('IBMPlexSans-Medium.ttf');
  IBMFontthin = loadFont('IBMPlexSans-Light.ttf');

  link = createA('https://juliadaser.com/', 'by Julia Daser');
  link.style('font-size', '16px');
  link.style('font-family', 'CustomFont');
  link.style('color', 'black');
  link.attribute('target', '_blank');

  source_link = createA('https://rsf.org/en/index', 'Sources');
  source_link.style('font-size', '16px');
  source_link.style('font-family', 'CustomFont2');
  source_link.style('color', 'black');
  source_link.attribute('target', '_blank');

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
  shuffle(suggestions, true);

  line_x = windowWidth / 2;
  // print(suggestions)
}

let abschnitt;

function draw() {

  if (!info_window) {
    link.hide();
    source_link.hide();
    pixelate_video();
    popup();

    push()
    fill("black")
    circle(40, windowHeight - 40, 55);
    pop()

    push()
    translate(40, windowHeight - 40)
    scale(0.3)
    image(i_icon, -5, -40);
    pop()
  } else {

    input.hide();
    link.show();
    source_link.show();

    link.position(windowWidth / 2 - 50, windowHeight / 2 + 150);
    source_link.position(windowWidth / 2 - 30, windowHeight / 2 + 250);

    background(200);
    push()
    fill("black")
    circle(40, windowHeight - 40, 55);
    pop()

    push()
    translate(32, windowHeight - 47)
    scale(0.06)
    image(single_arrow, 0, 0);
    pop()

    scale_img = windowWidth / img_30.width;
    x_img = windowWidth / 2 - img_30.width * scale_img / 2;
    y_img = windowHeight / 2 - img_30.height * scale_img / 2;

    abschnitt = windowWidth / 13;

    if (mouseX > 0 && mouseX <= abschnitt) {
      current_pix_img = img_70;
    }
    if (mouseX > abschnitt && mouseX <= (abschnitt * 2)) {
      current_pix_img = img_60;
    }
    if (mouseX > (abschnitt * 2) && mouseX <= (abschnitt * 3)) {
      current_pix_img = img_55;
    }
    if (mouseX > (abschnitt * 3) && mouseX <= (abschnitt * 4)) {
      current_pix_img = img_50;
    }
    if (mouseX > (abschnitt * 4) && mouseX <= (abschnitt * 5)) {
      current_pix_img = img_45;
    }
    if (mouseX > (abschnitt * 5) && mouseX <= (abschnitt * 6)) {
      current_pix_img = img_40;
    }
    if (mouseX > (abschnitt * 6) && mouseX <= (abschnitt * 7)) {
      current_pix_img = img_35;
    }
    if (mouseX > (abschnitt * 7) && mouseX <= (abschnitt * 8)) {
      current_pix_img = img_30;
    }
    if (mouseX > (abschnitt * 8) && mouseX <= (abschnitt * 9)) {
      current_pix_img = img_25;
    }
    if (mouseX > (abschnitt * 9) && mouseX <= (abschnitt * 10)) {
      current_pix_img = img_20;
    }
    if (mouseX > (abschnitt * 10) && mouseX <= (abschnitt * 11)) {
      current_pix_img = img_15;
    }
    if (mouseX > (abschnitt * 11) && mouseX <= (abschnitt * 12)) {
      current_pix_img = img_10;
    }
    if (mouseX > (abschnitt * 12) && mouseX <= (abschnitt * 13)) {
      current_pix_img = img_5;
    }

    push()
    image(current_pix_img, x_img, y_img, img_30.width * scale_img, img_30.height * scale_img);
    pop()

    push()
    textSize(20);
    textFont(IBMFont);
    textAlign(CENTER, TOP);
    fill(0);
    text("A tool to compare press freedom indexes around the world", windowWidth / 2, windowHeight / 2 + 100);
    pop();

    push()

    fill(255);
    circle(windowWidth / 2 - 1, windowHeight / 2 + 264, 80);
    pop()

    // push()
    // textSize(16);
    // textFont(IBMFontthin);
    // textAlign(CENTER, TOP);
    // fill(0);
    // text("by Julia Daser", windowWidth / 2, windowHeight / 2 + 150);
    // pop();

  }
}

// making window resizable during experience
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  line_x = windowWidth / 2;
}
