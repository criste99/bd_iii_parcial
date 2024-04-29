"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class FibonacciRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getFibonacciToN(req, res) {
        const n = Number(req.query.n);
        if (isNaN(n) || n <= 0) {
            return res.status(400).json({ error: "Por favor, proporciona un número entero positivo mayor que cero." });
        }
        let fibonacciSeries = [];
        function calculateFibonacci(n) {
            let a = 0, b = 1;
            fibonacciSeries.push(a);
            fibonacciSeries.push(b);
            for (let i = 2; i < n; i++) {
                let next = a + b;
                fibonacciSeries.push(next);
                a = b;
                b = next;
            }
        }
        calculateFibonacci(n);
        res.json({ fibonacciSeries });
    }
    getFibonacciN(req, res) {
        const n = parseInt(req.params.n, 10);
        if (n <= 0) {
            return res.status(400).send(" proporciona un número mayor que cero.");
        }
        let fibonacciSeries = [0, 1];
        let num1 = 0, num2 = 1, nextTerm;
        for (let i = 2; i < n; i++) {
            nextTerm = num1 + num2;
            if (nextTerm <= n) {
                fibonacciSeries.push(nextTerm);
                num1 = num2;
                num2 = nextTerm;
            }
            else {
                break;
            }
        }
        res.json(fibonacciSeries);
    }
    routes() {
        this.router.post('/fibonacci', this.getFibonacciToN);
        this.router.get('/serieFibonacci', this.getFibonacciN);
    }
}
const fibonacciRoutes = new FibonacciRoutes();
fibonacciRoutes.routes();
exports.default = fibonacciRoutes.router;
