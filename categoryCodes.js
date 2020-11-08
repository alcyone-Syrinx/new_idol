import axios from 'axios';

const apiCodes = async () => {
    try {
        const idolData = await axios.get('http://localhost:3002/api/category/codes');
        return (idolData.data);
    } catch (error) {
        return false;
    }
}

export default apiCodes;