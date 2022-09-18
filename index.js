class Sigmoid {
    calc (num) {
        return 1 / (1 - Math.pow(Math.E, -num))
    }

    derivative (num) {
        const simoid = this.calc(num);
        return sigmoid * (1 - sigmoid);
    }
}

class RMSError {
    calc(outputs, desiredOutputs) {}
}

const getExample = () => {
    return Array(4).fill(0).map(() => Math.round(Math.random()))
}

const getAnswer = (example) => {
    return example.includes(0) && example.includes(1);
}

const LAYERS = [4, 3, 3, 1];
const LEARNING_RATE = 0.3;
const ACTIVATION_FUNCTION = new Sigmoid();

class Network {
    constructor(layers, activationFunction, learningRate) {
        this.weights = this.initWeights(layers);
        this.layers = layers;
        this.activationFunction = activationFunction;
        this.learningRate = learningRate;
        this.deltaWVectors = [];
    }

    initWeights(layers, weights = []) {
        const prevLayer = layers[0];
        const currentLayer = layers[1];
        const nextLayer = layers[2];
        const neurons = []

        for (let i = 0; i < currentLayer; i += 1) {
            neurons.push(Array(prevLayer).fill(0).map(() => (Math.random() * 2) - 1))
        }

        weights.push(neurons);

        return nextLayer ? this.initWeights(layers.slice(1), weights) : weights;
    }

    propagateForward(inputs) {
        const { weights } = this;
        const propagateOverLayer = (input, layer) => {
            const outputs = [];
            for (let i = 0; i < layer.length; i += 1) {
                const neuron = layer[i];
                if (input.length != neuron.length) throw Error("number of weights and inputs does not match!");
                const sum = neuron.reduce((acc, weight, i) => acc + weight * input[i], 0);
                outputs.push(sum);
            }
            return outputs;
        }

        return weights.reduce((inputs, layer) => propagateOverLayer(inputs, layer), inputs)
    }

    propagateBackwards(error) {
        const weights = this.weights.reverse();

    }

}

const n = new Network(LAYERS, new Sigmoid(), LEARNING_RATE);
console.log(n.propagateForward([1, 1, 1, 1]));
