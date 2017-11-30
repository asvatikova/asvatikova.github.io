function DateSlider(id){
    this.input = document.getElementById(id);
    this.label = document.getElementById(id + '-label');
    this.input.min = -450;
    this.input.max = 0;
    this.input.step = 1;
    this.input.value = -450;

    this.today = new Date(2017, 10, 13);

    var self = this;
    this.input.onchange = function() {
        self.setDate(self.input.value);
        if (self.callback)
            self.callback(self.chartDateString);
    }
}

DateSlider.prototype.setCallback = function(callback) {
    this.callback = callback;
};

DateSlider.prototype.setDate = function(offset) {
    var dat = addDays(this.today, offset);

    var dd = dat.getDate();
    var mm = dat.getMonth()+1;
    var yyyy = dat.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    this.label.textContent = dd + '.' + mm + '.' + yyyy;
    this.chartDateString = yyyy + '-' + mm + '-' + dd;
};

function addDays(date, days) {
    const msInDay = 1000 * 60 * 60 * 24;
    const newDate = date.valueOf() + days * msInDay;
    return new Date(newDate);
}

DateSlider.prototype.getCurrentDate = function() {
    return this.chartDateString;
};

DateSlider.prototype.stepUp = function() {
    this.input.stepUp();
    this.input.stepUp();
    this.input.stepUp();
    this.input.onchange();

    return this.input.value < this.input.max;
};

