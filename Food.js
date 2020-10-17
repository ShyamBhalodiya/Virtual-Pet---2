class Food {
    constructor() {
        this.foodstock = null;
        this.lastfed = null;
        this.image = loadImage("images/Milk.png");
    }
    display() {
        var x = 80, y = 100;
        imageMode(CENTER);

        if (this.foodstock != 0) {
            for (var i = 0; i < this.foodstock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                x = x + 30;
                image(this.image, x, y, 50, 50);
            }
        }
    }
    getfoodstock() {
        var foodstock = database.ref("Foodstock");
        foodstock.on("value", (data) => {
            this.foodstock = data.val();
        })
    }
    getlastfedtime() {
        database.ref("Lastfeed").on("value", (data) => {
            this.lastfed = data.val();
        })
    }
    displaylastfedtime() {
        fill(0);
        textSize(15);
        if (this.lastfed >= 12) {
            text("Last Feeding Time : " + this.lastfed % 12 + " PM", 350, 30);
        }
        else if (this.lastfed == 0) {
            text("Last Feeding Time : 12 AM", 350, 30);
        }
        else {
            text("Last Feeding Time : " + this.lastfed + " AM" + 350, 30);
        }
    }
    deductfood() {
        if (this.foodstock <= 0) {
            this.foodstock = 0
            database.ref("/").update({
                Foodstock: this.foodstock
            })
        }
        this.foodstock = this.foodstock - 1;
        database.ref("/").update({
            Foodstock: this.foodstock
        })
    }
    addfood() {
        this.foodstock += 1;
        database.ref("/").update({
            Foodstock: this.foodstock
        })
    }
}
