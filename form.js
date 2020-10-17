class Form {
    constructor() {
        this.heading = createElement("h3","Name your pet");
        this.input = createInput("Name");
        this.button = createButton("Save");
        this.name = "...";
    }
    display() {
        this.heading.position(100,50);
        this.button.position(280, 100);
        this.input.position(100, 100);
        this.button.mousePressed(() => {
            this.name = this.input.value();
            this.heading.hide();
            this.input.hide();
            this.button.hide();
            database.ref("/").update({
                Petname: this.input.value()
            })
        })
    }
}