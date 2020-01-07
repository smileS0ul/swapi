const compose = (...funcs) => (comp) => {
    return funcs.reduceRight((prevRes, f) => {
        return f(prevRes);
    }, comp)
};

export default compose;