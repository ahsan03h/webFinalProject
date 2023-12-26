const isAdmin = (event) => {
    // Check if 'user' key exists in sessionStorage
    const userString = sessionStorage.getItem('user');
    if (!userString) {
        // Handle the case where 'user' is not set in sessionStorage
        return false;
    }

    // Parse the user string to an object
    const user = JSON.parse(userString);

    // Check if '_id' property exists in the user object
    if (!user || !user._id) {
        // Handle the case where '_id' is not present in the user object
        return false;
    }

    // Assuming 'admin' property also needs to be checked
    return event.admin && event.admin._id === user._id;
}

export default isAdmin;
