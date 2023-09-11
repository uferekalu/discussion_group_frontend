export const url = 'http://localhost:5000/api'

export const setHeaders = () => {
    const headers = {
        headers: {
            "x-auth-token": typeof window !== "undefined" && localStorage.getItem('token')
        }
    }
    return headers
}

export const setUploadHeaders = () => {
    const headers = {
        headers: {
            "x-auth-token": typeof window !== "undefined" && localStorage.getItem('token'),
            // 'Content-Type': 'application/octet-stream' //Send as binary data
        }
    }
    return headers
}