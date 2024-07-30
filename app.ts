import express, { Request, Response } from 'express';
const cors = require('cors');
// import search from 'california-license-plates';  // Use actual path if different
const { search } = require('california-license-plates');


const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001'  // Adjust this to match the port and protocol of your frontend
}));

app.post('/check_plate', async (req: Request, res: Response) => {
    const plate = req.body.plate as string;
    if (!plate) {
        return res.status(400).json({ message: 'Plate parameter is required.' });
    }

    try {
        const result = await search(plate);
        if (result.available) {
            res.json({ available: true, message: `${plate} is available!`, src: result.src });
        } else {
            res.json({ available: false, message: `${plate} is not available.` });
        }
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Failed to check plate availability.' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
