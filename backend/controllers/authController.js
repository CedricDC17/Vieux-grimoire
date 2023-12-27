const get = (req, res) => {
    console.log('get');
    res.status(200).json({ test: 'test' });

};

module.exports = {
    get
}; 