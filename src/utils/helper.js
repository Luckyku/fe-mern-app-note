
export function getInitials(fullName) {

        
        // Split the full name into an array of words
        const words = fullName.split(' ');
    
        // Map over the array of words, extracting the first letter of each word
        const initials = words.map(word => word.charAt(0).toUpperCase());
    
        // Join the initials into a single string and return it
        return initials.join('');

}