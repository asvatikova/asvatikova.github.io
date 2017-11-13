function ClusterSlider(id) {
    this.input = document.getElementById(id);
    this.labelNetwork = document.getElementById(id + '-network');
    this.labelHardware = document.getElementById(id + '-hardware');

    this.valueToCluster = {
        '0' : {
            network: 2,
            hardware: 3
        },
        '1': {
            network: 2,
            hardware: 3
        },
        '2': {
            network: 2,
            hardware: 3
        },
        '3': {
            network: 2,
            hardware: 3
        }
    };

    var self = this;
    this.input.onchange = function() {
        var cluster = self.valueToCluster[self.input.value];
        if (cluster) {
            self.labelNetwork.textContent = cluster.network;
            self.labelHardware.textContent = cluster.hardware;
            if (self.callback)
                self.callback(cluster.network, cluster.hardware);
        }
    }
}

ClusterSlider.prototype.getCurrentCluster = function() {
    return this.valueToCluster[this.input.value];
};

ClusterSlider.prototype.setCallback = function(callback) {
    this.callback = callback;
};