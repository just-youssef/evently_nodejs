module.exports = (routeHandler) => async (req, res, nxt) => {
    try {
        await routeHandler(req, res);
    } catch (err) {
        nxt(err);
    }
}