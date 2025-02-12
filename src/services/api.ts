const baseUrl = 'http://127.0.0.1:8000/weather/'

export const fetchCityInfo = async (city: string) => {
    try {
        const response = await fetch(`${baseUrl}?city=${city}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },            
        })
        
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch error:', error);
        return null
    }
}