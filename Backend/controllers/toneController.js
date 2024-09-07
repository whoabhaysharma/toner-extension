import { changeTone } from "../services/toneService";

const modifyTone = async (req, res) => {
    const { text, tone } = req.body;
    try {
        const modifiedText = await changeTone(text, tone);
        res.status(200).json({ modifiedText });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    modifyTone,
};