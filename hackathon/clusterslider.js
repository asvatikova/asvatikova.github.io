function ClusterSlider(id) {
    this.input = document.getElementById(id);
    this.labelNetwork = document.getElementById(id + '-label-network');
    this.labelHardware = document.getElementById(id + '-label-hardware');

    this.valueToCluster = {
        '0' : {
            network: 2,
            hardware: 2
        },
        '1': {
            network: 2,
            hardware: 3
        },
        '2': {
            network: 3,
            hardware: 2
        },
        '3': {
            network: 3,
            hardware: 3
        },
        '4' : {
            network: 6,
            hardware: 6
        },
        '5': {
            network: 6,
            hardware: 7
        },
        '6': {
            network: 7,
            hardware: 6
        },
        '7': {
            network: 7,
            hardware: 7
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