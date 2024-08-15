function combination(n, k) {
    if (n < k)
        return 0;
    if (n === k)
        return 1;
    return factorial(n) / (factorial(k) * factorial(n - k));
}
function factorial(n) {
    if (n === 0)
        return 1;
    return n * factorial(n - 1);
}
