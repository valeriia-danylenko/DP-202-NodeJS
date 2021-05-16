const asyncHandler = fn =>
    function asyncUtilWrap(...args) {
        const fnReturn = fn(...args)
        const next = args[args.length - 1]
        return Promise.resolve(fnReturn).catch(err => next(err))
    }

module.exports = asyncHandler;
// const asyncHandler = fn = (req, res, next) => { 
//     return Promise.resolve(fn(req, res, next)).catch(err => next(err))
// };

