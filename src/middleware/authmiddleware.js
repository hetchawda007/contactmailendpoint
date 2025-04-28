const authenticateApiKey = (req, res, next) => {
    try {
        const apiKey = req.headers['api-key'];
        console.log(`API Key: ${apiKey}`);
        console.log(`Secret Key: ${process.env.SECRET_API_KEY}`);
        if (!apiKey) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (apiKey !== process.env.SECRET_API_KEY) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export default { authenticateApiKey };