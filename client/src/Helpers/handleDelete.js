export const handleDelete = async (endpoint) => {
    const c = confirm("are you sure, you want to delete ?")
    if (c) {
        try {
            const response = await fetch(endpoint, {
                method: "DELETE",
                credentials: 'include'
            })
            const data = response.json()
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
    else {
        return false
    }
}