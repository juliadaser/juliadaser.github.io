// FOR API
var ipadress;
var coordinates;
let country;

let pixel_amount_left;
let pixel_amount_right;
let shapeMove = false;
let d = 0;

// creating user selection
let selected_country = "select country";

// JSON file with Media Autonomy Index
let data;
let media_autonomy_right;
let media_autonomy_left;
let skip_amount_right = 1;

let user_selected_something = false;

let strokecolor = "red"

function pixelate_video() {

    noStroke()
    video.loadPixels();


    for (let i = 0; i < 180; i++) {
        if (country == data[i].Country_EN) {
            media_autonomy_left = data[i]["Political Context"];
        }
    }

    pixel_amount_left = map(int(media_autonomy_left), 20, 100, 0, 300);
    let skip_amount_left = floor((windowHeight / pixel_amount_left))


    // checking if user has selected a country from the list yet
    if (selected_country != "select country") {
        for (let i = 0; i < 180; i++) {
            if (selected_country == data[i].Country_EN) {
                media_autonomy_right = data[i]["Political Context"];
            }
        }

        pixel_amount_right = map(int(media_autonomy_right), 20, 100, 0, 300);
        skip_amount_right = floor(windowHeight / pixel_amount_right);

    } else {
        // if the user has not selected any country, then just show them the camera 

        scalefactor = Math.max(windowWidth / video.width, windowHeight / video.height);
        let videoWidth = video.width * scalefactor;
        let videoHeight = video.height * scalefactor;
        let videoX = (windowWidth - videoWidth) / 2;
        let videoY = (windowHeight - videoHeight) / 2;

        let new_video = image(video, -videoX - videoWidth, videoY, videoWidth, videoHeight);

        push();
        scale(-1, 1);
        image(video, -videoX - videoWidth, videoY, videoWidth, videoHeight);
        pop();
    }

    if (selected_country != "select country") { // means the user has selected something
        for (let x = 0; x < windowWidth; x += skip_amount_right) {
            for (let y = 0; y < windowHeight; y += skip_amount_right) {

                //this is the index of the array
                let pindex = ((video.width - x) + (y * video.width)) * 4;
                let r = video.pixels[pindex + 0];
                let g = video.pixels[pindex + 1];
                let b = video.pixels[pindex + 2];

                fill(r, g, b);
                rect(x, y, windowWidth / pixel_amount_right, windowHeight / pixel_amount_right);
            }
        }
    }

    // LEFT SIDE
    for (let x = 0; x < line_x; x += skip_amount_left) {
        for (let y = 0; y < windowHeight; y += skip_amount_left) {

            //this is the index of the array
            let pindex = ((video.width - x) + (y * video.width)) * 4;
            //this is the rbg value inside the index
            let r = video.pixels[pindex + 0];
            let g = video.pixels[pindex + 1];
            let b = video.pixels[pindex + 2];

            fill(r, g, b);
            rect(x, y, windowWidth / pixel_amount_left, windowHeight / pixel_amount_left);
        }
    }
    updatePixels();

    // drawing the border between the different sides of the canvases
    strokecolor = floor(map(line_x, 80, windowWidth - 80, 255, 0));

    push()
    stroke(strokecolor)
    strokeWeight(2)
    line(line_x, 0, line_x, windowHeight)

    noStroke();
    fill(strokecolor);
    circle(line_x, windowHeight / 2, 80, 80);
    push()
    translate(line_x, windowHeight / 2)
    scale(0.2)
    image(slider, -135, -25);
    pop()
    pop()

    textSize(40);

    // background white
    fill("white");
    rect(0, 0, 80, windowHeight);

    // text thin
    push()
    fill(150);
    textSize(20);
    textFont(IBMFontthin);
    translate(0, height / 2);
    rotate(-90);
    text("press freedom of", 0, 15);
    pop()

    // text fat - United States
    push();
    textFont(IBMFont);
    fill("black");
    translate(0, height / 2);
    rotate(-90);
    text(country, 0, 45)
    pop();

    // background black
    if (mouse_click_on) {
        fill("black");
        rect(windowWidth - 380, 0, 80, windowHeight);

        // text thin
        push()
        fill(150);
        textSize(20);
        textFont(IBMFontthin);
        translate(windowWidth - 300, height / 2);
        rotate(-90);
        text("press freedom of", 0, -65);
        pop()

        // text 
        push();
        textFont(IBMFont);
        fill("white");
        translate(windowWidth - 300, height / 2);
        rotate(-90);
        text(selected_country, 0, -35)
        pop();
    } else {

        fill("black");
        rect(windowWidth - 80, 0, 80, windowHeight);

        // text thin
        push()
        fill(150);
        textSize(20);
        textFont(IBMFontthin);
        translate(windowWidth, height / 2);
        rotate(-90);
        text("press freedom of", 0, -65);
        pop()

        // text 
        push();
        textFont(IBMFont);
        fill("white");
        translate(windowWidth, height / 2);
        rotate(-90);
        if (selected_country == "select country") {
            fill("red");
        }
        text(selected_country, 0, -35)
        pop();
    }
}

function mousePressed() {
    d = mouseX - line_x
    if (d > -50 && d < 50) {
        shapeMove = true;
    } else {
        shapeMove = false;
    }
}

function mouseReleased() {
    shapeMove = false
}

function mouseDragged() {
    if (shapeMove) {
        line_x = mouseX;
    }

    // stops line at borders
    if (line_x > windowWidth - 80) {
        line_x = windowWidth - 81
    }
    if (line_x < 80) {
        line_x = 81
    }
}
