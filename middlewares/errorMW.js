module.exports = (err, req, res, nxt) => {
    if(err.errors){
        for(let e in err.errors){
            console.log(err.errors[e].message);
            return res.status(500).json({ error: `inernal server error.. ${err.errors[e].message}` });
        }
    }

    console.log(err.message);
    return res.status(500).json({ error: `inernal server error.. ${err.message}` });

}