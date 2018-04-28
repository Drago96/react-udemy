
export const getUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        clearUserStorage();
        return {
            token: null,
            userId: null
        }
    } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            clearUserStorage();
            return {
                token: null,
                userId: null
            }
        } else {
            const userId = localStorage.getItem("userId");
            return {
                token,
                userId
            }
        }
    }
}

export const clearUserStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
}
