const isLiked = (event) => {
    const userString = sessionStorage.getItem('user');

    // Check if 'user' key exists in sessionStorage
    if (!userString) {
        console.error("User is not set in sessionStorage");
        return false;
    }

    // Parse the user string to an object
    const user = JSON.parse(userString);

    // Check if user and _id property exist
    if (!user || !user._id) {
        console.error("User or user._id is missing or invalid");
        return false;
    }

    const userId = user._id;

    return event.likes.includes(userId);
}

export default isLiked;
