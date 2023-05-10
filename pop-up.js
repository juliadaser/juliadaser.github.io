let mouse_click_on = false;
// let button_color = 128;

function popup() {
    input.position(windowWidth - 280, 20); // make the search field responsive
    if (mouse_click_on) { // if the user clicks it, open window
        fill("white");
        fill(30);
        rect(windowWidth - 300, 0, 300, windowHeight);
        list_of_countries();
    }
}

function list_of_countries() {
    // get the input value
    input.show();
    let val = input.value();

    // filter the suggestions based on the input value
    let filtered;
    if (val === '') {
        filtered = suggestions.slice(0, 40); // show only the first 3 suggestions if there is no input
    } else {
        filtered = suggestions.filter(s => s.toLowerCase().startsWith(val.toLowerCase()));
    }

    for (let i = 0; i < filtered.length; i++) {
        push()
        textSize(16);
        textFont(IBMFontthin);
        textAlign(LEFT, TOP);
        fill(255);
        text(filtered[i], windowWidth - 280, 50 + i * 25);
        pop()

        // check if mouse is over suggestion
        if (mouseX >= (windowWidth - 280) && mouseX <= (200 + (windowWidth - 280)) && mouseY >= 50 + i * 25 && mouseY <= 70 + i * 25) {
            // change color of selected suggestion
            push()
            textSize(16);
            textFont(IBMFontthin);
            textAlign(LEFT, TOP);
            fill(0);
            fill("red");
            text(filtered[i], windowWidth - 280, 50 + i * 25);
            pop()

            // check for mouse click
            if (mouseIsPressed) {
                selected_country = filtered[i];
                input.value(selected_country);
                print(selected_country)
            }
        }
    }

}

function mouseClicked() {


    if (mouse_click_on) { // if the user clicks it, open window
        // Check if the mouse was clicked inside the rectangle
        if (mouseX > width - 360 && mouseX < width - 300) {
            // country_selection();
            if (mouse_click_on) {
                mouse_click_on = false;
                input.hide();
            } else {
                mouse_click_on = true;
            }
        }
    } else {
        // Check if the mouse was clicked inside the rectangle
        if (mouseX > width - 60) {
            // country_selection();
            if (mouse_click_on) {
                mouse_click_on = false;
                input.hide();
            } else {
                mouse_click_on = true;
            }
        }
    }
}
